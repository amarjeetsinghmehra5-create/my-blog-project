import axios from "axios";
import "../css/Forgot.css";
import { Link } from "react-router-dom";

function Forgot() {
  return (

    <div className="forgot-page">
      <h1>Blogs</h1>
      <form className="forms-1">
        <h2>Forget password</h2>
        <p id="para" >Please enter your email</p>
        <input className="yek-1" type="text" placeholder="Enter your email here" /><br />
       
        <button className="btn"> Send</button>
        <div className="last">
          <p>Remember your password? <Link to="/Login">Back to</Link></p>
        </div>

      </form>

    </div>
  );
}
export default Forgot;
