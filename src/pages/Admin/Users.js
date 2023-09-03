import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'

const Users = () => {
    const [users, setUsers] = useState([])

    // Get All Users
    const getAllUsers = async () => {
        try {
            const {data} = await axios.get('/api/v1/auth/all-users');
            setUsers(data.users);
        } catch (error) {
            // console.log(error);
            toast.error('Something Went Wrong');
        }
    }
    //lifecycle method
    useEffect(()=>{
        getAllUsers();
    },[])

    return (
        <Layout title={'Dashboard - All Users'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>  
                        <div className="boder shadow">
                            <table className='table'> 
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Phone</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Action</th>
                                    
                                </tr>
                            </thead>
                            {
                                users?.map((u,i) => {
                                    return(
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{u?.name}</td>
                                                    <td>{u?.email}</td>
                                                    <td>{u?.phone}</td>
                                                    <td>{u?.address}</td>
                                                    <td>
                                                        <button className="btn btn-danger ms-2">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            
                                        </>  
                                    )
                                })
                            }  
                            </table>  
                        </div>   
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default Users
