import "./main.css";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MainProps {
  session: any;
}

function Main(props: MainProps) {
  const history = useNavigate();
  const session = props.session;
  const goAhead = (): void => {
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
