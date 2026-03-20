import React, { useEffect, useState } from 'react'
import { getMemById, updateMembership } from '../../services/MembershipService'
import { Form, Button, Row, Col } from 'react-bootstrap';

export const UpdateMembership = ({mId}) => {
    const[memData, setMemData] = useState({mId:"", mName: "", duration: "", price: "", description: "", active: false })

    useEffect(()=>{
        const loadMemData = async()=>{
             try{
                        const data = await getMemById(mId)
                        // console.log(data);
                        setMemData(data);
                    }catch(error){
                        console.log(error)
                    }
        }
        loadMemData();
    },[mId])

   const handleChange = (e) => {
        const { name, value,type, checked } = e.target;
        setMemData((prev)=>({...prev,[name]: type === "checkbox"? checked:value}))
    }

        function onSubmit(e) {
            e.preventDefault();
            updateMembership(mId, memData);
            alert("Membership Updated Successfully");
        }
    

  return (
    <Form onSubmit={onSubmit}>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="mId">
                    <Form.Label>Membership Id</Form.Label>
                    <Form.Control type="text" name="mId" value={memData.mId} readOnly disabled />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="mName">
                    <Form.Label>Membership Name</Form.Label>
                    <Form.Control type="text" name="mName" value={memData.mName} onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duration (months)</Form.Label>
                    <Form.Control type="text" name="duration" value={memData.duration} onChange={handleChange} placeholder="Enter duration" />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={memData.price} onChange={handleChange} placeholder="Enter price" />
                </Form.Group>
            </Col>
        </Row>
        <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={memData.description} onChange={handleChange} placeholder="Enter description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="active">
            <Form.Check type="checkbox" label="Active" name="active" checked={memData.active} onChange={handleChange} />
        </Form.Group>
        <div className="text-center">
            <Button type="submit" style={{ backgroundColor: '#526302', borderColor: '#526302' }}>Update</Button>
        </div>
    </Form>
  )
}