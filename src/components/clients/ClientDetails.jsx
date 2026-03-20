import React, { useEffect, useState } from 'react'
import { findClientByClientId } from '../../services/ClientService'
import { getImage } from '../../services/UserService'
import { Card, Row, Col, Image, ListGroup } from 'react-bootstrap';

export const ClientDetails = ({ id }) => {
    const [clientData, setClientData] = useState(null)
    // const [doUpdate, setDoUpdate] = useState(update)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await findClientByClientId(id);
                setClientData(response);
                // console.log(response)
            } catch (error) {
                if (error.response?.status === 404 || error.message.includes("not found")) {
                    setClientData(null)
                }
            }
        }
        if(id) fetchData();
    }, [id])

    if (!clientData) {
        return <div className="text-center p-3">Loading client details...</div>;
    }

    return (
        <Card className="shadow-sm border-0">
            <Card.Header className="text-white text-center py-2" style={{ backgroundColor: '#526302' }}>
                <h5 className="mb-0">Client Details</h5>
            </Card.Header>
            <Card.Body>
                <Row className="align-items-center">
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <Image
                            src={getImage(clientData?.user?.uId)}
                            alt={clientData?.user?.uName}
                            roundedCircle
                            thumbnail
                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderColor: '#526302' }}
                        />
                    </Col>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Name:</strong> {clientData?.user?.uName}</ListGroup.Item>
                            <ListGroup.Item><strong>Gender:</strong> {clientData?.user?.gender}</ListGroup.Item>
                            <ListGroup.Item><strong>Age:</strong> {clientData?.age}</ListGroup.Item>
                            <ListGroup.Item><strong>Height:</strong> {clientData?.height} cm</ListGroup.Item>
                            <ListGroup.Item><strong>Weight:</strong> {clientData?.weight} kg</ListGroup.Item>
                            <ListGroup.Item><strong>Schedule:</strong> {clientData?.schedule}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
