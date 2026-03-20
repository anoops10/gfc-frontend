import React, { useEffect, useState } from 'react'
import { findTrainerByMemId } from '../../services/TrainerService';
import { showUserMembershipByumID} from '../../services/UserMembershipService';
import { getUserByEmailId } from '../../services/UserService';
import { addClient } from '../../services/ClientService';
import { Form, Button } from 'react-bootstrap';

export const AssignTrainer = ({emailId, umId, mId}) => {
    const [trainerData, setTrainerData] = useState([]);
    const [umData, setUmData] = useState(null)
    const [userData, setUserData] = useState({});
    const[clientData, setClientData] = useState({user:"", trainer:"", height:"", weight:"", age:"", schedule:"", umem:""});
    const [tId, setTId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainerResponse = await findTrainerByMemId(mId)
                const umResponse = await showUserMembershipByumID(umId)
                const userResponse = await getUserByEmailId(emailId);
                
                setTrainerData(trainerResponse);
                setUmData(umResponse);
                setUserData(userResponse);
            } catch (error) {
                console.error("Error fetching data for assignment", error);
            }
        }
        fetchData();
    }, [mId, umId, emailId])


    function handleChange(e) {
        const selectedTId = e.target.value;
        setTId(selectedTId)
        setClientData({
            ...clientData,
            user:userData.uId,
            umem:umId
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!tId || tId === "0") {
            alert("Please select a trainer");
            return;
        }
        try {
            // await updateUserMembership(umId, tId, umData);
            await addClient(clientData, tId);
            alert("Trainer Assigned Successfully");
        } catch (error) {
            console.error("Error assigning trainer", error);
            alert("Failed to assign trainer");
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2 d-flex flex-column align-items-center" controlId="tId">
                <Form.Label className="fw-bold text-secondary small">Select Trainer</Form.Label>
                <Form.Select name="tId" value={tId} onChange={handleChange} size="sm" required style={{ borderColor: '#526302', width: '220px' }}>
                        <option value="">Choose trainer</option>
                        {trainerData.map((trainer) => (
                            <option key={trainer?.tId} value={trainer?.tId}>{trainer?.user?.uName}</option>
                        ))}
                </Form.Select>
            </Form.Group>
            <div className="text-center">
                <Button type="submit" size="sm" style={{ backgroundColor: '#526302', borderColor: '#526302', width: '100px' }}>
                    Assign
                </Button>
            </div>
        </Form>
    )
}