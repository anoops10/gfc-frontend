import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUsers, getImage, getUserByEmailId } from '../../services/UserService';
import { activeMembersList } from '../../services/UserMembershipService';
import { UpdateUser } from './UpdateUser';
import { AssignTrainer } from '../trainers/AssignTrainer';
import { Container, Table, Button, Card, Form, Row, Col } from 'react-bootstrap';


export const ShowUsers = () => {
    const [showUsers, setShowUsers] = useState([]);
    const [email, setEmail] = useState(null)
    const [assignTrainerParams, setAssignTrainerParams] = useState(null);
    const [roleFilter, setRoleFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeUserIds, setActiveUserIds] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            let response = await getAllUsers();
            // console.log(response)
            setShowUsers(response);
            try {
                const activeMembers = await activeMembersList();
                const ids = new Set(activeMembers.map(m => m.user?.uId));
                setActiveUserIds(ids);
            } catch (error) {
                console.error("Error fetching active members", error);
            }
        }
        fetchData();
    }, [])

    const filteredUsers = showUsers.filter(user => {
        const isNotAdmin = (user.role || '').toLowerCase() !== 'admin';
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        const matchesEmail = user.emailId.toLowerCase().includes(searchQuery.toLowerCase());
        return isNotAdmin && matchesRole && matchesEmail;
    });

    const handleAssignTrainer = async (userEmail) => {
        try {
            const user = await getUserByEmailId(userEmail);
            const membershipList = await activeMembersList();
            // console.log(membershipList);
            const activeMembership = membershipList.find(um => um.user?.uId === user.uId);

            if (activeMembership) {
                setAssignTrainerParams({
                    emailId: user.emailId,
                    umId: activeMembership.umId,
                    mId: activeMembership.mem.mId
                });
                setEmail(null);
            } else {
                alert("User has no active membership.");
            }
        } catch (error) {
            console.error("Error fetching user details", error);
            alert("Failed to fetch user details.");
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4 text-uppercase fw-bold" style={{ color: '#526302' }}>User List</h2>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="Trainer">Trainer</option>
                        <option value="Member">Member</option>
                    </Form.Select>
                </Col>
                <Col md={9}>
                    <Form.Control
                        type="text"
                        placeholder="Search by Email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
            </Row>
            <div className="table-responsive shadow-sm rounded">
                <Table striped bordered hover className="mb-0">
                    <thead style={{ backgroundColor: '#526302', color: 'white' }}>
                        <tr>
                            <th>Sr no.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>D.O.B.</th>
                            <th>Created At</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.uId} className="align-middle">
                                <td>{user.uId}</td>
                                <td>
                                    <img
                                        src={getImage(user.uId)}
                                        alt={user.uName}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </td>
                                <td>{user.uName}</td>
                                <td>{user.emailId}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.gender}</td>
                                <td>{user.dob}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Button size="sm" style={{ backgroundColor: '#526302', borderColor: '#526302', color: 'white' }} onClick={() => { setEmail(user.emailId); setAssignTrainerParams(null); }}>Update</Button>
                                        {user.role === "Member" && activeUserIds.has(user.uId) && (
                                            <Button
                                                size="sm"
                                                variant="info"
                                                onClick={() => handleAssignTrainer(user.emailId)}
                                            >
                                                Assign Trainer
                                            </Button>
                                        )}
                                        <Button variant="danger" size="sm" onClick={async () => {await deleteUser(user.uId) }}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {email && (
                <Card className="shadow-sm mt-4">
                    <Card.Header as="h5" className="bg-warning">Update User</Card.Header>
                    <Card.Body>
                        <UpdateUser emailId={email} />
                        <div className="text-end mt-3">
                            <Button variant="secondary" onClick={() => { setEmail(null) }}>Close</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
            {assignTrainerParams && (
                <Card className="shadow-sm mt-4">
                    <Card.Header as="h5" className="text-white" style={{ backgroundColor: '#526302' }}>Assign Trainer</Card.Header>
                    <Card.Body>
                        <AssignTrainer
                            emailId={assignTrainerParams.emailId}
                            umId={assignTrainerParams.umId}
                            mId={assignTrainerParams.mId}
                        />
                        <div className="text-end mt-3">
                            <Button variant="secondary" onClick={() => { setAssignTrainerParams(null) }}>Close</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

        </Container>
    )
}