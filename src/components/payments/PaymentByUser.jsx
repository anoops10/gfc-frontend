import React, { useEffect, useState } from 'react'
import { findPaymentBYUId } from '../../services/PaymentService'
import { getUserByEmailId } from '../../services/UserService'
import { Container, Table, Card } from 'react-bootstrap';

const PaymentByUser = () => {
    const emailId = localStorage.getItem('emailId')
    const [paymentList, setPaymentList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUserByEmailId(emailId);
                // console.log(userResponse)
                if (userResponse?.uId) {
                    const payResponse = await findPaymentBYUId(userResponse.uId);
                    // console.log(payResponse)
                    setPaymentList(payResponse);
                }
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        }
        fetchData()
    }, [emailId])
    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#526302' }}>Payment History</h2>
            {paymentList.length > 0 ? (
                <div className="table-responsive shadow-sm rounded">
                    <Table striped bordered hover className="mb-0">
                        <thead style={{ backgroundColor: '#526302', color: 'white' }}>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentList.map((pay) => (
                                <tr key={pay.paymentId} className="align-middle">
                                    <td>{pay.createdAt}</td>
                                    <td>{pay.amount}</td>
                                    <td>{pay.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </div>
            ) : (
                <Card className="text-center p-4 shadow-sm border-0">
                    <h5 className="text-muted mb-0">No payment history found.</h5>
                </Card>
            )}
        </Container>
    )
}

export default PaymentByUser
