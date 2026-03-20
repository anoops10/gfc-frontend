import React, { useEffect, useState } from 'react'
import { findClientByClientId, updateClient } from '../../services/ClientService'
import { getImage } from '../../services/UserService'
import { Form, Button, Card, Row, Col, Image } from 'react-bootstrap';

export const UpdateClient = ({ id, onUpdateSuccess }) => {
    const [clientData, setClientData] = useState({age:"", height:"", weight:"", schedule:""})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await findClientByClientId(id);
                setClientData(response);
            } catch (error) {
                console.error(error);
            }
        }
        if(id) fetchData();
    }, [id])

    function handleChange(e){
        const{name, value} = e.target;
        setClientData({...clientData,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const payload = {
                age: clientData?.age !== "" && clientData?.age !== undefined ? Number(clientData.age) : null,
                height: clientData?.height !== "" && clientData?.height !== undefined ? Number(clientData.height) : null,
                weight: clientData?.weight !== "" && clientData?.weight !== undefined ? Number(clientData.weight) : null,
                schedule: clientData?.schedule ?? "",
            };

            await updateClient(id, payload);
            alert("Client updated successfully");
            if(onUpdateSuccess) onUpdateSuccess();
        } catch (error) {
            console.error("Error updating client", error);
            alert("Failed to update client");
        }
    }
    return (
        <Card className="shadow-sm border-0">
            <Card.Header className="text-white text-center py-2" style={{ backgroundColor: '#526302' }}>
                <h5 className="mb-0">Update Client</h5>
            </Card.Header>
            <Card.Body>
                <div className="text-center mb-4">
                     <Image
                        src={getImage(clientData?.user?.uId)}
                        alt={clientData?.user?.uName}
                        roundedCircle
                        thumbnail
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <h5 className="mt-2">{clientData?.user?.uName}</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" value={clientData?.age || ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group className="mb-3" controlId="height">
                                <Form.Label>Height (cm)</Form.Label>
                                <Form.Control type="number" name="height" value={clientData?.height || ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="weight">
                                <Form.Label>Weight (kg)</Form.Label>
                                <Form.Control type="number" name="weight" value={clientData?.weight || ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                             <Form.Group className="mb-3" controlId="schedule">
                                <Form.Label>Schedule</Form.Label>
                                <Form.Control type="text" name="schedule" value={clientData?.schedule || ''} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-grid">
                        <Button type="submit" style={{ backgroundColor: '#526302', borderColor: '#526302' }}>
                            Update
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}