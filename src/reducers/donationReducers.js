/* eslint-disable default-param-last */
import {
    DONATION_LIST_REQUEST,
    DONATION_LIST_SUCCESS,
    DONATION_LIST_FAIL,
    DONATION_MY_LIST_REQUEST,
    DONATION_MY_LIST_SUCCESS,
    DONATION_MY_LIST_FAIL,
    DONATION_DETAILS_REQUEST,
    DONATION_DETAILS_SUCCESS,
    DONATION_DETAILS_FAIL,
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,
    DONATION_CREATE_RESET,
    DONATION_UPDATE_REQUEST,
    DONATION_UPDATE_SUCCESS,
    DONATION_UPDATE_FAIL,
    DONATION_UPDATE_RESET,
    DONATION_DELETE_REQUEST,
    DONATION_DELETE_SUCCESS,
    DONATION_DELETE_FAIL,
} from '../actions/types'

export const donationListReducer = (state = { donations: [] }, action) => {
    switch (action.type) {
        case DONATION_LIST_REQUEST:
            return { loading: true, donations: [] }
        case DONATION_LIST_SUCCESS:
            return {
                loading: false,
                donations: action.payload,
            }
        case DONATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const donationMyListReducer = (state = { donations: [] }, action) => {
    switch (action.type) {
        case DONATION_MY_LIST_REQUEST:
            return { loading: true, donations: [] }
        case DONATION_MY_LIST_SUCCESS:
            return {
                loading: false,
                donations: action.payload,
            }
        case DONATION_MY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const donationDetailsReducer = (state = { donation: {} }, action) => {
    switch (action.type) {
        case DONATION_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }

        case DONATION_DETAILS_SUCCESS:
            return {
                loading: false,
                donation: action.payload,
            }

        case DONATION_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error,
            }

        default:
            return state
    }
}

export const donationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DONATION_CREATE_REQUEST:
            return {
                loading: true,
            }
        case DONATION_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                donation: action.payload,
            }
        case DONATION_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DONATION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const donationUpdateReducer = (state = { donation: {} }, action) => {
    switch (action.type) {
        case DONATION_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case DONATION_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                donation: action.payload,
            }
        case DONATION_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case DONATION_UPDATE_RESET:
            return { donation: {} }
        default:
            return state
    }
}

export const donationDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DONATION_DELETE_REQUEST:
            return {
                loading: true,
            }
        case DONATION_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case DONATION_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
