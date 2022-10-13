import axios from 'axios'

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
    PET_UPDATE_REQUEST,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_FAIL,
    PET_DELETE_REQUEST,
    PET_DELETE_SUCCESS,
    PET_DELETE_FAIL,
} from './types'

export const listPets = () => async (dispatch) => {
    try {
        dispatch({
            type: PET_LIST_REQUEST,
        })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/pets`)

        dispatch({
            type: PET_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PET_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyPets = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_MY_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/pets/mypets`, config)

        dispatch({
            type: PET_MY_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PET_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const petDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/pets/${id}`, config)

        dispatch({
            type: PET_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PET_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createPet =
    (name, gender, age, size, about, photo, place) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PET_CREATE_REQUEST,
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
                `${process.env.REACT_APP_API_URL}/api/pets/mypets`,
                { name, gender, age, size, about, photo, place },
                config
            )

            dispatch({
                type: PET_CREATE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PET_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const updatePet = (pet) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_UPDATE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/pets/mypets/${pet._id}`,
            pet,
            config
        )

        dispatch({
            PET_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PET_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deletePet = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PET_DELETE_REQUEST,
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
            `${process.env.REACT_APP_API_URL}/api/pets/mypets/${id}`,
            config
        )

        dispatch({
            type: PET_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PET_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
