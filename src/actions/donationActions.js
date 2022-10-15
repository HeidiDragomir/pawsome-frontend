import axios from 'axios'

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
    DONATION_UPDATE_REQUEST,
    DONATION_UPDATE_SUCCESS,
    DONATION_UPDATE_FAIL,
    DONATION_DELETE_REQUEST,
    DONATION_DELETE_SUCCESS,
    DONATION_DELETE_FAIL,
} from './types'

export const listDonations = () => async (dispatch) => {
    try {
        dispatch({
            type: DONATION_LIST_REQUEST,
        })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/donations`)

        dispatch({
            type: DONATION_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyDonations = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: DONATION_MY_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/donations/mydonations`,
            config
        )

        dispatch({
            type: DONATION_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const donationDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DONATION_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/donations/${id}`,
            config
        )

        dispatch({
            type: DONATION_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createDonation = (title, photo, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DONATION_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/donations/mydonations`,
            { title, photo, description },
            config
        )

        dispatch({
            type: DONATION_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateDonation = (donation) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DONATION_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            // eslint-disable-next-line no-underscore-dangle
            `${process.env.REACT_APP_API_URL}/api/donations/mydonations/${donation._id}`,
            donation,
            config
        )

        dispatch({
            DONATION_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteDonation = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DONATION_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/donations/mydonations/${id}`,
            config
        )

        dispatch({
            type: DONATION_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DONATION_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
