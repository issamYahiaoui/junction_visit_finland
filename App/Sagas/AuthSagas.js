/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
// import { AuthSelectors } from '../Redux/AuthRedux'

// attempts to login
export function* login(api, { email, password }) {

    const authObj = {
        email,
        password
    }

    const response = yield call(api.login, authObj)
    console.warn(response.data)
    if (response.ok) {
        yield put(AuthActions.loginSuccess(response.data.user))
        if(response.data.status==="408")  yield put(AuthActions.loginFailure(response.data.message))
    }
    else {
        yield put(AuthActions.loginFailure(response.data.message))
    }
}

export function* register(api, { form }) {


    const response = yield call(api.register, form)

    if (response.ok) {
        if(response.data.status[0]!='4' ) yield put(AuthActions.loginSuccess(response.data.user))
        else  yield put(AuthActions.loginFailure(response.data.message))
    }
    else {
        yield put(AuthActions.loginFailure(response.data.message))
    }
}
