import React, { useState } from 'react'
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import {useSignupUserMutation} from '../services/appApi'
import "./Signup.css";
import { Link,useNavigate } from "react-router-dom";
import botImg from '../assets/bot.jfif';




const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupUser,{isLoading,error}]=useSignupUserMutation();
  const navigate=useNavigate();



  //image upload states
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert(`Max file size is 1mb`)
    }
    else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }


  async function uploadImg(){
    const data=new FormData()
    data.append('file',image);
    data.append('upload_preset','astj0qgt');
  try{
    setUploadingImg(true);
    let res=await fetch('https://api.cloudinary.com/v1_1/dt10tibk5/image/upload',{
      method:'post',
      body:data
    })
    const urlData=await res.json();
    setUploadingImg(false);
    return urlData.url
  }
  catch(error){
    setUploadingImg(false);
    console.log(error);
  }
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    if(!image) return alert("Please Upload your profile picture");
    const url=await uploadImg(image);
    console.log(url);
    //Signup the user.
    signupUser({name,email,password,picture:url}).then(({data})=>{
      if(data){
        console.log(data);
        navigate("/chat")
      }
    });

  }
  
  


  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form
            style={{
              width: "80%",
              maxWidth: 500,
            }}
            onSubmit={handleSignup}
          >
            <br />
            <h1 className='text-center'>Create account</h1>
            <div className='signup-profile-pic_container'>
              <img src={imagePreview ||botImg} className='signup-profile-pic' alt="signup-profile-pic" />
              <label htmlFor="image-upload" className='image-upload-label'>
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input type="file" id="image-upload" hidden accept='image/png, image/jpeg' onChange={validateImg} />
            </div>
              {error&&<p className="alert alert-danger">{error.data}</p>}

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="usere@example.com" onChange={(e) => setName(e.target.value)} value={name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" placeholder="Your email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>

            <Button variant="primary" type="submit">
              {uploadingImg || isLoading? 'Signing you up...' : 'Signup'}
            </Button>
            <div className="py-4"><p className="text-center">Already have a account ? <Link to="/login">Login</Link></p></div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>

  )
}

export default Signup