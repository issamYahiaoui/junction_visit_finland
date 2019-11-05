//../Redux/SettingsRedux.js
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {setLocale} from '../Services/I18n'

/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
    changeLanguage: ['lang']
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    lang: "en"// take over the recognized, or default if not recognized, language locale as initial state
})

/* ------------- Reducers ------------- */
export const changeLanguage = (state, {lang}) => {
    setLocale(lang)
    return state.merge({
        lang
    })
}


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: changeLanguage,
})
