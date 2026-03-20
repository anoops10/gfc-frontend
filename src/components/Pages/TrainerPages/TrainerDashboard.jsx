import React, { useEffect, useState } from 'react'
import { getImage, getUserByEmailId, getUserById } from '../../../services/UserService'
import { Button, Container, Card, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { UpdateUser } from '../../users/UpdateUser';

const TrainerDashboard = () => {
  const emailId = localStorage.getItem('emailId');
  // console.log(userId)
  const [showUpdate, setShowUpdate] = useState(false);
  const [user, setUser] = useState(null);
  // const userId = 1; // Replace with actual user ID logic (e.g., from auth context or props)
  const fetchUser = async () => {
        try {
          const userData = await getUserByEmailId(emailId);
          // console.log(userData);
          setUser(userData);
        } catch (error) {
          setUser(null);
        }
      };
    useEffect(() => {
      fetchUser();
    }, [emailId]);
  return (
    <Container className="my-5">
      {user ? (
        <>
        <Card className="shadow-lg border-0">
          <Card.Header className="text-white text-center py-3" style={{ backgroundColor: '#526302' }}>
            <h2 className="mb-0 fw-bold">Welcome, {user.uName}!</h2>
          </Card.Header>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-4 mb-md-0">
                <div className="p-2 border rounded-circle d-inline-block" style={{ borderColor: '#526302' }}>
                  <Image
                    src={getImage(user.uId)}
                    alt={user.uName}
                    roundedCircle
                    fluid
                    style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
              <Col md={8}>
                <h4 className="mb-4 text-muted border-bottom pb-2">Profile Details</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Email</span>
                    <span>{user.emailId}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Phone</span>
                    <span>{user.phone}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Role</span>
                    <span>{user.role}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Gender</span>
                    <span>{user.gender}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Date of Birth</span>
                    <span>{user.dob}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0">
                    <span className="fw-bold text-secondary">Address</span>
                    <span>{user.address || "N/A"}</span>
                  </ListGroup.Item>
                </ListGroup>
                <div className="mt-4 text-end">
                  <Button 
                    style={{ backgroundColor: '#526302', borderColor: '#526302', color: 'white' }}
                    onClick={() => setShowUpdate(!showUpdate)}
                  >
                    {showUpdate ? "Hide Update Form" : "Update Profile"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

              {showUpdate && (
                <div className="mt-4 p-4 bg-white rounded shadow-lg">
                  <UpdateUser emailId={emailId} onUpdateSuccess={() => {
                    fetchUser();
                    setShowUpdate(false);
                  }} />
                </div>
              )}
        </>
      ) : (
        <div className="text-center mt-5">
          <h3 className="text-muted">Loading user information...</h3>
        </div>
      )}
    </Container>
  )
}

export default TrainerDashboard
