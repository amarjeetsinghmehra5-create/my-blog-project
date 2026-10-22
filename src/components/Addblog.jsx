// import axios from "axios";
// import React from "react";
// import '../css/Addblog.css';
// import icon from "../assets/icon.png";
// import icon1 from "../assets/icon1.png";
// import icon2 from "../assets/icon2.png";
// import icon3 from "../assets/icon3.png";

// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Addblog() {

//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <>
//             <img className="img-2" src={icon} alt="blog" />
//             <div className="container">
//                 <h2 className="blog-123" >B l o g s</h2>
//                 <Link className="para-1" to="/">Home</Link>
//                 <Link className="oara-2" to="/Blog">My Blogs</Link>
//                 <Link className="lara-3" to="/Addblog">Add Blog</Link>


//                 <div className="profile-container">
//                     {/* Top Profile Button */}
//                     <button
//                         className="profile-btn"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <img src={icon2} alt="profile" />
//                         <span>Oliver William</span>
//                         <span className="arrow">⌄</span>
//                     </button>

//                     {/* Dropdown */}
//                     {isOpen && (
//                         <div className="dropdown">
//                             <div className="profile-info">
//                                 <img src={icon2} alt="profile" />
//                                 <span>Oliver William</span>
//                             </div>

//                             <Link className="menu-item" to="/Addblogprofile">
//                                 👤
//                                 <span>My Profile</span>
//                             </Link>

//                             <button className="logout-btn">
//                                 Logout&nbsp; ↪
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//                     <h1 className="blog-qw-qw" >Add Blog</h1>
//                     <p className="joly-je" >Title</p>
//                     <input className="input-one" type="text" placeholder="Write here" />
//                     <p className="joly-je" >Description</p>
//                     <input className="input-two" type="text" placeholder="Write here" />

//                     <p className="joly-je" >Upload Image</p>
//                     <img className="icon-image" src={icon3} alt="icon" />
//                     <input className="input-three" type="text"  />
//                     <button className="btnmet-q" >Save</button>


//             <div className="collection-footer-qw">

//                 <div className="footer-para">
//                     <img className="img-1" src={icon} alt="blog" />
//                     <h2 className="foot" >B l o g s</h2>
//                     <p id="wee" >Most developer friendly & highly</p>
//                     <p id="qww" >customisable Admin Dashboard Template</p>
//                     <img className="image-wee1" src={icon1} alt="" />
//                 </div>

//                 <div className="rooter">
//                     <p id="swerc" >Company</p>
//                     <p>About us</p>
//                     <p>Blogs</p>
//                 </div>

//                 <div className="footer-footer">
//                     <p id="sern" >Quick Links</p>
//                     <p>Terms of service</p>
//                     <p>Policy Privacy</p>
//                     <p>Get un touch</p>
//                 </div>

//                 <div className="container-footer1">
//                     <p id="rrt" >Contact</p>
//                     <p id="rrt" >us</p>
//                     <p>info@companyname.com</p>
//                     <p>(123)456-789</p>
//                     <p>1234 Street Name, State,</p>
//                     <p>Zip Code</p>
//                 </div>
//             </div>
//             <div className="last">
//                 <p>2025</p>
//                 <p id="lasted" >Blogs</p>
//                 <p>,All rights reserved</p>
//             </div>

//         </>

//     )
// }
// export default Addblog;








import React, { useState, useEffect } from "react";
import axios from "axios";

import "../css/Addblog.css";

import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";

import { Link, useNavigate } from "react-router-dom";

// Backend API URL
const API_URL = "http://localhost:3000/api/user";

function Addblog() {
    const [isOpen, setIsOpen] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    // API states
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [message, setMessage] = useState("");

    // GET: Fetch all blogs
    const fetchBlogs = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/get-all-blogs`
            );

            const result = response.data;

            const blogList = Array.isArray(result)
                ? result
                : result.blogs ||
                result.data?.blogs ||
                result.data ||
                [];

            setBlogs(Array.isArray(blogList) ? blogList : []);
        } catch (error) {
            console.error(
                "Fetch blogs error:",
                error.response?.data || error.message
            );
        } finally {
            setBlogsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // POST: Add a new blog

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // 🟢 CHANGE 1: Login wala token read karo
        const token = localStorage.getItem("token")?.trim();

        if (!token || token === "undefined" || token === "null") {
            setMessage("Token missing. Please login again.");
            navigate("/login");
            return;
        }

        if (!image) {
            setMessage("Please select an image.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            console.log("Selected image:", image);
            console.log("Is File:", image instanceof File);
            formData.append("file", image);

            const token = localStorage.getItem("token");

            // console.log("Token exists:", !!token);
            // console.log("Token length:", token?.length);
            // console.log("Token parts:", token?.split(".").length);
            // 🟢 CHANGE 2: Token backend ko bhejo
            const response = await axios.post(
                `${API_URL}/add-blog`,
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            console.log("Blog response:", response.data);
            setMessage("Blog added successfully!");

            setTitle("");
            setDescription("");
            setImage(null);
            e.target.reset();

            navigate("/Myblogs");

        } catch (error) {
            console.error(
                "Add blog error:",
                error.response?.status,
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                setMessage("Token invalid or expired. Please login again.");
            } else if (error.response?.status === 403) {
                setMessage("You are not authorized to add this blog.");
            } else {
                setMessage(
                    error.response?.data?.message ||
                    "Failed to add blog. Check backend API."
                );
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Navbar */}
            <img className="img-2" src={icon} alt="Blogs" />

            <div className="container">
                <h2 className="blog-12345">B l o g s</h2>

                <Link className="para-1" to="/blog">
                    Home
                </Link>

                <Link className="oara-2" to="/myblogs">
                    My Blogs
                </Link>

                <Link className="lara-3" to="/Addblog">
                    Add Blog
                </Link>

                {/* Profile dropdown */}
                <div className="profile-container">
                    <button
                        type="button"
                        className="profile-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img src={icon2} alt="Profile" />
                        <span>Oliver William</span>
                        <span className="arrow">⌄</span>
                    </button>

                    {isOpen && (
                        <div className="dropdown">
                            <div className="profile-info">
                                <img src={icon2} alt="Profile" />
                                <span>Oliver William</span>
                            </div>

                            <Link
                                className="menu-item"
                                to="/Addblogprofile"
                            >
                                👤 <span>My Profile</span>
                            </Link>

                            <button
                                type="button"
                                className="logout-btn"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsOpen(false);
                                    setMessage("Logged out. Please login again.");
                                }}
                            >
                                Logout&nbsp; ↪
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Blog Form */}
            <form
                className="addblog-form"
                onSubmit={handleSubmit}
            >
                <h1 className="blog-qw-qw">Add Blog</h1>

                <p className="joly-je">Title</p>

                <input
                    className="input-one"
                    type="text"
                    placeholder="Write title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <p className="joly-je">Description</p>

                <textarea
                    className="input-two"
                    placeholder="Write description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <p className="joly-je">Upload Image</p>

                <img
                    className="icon-image"
                    src={icon3}
                    alt="Upload"
                />

                <input
                    className="input-three"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setImage(e.target.files?.[0] || null)
                    }
                    required
                />

                <button
                    className="btnmet-q"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>

                {message && (
                    <p role="status" aria-live="polite">
                        {message}
                    </p>
                )}
            </form>

            {/* 🟢 Saved Blogs Cards */}


            {/* Footer */}
            <div className="collection-footer-qw">
                <div className="footer-para">
                    <img
                        className="img-1"
                        src={icon}
                        alt="Blogs"
                    />

                    <h2 className="foot">B l o g s</h2>

                    <p id="wee">
                        Most developer friendly &amp; highly
                    </p>

                    <p id="qww">
                        customisable Admin Dashboard Template
                    </p>

                    <img
                        className="image-wee1"
                        src={icon1}
                        alt=""
                    />
                </div>

                <div className="rooter">
                    <p id="swerc">Company</p>
                    <p>About us</p>
                    <p>Blogs</p>
                </div>

                <div className="footer-footer">
                    <p id="sern">Quick Links</p>
                    <p>Terms of service</p>
                    <p>Policy Privacy</p>
                    <p>Get in touch</p>
                </div>

                <div className="container-footer1">
                    <p id="rrt">Contact</p>
                    <p>us</p>
                    <p>info@companyname.com</p>
                    <p>(123)456-789</p>
                    <p>1234 Street Name, State,</p>
                    <p>Zip Code</p>
                </div>
            </div>

            <div className="last">
                <p>2025</p>
                <p id="lasted">Blogs</p>
                <p>, All rights reserved</p>
            </div>
        </>
    );
}

export default Addblog;
