import React from "react";
import "./App.css";
import Notes from "./Components/Notes";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const Button = styled.button`
  background-color: grey;
  border-radius: 8px;
  padding: 7px 13px;
  margin-top: 5px;
`;

function App() {
  const [session, setSession] = useState(null);
  const history = useNavigate();
  function handleLoginSuccess(user: any) {
    setSession(user);
  }

  const logOut = () => {
    setSession(null);
    history("/");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main session={session} />}></Route>
        <Route path={`/rejestracja`} element={<Register />}></Route>

        <Route
          path={`/logowanie`}
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        ></Route>
        <Route
          path="/notes"
          element={
            <>
              <Notes day={"m"} dayTitle={"Poniedziałek"} />
              <Notes day={"t"} dayTitle={"Wtorek"} />
              <Notes day={"w"} dayTitle={"Środa"} />
              <Notes day={"t"} dayTitle={"Czwartek"} />
              <Notes day={"th"} dayTitle={"Piątek"} />
              <Notes day={"s"} dayTitle={"Sobota"} />
              <Notes day={"su"} dayTitle={"Niedziela"} />
              <Div>
                <Link to={"/"}>Cofnij</Link>
                <Button onClick={logOut}>Wyloguj</Button>
              </Div>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
