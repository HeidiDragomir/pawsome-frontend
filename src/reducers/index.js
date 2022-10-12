import { combineReducers } from 'redux'
import { userRegisterReducer, userLoginReducer } from './authReducers'
import {
    petDetailsReducer,
    petListReducer,
    petCreateReducer,
    petUpdateReducer,
    petDeleteReducer,
    petMyListReducer,
} from './petReducers'

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    petList: petListReducer,
    petMyList: petMyListReducer,
    petInfo: petDetailsReducer,
    petCreate: petCreateReducer,
    petUpdate: petUpdateReducer,
    petDelete: petDeleteReducer,
})

export default rootReducer
