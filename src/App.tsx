import React from "react";
import Notes from "./Components/Notes";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import * as S from "./AppStyles";

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
        <Route path="/" element={<Main session={session} />} />
        <Route path="/rejestracja" element={<Register />} />
        <Route
          path="/logowanie"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/notes"
          element={
            <>
              <Notes day={"m"} dayTitle={"Poniedziałek"} />
              <Notes day={"t"} dayTitle={"Wtorek"} />
              <Notes day={"w"} dayTitle={"Środa"} />
              <Notes day={"th"} dayTitle={"Czwartek"} />
              <Notes day={"f"} dayTitle={"Piątek"} />
              <Notes day={"s"} dayTitle={"Sobota"} />
              <Notes day={"su"} dayTitle={"Niedziela"} />
              <S.Div>
                <Link to={"/"}>Cofnij</Link>
                <S.Button onClick={logOut}>Wyloguj</S.Button>
              </S.Div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
