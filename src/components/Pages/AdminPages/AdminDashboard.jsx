import React, { useEffect, useState } from 'react'
import { countActiveMembers, activeMembersList } from '../../../services/UserMembershipService';
import { Card, Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { findTrainer } from '../../../services/TrainerService';
import { getImage } from '../../../services/UserService';

export const AdminDashboard = () => {
  const [activeList, setActiveList] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [showActiveList, setShowActiveList] = useState(false);
  const [trainersList, setTrainersList] = useState([])
  const [showTrainerList, setShowTrainerList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(()=>{
const fetchData = async()=>{
    try{
        const countResponse = await countActiveMembers();
        const activeListResponse = await activeMembersList();
        const trainerResponse = await findTrainer()
        console.log(trainerResponse)
        setActiveList(activeListResponse)
        setActiveCount(countResponse)
        setTrainersList(trainerResponse)
    }catch(error){
        console.error("error fetching data")
    }
  }
    fetchData();
  },[])

  const getAssignedTrainer = (userId) => {
    return trainersList.find(trainer => 
      trainer.clientList?.some(client => client.user?.uId === userId)
    );
  };

  const filteredActiveList = activeList.filter(membership => 
    (membership.user?.emailId || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="my-5">
        
    <h2>Welcome, Admin!</h2>
      <Row className="mb-4 justify-content-center gap-4">
        <Col md={4}>
          <Card 
            className="text-center shadow-sm h-100" 
            style={{ cursor: 'pointer', backgroundColor: '#526302', color: 'white' }}
            onClick={() => {
              setShowActiveList(!showActiveList);
              setShowTrainerList(false);
            }}
          >
            <Card.Body>
              <Card.Title>Active Members</Card.Title>
              <Card.Text className="display-4 fw-bold">
                {activeCount}
              </Card.Text>
              <small>Click to view details</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card 
            className="text-center shadow-sm h-100" 
            style={{ cursor: 'pointer', backgroundColor: '#526302', color: 'white' }}
            onClick={() => {
              setShowTrainerList(!showTrainerList);
              setShowActiveList(false);
            }}
          >
            <Card.Body>
              <Card.Title>Trainers</Card.Title>
              <Card.Text className="display-4 fw-bold">
                {trainersList.length}
              </Card.Text>
              <small>Click to view details</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showActiveList && (
        <Card className="shadow-sm">
          <Card.Header style={{ backgroundColor: '#526302', color: 'white' }}>
            <h5 className="mb-0">Active Members List</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            {filteredActiveList && filteredActiveList.length > 0 ? (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Membership</th>
                      <th>End Date</th>
                      <th>Trainer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActiveList.map((membership) => {
                      const assignedTrainer = getAssignedTrainer(membership.user?.uId);
                      return (
                      <tr key={membership.umId}>
                        <td>{membership.user?.uId}</td>
                        <td>
                          <img 
                            src={getImage(membership.user?.uId)} 
                            alt={membership.user?.uName} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                          />
                        </td>
                        <td>{membership.user?.uName}</td>
                        <td>{membership.user?.emailId}</td>
                        <td>{membership.user?.phone}</td>
                        <td>{membership.mem?.mName}</td>
                        <td>{membership.endDate}</td>
                        <td>
                          {assignedTrainer ? (
                            <span className="fw-bold text-success">{assignedTrainer.user?.uName}</span>
                          ) : (
                            <span className="text-muted">No Trainer Assigned</span>
                          )}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p className="text-center my-3">No active members found.</p>
            )}
          </Card.Body>
        </Card>
      )}

      {showTrainerList && (
        <Card className="shadow-sm mt-4">
          <Card.Header style={{ backgroundColor: '#526302', color: 'white' }}>
            <h5 className="mb-0">Trainers List</h5>
          </Card.Header>
          <Card.Body>
            {trainersList && trainersList.length > 0 ? (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Clients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainersList.map((trainer) => (
                      <tr key={trainer.tId}>
                        <td>{trainer.tId}</td>
                        <td>
                          <img 
                            src={getImage(trainer.user?.uId)} 
                            alt={trainer.user?.uName} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} 
                          />
                        </td>
                        <td>{trainer.user?.uName}</td>
                        <td>{trainer.user?.emailId}</td>
                        <td>{trainer.user?.phone}</td>
                        <td>
                          {trainer.clientList && trainer.clientList.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {trainer.clientList.map((client) => (
                                <span key={client.clientId} className="badge bg-light text-dark border">{client.user?.uName}</span>
                              ))}
                            </div>
                          ) : <span className="text-muted">No Clients</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p className="text-center my-3">No trainers found.</p>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}
