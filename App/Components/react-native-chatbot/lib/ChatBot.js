import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-id';
import { Dimensions, Keyboard, TextInput, ScrollView, Platform } from 'react-native';
import { CustomStep, OptionsStep, TextStep , WhereCardStep } from './steps/steps';
import schema from './schemas/schema';
import ChatBotContainer from './ChatBotContainer';
import InputView from './InputView';
import Footer from './Footer';
import Button from './Button';
import ButtonText from './ButtonText';

const { height, width } = Dimensions.get('window');

class ChatBot extends Component {

  constructor(props) {
    super(props);

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      editable: false,
      inputValue: '',
      inputInvalid: false,
      defaultUserSettings: {},
    };

    this.getStepMessage = this.getStepMessage.bind(this);
    this.getTriggeredStep = this.getTriggeredStep.bind(this);
    this.generateRenderedStepsById = this.generateRenderedStepsById.bind(this);
    this.renderStep = this.renderStep.bind(this);
    this.triggerNextStep = this.triggerNextStep.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setScrollViewScrollToEnd = this.setScrollViewScrollToEnd.bind(this);

    // instead of using a timeout on input focus/blur we can listen for the native keyboard events
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.setScrollViewScrollToEnd);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.setScrollViewScrollToEnd);
  }

  componentWillMount() {
    const {
      botDelay,
      botAvatar,
      botBubbleColor,
      botFontColor,
      customDelay,
      customLoadingColor,
      userDelay,
      userAvatar,
      userBubbleColor,
      userFontColor,
      optionBubbleColor,
      optionFontColor
    } = this.props;
    const steps = {};

    const defaultBotSettings = {
      delay: botDelay,
      avatar: botAvatar,
      bubbleColor: botBubbleColor,
      fontColor: botFontColor,
      optionBubbleColor: optionBubbleColor,
      optionFontColor: optionFontColor
    };
    const defaultUserSettings = {
      delay: userDelay,
      avatar: userAvatar,
      bubbleColor: userBubbleColor,
      fontColor: userFontColor,
    };
    const defaultCustomSettings = {
      delay: customDelay,
      loadingColor: customLoadingColor,
    };

    for (let i = 0, len = this.props.steps.length; i < len; i += 1) {
      const step = this.props.steps[i];
      let settings = {};

      if (step.user) {
        settings = defaultUserSettings;
      } else if (step.message || step.asMessage || step.options) {
        settings = defaultBotSettings;
      } else if (step.component || step.cardData) {
        settings = defaultCustomSettings;
      }

      steps[step.id] = Object.assign(
        {},
        settings,
        schema.parse(step),
      );
    }

    schema.checkInvalidIds(steps);

    const firstStep = this.props.steps[0];

    if (firstStep.message) {
      const { message } = firstStep;
      firstStep.message = typeof message === 'function' ? message() : message;
      steps[firstStep.id].message = firstStep.message;
    }

    const currentStep = firstStep;
    const renderedSteps = [steps[currentStep.id]];
    const previousSteps = [steps[currentStep.id]];

    this.setState({
      defaultUserSettings,
      steps,
      currentStep,
      renderedSteps,
      previousSteps,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onButtonPress() {
    const {
      renderedSteps,
      previousSteps,
      inputValue,
      defaultUserSettings,
    } = this.state;
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: inputValue,
      };

      currentStep = Object.assign(
        {},
        defaultUserSettings,
        currentStep,
        step,
      );

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
        editable: false,
        inputValue: '',
      });
    }
  }

  getStepMessage(message) {
    const { previousSteps } = this.state;
    const lastStepIndex = previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return (typeof message === 'function') ? message({ previousValue, steps }) : message;
  }

  getTriggeredStep(trigger, value) {
    const steps = this.generateRenderedStepsById();
    return (typeof trigger === 'function') ? trigger({ value, steps }) : trigger;
  }

  setContentRef(c) {
    this.scrollView = c;
  }

  setInputRef(c) {
    this.inputRef = c;
  }

  setScrollViewScrollToEnd() {
    this.scrollView.scrollToEnd();
  }

  handleEnd() {
    const { previousSteps } = this.state;

    const renderedSteps = previousSteps.map((step) => {
      const { id, message, value, metadata } = step;
      return { id, message, value, metadata };
    });

    const steps = [];

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    const values = previousSteps.filter(step => step.value).map(step => step.value);

    if (this.props.handleEnd) {
      this.props.handleEnd({ renderedSteps, steps, values });
    }
  }

  triggerNextStep(data) {
    const {
      renderedSteps,
      previousSteps,
      steps,
      defaultUserSettings,
    } = this.state;
    let { currentStep, previousStep } = this.state;
    const isEnd = currentStep.end;

    if (data && data.value) {
      currentStep.value = data.value;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, data.value);
    }

    if (isEnd) {
      this.handleEnd();
    } else if ((currentStep.options && data)  )
    {
      const option = currentStep.options.filter(o => o.value === data.value)[0];
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
        },
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    }else if ((currentStep.cardData && data)  )
    {
      const card = currentStep.cardData.filter(o => o.value === data.value)[0];
      const trigger = this.getTriggeredStep(card.trigger, currentStep.value);
      delete currentStep.options;

      currentStep = Object.assign(
          {},
          currentStep,
          card,
          defaultUserSettings,
          {
            user: true,
            message: card.parkName,
            trigger,
          },
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps,
      });
    } else if (currentStep.trigger) {
      const isReplace = currentStep.replace && !currentStep.option;

      if (isReplace) {
        renderedSteps.pop();
      }

      const trigger = this.getTriggeredStep(currentStep.trigger, currentStep.value);
      let nextStep = Object.assign({}, steps[trigger]);

      if (nextStep.message) {
        nextStep.message = this.getStepMessage(nextStep.message);
      } else if (nextStep.update) {
        const updateStep = nextStep;
        nextStep = Object.assign({}, steps[updateStep.update]);

        if (nextStep.options) {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        } else if(nextStep.cardData){
          for (let i = 0, len = nextStep.cardData.length; i < len; i += 1) {
            nextStep.cardData[i].trigger = updateStep.trigger;
          }
        }
        else{
          nextStep.trigger = updateStep.trigger;
        }
      }

      nextStep.key = Random(24);

      previousStep = currentStep;
      currentStep = nextStep;

      if (nextStep.user) {
        this.setState({ editable: true });
        this.inputRef.focus();
      } else {
        renderedSteps.push(nextStep);
        previousSteps.push(nextStep);
      }

      this.setState({
        renderedSteps,
        previousSteps,
        currentStep,
        previousStep,
      });

      Keyboard.dismiss();
    }
  }

  generateRenderedStepsById() {
    const { previousSteps } = this.state;
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];
      steps[id] = { id, message, value, metadata };
    }

    return steps;
  }

  isLastPosition(step) {
    const { renderedSteps } = this.state;
    const { length } = renderedSteps;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (length <= 1 || (stepIndex + 1) === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  }

  isFirstPosition(step) {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  }

  handleKeyPress(event) {
    if (event.nativeEvent.key === 'Enter') {
      this.onButtonPress();
    }
  }

  checkInvalidInput() {
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== 'boolean' || !result) {
      this.setState({
        inputValue: result.toString(),
        inputInvalid: true,
        editable: false,
      });

      setTimeout(() => {
        this.setState({
          inputValue: value,
          inputInvalid: false,
          editable: true,
        });
        this.inputRef.focus();
      }, 2000);

      return true;
    }

    return false;
  }

  renderStep(step, index) {
    const { renderedSteps, previousSteps } = this.state;
    const {
      avatarStyle,
      avatarWrapperStyle,
      bubbleStyle,
      userBubbleStyle,
      optionStyle,
      optionElementStyle,
      customStyle,
      customDelay,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { options, component, asMessage , cardData} = step;
    const steps = {};
    const stepIndex = renderedSteps.map(s => s.id).indexOf(step.id);
    const previousStep = stepIndex > 0 ? renderedSteps[index - 1] : {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const ps = previousSteps[i];

      steps[ps.id] = {
        id: ps.id,
        message: ps.message,
        value: ps.value,
      };
    }

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          delay={customDelay}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          triggerNextStep={this.triggerNextStep}
          optionStyle={optionStyle || bubbleStyle}
          optionElementStyle={optionElementStyle|| bubbleStyle}
        />
      );
    }
    if(cardData) {
      return (
          <WhereCardStep
              key={index}
              step={step}
              triggerNextStep={this.triggerNextStep}
          />
          )
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        avatarWrapperStyle={avatarWrapperStyle}
        bubbleStyle={bubbleStyle}
        userBubbleStyle={userBubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  }

  render() {
    const {
      currentStep,
      editable,
      inputInvalid,
      inputValue,
      renderedSteps,
    } = this.state;
    const {
      botBubbleColor,
      botFontColor,
      className,
      contentStyle,
      footerStyle,
      headerComponent,
      inputAttributes,
      inputStyle,
      keyboardVerticalOffset,
      placeholder,
      style,
      submitButtonStyle,
      submitButtonContent,
      scrollViewProps,
    } = this.props;

    const styles = {
      input: {
        borderWidth: 0,
        color: inputInvalid ? '#E53935' : '#4a4a4a',
        fontSize: 14,
        opacity: !editable && !inputInvalid ? 0.5 : 1,
        paddingRight: 16,
        paddingLeft: 16,
        height: 50,
        width: width - 80,
      },
      content: {
        height: height - 50,
        backgroundColor: 'white',
      },
    };

    const textInputStyle = Object.assign({}, styles.input, inputStyle);
    const scrollViewStyle = Object.assign({}, styles.content, contentStyle);
    const platformBehavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const inputAttributesOverride = currentStep.inputAttributes || inputAttributes;

    return (
      <ChatBotContainer
        className={`rsc ${className}`}
        style={style}
      >
        {!!headerComponent && headerComponent}
        <ScrollView
          className="rsc-content"
          style={scrollViewStyle}
          ref={this.setContentRef}
          onContentSizeChange={this.setScrollViewScrollToEnd}
          {...scrollViewProps}
        >
          {_.map(renderedSteps, this.renderStep)}
        </ScrollView>
        {/*<InputView*/}
        {/*  behavior={platformBehavior}*/}
        {/*  keyboardVerticalOffset={keyboardVerticalOffset}*/}
        {/*>*/}
        {/*  <Footer*/}
        {/*    className="rsc-footer"*/}
        {/*    style={footerStyle}*/}
        {/*    disabled={!editable}*/}
        {/*    invalid={inputInvalid}*/}
        {/*    color={botBubbleColor}*/}
        {/*  >*/}
        {/*    <TextInput*/}
        {/*      type="textarea"*/}
        {/*      style={textInputStyle}*/}
        {/*      className="rsc-input"*/}
        {/*      placeholder={placeholder}*/}
        {/*      ref={this.setInputRef}*/}
        {/*      onKeyPress={this.handleKeyPress}*/}
        {/*      onChangeText={text => this.setState({ inputValue: text })}*/}
        {/*      value={inputValue}*/}
        {/*      underlineColorAndroid="transparent"*/}
        {/*      invalid={inputInvalid}*/}
        {/*      editable={editable}*/}
        {/*      {...inputAttributesOverride}*/}
        {/*    />*/}
        {/*    <Button*/}
        {/*      className="rsc-button"*/}
        {/*      style={submitButtonStyle}*/}
        {/*      disabled={!editable}*/}
        {/*      onPress={this.onButtonPress}*/}
        {/*      invalid={inputInvalid}*/}
        {/*      backgroundColor={botBubbleColor}*/}
        {/*    >*/}
        {/*      <ButtonText*/}
        {/*        className="rsc-button-text"*/}
        {/*        invalid={inputInvalid}*/}
        {/*        fontColor={botFontColor}*/}
        {/*      >*/}
        {/*        {submitButtonContent}*/}
        {/*      </ButtonText>*/}
        {/*    </Button>*/}
        {/*  </Footer>*/}
        {/*</InputView>*/}
      </ChatBotContainer>
    );
  }
}

ChatBot.propTypes = {
  avatarStyle: PropTypes.object,
  avatarWrapperStyle: PropTypes.object,
  botAvatar: PropTypes.string,
  botBubbleColor: PropTypes.string,
  botDelay: PropTypes.number,
  botFontColor: PropTypes.string,
  bubbleStyle: PropTypes.object,
  optionStyle: PropTypes.object,
  optionBubbleColor: PropTypes.string,
  optionFontColor: PropTypes.string,
  optionElementStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  customStyle: PropTypes.object,
  customDelay: PropTypes.number,
  customLoadingColor: PropTypes.string,
  className: PropTypes.string,
  handleEnd: PropTypes.func,
  headerComponent: PropTypes.element,
  hideBotAvatar: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  footerStyle: PropTypes.object,
  inputAttributes: PropTypes.objectOf(PropTypes.any),
  inputStyle: PropTypes.object,
  keyboardVerticalOffset: PropTypes.number,
  placeholder: PropTypes.string,
  steps: PropTypes.array.isRequired,
  style: PropTypes.object,
  submitButtonStyle: PropTypes.object,
  submitButtonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  userAvatar: PropTypes.string,
  userBubbleStyle: PropTypes.object,
  userBubbleColor: PropTypes.string,
  userDelay: PropTypes.number,
  userFontColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
};

ChatBot.defaultProps = {
  avatarStyle: {},
  avatarWrapperStyle: {},
  botBubbleColor: '#B20066',
  botDelay: 1000,
  botFontColor: '#fff',
  bubbleStyle: {},
  optionStyle: {},
  optionBubbleColor: '#B20066',
  optionFontColor: '#fff',
  optionElementStyle: {},
  contentStyle: {},
  customStyle: {},
  customDelay: 1000,
  customLoadingColor: '#4a4a4a',
  className: '',
  footerStyle: {},
  handleEnd: undefined,
  hideBotAvatar: false,
  hideUserAvatar: false,
  inputAttributes: {},
  inputStyle: {},
  keyboardVerticalOffset: Platform.OS === 'ios' ? 44 : 0,
  placeholder: 'Type the message ...',
  headerComponent: undefined,
  style: {},
  submitButtonStyle: {},
  submitButtonContent: 'SEND',
  userBubbleStyle: {},
  userBubbleColor: '#fff',
  userDelay: 1000,
  userFontColor: '#4a4a4a',
  botAvatar : 'data:image/png;base64,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' ,
  userAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAKTElEQVR42u1daWxcVxUeEJRFiIIQFGhR2UqDWAtiRwjxAwkQQvyoKkGLoFSIPyCq8pMfVEKUJQukTZ3gNE5tJ2kTJ6ljJ3bsxHtsJ97Gs9ljezzjmXlv1vdmeW/sNNvlnOfMZOzxMjOeOfe9mbnSkeyZee/ed753tnvvOddk0nmLxdzvW5b830xJwtPLsvCvlCy2p2RhPCX7rUAu+DwE/8saaX/DZ9p3+BuhTbsGr436viHLrvtNtVZYA+Y/pMbEp1Ix4TAwfwGYykpM83DvelUWnwSQHqxxfIOmyr4vrL79wKzSA7AlqZIwB33/Q5ECn6tqEFIRz0dUyf8cMMVMDcIWNAUS+qwaDn+4aoBIRsVdqZh4Eh7+to6AWEfijWXZ35iMCI9WrkTExa+gkdU3EDl0WxtzTHisYoCQJOm9oJr+Aw92y0BArKebyzFxNwuH32NYIBhjbwHR/x08jGRgINZSTAiqMf+v8NkM57rCA3RUDBC5NuZ8KuL9qEHAEJ6AQScqF4wMJeDFe1y/Ksrnexd6JlUAxDryH2Js/h36CuxCoQdgcMPVB0aGhhQl8EH9xBWy4KliMNLk5h63wJTDdyrKi9o5SWBDv80FDCXm+z4AkqyBkGvsV2Li90jBWJHF70LHyzXmb0opMkmBwOhL4IfHa0zflqJKVPxseSUjFvg4dCTUmJ03+UF9PVyeOMPtfid0MFljcqHTLf5rjNnvK/1sLayy1Rhc9FTLyyVe0ROfrDF1hyuTsviLUgZ+CveHkvxMFe1M9YwyxXmJKfZ2lrS0sKT59TWkWE4zxdG++hvPVbjGoV2rA1CUHQeOOM28LIu9XEHwm5ky28mUqddYcvJYUYTXKrMXtXtxBScmdO/Uxf01NyA811YloEgQNgUHJEhdGuMGDKr/4lRV0v8B9KXJByxamWI9U3IgcoCxnmYpwcZlkQv3mhXuVYFnQC0Vynxv2YFYT+pCPw9p2V8QGNcTvkdwHZlsgBH3qpEmBiMjLY7zMAYP6a6W6/HQJwuYxSVcaEIwCFTU9irsjDYWOo0gHClEOkh2iKiSlyVtrdzByIBiawNG+cikZCUe/EQetkP4H9Vboji7dQNGBhSIXwhVV10+S7HXSaQDYgK9gZEx9P5pKlBWtlz6hY3HfyYZSHSJJadbdAuIFquAOqXgBe4l3kpd2UikY/GKbsHISMniCJWUTG4WlX+ZzJDjvJPOAUlOnyKTEkzH2AAQcQ9J594J/YORVl2+KRq1BfkpG0XmCySelaPDOIDMdFABMrPR0iyNupo6bhhAcKyExv2he9IBSZE0E4c244Bxl1KwBkPCG9hVnz1V0kTjXQ0bDhDVPUw1ldKQ7e56SQDRYWS+rR2ZI4vc3as7EJXgh8imSmznjAeIvY1sKgXXoNK7EGk61HF0vlXUTsUfMOzfQoP+WzJAzK8ZDhAMYslWS2HJ3HQ3YZ8GECO5vFmuL5mEyMILaNDP1gDRByCwy7EFARmpqSx9qCzMxCKb4a0Z9bxo2kSZjlZze7elRRNlSpri7DJepA7BLCEgEQTkTTJAXIPGkxDXECUg13Ha/QaZn+0zG09CcD8wLSB0KksNLRhvtje8SK6ySHPMk+ZTxgEEvELiLaZo1LWCkWSdKnOXDTTT20MNiOb2kpbEMJIdIbYfSIOkUyere7JwGfeE/qUDknxw/xhxgmgLTi6+QJ0joRhgoYpwYSp7a+nfYPuP8BvypBy/Rf/qSrDSZ1fhujqWgOCR2pW0ntUvINZWLuluWH07nbpG/zZAnp9upWNpggsgmVQ3qk0Oa3dZ+LTtmroDBBJN6XJENtjkcLdKwytcpMQ7rj/p8PKRDszLya7U8Ete6c+6siVoOzilS2Px0DV12OHDO1ykJDALzDiui6VaNTjDSzru4Has9eX6ZnhVOOCRDp2bHt3Hs7KpNXf3uyT8lduAMKPKwlF1Wd+gj8rXRuh/yc2+jXs/xUttpafm4+PN5GDEx5uYGnZxLfi/aZEz+PIKN0AiPrZw8UWWmKADIzHRrPWpcpQOVRb6t8gx9P+e18ASgpPZ3tjNXF0vsQQFGJPNzAVgYJ9J0cmx7JT4zHYFZ1JcolSfDZizR2OQu/uAxrDyScYxtgh9YF/21j0s7rPzAkSNx5fev3VZDTgng8vcltfKFrte1pikSYqmvkoPSmJ8VU2l+3FDnwmflU/sIQv/3L5GFpy/xKMmr+wcYGL/YbbQeY9ZM+37WGSkoWRg4L1m2vZl7o99YZ+yc5AHIMtYqCHf0kx11AOMTLVpzBGA5s7/N8M0VCm+3oOaN1S8J9XMvD0HtXul7+uEPrAv7BP75gDIi4WUZ/o0ZXkmFXZ2BAZe0ZijgdJ3WGNYmnlIjnN7AZhDTB5rzBuIGPwWr3G07V1zr7kL98BAwr5V0t0leRaeWRe5/5tMXc0OZJhzD5R6kJT9axipSYymavYzf98hFh05ymLjjZoDgIR/R0cbtO8WOkD1te7OuR7BEPvrc/rDMZCmHRRcABMOwIKLfWWfNgnOwxvakMMgjUBSXFk2Zafk6nxp4340KWnQxkIxzc5E8d3FniX1eHnz1v0sNHF2UyalyXv5EBjjvUUDMQvOgQ9syHb9hGEsaplne8GL/bkuy8RidJw25PlRPbjCBzRbki8Q+NvFrgMF9LFq4MsWue+0TGzWiWuRkkblS2YWGjlREKOyDb6nu47Nd+wHhu/LBQEkCb/zXKrTfltMHzg2HGOJAQmU7EjXlBz4UWoHJ3SqUGAy7plkkq2bBUePF8WkrUGq16jU98Wx4pjj7omdemG3lLj/B6Utxi/7/56/G+vRHiJq7WLBkdIDwIsCV5pYxNzO5Dmo9yU4CqnS8HwZTu4cfzvmwG0sAUsVCcD2ADWy8OQ5LdJPwFzcRsu/OJsLtvhtZTlDRJZd9+OGYFzMiXummOToYaFrp5iYFdRVMwUGj2qemjTbxxJeC7yo3mk8C7i8x+S5x3eBFNysAbCN/RlqvBU1d36d5ByqqL37Z4GhV+/UGL+JpABvIjN9P6U9ltvW/afA0NEaKLlq6w68sH/gcpYhvgXBK023akDcVVPDx27Kjp6fcD3tMzzf/xj46yvVDkZo9MQy8kIX5+HK072fD109maxaMK6eTESdvbv0dXy33X5feKqtr6pcYHjWyPSFCxBnvFW356qDsX8WAqbbFW8vwHbG7D1/NBmhRW2XvhYaOxWpWDDGWsK6sRcFSYu96/ngcHPFBJEQEL8Jz/Scycgt6hx+MDzZOmVo2zJwBNZJ2sdU66UHTJXSZOvAF6PmthFx8IihIm50VNCLNFVqS7oGP4MPqeeplzQQYUf/I6ZqaZL14seilo4mPcUvGE+ErZ2vopo1VXMLW7p+jOosNHLsBv10R/ON8GTbsDRz+YemWtvYZZYsFw+GJ886g2UACEEPT7TORqyddRFLz1drHC+wiY7LD0u2rmeils4jsCPkauja6VBw9PUUvtkYgGbPOOPf+Bl+h78JjZ0J4jV4bcze/TSqSb0/7/8BsRfWdepV+LUAAAAASUVORK5CYII=',
  scrollViewProps: {},
};

export default ChatBot;
