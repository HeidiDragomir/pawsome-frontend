import axios from 'axios'

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
    VOLUNTEER_UPDATE_REQUEST,
    VOLUNTEER_UPDATE_SUCCESS,
    VOLUNTEER_UPDATE_FAIL,
    VOLUNTEER_DELETE_REQUEST,
    VOLUNTEER_DELETE_SUCCESS,
    VOLUNTEER_DELETE_FAIL,
} from './types'

export const listVolunteers = () => async (dispatch) => {
    try {
        dispatch({
            type: VOLUNTEER_LIST_REQUEST,
        })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/volunteers`)

        dispatch({
            type: VOLUNTEER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyVolunteers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOLUNTEER_MY_LIST_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/volunteers/myvolunteers`,
            config
        )

        dispatch({
            type: VOLUNTEER_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const volunteerDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOLUNTEER_DETAILS_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/volunteers/${id}`,
            config
        )

        dispatch({
            type: VOLUNTEER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createVolunteer = (title, photo, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOLUNTEER_CREATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/volunteers/myvolunteers`,
            { title, photo, description },
            config
        )

        dispatch({
            type: VOLUNTEER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateVolunteer = (volunteer) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOLUNTEER_UPDATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/volunteers/myvolunteers/${volunteer._id}`,
            volunteer,
            config
        )

        dispatch({
            VOLUNTEER_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteVolunteer = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: VOLUNTEER_DELETE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/volunteers/myvolunteers/${id}`,
            config
        )

        dispatch({
            type: VOLUNTEER_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: VOLUNTEER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
