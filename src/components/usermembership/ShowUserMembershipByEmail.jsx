import React, { useEffect, useState } from "react";
import { deleteUserMembershipByumID, showUserMembershipByID } from "../../services/UserMembershipService";
import { getImage, getUserByEmailId, getUserById } from "../../services/UserService";
import { getMemById, listAllMembership } from "../../services/MembershipService";
import { AssignTrainer } from "../trainers/AssignTrainer";
import { Container, Table, Button } from "react-bootstrap";
import { findClientDataByUId } from "../../services/ClientService";
import { findTrainerByTId } from "../../services/TrainerService";

export const ShowUserMembershipByEmail = () => {
  const emailId = localStorage.getItem("emailId");
  const [userData, setUserData] = useState({});
  const [trainer, setTrainer] = useState(false);
  const [selectedUmId, setSelectedUmId] = useState(null);
  const [clientData, setClientData] = useState({});
  const [trainerData, setTrainerData] = useState({});
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await getUserByEmailId(emailId);
      setUserData(userResponse);
      const clientResponse = await findClientDataByUId(userResponse?.uId);
      setClientData(clientResponse);
      if(clientResponse?.trainer?.tId !== undefined){
        const trainerResponse = await findTrainerByTId(clientResponse?.trainer?.tId);
        setTrainerData(trainerResponse);
      }
    };
    fetchData();
  }, [emailId]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#526302" }}>Membership Details</h2>
      {userData?.userMembershipList?.length === 0 ? (
        <h3 className="text-center text-muted">No Membership available for this user</h3>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <Table striped bordered hover className="mb-0">
            <thead style={{ backgroundColor: "#526302", color: "white" }}>
              <tr><th>Membership</th><th>StartDate</th><th>End Date</th><th>Status</th>{role === "Admin" && <th>Actions</th>}</tr>
            </thead>
            <tbody>
              {userData.userMembershipList?.map((data) => (
                <tr key={data?.umId} className="align-middle">
                  <td>{data?.mem?.mName}</td>
                  <td>{data?.startDate}</td>
                  <td>{data?.endDate}</td>
                  <td>{data?.status}</td>
                  {role === "Admin" && (
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button variant="danger" size="sm" onClick={async() => { await deleteUserMembershipByumID(data?.umId); }}>Delete</Button>
                          <Button size="sm" style={{ backgroundColor: "#526302", borderColor: "#526302", color: "white" }} onClick={() => { setTrainer(true); setSelectedUmId(data?.umId); }}>Assign Trainer</Button>
                        </div>
                        {trainer && selectedUmId === data?.umId && (
                          <div className="mt-2 p-2 border rounded bg-light">
                            <AssignTrainer emailId={userData.emailId} mId={data?.mem?.mId} umId={data?.umId} />
                            <div className="text-end mt-2"><Button variant="secondary" size="sm" onClick={() => { setTrainer(false); setSelectedUmId(null); }}>Cancel</Button></div>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {role === "Member" && clientData && (
        <div className="mt-5">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#526302" }}>Personal Training Details</h2>
          <div className="table-responsive shadow-sm rounded">
            <Table striped bordered hover className="mb-0">
              <thead style={{ backgroundColor: "#526302", color: "white" }}>
                <tr><th colSpan={2}>Trainer Name</th><th>Gender</th><th>Schedule</th></tr>
              </thead>
              <tbody>
                <tr className="align-middle">
                  <td><img src={getImage(trainerData?.user?.uId)} alt={trainerData?.user?.uName} width="100" height="100" className="object-fit-cover" style={{ objectPosition: "top" }} /></td>
                  <td>{trainerData?.user?.uName}</td>
                  <td>{trainerData?.user?.gender}</td>
                  <td>{clientData.schedule}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};