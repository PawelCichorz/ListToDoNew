import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as S from "./MainStyles";

type MainProps = {
  session: any;
};

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 45px;
  color: red;
`;

function Main({ session }: MainProps) {
  const history = useNavigate();

  const goAhead = (): void => {
    history("/notes");
  };

  return (
    <S.Container>
      {session ? (
        <>
          <div> Jesteś Zalogowany</div>
          <S.Button onClick={goAhead}>Przejdz do notatek</S.Button>
        </>
      ) : (
        <>
          <StyledLink to={"/logowanie"} className="logDiv">
            LOGOWANIE
          </StyledLink>
          <StyledLink to={"/rejestracja"} className="registerDiv">
            REJESTRACJA
          </StyledLink>
        </>
      )}
    </S.Container>
  );
}

export default Main;
