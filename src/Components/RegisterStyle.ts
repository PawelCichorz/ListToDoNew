import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const EmailDiv = styled.div`
  margin-bottom: 20px;
`;
const PasswordDiv = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 10px 25px;
  margin-left: 8px;
`;

const Button = styled.button`
  background-color: grey;
  border-radius: 8px;
  padding: 7px 13px;
`;

export { Container, EmailDiv, PasswordDiv, Input, Button };
