import React, { useState } from 'react'
import { addNewMembership } from '../../services/MemberShipService';
import { Container, Card, Form, Button, Row, Col, Image } from 'react-bootstrap';
import membershipBanner from '../../images/Untitleddesign.jpg';

export const AddMembership = () => {

    const [newMembership, setNewMembership] = useState({ mName: "", duration: "", price: "", description: "", active: false })

    const handleChange = (e) => {
        const { name, value,type, checked } = e.target;
        setNewMembership((prev)=>({...prev,[name]: type === "checkbox"? checked:value}))
    }

    function onSubmit(e) {
        e.preventDefault(); 
        addNewMembership(newMembership);
        alert("Membership added successfully");
    }

    const imagePanelStyle = {
        maxWidth: '360px',
        width: '100%',
        height: '420px'
    }

    const formPanelStyle = {
        maxWidth: '360px',
        width: '100%'
    }

    const labelStyle = {
        fontSize: '0.82rem'
    }

    const inputStyle = {
        fontSize: '0.8rem',
        padding: '0.22rem 0.5rem',
        minHeight: '30px'
    }

    const textareaStyle = {
        fontSize: '0.8rem',
        padding: '0.28rem 0.5rem'
    }

    return (
        <Container className="my-5">
            <Row className="align-items-center gx-lg-4 gy-4 justify-content-center">
                <Col md={5} className="mb-4 mb-md-0 pe-lg-4 d-flex justify-content-center">
                    <Image 
                        src={membershipBanner}
                        rounded 
                        style={{ ...imagePanelStyle, objectFit: 'cover' }}
                        alt="Membership"
                    />
                </Col>
                <Col md={5} className="ps-lg-4 d-flex justify-content-center">
            <Card className="shadow-lg border-0" style={formPanelStyle}>
                <Card.Header className="text-white text-center py-3" style={{ backgroundColor: '#526302' }}>
                    <h3 className="mb-0 fw-bold">Add Membership</h3>
                </Card.Header>
                <Card.Body className="p-2">
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-2" controlId="mName">
                            <Form.Label className="mb-1" style={labelStyle}>Membership Name</Form.Label>
                            <Form.Control size="sm" type="text" name="mName" value={newMembership.mName} onChange={handleChange} placeholder="Enter name" required style={inputStyle} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="duration">
                            <Form.Label className="mb-1" style={labelStyle}>Duration (months)</Form.Label>
                            <Form.Control size="sm" type="text" name="duration" value={newMembership.duration} onChange={handleChange} placeholder="Enter duration" required style={inputStyle} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="price">
                            <Form.Label className="mb-1" style={labelStyle}>Price</Form.Label>
                            <Form.Control size="sm" type="text" name="price" value={newMembership.price} onChange={handleChange} placeholder="Enter price" required style={inputStyle} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="description">
                            <Form.Label className="mb-1" style={labelStyle}>Description</Form.Label>
                            <Form.Control size="sm" as="textarea" rows={2} name="description" value={newMembership.description} onChange={handleChange} placeholder="Enter description" style={textareaStyle} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="active">
                            <div className="d-inline-flex align-items-center justify-content-between" style={{ width: '90px' }}>
                                <Form.Label className="mb-0" style={labelStyle}>Active</Form.Label>
                                <Form.Check
                                    className="mb-0"
                                    type="checkbox"
                                    name="active"
                                    checked={newMembership.active}
                                    onChange={handleChange}
                                    label=""
                                />
                            </div>
                        </Form.Group>
                        <div className="text-center">
                            <Button size="sm" type="submit" style={{ backgroundColor: '#526302', borderColor: '#526302', width: '120px' }}>Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
                </Col>
            </Row>
        </Container>
    )
}