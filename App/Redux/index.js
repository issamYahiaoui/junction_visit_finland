import { combineReducers} from 'redux'
import CreateStore from './CreateStore'
import rootSaga from '../Sagas/'


/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
    auth: require('./AuthRedux').reducer,
    settings : require('./SettingsRedux').reducer
})

export default () => {

    let { store, sagasManager, sagaMiddleware } = CreateStore(reducers, rootSaga)
    return store
}
