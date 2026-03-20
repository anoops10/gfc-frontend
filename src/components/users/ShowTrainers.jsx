import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers, getImage } from '../../services/UserService';

import { Link } from 'react-router-dom'
import { TrainerDetails } from '../trainers/TrainerDetails';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { UpdateUser } from './UpdateUser';
import { findTrainer } from '../../services/TrainerService';


export const ShowTrainers = () => {
    const [showTrainer , setShowTrainer] = useState([]);
    // const [selectedTrainer, setSelectedTrainer] = useState(null);
    // const [userId, setUserId] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        const fetchData = async () => {
            const response = await findTrainer();
            // let response = await getAllUsers();
            // console.log(response)    
            setShowTrainer(response);
        }
        fetchData();
    }, [])

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#526302' }}>Trainer List</h2>
            <div className="table-responsive shadow-sm rounded">
            <Table striped bordered hover className="mb-0">
                <thead style={{ backgroundColor: '#526302', color: 'white' }}>
                    <tr>
                        {/* {role !== "Admin" && <th>Image</th>} */}
                        {/* <th>Sr no.</th> */}
                        <th>Name</th>
                        {/* {role === "Admin" && <th>Email Id</th>} */}
                        {/* {role === "Admin" && <th>Phone</th>} */}
                        {/* <th>Role</th> */}
                        <th>Gender</th>
                        <th>Specialisation</th>
                        <th>Experiance</th>
                        {/* {role === "Admin" && <th>D.O.B.</th>} */}
                        {/* {role === "Admin" && <th>Created At</th>} */}
                        <th>Image</th>
                        {/* <th className="text-center">{role === "Admin" ? "Actions" : "Trainer Details"}</th> */}
                    </tr>
                </thead>
                <tbody>
                    {showTrainer
                        // .filter(user => user.role === "Trainer")
                        .map((trainer) => (
                            <tr key={trainer.tId} className="align-middle">
                                {/* <td><img
                                    src={getImage(trainer.user?.uId)}
                                    alt={trainer.user?.uName}
                                    width="100"
                                    height="100"
                                    className="object-fit-cover"
                                    style={{ objectPosition: 'top' }}
                                /></td> */}
                                {/* <td>{trainer.user?.uId}</td> */}
                                <td>{trainer.user?.uName}</td>
                                {/* {role === "Admin" && <td>{user.emailId}</td>}
                                {role === "Admin" && <td>{user.phone}</td>} */}
                                {/* <td>{trainer.user?.role}</td> */}
                                <td>{trainer.user?.gender}</td>
                                <td>{trainer.mem?.mName}</td>
                                <td>{trainer.expYears}</td>
                                {/* {role === "Admin" && <td>{user.dob}</td>}
                                {role === "Admin" && <td>{user.created_at}</td>} */}
                                <td><img
                                    src={getImage(trainer.user?.uId)}
                                    alt={trainer.user?.uName}
                                    width="100"
                                    height="100"
                                    className="object-fit-cover"
                                    style={{ objectPosition: 'top' }}
                                /></td>
                                {/* <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        {role === "Admin" && <Button variant="warning" size="sm" onClick={() => { setUserId(user.uId) }}>Update</Button>}
                                        {role === "Admin" && <Button variant="danger" size="sm" onClick={async () => {await deleteUser(user.uId) }}>Delete</Button>}
                                        <Button size="sm" style={{ backgroundColor: '#526302', borderColor: '#526302', color: 'white' }} onClick={() => { setSelectedTrainer(user.uId) }}>Details</Button>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                </tbody>
            </Table>
            </div>
            {/* <div className="mt-4">
                {selectedTrainer && (
                    <Card className="shadow-sm mb-4">
                        <Card.Header as="h5" className="text-white" style={{ backgroundColor: '#526302' }}>Trainer Details</Card.Header>
                        <Card.Body>
                            <TrainerDetails uId={selectedTrainer} />
                            <div className="text-end mt-3">
                                <Button variant="secondary" onClick={() => { setSelectedTrainer(null) }}>Close</Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}
                {userId && (
                    <Card className="shadow-sm mb-4">
                        <Card.Header as="h5" className="bg-warning">Update Trainer</Card.Header>
                        <Card.Body>
                            <UpdateUser uId={userId} />
                            <div className="text-end mt-3">
                                <Button variant="secondary" onClick={() => { setUserId(null) }}>Close</Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div> */}
        </Container>
    )
}