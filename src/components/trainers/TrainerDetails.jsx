import React, { useEffect, useState } from 'react'
import { findTrainerByUserId } from '../../services/TrainerService'
import { Link, useParams } from 'react-router-dom'
import { getMemById, listAllMembership } from '../../services/MembershipService';
import { findClientByTrainer } from '../../services/ClientService';
import { ClientDetails } from '../clients/ClientDetails';
import { UpdateClient } from '../clients/UpdateClient';
import { Table, Button, Card } from 'react-bootstrap';

export const TrainerDetails = ({ uId }) => {
  const [trainerData, setTrainerData] = useState({})
  const [clientId, setClientId] = useState(null)
  const [update, setUpdate] = useState(false)
  const [details, setDetails] = useState(true)
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findTrainerByUserId(uId)
        setTrainerData(response);
      } catch (error) {
        if (error.response?.status === 404 || error.message.includes("not found")) {
          setTrainerData([])
        }
      }
    }
    fetchData();
  }, [uId])

  return (
    <div style={{ backgroundColor: '#526302', padding: '20px', borderRadius: '8px' }}>
      {trainerData.length === 0 ? (
        <h3 className="text-white text-center">Trainer data not available for this user</h3>
      ) : (
      <Card className="shadow-sm">
        <Card.Header as="h4" className="bg-dark text-white text-center">
          {trainerData?.user?.uName} Details
        </Card.Header>
        <Card.Body>
        <Table striped bordered hover responsive className="mb-0">
          <tbody>
            <tr><td className="fw-bold">Name</td><td>{trainerData?.user?.uName}</td></tr>
            <tr><td className="fw-bold">Specialisation</td><td>{trainerData?.mem?.mName}</td></tr>
            <tr><td className="fw-bold">Experience</td><td>{trainerData?.expYears} Years</td></tr>
            <tr><td className="fw-bold">Bio</td><td>{trainerData?.bio}</td></tr>
            {role === "Admin" && <tr><td className="fw-bold">Clients</td><td><div className="d-flex flex-wrap gap-2">{(trainerData?.clientList?.map((client) => (<Button key={client.clientId} variant="outline-primary" size="sm" onClick={() => { setClientId(client.clientId) }}>{client?.user?.uName}</Button>)))}</div></td></tr>}
          </tbody>
        </Table>
        </Card.Body>
      </Card>)}
      {clientId && details && (<div className="mt-4 p-3 bg-white rounded shadow-sm"><ClientDetails id={clientId} /><Button variant="warning" className="mt-3" onClick={()=>{setUpdate(true); setDetails(false);}}>Update Client</Button></div>)}
      {clientId && update && (<div className="mt-4 p-3 bg-white rounded shadow-sm"><UpdateClient id={clientId} onUpdateSuccess={() => {setUpdate(false); setDetails(true);}}/><Button variant="info" className="mt-3" onClick={()=>{setUpdate(false); setDetails(true);}}>Back to Details</Button></div>)}
    </div>
  )
}