import './App/Config'
import React from 'react'
import { Provider } from 'react-redux'
import RootContainer from './App/Containers/RootContainer'
import createStore from './App/Redux'
import './App/Services/I18n'


const store = createStore()

export default class App extends React.Component {

  state = {
  }
  render() {

    return (
        <Provider store={store}>
          <RootContainer />
        </Provider>
    )
  }
}
