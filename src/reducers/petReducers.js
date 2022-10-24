/* eslint-disable default-param-last */
import {
    PET_LIST_REQUEST,
    PET_LIST_SUCCESS,
    PET_LIST_FAIL,
    PET_MY_LIST_REQUEST,
    PET_MY_LIST_SUCCESS,
    PET_MY_LIST_FAIL,
    PET_DETAILS_REQUEST,
    PET_DETAILS_SUCCESS,
    PET_DETAILS_FAIL,
    PET_CREATE_REQUEST,
    PET_CREATE_SUCCESS,
    PET_CREATE_FAIL,
    PET_CREATE_RESET,
    PET_UPDATE_REQUEST,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_FAIL,
    PET_UPDATE_RESET,
    PET_DELETE_REQUEST,
    PET_DELETE_SUCCESS,
    PET_DELETE_FAIL,
    PET_UPDATE_TO_ADOPTED_REQUEST,
    PET_UPDATE_TO_ADOPTED_SUCCESS,
    PET_UPDATE_TO_ADOPTED_FAIL,
    PET_UPDATE_TO_ADOPTED_RESET,
} from '../actions/types'

export const petListReducer = (state = { pets: [] }, action) => {
    switch (action.type) {
        case PET_LIST_REQUEST:
            return { loading: true, pets: [] }
        case PET_LIST_SUCCESS:
            return {
                loading: false,
                pets: action.payload,
            }
        case PET_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const petMyListReducer = (state = { pets: [] }, action) => {
    switch (action.type) {
        case PET_MY_LIST_REQUEST:
            return { loading: true, pets: [] }
        case PET_MY_LIST_SUCCESS:
            return {
                loading: false,
                pets: action.payload,
            }
        case PET_MY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const petDetailsReducer = (state = { pet: {} }, action) => {
    switch (action.type) {
        case PET_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }

        case PET_DETAILS_SUCCESS:
            return {
                loading: false,
                pet: action.payload,
            }

        case PET_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error,
            }

        default:
            return state
    }
}

export const petCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PET_CREATE_REQUEST:
            return {
                loading: true,
            }
        case PET_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                pet: action.payload,
            }
        case PET_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PET_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const petUpdateReducer = (state = { pet: {} }, action) => {
    switch (action.type) {
        case PET_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case PET_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                pet: action.payload,
            }
        case PET_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PET_UPDATE_RESET:
            return { pet: {} }
        default:
            return state
    }
}

export const petDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PET_DELETE_REQUEST:
            return {
                loading: true,
            }
        case PET_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case PET_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const petUpdateToAdoptedReducer = (state = { pet: {} }, action) => {
    switch (action.type) {
        case PET_UPDATE_TO_ADOPTED_REQUEST:
            return {
                loading: true,
            }
        case PET_UPDATE_TO_ADOPTED_SUCCESS:
            return {
                loading: false,
                success: true,
                pet: action.payload,
            }
        case PET_UPDATE_TO_ADOPTED_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PET_UPDATE_TO_ADOPTED_RESET:
            return { pet: {} }
        default:
            return state
    }
}
