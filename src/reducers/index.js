import { combineReducers } from 'redux'
import { userRegisterReducer, userLoginReducer } from './authReducers'
import {
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userCreateReducer,
    userUpdateReducer,
    userDeleteReducer,
} from './userReducers'

import {
    petDetailsReducer,
    petListReducer,
    petCreateReducer,
    petUpdateReducer,
    petDeleteReducer,
    petMyListReducer,
} from './petReducers'

import {
    eventDetailsReducer,
    eventListReducer,
    eventCreateReducer,
    eventUpdateReducer,
    eventDeleteReducer,
    eventMyListReducer,
} from './eventReducers'

import {
    donationDetailsReducer,
    donationListReducer,
    donationCreateReducer,
    donationUpdateReducer,
    donationDeleteReducer,
    donationMyListReducer,
} from './donationReducers'

import {
    volunteerDetailsReducer,
    volunteerListReducer,
    volunteerCreateReducer,
    volunteerUpdateReducer,
    volunteerDeleteReducer,
    volunteerMyListReducer,
} from './volunteerReducers'

import {
    questionDetailsReducer,
    questionListReducer,
    questionCreateReducer,
    questionUpdateReducer,
    questionDeleteReducer,
    questionMyListReducer,
} from './questionReducers'

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userCreate: userCreateReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    petList: petListReducer,
    petMyList: petMyListReducer,
    petInfo: petDetailsReducer,
    petCreate: petCreateReducer,
    petUpdate: petUpdateReducer,
    petDelete: petDeleteReducer,
    eventList: eventListReducer,
    eventMyList: eventMyListReducer,
    eventInfo: eventDetailsReducer,
    eventCreate: eventCreateReducer,
    eventUpdate: eventUpdateReducer,
    eventDelete: eventDeleteReducer,
    donationList: donationListReducer,
    donationMyList: donationMyListReducer,
    donationInfo: donationDetailsReducer,
    donationCreate: donationCreateReducer,
    donationUpdate: donationUpdateReducer,
    donationDelete: donationDeleteReducer,
    volunteerList: volunteerListReducer,
    volunteerMyList: volunteerMyListReducer,
    volunteerInfo: volunteerDetailsReducer,
    volunteerCreate: volunteerCreateReducer,
    volunteerUpdate: volunteerUpdateReducer,
    volunteerDelete: volunteerDeleteReducer,
    questionList: questionListReducer,
    questionMyList: questionMyListReducer,
    questionInfo: questionDetailsReducer,
    questionCreate: questionCreateReducer,
    questionUpdate: questionUpdateReducer,
    questionDelete: questionDeleteReducer,
})

export default rootReducer
