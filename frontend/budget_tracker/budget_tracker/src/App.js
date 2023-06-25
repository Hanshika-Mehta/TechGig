import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import UserDashboard from "./components/UserDashboard";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const[loggedIn,setLoggedIn] = useState();

  

  const loadLocalStorage = () =>{
    let userData = localStorage.getItem("user_id")
    return userData;
  }

  // useEffect(()=>{
  //   const userData = loadLocalStorage();
    
  //   if(userData){
  //     setLoggedIn(true);
  //     setCurrentUser(true);
  //     // this.forceUpdate();
  //   }else{
  //     setLoggedIn(false);
  //     setCurrentUser(false);
  //   }
  
  //   },[loggedIn])

  useEffect(() => {
    const userData = loadLocalStorage();
    
    if(userData){
      setLoggedIn(true);
      setCurrentUser(true);
      // this.forceUpdate();
    }else{
      setLoggedIn(false);
      setCurrentUser(false);
    }
    
    
  }, [loggedIn]);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post("/api/register", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (res) {
        client
          .post("/api/login", {
            email: email,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
            console.log("resssss",res)
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('username', res.data.username);
            window.location.pathname="/user";
          });
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        console.log(res);
        setCurrentUser(true);
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('username', res.data.username);
        window.location.pathname="/user";
      });
  }



  if (currentUser) {
    return(

      <Router>
      
      <Routes>
        
        <Route path="/user" element={<UserDashboard />} />
        
      </Routes>
      
    </Router>
    )
    
    
  }
  else
  {

  return (
    <div>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>My Budget Tracker </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">
                Register
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {registrationToggle ? (
        <div className="center">
          <Form onSubmit={(e) => submitRegistration(e)}>
            <div style={{ margin: "40px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="center">
          <Form onSubmit={(e) => submitLogin(e)}>
            <div style={{ margin: "40px" }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
      }
}


export default App;
