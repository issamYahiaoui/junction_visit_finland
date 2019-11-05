import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {AsyncStorage} from 'react-native'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    handleInput : ['prop','value'],
    loginRequest: ['email', 'password'],
    registerRequest: ['form'],
    loginSuccess: ['user'],
    loginFailure: ['error'],
    setUser: ['user'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    email:'',
    password :'',
    phone:'',
    name:'',
    id_type:'id',
    fetching:false,
    error:'',
    user:{
        phone:null,
        email:null,
        token:null,
        name:null
    },


});

/* ------------- Reducers ------------- */

//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })

export const setUser = (state,{user}) => state.merge({ user })

export const request = (state) => state.merge({ fetching: true,error:'' })

// we've successfully logged in || or registerd
export const success =  (state, action) => {

    const {user} = action
    AsyncStorage.setItem('user',JSON.stringify(user)).then(()=>Navigator.navigate("App"))
    return   state.merge({ fetching: false, error: null, user })
}


// Something went wrong somewhere.
export const failure =  (state, action) => {
    const { error } = action
    console.warn('inside failure')
    console.warn(action)
    return state.merge({fetching:false,error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_INPUT]: handleInput,
    [Types.LOGIN_REQUEST]: request,
    [Types.REGISTER_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.SET_USER]: setUser,
})
