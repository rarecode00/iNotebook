import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../NoteItemCss.css"

const Login = (props) => {
  const [credentials, setcredentials] = useState({cemail : "" , cpassword: ""})
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credentials.cemail, password:credentials.cpassword})
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
        localStorage.setItem('token', json.authtoken);
        localStorage.setItem('Name', json.name);
      //  props.handleName(json.name);
        navigate('/');
        props.showAlert("Welcome back to Inotebook" , "success")

    }else{
        props.showAlert("Please Login with valid credentials" , "danger")
    }
  };

  const onchange = (e) =>{
     setcredentials({...credentials , [e.target.name] : [e.target.value]})
  }

  return (
    <div className="container my-4">
      <h1 className="txt text-center">Login to Your Account</h1>
      <form onSubmit={handleSubmit} className = "my-3">
        <div className="mb-3 col-7 container">
          <input
            type="email"
            className="form-control"
            id="email"
            name="cemail"
            aria-describedby="emailHelp"
            placeholder="Email*"
            value = {credentials.cemail}
            onChange={onchange}
            required
          />
        </div>
        <div className="mb-3 col-7 container">
          <input
            type="password"
            className="form-control"
            id="password"
            name="cpassword"
            placeholder="Password*"
            value = {credentials.cpassword}
            onChange={onchange}
            required
          />
        </div>
        <button type="submit" className="container add-button btn btn-primary my-2 d-grid gap-2 col-6 mx-auto">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
