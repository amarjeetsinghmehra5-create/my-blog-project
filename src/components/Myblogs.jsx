import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/Myblogs.css';
import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import { NavLink, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Blog() {

    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setUserEmail(localStorage.getItem("userEmail") || "My Account");
    }, []);


    // NEW: Logged-in user ke blogs fetch karo
    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setErrorMessage("Please login to view your blogs.");
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/getMyBlogs`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                const result = response.data;

                const blogList = Array.isArray(result.data)
                    ? result.data
                    : Array.isArray(result.data?.blogs)
                        ? result.data.blogs
                        : Array.isArray(result.blogs)
                            ? result.blogs
                            : [];

                setBlogs(blogList);
                setErrorMessage("");
            } catch (error) {
                console.error(
                    "My blogs error:",
                    error.response?.data || error.message
                );

                setErrorMessage(
                    error.response?.data?.message ||
                    "Unable to load your blogs."
                );
            } finally {
                setBlogsLoading(false);
            }
        };

        fetchMyBlogs();
    }, []);


    return (
        <>
            <div className="container">
                <img className="img-23344" src={icon} alt="blog" />
                <h2 className="blog-1231212" >Blogs</h2>

                <NavLink
                    to="/blog"
                    end
                    className={({ isActive }) =>
                        isActive ? "para-1 active-link" : "para-1"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/myBlogs"
                    className={({ isActive }) =>
                        isActive ? "oara-2 active-link" : "oara-2"
                    }
                >
                    My Blogs
                </NavLink>

                <Link className="lara-3" to="">Contact us</Link>
                


                {/* NEW: Profile dropdown */}
                <div className="profile-dropdown">
                    <button
                        className="profile-button"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <img src={icon1} alt="Profile" className="profile-avatar" />
                        <span>{userEmail}</span>
                        <span className="profile-arrow">⌄</span>
                    </button>

                    {isProfileOpen && (
                        <div className="profile-menu">
                            <Link to="/addprofile" onClick={() => setIsProfileOpen(false)}>
                                My Profile
                            </Link>

                            <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                                Logout
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <div className="lert">
                <h1 id="oelr">My Blogs</h1>
                <Link id="tert" to="/Addblog">Add Blog</Link>
            </div>


            <div className="myblogs-list">
                {blogsLoading ? (
                    <p>Loading your blogs...</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : blogs.length === 0 ? (
                    <p>You have not added any blogs yet.</p>
                ) : (
                    blogs.map((blog) => (
                        <div className="myblog-card" key={blog._id}>


                            {blog.image && (
                                <img
                                    className="myblog-image"
                                    src={
                                        blog.image.startsWith("http")
                                            ? blog.image
                                            : `http://localhost:3000/${blog.image
                                                .replace(/^\/+/, "")
                                                .replace(/^public\//, "")}`
                                    }
                                    alt={blog.title || "Blog image"}
                                    onError={(e) => {
                                        console.error("Image failed:", e.currentTarget.src);
                                    }}
                                />
                            )}


                            <div className="myblog-content">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
                            </div>

                        </div>
                    ))
                )}
            </div>


            <div className="collection-footer123">

                <div className="footer-para">
                    <img className="img-1" src={icon} alt="blog" />
                    <h2 className="foot" >B l o g s</h2>
                    <p id="wee" >Most developer friendly & highly</p>
                    <p id="qww" >customisable Admin Dashboard Template</p>
                    <img className="image-wee1" src={icon1} alt="" />
                </div>

                <div className="rooter">
                    <p id="swerc" >Company</p>
                    <p>About us</p>
                    <p>Blogs</p>
                </div>

                <div className="footer-footer">
                    <p id="sern" >Quick Links</p>
                    <p>Terms of service</p>
                    <p>Policy Privacy</p>
                    <p>Get un touch</p>
                </div>

                <div className="container-footer1">
                    <p id="rrt" >Contact</p>
                    <p id="rrt" >us</p>
                    <p>info@companyname.com</p>
                    <p>(123)456-789</p>
                    <p>1234 Street Name, State,</p>
                    <p>Zip Code</p>
                </div>
            </div>
            <div className="last">
                <p>2025</p>
                <p id="lasted" >Blogs</p>
                <p>,All rights reserved</p>
            </div>

        </>

    )
}
export default Blog;
