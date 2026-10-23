
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/Addblogprofile.css';
import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";


const API_URL = import.meta.env.VITE_API_URL;

function Addblogprofile() {

    const [isOpen, setIsOpen] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const getImageUrl = (path) => {
        if (!path) return icon3;

        if (path.startsWith("http")) return path;

        return `http://localhost:3000${path}`;
    };

    // Load logged-in user's saved profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setMessage("Please login first.");
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/getMyProfile`,
                    {
                        headers: { Authorization: token },
                    }
                );

                const user = response.data.data;

                setName(user.username || user.name || "");
                setEmail(user.email || "");
                setProfileImage(user.profileImage || "");
            } catch (error) {
                console.error(
                    "Profile fetch error:",
                    error.response?.data || error.message
                );

                setMessage(
                    error.response?.data?.message ||
                    "Unable to load profile."
                );
            }
        };

        fetchProfile();
    }, []);

    // Save profile
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login first.");
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);

            if (imageFile) {
                formData.append("file", imageFile);
            }

            const response = await axios.put(
                `${API_URL}/updateMyProfile`,
                formData,
                {
                    headers: { Authorization: token },
                }
            );

            const user = response.data.data;

            setName(user.username || user.name || "");
            setEmail(user.email || "");
            setProfileImage(user.profileImage || "");
            setImageFile(null);
            setMessage("Profile saved successfully!");
        } catch (error) {
            console.error(
                "Profile save error:",
                error.response?.data || error.message
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to save profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-078">
            <img className="img-2123" src={icon} alt="blog" />
                <h2 className="blog-12311" >B l o g s</h2>
                <Link className="para-1" to="/blog">Home</Link>
                <Link className="oara-2" to="/myblogs">My Blogs</Link>
                <Link className="lara-3" to="/Addblog">Add Blog</Link>


                <div className="profile-container">
                    {/* Top Profile Button */}
                    <button
                        className="profile-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img src={icon2} alt="profile" />
                        <span>{name || "My Account"}</span>
                        <span className="arrow">⌄</span>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="dropdown">
                            <div className="profile-info">
                                <img src={icon2} alt="profile" />
                               <span>{name || "My Account"}</span>
                            </div>

                            <Link className="menu-item" to="/Addblogprofile">
                                👤
                                <span>My Profile</span>
                            </Link>

                            <button className="logout-btn">
                                Logout&nbsp; ↪
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-card-header">
                        <p className="profile-eyebrow">YOUR ACCOUNT</p>
                        <h1>My Profile</h1>
                        <p>Manage your personal information</p>
                    </div>

                    <form onSubmit={handleSave} className="profile-form">
                        <div className="profile-photo-section">
                            <div className="profile-photo-wrapper">
                                <img
                                    className="profile-photo"
                                    src={
                                        imageFile
                                            ? URL.createObjectURL(imageFile)
                                            : getImageUrl(profileImage)
                                    }
                                    alt="Your profile"
                                />
                            </div>

                            <div className="profile-photo-details">
                                <h3>Profile picture</h3>
                                <p>Choose a clear photo for your account.</p>

                                <label className="upload-profile-btn">
                                    Choose photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) setImageFile(file);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="profile-divider" />

                        <label className="profile-label" htmlFor="profile-name">
                            Full name
                        </label>
                        <input
                            id="profile-name"
                            className="profile-input"
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label className="profile-label" htmlFor="profile-email">
                            Email address
                        </label>
                        <input
                            id="profile-email"
                            className="profile-input"
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {message && (
                            <p className="profile-message" role="status">
                                {message}
                            </p>
                        )}

                        <button
                            className="profile-save-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Saving changes..." : "Save changes"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="collection-footer-555">

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
export default Addblogprofile;
