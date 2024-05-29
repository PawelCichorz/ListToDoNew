import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 270px;
  border: solid 2px grey;
`;

const DayofWeek = styled.p`
  font-weight: 600;
  color: red;
`;

const OneFetchNotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-bottom: solid 1px grey;
`;

const TimeandDesc = styled.div`
  display: flex;
`;
const Time = styled.div`
  margin-right: 10px;
`;

const DivWithButton = styled.div`
  display: flex;
  padding-bottom: 5px;
  padding-top: 5px;
`;

const ButtonEdit = styled.button`
  background-color: grey;
  border-radius: 8px;
  margin-right: 5px;
  padding: 7px 13px;
`;

const ButtonDelete = styled.button`
  background-color: grey;
  border-radius: 8px;
  padding: 7px 13px;
`;

const ButtonAddNote = styled.button`
  background-color: white;
  border-radius: 8px;
  padding: 7px 13px;
  color: grey;
  margin: 5px;
`;

export {
  Container,
  ButtonAddNote,
  ButtonDelete,
  ButtonEdit,
  DivWithButton,
  Time,
  TimeandDesc,
  OneFetchNotes,
  DayofWeek,
};
