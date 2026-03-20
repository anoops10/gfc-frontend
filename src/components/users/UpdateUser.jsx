import React, { useEffect, useState } from 'react'
import { getUserByEmailId, getUserById, updateUserData } from '../../services/UserService';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

export const UpdateUser = ({emailId, uId, onUpdateSuccess}) => {
    const [userData, setUserData] = useState({uName: "", phone: "", address:"" })
    const [sendData, setSendData] = useState({uName: "", phone: "", address: "" })

    useEffect(()=>{
        const loadUserData = async()=>{
        try{
            let data;
            if (emailId) {
                data = await getUserByEmailId(emailId);
            } else if (uId) {
                data = await getUserById(uId);
            } else {
                return;
            }

            setUserData(data);
            setSendData({
                uName: data.uName,
                phone: data.phone,
                address: data.address
            });
        }catch(error){
            console.log(error)
        }
        }
        loadUserData();
    },[emailId, uId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSendData({ ...sendData, [name]: value });
    }

    async function onSubmit(e) {
        e.preventDefault();
        await updateUserData(userData.emailId, sendData);
        alert("User Updated Successfully");
        if (onUpdateSuccess) onUpdateSuccess();
    }


    return (
        <Card className="shadow-sm border-0">
            <Card.Header className="text-white text-center py-2" style={{ backgroundColor: '#526302' }}>
                <h4 className="mb-0">Update Profile</h4>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="uName">
                                <Form.Label className="fw-bold text-secondary">Name</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="uName"
                                    value={sendData.uName}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label className="fw-bold text-secondary">Phone</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="text"
                                    name="phone"
                                    value={sendData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="fw-bold text-secondary">Address</Form.Label>
                        <Form.Control
                            size="sm"
                            as="textarea"
                            rows={3}
                            name="address"
                            value={sendData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" variant="warning" className="px-4" size="sm">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}