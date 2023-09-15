import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Col, Form,Input,Row, TimePicker, message} from "antd";
import {showLoading, hideLoading} from "../../redux/features/alertSlice";
import dayjs from 'dayjs';
// import moment from "moment";
// const moment = require('moment');



const Profile = () => {
  const {user} = useSelector(state => state.user);
  const [doctor,setDoctor] = useState(null);
  const params = useParams();
  const dispatch =useDispatch();
  const navigate = useNavigate();
// update doc
const handleFinish =async(values)=>{
  console.log(values);
  try {
    dispatch(showLoading());
    const res = await axios.post('/api/v1/doctor/updateProfile', {...values, userId:user._id,
      timings:[
      //  moment(values.timings[0]).format('h:mm'),
      //  moment(values.timings[1]).format('h:mm'),
        dayjs(values.timings[0]).format('HH:mm'),
        dayjs(values.timings[1]).format('HH:mm'),

        
      ]
      
    },
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,   
      },
    });
    
    
    dispatch(hideLoading());
    if(res.data.success){
      message.success(res.data.message);
      navigate("/");
    }else{
      message.error(res.data.success);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
    message.error('Somthing went wrong');
  }
};
  const getDoctorInfo = async()=>{
   try {
    const res= await axios.post('/api/v1/doctor/getDoctorInfo',
      {userId: params.id},
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(res.data.success){
      setDoctor(res.data.data);
    }
   } catch (error) {
    console.log(error);
   }
  };
  useEffect(() =>{
    getDoctorInfo();
    //eslint-disable-next-line
  },[]);
  return (
    <Layout>
    <h1>Manage Profile</h1>
    {doctor && (
      <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
        ...doctor,
        timings:[
          // moment(doctor.timings[0],"HH:mm"),
          // moment(doctor.timings[1],"HH:mm"),

          dayjs(doctor.timings[0],'HH:mm'),
          dayjs(doctor.timings[1],'HH:mm'),
          

        ]
       
      }}>
    <h4> Personal Details :</h4>
    <Row gutter={20}>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "First Name" name="firstName" rules={[{required:true}]}>
    <Input type='text' placeholder='your first name' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Last Name" name="lastName" rules={[{required:true}]}>
    <Input type='text' placeholder='your last name' />
    </Form.Item>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Phone No" name="phone" rules={[{required:true}]}>
    <Input type='text' placeholder='your contact no' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Email" name="email" rules={[{required:true}]}>
    <Input type='email' placeholder='your email address' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Website" name="website" >
    <Input type='text' placeholder='your website' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Address" name="address" rules={[{required:true}]}>
    <Input type='text' placeholder='your clinic address' />
    </Form.Item>
    </Col>

    </Row>
    <h4> Professional Details :</h4>
    <Row gutter={20}>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Specialization" name="specialization" rules={[{required:true}]}>
    <Input type='text' placeholder='your specialization' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Experience" name="experience" rules={[{required:true}]}>
    <Input type='text' placeholder='your experience' />
    </Form.Item>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Fees Per Cunsaltation" name="feesPerCunsaltation" rules={[{required:true}]}>
    <Input type='number' placeholder='your fees' />
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}>
    <Form.Item label = "Timings" name="timings" rules={[{required:true}]}>
    <TimePicker.RangePicker format="HH:mm"/>
    </Form.Item>
    </Col>
    <Col xs={24} md={24} lg={8}></Col>
    <Col xs={24} md={24} lg={8}>
    <button className='btn btn-primary form-btn' type='submit'> Update </button>
    </Col>
    

    </Row>
    
    </Form>
    )}
    </Layout>
  );
};
export default Profile;
