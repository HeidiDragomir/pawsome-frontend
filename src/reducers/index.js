import { combineReducers } from 'redux'
import { userRegisterReducer, userLoginReducer } from './authReducer'

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
})

export default rootReducer
