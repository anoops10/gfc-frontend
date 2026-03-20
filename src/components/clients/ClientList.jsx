import React, { useEffect, useState } from 'react'
import { findClientByTrainer } from '../../services/ClientService';
import { getUserByEmailId, getImage } from '../../services/UserService';
import { findTrainerByUserId } from '../../services/TrainerService';
import { Container, Table, Card } from 'react-bootstrap';
import { ClientDetails } from './ClientDetails';
import { UpdateClient } from './UpdateClient';

const ClientList = () => {
    const emailId = localStorage.getItem('emailId')
    const [clientList, setClientList]= useState([]);
    const[update, setUpdate] = useState(false)
    const[details, setDetails] = useState(false)
    const[client, setClient]= useState(0)


    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const userResponse = await getUserByEmailId(emailId);
                // console.log(userResponse)
                const trainerResponse = await findTrainerByUserId(userResponse.uId);
                if (trainerResponse && trainerResponse.tId) {
                    const clientResponse = await findClientByTrainer(trainerResponse.tId)
                    setClientList(clientResponse);
                }
            } catch (error) {
                console.error("Error fetching client list", error);
            }
        }
        fetchData();
    },[emailId])
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#526302' }}>My Clients</h2>
            {clientList.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                    <Table striped bordered hover className="mb-0">
                        <thead style={{ backgroundColor: '#526302', color: 'white' }}>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Schedule</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientList.map((client) => (
                                <tr key={client.clientId} className="align-middle">
                                    <td>
                                        <img 
                                            src={getImage(client.user?.uId)} 
                                            alt={client.user?.uName} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                                        />
                                    </td>
                                    <td>{client.user?.uName}</td>
                                    <td>{client.user?.emailId}</td>
                                    <td>{client.user?.phone}</td>
                                    <td>{client.age}</td>
                                    <td>{client.user?.gender}</td>
                                    <td>{client.schedule}</td>
                                    <td>
                                        <button onClick={()=>{setUpdate(!update);setClient(client.clientId);}}>Update</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{setDetails(!details);setClient(client.clientId);}}>Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Card className="text-center p-4 shadow-sm border-0">
                    <h5 className="text-muted mb-0">No clients assigned yet.</h5>
                </Card>
            )}
            {details&& (
                <div className="mt-4">
                    <ClientDetails id={client}/>
                </div>
            )
            }
            {update&& (
                <div className="mt-4">
                    <UpdateClient id={client} onUpdateSuccess={() => setUpdate(false)}/>
                </div>
            )
            }
        </Container>
  )
}

export default ClientList
