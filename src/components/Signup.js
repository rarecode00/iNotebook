import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../NoteItemCss.css"

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name : "" , email: "" , password: "" , Cpassword:""})
  const navigate = useNavigate("");

  const onChange = (e) =>{
     setcredentials({...credentials , [e.target.name] : [e.target.value]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password , Cpassword} = credentials;

    if(password.toString() !== Cpassword.toString()){
        console.log(password , Cpassword)
        props.showAlert("Password doesn't matched with confirm password" , "danger");
        return;
    }

    if(password.toString().length < 5){
      props.showAlert("Password must be at least 5 characters" , "danger");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name , email , password})
    });

    const json = await response.json();
    if(json.success){
    localStorage.setItem('token', json.authtoken);
    navigate('/login');
    props.showAlert("User Created Successfully" , "success")
    }else{
      props.showAlert("User Already exists" , "danger");
    }
};

return (
<div className="container">
  <h1 className="txt text-center">Create a new account</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-3 my-4 col-7 container">
      <input type="name" className="form-control" id="name" name = "name" placeholder="Username*" value={credentials.name} aria-describedby="emailHelp" onChange={onChange} required/>
    </div>
    <div className="mb-3 my-4 col-7 container">
      <input type="email" className="form-control" id="email" name="email"  placeholder="Email*" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required/>
    </div>
    <div className="mb-3 col-7 container">
      <input type="password" className="form-control" id="password" name="password"  placeholder="Password*" value={credentials.password} onChange={onChange} required/>
    </div>

    <div className="mb-3 col-7 container">
      <input type="password" className="form-control" id="password" name="Cpassword"  placeholder="Confirm Password*" value={credentials.Cpassword} onChange={onChange} required/>
    </div>
    <button type="submit" className="container add-button btn btn-primary my-2 d-grid gap-2 col-6 mx-auto">
      Sign up now
    </button>
  </form>
</div>
);
};

export default Signup;