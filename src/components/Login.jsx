// import "../css/Login.css";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const LOGIN_URL = "http://localhost:3000/api/user/login-user";
// export default function Login() {

//   const [emailorusername, setEmailorUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [feedback, setFeedback] = useState({ type: '', text: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   async function handleLogin(event) {
//     event.preventDefault();
//     setFeedback({ type: '', text: '' });

//     const trimmedValue = emailorusername.trim();
//     if (!trimmedValue || !password) {
//       setFeedback({ type: "error", text: "Email/Username and Password requried" })
//       return;
//     }

//     setIsSubmitting(true);

// try {
//   // UPDATED: POST API request
//   const response = await fetch(LOGIN_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },

//     // UPDATED: API payload
//     body: JSON.stringify({
//       email: trimmedValue,
//       password: password
//     })
//   });

//   const data = await response.json().catch(() => ({}));

//   if (!response.ok || data.success === false) {
//     throw new Error(data.message || "Login failed");
//   }

//   setFeedback({
//     type: "success",
//     text: data.message || "Login successful!"
//   });

//   // UPDATED: Navigate to your intended page
//   window.setTimeout(() => navigate("/"), 700);

// } catch (error) {
//   setFeedback({
//     type: "error",
//     text: error instanceof Error
//       ? error.message
//       : "Unable to reach the server. Please try again."
//   });
// } finally {
//   setIsSubmitting(false);
// }

// return (
//   <main className="login-page">
//     <h1>Blogs</h1>
//     <form className="forms-1" onSubmit={handleLogin}>

//       <h3>Welcome to Blogs!</h3>

//       <p id="para" >Please sign-in-to your account and start the adventure</p>

//       <label htmlFor="email-or-username">Email </label><br />

//       <input id="email-or-username" className="email-1" type="text" placeholder="Enter email or username" value={emailorusername} onChange={(event) => setEmailorUsername(event.target.value)} autoComplete="username" minLength="2" required />
//       <br />
//       <div className="xll">
//         <label htmlFor="password">Password</label><br />
//         <input id="password" className="password-1" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" minLength="8" required />
//       </div>

//       <div className="check">
//         <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} required />
//         <p>Remember Me</p>  <p id="for"><Link to="/Forgot">Forgot Password?</Link></p>
//       </div>
//       {feedback.text && <p className={`form-message ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
//       <button className="btn" type="Submit" disabled={isSubmitting || !acceptedTerms}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
//       <div className="last">
//         <p>New on our platform?</p> <p id="acc"><Link to="/">Create an account</Link></p>
//       </div>
//     </form>
//   </main>
//   );
//   }
// }




import axios from "axios";
import "../css/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_URL = "http://localhost:3000/api/user/login-user";

export default function Login() {
  const [emailorusername, setEmailorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setFeedback({ type: "", text: "" });

    const trimmedValue = emailorusername.trim();

    if (!trimmedValue || !password) {
      setFeedback({
        type: "error",
        text: "Email and password are required",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedValue,
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token =
        typeof data.data === "string"
          ? data.data
          : data.token ||
          data.accessToken ||
          data.data?.token ||
          data.data?.accessToken;

      if (!token) {
        throw new Error("Token not found in login response.");
      }

      localStorage.setItem("token", token);

      localStorage.setItem("userEmail", trimmedValue);

      setFeedback({
        type: "success",
        text: data.message || "Login successful!",
      });

      setTimeout(() => navigate("/blog"), 700);
    } catch (error) {
      setFeedback({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Unable to reach the server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  } // Function closed here


  return (
    <main className="login-page">
      <h1>Blogs</h1>

      <form className="forms-1" onSubmit={handleLogin}>
        <h3>Welcome to Blogs!</h3>

        <p id="para">
          Please sign-in-to your account and start the adventure
        </p>

        <label htmlFor="email-or-username">Email</label>
        <br />

        <input
          id="email-or-username"
          className="email-1"
          type="email"
          placeholder="Enter your email"
          value={emailorusername}
          onChange={(event) =>
            setEmailorUsername(event.target.value)
          }
          autoComplete="username"
          required
        />

        <br />

        <div className="xll">
          <label htmlFor="password">Password</label>
          <br />

          <input
            id="password"
            className="password-1"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="current-password"
            minLength={8}
            required
          />
        </div>

        <div className="check">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) =>
              setAcceptedTerms(event.target.checked)
            }
            required
          />

          <p>Remember Me</p>

          <p id="for">
            <Link to="/Forgot">Forgot Password?</Link>
          </p>
        </div>

        {feedback.text && (
          <p
            className={`form-message ${feedback.type}`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.text}
          </p>
        )}

        <button
          className="btn"
          type="submit"
          disabled={isSubmitting || !acceptedTerms}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="last">
          <p>New on our platform?</p>
          <p id="acc">
            <Link to="/">Create an account</Link>
          </p>
        </div>
      </form>
    </main>
  );
}
