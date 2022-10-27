import axios from 'axios'

import {
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,
    EVENT_MY_LIST_REQUEST,
    EVENT_MY_LIST_SUCCESS,
    EVENT_MY_LIST_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_CREATE_PARTICIPANT_REQUEST,
    EVENT_CREATE_PARTICIPANT_SUCCESS,
    EVENT_CREATE_PARTICIPANT_FAIL,
} from './types'

export const listEvents = () => async (dispatch) => {
    try {
        dispatch({
            type: EVENT_LIST_REQUEST,
        })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`)

        dispatch({
            type: EVENT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyEvents = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_MY_LIST_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/events/myevents`,
            config
        )

        dispatch({
            type: EVENT_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const eventDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_DETAILS_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/events/${id}`,
            config
        )

        dispatch({
            type: EVENT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createEvent = (title, photo, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_CREATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/events/myevents`,
            { title, photo, description },
            config
        )

        dispatch({
            type: EVENT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateEvent = (event) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            // eslint-disable-next-line no-underscore-dangle
            `${process.env.REACT_APP_API_URL}/api/events/myevents/${event._id}`,
            event,
            config
        )

        dispatch({
            EVENT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteEvent = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_DELETE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/events/myevents/${id}`,
            config
        )

        dispatch({
            type: EVENT_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EVENT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createEventParticipant = (id, participant) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EVENT_CREATE_PARTICIPANT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(
            // eslint-disable-next-line no-underscore-dangle
            `${process.env.REACT_APP_API_URL}/api/events/${id}/participants`,
            participant,
            config
        )

        dispatch({
            type: EVENT_CREATE_PARTICIPANT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: EVENT_CREATE_PARTICIPANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
