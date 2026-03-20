import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { showUserMembershipByumID } from '../../services/UserMembershipService';

export const ShowUserMembershipByUmId = () => {
    const { umId } = useParams();
    const [umData, setUmData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await showUserMembershipByumID(umId);
                console.log(response);
                setUmData(response);
            }
            catch (error) {
                if (error.response?.status === 404 || error.message.includes("not found")) {
                    setUmData([])
                }
            }
        }
        fetchData();
        // console.log(umData);
    }, [])
    return (
        <>
            <table>
                <thead>
                    <tr><td>Name:</td><td>{umData?.user?.uName}</td></tr>
                    <tr>
                        <td>Membership</td>
                        <td>StartDate</td>
                        <td>End Date</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr key={umData?.umId}>
                        <td>
                            {umData?.mem?.mName}
                        </td>
                        <td>
                            {umData?.startDate}
                        </td>
                        <td>
                            {umData?.endDate}
                        </td>
                        <td>
                            {umData?.status}
                        </td>
                    </tr>
                </tbody>
            </table>


        </>
    )
}