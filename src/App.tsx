import React from "react";
import "./App.css";
import Notes from "./Components/Notes";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  function handleLoginSuccess(user: any) {
    setSession(user);
  }

  return (
    <Router>
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
            element={<Notes setSession={setSession} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
