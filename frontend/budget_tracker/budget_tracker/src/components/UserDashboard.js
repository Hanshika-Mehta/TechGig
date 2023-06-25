import Budget from "../components/Budget";
import Remaining from "../components/Remaining";
import ExpenseTotal from "../components/ExpenseTotal";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { AppProvider } from "../context/AppContext";
import { useState } from "react";
import { client } from "../App";

const UserDashboard = () =>
{
    const [currentUser, setCurrentUser] = useState(true);

    function submitLogout(e) {
        e.preventDefault();
        client.post("/api/logout", { withCredentials: true }).then(function (res) {
          setCurrentUser(false);
          localStorage.removeItem('user_id');
          window.location.pathname="";
        });
      }
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>My Budget Tracker</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: 20}}>
                    Hello , {localStorage.getItem("username")}
                </Navbar.Text>
              <Navbar.Text>
                <form onSubmit={(e) => {submitLogout(e);setCurrentUser(false);}}>
                  <Button type="submit" variant="light">
                    Log out
                  </Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <AppProvider>
            <div style={{ margin: "40px" }}>
              <div className="container">
                <h1 className="mt-3">My Budget Planner</h1>
                
                    <Budget />
                  
                <h3 className="mt-3">Expenses</h3>
                <div className="row mt-3">
                  <div className="col-sm">
                    <ExpenseList />
                  </div>
                </div>
                <h3 className="mt-3">Add Expense</h3>
                <div className="mt-3">
                  <div className="col-sm">
                    <AddExpenseForm />
                  </div>
                </div>
              </div>
            </div>
          </AppProvider>
        </div>
        </>
    )
}

export default UserDashboard;