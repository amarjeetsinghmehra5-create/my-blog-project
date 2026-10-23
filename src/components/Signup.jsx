import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signup.css';

const API_URL = import.meta.env.VITE_API_URL;
export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault();
    setFeedback({ type: '', text: '' });

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    setIsSubmitting(true);

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          username: trimmedName,
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Unable to create your account."
        );
      }

      setFeedback({
        type: "success",
        text: data.message || "Account created successfully!",
      });

      setTimeout(() => navigate("/Login"), 700);

    } catch (error) {
      setFeedback({
        type: "error",
        text: error instanceof Error
          ? error.message
          : "Unable to reach the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="signup-page">
      <h1>Blogs</h1>
      <form className="forms-1" onSubmit={handleSignup}>
        <h2>Adventure starts here</h2>
        <p id="para">Create your account and start the adventure.</p>

        <label htmlFor="name">Full name</label>
        <input id="name" className="email-1" type="text" placeholder="Enter your full name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" minLength="2" required />

        <label htmlFor="email">Email</label>
        <input id="email" className="email-2" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="At least 8 characters" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength="8" required />

        <label className="check" htmlFor="terms">
          <input id="terms" type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} required />
          <span>I agree to the privacy policy and terms.</span>
        </label>

        {feedback.text && <p className={`form-message ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}

        <button className="btn" type="submit" disabled={isSubmitting || !acceptedTerms}>{isSubmitting ? 'Creating account…' : 'Sign up'}</button>
        <p className="last">Already have an account? <Link to="/Login">Log in</Link></p>
      </form>
    </main>
  );
}
