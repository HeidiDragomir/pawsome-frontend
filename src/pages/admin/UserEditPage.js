/* eslint-disable no-lonely-if */
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowLeft } from 'react-icons/bs'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../actions/types'

/* eslint-disable react/function-component-definition */

const UserEditPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

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
    }
    return (
        <section className="section-user-update">
            <div className="mb-5 ms-5">
                <Link to="/admin" className="link-black text-center">
                    <BsArrowLeft className="icon-back" />
                    Back
                </Link>
            </div>
            <div className="center">
                <h2>User</h2>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Name</label>
                    </div>
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Email</label>
                    </div>

                    <div className="form-group">
                        <input
                            id="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <span />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Admin</label>
                    </div>
                    <button type="submit" className="btn-black w-100">
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UserEditPage
