import "./main.css";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

function Main(props) {
  const history = useNavigate();
  const session = props.session;
  const goAhead = () => {
    history("/notes");
  };

  return (
    <div className="mainDiv">
      {session ? (
        <>
          <div> Jesteś Zalogowany</div>
          <button onClick={goAhead}>Przejdz do notatek</button>
        </>
      ) : (
        <>
          <Link to={"/logowanie"} className="logDiv">
            LOGOWANIE
          </Link>
          <Link to={"/rejestracja"} className="registerDiv">
            REJESTRACJA{" "}
          </Link>
        </>
      )}
    </div>
  );
}

export default Main;
