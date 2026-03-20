import React, { useEffect, useState } from 'react'
import { listAllMembership } from '../../services/MembershipService';
import { getAllUsers } from '../../services/UserService';
import { addNewTrainer, findTrainer } from '../../services/TrainerService';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

export const AddTrainer = () => {


    const [userData, setUserData] = useState([]);
    const [memData, setMemData] = useState([]);
    const [trainerData, setTrainerData] = useState({ uId: "", mId: "", expYears: "", bio: "" })
    const [existingTrainer, setExistingTrainer] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await getAllUsers();
            const memResponse = await listAllMembership();
            const trainerResponse = await findTrainer()
            setUserData(userResponse);
            // console.log(userResponse)
            // console.log(memResponse)
            setMemData(memResponse);
            setExistingTrainer(trainerResponse);
        }
        fetchData();
    }, [])

    function handleChange(e){
        const{name, value}= e.target;
        setTrainerData({...trainerData,[name]:value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await addNewTrainer(trainerData);
            alert("Trainer details added successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to add trainer details");
        }
    }

    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card.Header className="text-white text-center py-3" style={{ backgroundColor: '#526302' }}>
                    <h3 className="mb-0 fw-bold">Add Trainer Details</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="uId">
                                    <Form.Label>Select User (Trainer Role)</Form.Label>
                                    <Form.Select name="uId" value={trainerData.uId} onChange={handleChange} required>
                                        <option value="">Select User</option>
                                        {userData
                                            .filter(user => user.role === "Trainer" && !existingTrainer.some(t => t.user?.uId === user.uId))
                                            .map((user) => (
                                                <option key={user.uId} value={user.uId}>{user.uName} ({user.emailId})</option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="mId">
                                    <Form.Label>Specialisation (Membership Type)</Form.Label>
                                    <Form.Select name="mId" value={trainerData.mId} onChange={handleChange} required>
                                        <option value="">Select Specialisation</option>
                                        {memData
                                            .filter(user => user.active)
                                            .map((user) => (
                                                <option key={user.mId} value={user.mId}>{user.mName}</option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="expYears">
                            <Form.Label>Experience (Years)</Form.Label>
                            <Form.Control type="number" name="expYears" value={trainerData.expYears} onChange={handleChange} placeholder="Enter experience in years" required min="0" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control as="textarea" rows={4} name="bio" value={trainerData.bio} onChange={handleChange} placeholder="Enter trainer bio" required />
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" style={{ backgroundColor: '#526302', borderColor: '#526302' }} size="lg">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}