import { combineReducers } from 'redux'
import userRegisterReducer from './authReducer'

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
})

export default rootReducer
