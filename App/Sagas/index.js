import { takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AuthTypes } from '../Redux/AuthRedux'


// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import {login,register} from './AuthSagas'



/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api =  API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    yield all([
        // some sagas only receive an action
        takeEvery(AuthTypes.LOGIN_REQUEST, login, api),
        takeEvery(AuthTypes.REGISTER_REQUEST, register, api),

    ])
}
