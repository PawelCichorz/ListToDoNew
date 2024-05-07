import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login(props) {
  const history = useNavigate();
  const [email, Setemail] = useState("");
  const [password, Setpass] = useState("");
  const [error, Seterror] = useState("");

  // const [errop,Seterrop] = useState('')

  // // const auth =useContext(authContex)

  // // const emailValidate = (text) =>{
  // //     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
  // //     return re.test(text)

  // // }

  // // const passwordValidate = (text) =>{
  // // const low = /[a-z]/g
  // // const row = /[A-Z]/g
  // // const nums = /[1-9]/g

  // // if (low.test(text) && row.test(text) && nums.test(text)){
  // //     return true
  // // }else{
  // //     return false
  // // }
  // // }

  // // useEffect(() => {if
  // //     (emailValidate(email)){
  // // Seterror('')

  // // }else if ((email.length > 0) && (emailValidate(email) ===false )){
  // //     Seterror('Niepoprawny email')
  // // }
  // // else if(email.length == 0){
  // //     Seterror('')
  // // }

  // // },[email])
  // // useEffect(() => {if
  // //     (passwordValidate(pass)){
  // // Seterrop('')

  // // }else if ((pass.length > 0) && (passwordValidate(pass) ===false )){
  // //     Seterrop('Niepoprawny password')
  // // }
  // // else if(pass.length == 0){
  // //     Seterrop('')
  // // }

  // // },[pass])
  // // const Setol = props.Setol

  // // const fank = () =>{
  // //     Setol('Zarejetrowano Poprawnie !')
  // //     setTimeout(() => {
  // //         Setol('')
  // //     }, 1000);
  // // // }
  //     async function submit ()   {

  // await axios.post('http://localhost:3001/zarejestruj',{

  // })

  // fank()
  // history('/')

  // }

  async function handleSubmitL(e) {
    // Zapobiegaj domyślnej akcji formularza
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3031/logowanie", {
        email: email,
        password: password,
      });
      props.onLoginSuccess(response.config.data);
      console.log(response.config.data);
      history("/notes");
    } catch (error) {
      console.log(error.message);
      Seterror("Nieprawidłowy email lub hasło");
      // Tutaj możesz obsłużyć błędy rejestracji
    }
  }

  return (
    <form
      className="form"
      method="POST"
      onSubmit={handleSubmitL}
      //    action='http://localhost:3001/logowanie'
    >
      <div className="email">
        <label> Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => Setemail(e.target.value)}
        ></input>
      </div>

      <div className="password">
        <label> Hasło:</label>
        <input
          type="Password"
          name="password"
          value={password}
          onChange={(e) => Setpass(e.target.value)}
        ></input>
      </div>
      <p>{error}</p>
      <button>ZALOGUJ</button>
    </form>
  );
}

export default Login;
