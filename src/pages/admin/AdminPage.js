/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsXLg, BsCheckLg, BsPlus } from 'react-icons/bs'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'

// eslint-disable-next-line react/function-component-definition
const AdminPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector((state) => state.userDelete)
    const { success } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfo, success])

    const deleteHandler = (id) => {
        // eslint-disable-next-line no-alert, no-undef
        if (window.confirm('Are you sure you want to delete user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <section className="section-userlist">
            <div className="user-list-container">
                <div className="d-flex justify-content-between align-items">
                    <h2>User</h2>
                    <Link
                        className="btn-black my-3 text-decoration-none"
                        type="button"
                        to="/admin/user/create"
                    >
                        <BsPlus /> Create User
                    </Link>
                </div>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <Table className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td className="name">{user.name}</td>
                                <td>
                                    <a className="link-black" href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <IconContext.Provider
                                            // eslint-disable-next-line react/jsx-no-constructed-context-values
                                            value={{
                                                color: 'green',
                                            }}
                                        >
                                            <BsCheckLg />
                                        </IconContext.Provider>
                                    ) : (
                                        <IconContext.Provider
                                            // eslint-disable-next-line react/jsx-no-constructed-context-values
                                            value={{
                                                color: 'red',
                                            }}
                                        >
                                            <BsXLg />
                                        </IconContext.Provider>
                                    )}
                                </td>
                                <td className="action">
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <button
                                            type="button"
                                            className="me-5 fs-1 bg-transparent text-primary"
                                        >
                                            <FaEdit />
                                        </button>
                                    </LinkContainer>
                                    <button
                                        className="fs-1 bg-transparent text-danger"
                                        type="button"
                                        onClick={() => {
                                            deleteHandler(user._id)
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </section>
    )
}

export default AdminPage
