import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../Themes/Strings/en.json';
import ar from '../Themes/Strings/ar.json';


// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    en,
    ar
};

I18nManager.allowRTL(true)

// The method we'll use instead of a regular string

export function setLocale(lang) {
    I18n.locale=lang;
};

export const getLocale=()=>
{
    return I18n.locale
};



export function t(name, params = {locale : getLocale() }) {

    console.warn(params.locale)
    return I18n.t(name, params);
};

export default I18n;
