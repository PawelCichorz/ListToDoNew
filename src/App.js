import React from "react";
import "./App.css";
import Notes from "./Components/Notes";
import Register from "./Components/Register";
import Main from "./Components/Main";
import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [session, setSession] = useState(null);
  const history = useHistory();
  function handleLoginSuccess(user) {
    setSession(user);
  }
  console.log(session);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact={true}
            path="/"
            element={<Main session={session} />}
          ></Route>
          <Route
            exact={true}
            path={`/rejestracja`}
            element={<Register />}
          ></Route>

          <Route
            exact={true}
            path={`/logowanie`}
            element={
              <Login onLoginSuccess={handleLoginSuccess} session={session} />
            }
          ></Route>
          <Route
            exact={true}
            path="/notes"
            element={
              <Notes
                setSession={setSession}
                session={session}
                history={history}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
