import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModalDiv = styled.div<{ modalOpen: boolean }>`
  display: ${({ modalOpen }) => (modalOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 100px;
  margin: 0 auto;
  width: 300px;
  height: 350px;
  background-color: #332f2f;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const EditNoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
`;

const Label = styled.label`
  font-size: 15px;
  padding: 10px 25px;
  color: white;
`;

const Input = styled.input`
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: white;
  border-radius: 8px;
  padding: 7px 13px;
  color: black;
  margin: 7px;
`;

export { Container, ModalDiv, EditNoteDiv, Input, Button, Label };
