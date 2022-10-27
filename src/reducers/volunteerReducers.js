/* eslint-disable default-param-last */
import {
    VOLUNTEER_LIST_REQUEST,
    VOLUNTEER_LIST_SUCCESS,
    VOLUNTEER_LIST_FAIL,
    VOLUNTEER_MY_LIST_REQUEST,
    VOLUNTEER_MY_LIST_SUCCESS,
    VOLUNTEER_MY_LIST_FAIL,
    VOLUNTEER_DETAILS_REQUEST,
    VOLUNTEER_DETAILS_SUCCESS,
    VOLUNTEER_DETAILS_FAIL,
    VOLUNTEER_CREATE_REQUEST,
    VOLUNTEER_CREATE_SUCCESS,
    VOLUNTEER_CREATE_FAIL,
    VOLUNTEER_CREATE_RESET,
    VOLUNTEER_UPDATE_REQUEST,
    VOLUNTEER_UPDATE_SUCCESS,
    VOLUNTEER_UPDATE_FAIL,
    VOLUNTEER_UPDATE_RESET,
    VOLUNTEER_DELETE_REQUEST,
    VOLUNTEER_DELETE_SUCCESS,
    VOLUNTEER_DELETE_FAIL,
    VOLUNTEER_CREATE_PARTICIPANT_REQUEST,
    VOLUNTEER_CREATE_PARTICIPANT_SUCCESS,
    VOLUNTEER_CREATE_PARTICIPANT_FAIL,
    VOLUNTEER_CREATE_PARTICIPANT_RESET,
} from '../actions/types'

export const volunteerListReducer = (state = { volunteers: [] }, action) => {
    switch (action.type) {
        case VOLUNTEER_LIST_REQUEST:
            return { loading: true, volunteers: [] }
        case VOLUNTEER_LIST_SUCCESS:
            return {
                loading: false,
                volunteers: action.payload,
            }
        case VOLUNTEER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const volunteerMyListReducer = (state = { volunteers: [] }, action) => {
    switch (action.type) {
        case VOLUNTEER_MY_LIST_REQUEST:
            return { loading: true, volunteers: [] }
        case VOLUNTEER_MY_LIST_SUCCESS:
            return {
                loading: false,
                volunteers: action.payload,
            }
        case VOLUNTEER_MY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const volunteerDetailsReducer = (state = { volunteer: {} }, action) => {
    switch (action.type) {
        case VOLUNTEER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }

        case VOLUNTEER_DETAILS_SUCCESS:
            return {
                loading: false,
                volunteer: action.payload,
            }

        case VOLUNTEER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error,
            }

        default:
            return state
    }
}

export const volunteerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VOLUNTEER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case VOLUNTEER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                volunteer: action.payload,
            }
        case VOLUNTEER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case VOLUNTEER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const volunteerUpdateReducer = (state = { volunteer: {} }, action) => {
    switch (action.type) {
        case VOLUNTEER_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case VOLUNTEER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                volunteer: action.payload,
            }
        case VOLUNTEER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case VOLUNTEER_UPDATE_RESET:
            return { volunteer: {} }
        default:
            return state
    }
}

export const volunteerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VOLUNTEER_DELETE_REQUEST:
            return {
                loading: true,
            }
        case VOLUNTEER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case VOLUNTEER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const volunteerParticipantCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VOLUNTEER_CREATE_PARTICIPANT_REQUEST:
            return {
                loading: true,
            }
        case VOLUNTEER_CREATE_PARTICIPANT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case VOLUNTEER_CREATE_PARTICIPANT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case VOLUNTEER_CREATE_PARTICIPANT_RESET:
            return {}
        default:
            return state
    }
}
