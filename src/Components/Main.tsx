import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  background-color: grey;
  border-radius: 8px;
  padding: 7px 13px;
  margin: 10px;
`;
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
    <Container>
      {session ? (
        <>
          <div> Jesteś Zalogowany</div>
          <Button onClick={goAhead}>Przejdz do notatek</Button>
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
    </Container>
  );
}

export default Main;
