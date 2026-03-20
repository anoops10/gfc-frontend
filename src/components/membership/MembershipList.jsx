import React, { useEffect, useState } from 'react'
import { deleteMembership, listAllMembership } from '../../services/MemberShipService'
import { UpdateMembership } from './UpdateMembership'
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MembershipList = () => {
  
    const [membership, setMembership] = useState([])
    const[memState, setMemState] = useState(null)
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const isAdmin = role === 'Admin';

    useEffect(()=>{
        const fetchData = async()=>{
            let response = await listAllMembership()
            setMembership(response);
        } 
        fetchData();
    },[])

    const handleDelete = async (mId) => {
        if(window.confirm("Are you sure you want to delete this membership?")) {
            await deleteMembership(mId);
            setMembership(membership.filter(m => m.mId !== mId));
        }
    }
    
    return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-uppercase fw-bold" style={{ color: '#526302' }}>Membership List</h2>
        <Button 
            style={{ backgroundColor: '#526302', borderColor: '#526302', color: 'white' }}
            onClick={() => navigate('/admin/addmembership')}
        >
            Add Membership
        </Button>
      </div>
      <div className="table-responsive shadow-sm rounded">
      <Table striped bordered hover className="mb-0">
        <thead style={{ backgroundColor: '#526302', color: 'white' }}>
            <tr>
                {isAdmin && <th>Mem id</th>}
                <th>Membership Name</th>
                <th>Duration(Months)</th>
                <th>Price</th>
                <th>Description</th>
                {isAdmin && <th>Active</th>}
                {isAdmin && <th className="text-center">Action</th>}
            </tr>
        </thead>
        <tbody>
            {membership.map((mem)=>(
                <tr key={mem.mId} className="align-middle">
                    {isAdmin && <td>{mem.mId}</td>}
                    <td>{mem.mName}</td>
                    <td>{mem.duration}</td>
                    <td>{mem.price}</td>
                    <td>{mem.description}</td>
                    {isAdmin && <td>{mem.active? "active" : "inactive"}</td>}
                    {isAdmin && (
                        <td>
                            <div className="d-flex justify-content-center gap-2">
                                <Button variant="warning" size="sm" onClick={()=>{setMemState(mem.mId)}}>Update</Button>
                                <Button variant="danger" size="sm" onClick={()=>{handleDelete(mem.mId)}}>Delete</Button>
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
      </Table>
      </div>
      {memState&& (
        <Card className="shadow-sm mt-4">
            <Card.Header as="h5" style={{ backgroundColor: '#526302', color: 'white' }}>Update Membership</Card.Header>
            <Card.Body>
                <UpdateMembership mId={memState}/>
                <div className="text-end mt-3">
                    <Button variant="secondary" onClick={()=>setMemState(null)}>Close</Button>
                </div>
            </Card.Body>
        </Card>
      )}
    </Container>
  )
}