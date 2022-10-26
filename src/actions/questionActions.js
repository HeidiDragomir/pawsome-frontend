import axios from 'axios'

import {
    QUESTION_LIST_REQUEST,
    QUESTION_LIST_SUCCESS,
    QUESTION_LIST_FAIL,
    QUESTION_MY_LIST_REQUEST,
    QUESTION_MY_LIST_SUCCESS,
    QUESTION_MY_LIST_FAIL,
    QUESTION_DETAILS_REQUEST,
    QUESTION_DETAILS_SUCCESS,
    QUESTION_DETAILS_FAIL,
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_FAIL,
    QUESTION_UPDATE_REQUEST,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_DELETE_REQUEST,
    QUESTION_DELETE_SUCCESS,
    QUESTION_DELETE_FAIL,
    QUESTION_CREATE_ANSWER_REQUEST,
    QUESTION_CREATE_ANSWER_SUCCESS,
    QUESTION_CREATE_ANSWER_FAIL,
} from './types'

export const listQuestions = () => async (dispatch) => {
    try {
        dispatch({
            type: QUESTION_LIST_REQUEST,
        })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/questions`)

        dispatch({
            type: QUESTION_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyQuestions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_MY_LIST_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/myquestions`,
            config
        )

        dispatch({
            type: QUESTION_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const questionDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_DETAILS_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/${id}`,
            config
        )

        dispatch({
            type: QUESTION_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createQuestion = (title, photo, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_CREATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/myquestions`,
            { title, photo, description },
            config
        )

        dispatch({
            type: QUESTION_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateQuestion = (question) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_UPDATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/myquestions/${question._id}`,
            question,
            config
        )

        dispatch({
            QUESTION_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteQuestion = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_DELETE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/myquestions/${id}`,
            config
        )

        dispatch({
            type: QUESTION_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createAnswer = (id, answer) => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_CREATE_ANSWER_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/questions/${id}/answers`,
            answer,
            config
        )

        dispatch({
            type: QUESTION_CREATE_ANSWER_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: QUESTION_CREATE_ANSWER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
