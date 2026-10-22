import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import User from './components/Apiconcepts.jsx'
// import Harsh from './components/login.jsx';
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Forgot from "./components/Forgot.jsx";
import Bloglogin from './components/Bloglogin.jsx';
import Blog from './components/Blog.jsx';
import Addblog from './components/Addblog.jsx';
import Addblogprofile from './components/Addblogprofile.jsx';
import Myblogs from './components/Myblogs.jsx';
import Editblog from './components/Editblog.jsx';
// import Apiform from './components/Apiform.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addblog" element={<Addblog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/bloglogin" element={<Bloglogin />} />
        <Route path="/myblogs" element={<Myblogs />} />
        <Route path="/addblogprofile" element={<Addblogprofile />} />
        <Route path="/editblog" element={<Editblog />} />
        <Route path="/addprofile" element={<Addblogprofile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



















//  try {
//       const response = await fetch(LOGIN_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // `name` is required by the live API; aliases preserve compatibility.
//         body: JSON.stringify({
//           email: trimmedValue,
//           password: password
//         }),

//         const data = await response.json().catch(() => ({}));
//         if(!response.ok || data.success === false) {
//           throw new Error(data.message || 'Login failed');
//     }

//       setFeedback({ type: 'success', text: data.message || 'Login successfully!' });
//     window.setTimeout(() => navigate('/Forgot'), 700);
//   } catch (error) {
//     setFeedback({ type: 'error', text: error instanceof Error ? error.message : 'Unable to reach the server. Please try again.' });
//   } finally {
//     setIsSubmitting(false);
//   }
// }