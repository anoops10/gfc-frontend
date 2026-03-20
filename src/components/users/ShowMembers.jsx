import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers, getImage } from '../../services/UserService';

import { Link } from 'react-router-dom'
import { ShowUserMembershipByEmail } from '../usermembership/ShowUserMembershipByEmail';
import { UpdateUser } from './UpdateUser';


export const ShowMembers = () => {
    const [showUsers, setShowUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            let response = await getAllUsers();
            console.log(response)    
            setShowUsers(response);
        }
        fetchData();
    }, [])

    return (
        <>
            <div>user list</div>
            <table style={{ border: "1px solid black" }}>
                <thead >
                    <tr>
                        <th>
                            Sr no.
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Email Id
                        </th>
                        <th>
                            Phone
                        </th>
                        <th>
                            Role
                        </th>
                        <th>
                            Gender
                        </th>
                        <th>
                            D.O.B.
                        </th>
                        <th>
                            Created At
                        </th>
                        <th colSpan={4}></th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers
                        .filter(user => user.role === "Member")
                        .map((user) => (
                            <tr key={user.uId}>
                                <td>{user.uId}</td>
                                <td>{user.uName}</td>
                                <td>{user.emailId}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.gender}</td>
                                <td>{user.dob}</td>
                                <td>{user.created_at}</td>
                                 <td><img
                                                                src={getImage(user.uId)} // calls your PetService function
                                                                alt={user.uName}
                                                                width="100"
                                                            /></td>
                                {/* <td><Link to={`/edituser/${user.uId}`}>UPDATE</Link></td> */}
                                <td><button onClick={() => { setUserId(user.uId) }}>Update</button></td>
                                <td><button onClick={() => { deleteUser(user.uId) }}>Delete</button></td>
                                {/* <td><button onClick={() => { setUserId(user.uId) }}>Membership details</button></td> */}
                                {/* <td><Link to={`/showusermembershipbyuid/${user.uId}`}>Membership</Link></td>  */}
                            </tr>
                        ))}
                </tbody>
            </table>
            {userId && (
                <div>
                    <UpdateUser uId={userId} />

                    <ShowUserMembershipById uId={userId} />
                    <button onClick={() => { setUserId(null) }}>Clear</button>
                </div>
            )}
            {/* {userId && (
                <div>
                    <UpdateUser uId={userId} />
                    <button onClick={() => { setUserId(null) }}>Clear</button>
                </div>)} */}
        </>
    )
}