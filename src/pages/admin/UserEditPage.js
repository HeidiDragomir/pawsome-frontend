/* eslint-disable no-lonely-if */
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../actions/types'
import './adminPage.css'

/* eslint-disable react/function-component-definition */

const UserEditPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState()

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success } = userUpdate

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin')
        } else {
            // eslint-disable-next-line no-underscore-dangle
            if (!user.name || user._id !== id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, id, user, success, navigate])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
        setMessage('User updated.')
    }
    return (
        <section className="user-edit-section flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <div className="mt-5 ms-5">
                <Link to="/admin" className="link-black">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="user-create-container form-container bg-white rounded-5 border">
                <h2 className="my-4">User Info</h2>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="success">{message}</Message>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="form-admin">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>Admin</label>
                            <input
                                className="input-admin"
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-form mt-3 w-100">
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UserEditPage
