import React, { useEffect, useState } from "react";
import { getUserByEmailId, getAllUsers } from "../../services/UserService";
import { listAllMembership } from "../../services/MembershipService";
import { addNewUserMembership } from "../../services/UserMembershipService";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { processPayment } from "../../services/PaymentButtonService";
import { addPayments } from "../../services/PaymentService";
import { sendMail } from "../../services/EmailService";

export const AddUserMembership = () => {
  const emailId = localStorage.getItem("emailId");
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem("role");
  const [memData, setMemData] = useState([]);
  const [userMemData, setUserMemData] = useState({
    uId: "",
    mId: "",
    tId: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(");
  const [userSearch, setUserSearch] = useState("");
  const [memSearch, setMemSearch] = useState("");
  const [mail, setMail] = useState({to:"", subject:"", msg:""})
  const [plan, setPlan] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const memResponse = await listAllMembership();
      setMemData(memResponse);
      if (role === "Admin") {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } else {
        const userResponse = await getUserByEmailId(emailId);
        setUserData(userResponse);
        if (userResponse && userResponse.uId) {
          setUserMemData(prev => ({ ...prev, uId: userResponse.uId }));
        }
      }
    };
    fetchData();
  }, [emailId]);

  function handleMembershipChange(e) {
    const selectedId = e.target.value;
    setUserMemData({ ...userMemData, mId: selectedId });
    if (selectedId !== "" && selectedId != "0") {
      const selectedMem = memData.find((mem) => mem.mId == selectedId);
      setPlan(selectedMem.mName)
      setPrice(selectedMem ? selectedMem.price : 0);
    } else {
      setPrice(0);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserMemData({ ...userMemData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const paymentResult = await processPayment(price);
      alert("Registration and payment successful!");
      await addNewUserMembership(userMemData);
      alert("Membership added successfully!");
      await addPayments({
        user: userMemData.uId,
        amount: price,
        description: userMemData.status
      })
      const mailData = {
        ...mail,
        to: userData.emailId,
        msg: `Dear ${userData.uName},\n\nYour membership has been activated.\n\nPlan: ${plan}\nStart Date: ${userMemData.startDate}\nEnd Date: ${userMemData.endDate}\nAmount Paid: Rs.${price}\n\nBest Regards,\nGym Management`,
        subject: "Membership Purchase Confirmation"
      };
      setMail(mailData);
      await sendMail(mailData);
    } catch (err) {
      console.error("Payment flow failed:", err.message);
      setError(err.message);
    }
  }

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0">
        <Card.Header className="text-white text-center py-3" style={{ backgroundColor: '#526302' }}>
          <h3 className="mb-0 fw-bold">Buy Membership</h3>
        </Card.Header>
        <Card.Body className="p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formUserName">
                  <Form.Label>User Name</Form.Label>
                  {role === "Admin" ? (
                    <>
                      <Form.Control type="text" placeholder="Search Member Email" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="mb-2" />
                      <Form.Select value={userMemData.uId} onChange={(e) => { const uid = e.target.value; setUserMemData({ ...userMemData, uId: uid }); const u = users.find(user => user.uId == uid); setUserData(u || {}); setMail({...mail, to: u ? u.emailId : ""}) }}>
                        <option value="">Select User</option>
                        {users.filter(u => u.role === "Member" && u.emailId.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                          <option key={u.uId} value={u.uId}>{u.uName} ({u.emailId})</option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    <Form.Control type="text" value={userData.uName || ""} readOnly disabled className="bg-light" />
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formMembership">
                  <Form.Label>Select Membership Plan</Form.Label>
                  <Form.Control type="text" placeholder="Search Membership Plan" value={memSearch} onChange={(e) => setMemSearch(e.target.value)} className="mb-2" />
                  <Form.Select name="mId" value={userMemData.mId} onChange={handleMembershipChange} required>
                    <option value="">Select Membership</option>
                    {memData.filter(mem => mem.active && mem.mName.toLowerCase().includes(memSearch.toLowerCase())).map((mem) => (
                      <option key={mem.mId} value={mem.mId}>{mem.mName} - {mem.duration} months - Rs.{mem.price}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" name="startDate" value={userMemData.startDate} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="endDate" value={userMemData.endDate} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" name="status" value={userMemData.status} onChange={handleChange} placeholder="e.g. Active" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" value={`${price}`} className="bg-light fw-bold" onChange={(e) => { setPrice(e.target.value) }} />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: '#526302', borderColor: '#526302' }}>Confirm & Pay</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
