import React from "react";
import "./App.css";
import Notes from "./Components/Notes";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

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
              <Link to={"/"}>Cofnij</Link>
              <button onClick={logOut}>Wyloguj</button>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
