import React, { useEffect, useState } from 'react'
import { showAllPayments } from '../../services/PaymentService'
import { Container, Table, Form, Row, Col, Card } from 'react-bootstrap';

const ShowPayment = () => {
    const[payData, setPayData] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const payResponse = await showAllPayments();
                setPayData(payResponse);
            } catch (error) {
                console.error("Error fetching payments", error);
            }
        }
        fetchData()
    },[])

    const filteredPayments = payData?.filter(payment => 
        payment.user?.emailId?.toLowerCase()?.includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Container className="my-5">
        <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#526302' }}>Payment List</h2>
        
        <Row className="mb-4 justify-content-center">
            <Col md={6}>
                <Form.Control
                    type="text"
                    placeholder="Search by Member Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="shadow-sm"
                    style={{ borderColor: '#526302' }}
                />
            </Col>
        </Row>

        <Card className="shadow-sm border-0">
            <Card.Body className="p-0">
                <div className="table-responsive">
                    <Table striped bordered hover className="mb-0">
                        <thead style={{ backgroundColor: '#526302', color: 'white' }}>
                            <tr>
                                <th>Payment ID</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.paymentId} className="align-middle">
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.user?.uName}</td>
                                        <td>{payment.user?.emailId}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.createdAt}</td>
                                        <td>{payment.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No payments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    </Container>
  )
}

export default ShowPayment
