/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsXLg } from 'react-icons/bs'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { FcCheckmark } from 'react-icons/fc'
import Message from '../../components/message/Message'
import Loader from '../../components/loader/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import './adminPage.css'

// eslint-disable-next-line react/function-component-definition
const AdminPage = () => {
    const [message, setMessage] = useState('')
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
        dispatch(deleteUser(id))
        setMessage('User deleted.')
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            window.location.reload()
        }, 2000)
    }

    return (
        <section className="admin-section">
            <div className="admin-container">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <h2 className="fw-bold fs-1">Users Info</h2>
                    <Button
                        className="btn-main-color my-3 text-decoration-none"
                        type="button"
                        href="/admin/user/create"
                    >
                        Create User
                    </Button>
                </div>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                <Table responsive="lg" hover>
                    <thead>
                        <tr className="tbl-row-align">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className="tbl-row-align" key={user._id}>
                                <td>{user._id}</td>
                                <td className="name">{user.name}</td>
                                <td>
                                    <a className="link-black" href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <FcCheckmark className="fw-bold fs-2" />
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
                                    <Button
                                        href={`/admin/user/${user._id}/edit`}
                                        type="button"
                                        variant="secondary"
                                        className="mx-1"
                                    >
                                        <AiOutlineEdit className="fs-4" />
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className="mx-1"
                                        type="button"
                                        onClick={() => {
                                            deleteHandler(user._id)
                                        }}
                                    >
                                        <AiOutlineDelete className="fs-4" />
                                    </Button>
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
