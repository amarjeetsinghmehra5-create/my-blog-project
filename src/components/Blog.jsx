import React, { useEffect, useState } from "react"; // CHANGED: hooks added
import axios from "axios";
import "../css/Blog.css";
import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import { Link } from "react-router-dom";

// NEW: API URLs
const API_URL = "http://localhost:3000/api/user";
const SERVER_URL = "http://localhost:3000";

function Blog() {
    // NEW: blogs, loading and error states

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);


    const [profile, setProfile] = useState({
        username: "",
        email: "",
        profileImage: "",
    });

    const [userEmail, setUserEmail] = useState(
        localStorage.getItem("userEmail") || ""
    );

    // NEW: Fetch all blogs when the page opens
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/get-all-blogs`);

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const result = await response.json();

                // Backend response: { message, data: [...] }
                if (Array.isArray(result.data)) {
                    setBlogs(result.data);
                } else {
                    setBlogs([]);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Blogs load nahi ho sake. Backend aur API URL check karo.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                const response = await axios.post(
                    `${API_URL}/getMyProfile`,
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                console.log("Profile API response:", response.data);
                const user = response.data?.data;

                if (user) {
                    setProfile({
                        username: user.username || user.name || "",
                        email: user.email || "",
                        profileImage: user.profileImage || "",
                    });
                }
            } catch (error) {
                console.error(
                    "Profile fetch error:",
                    error.response?.data || error.message
                );
            }
        };

        fetchProfile();
    }, []);

    // NEW: Handles both full image URLs and paths saved by backend
    const getImageUrl = (image) => {
        if (!image || typeof image !== "string") return null;

        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }

        return `${SERVER_URL}/${image.replace(/^\/+/, "")}`;
    };

    return (
        <>
            {/* Existing header */}
            <img className="img-2" src={icon} alt="blog" />

            <div className="container">
                <h2 className="blog-123123">B l o g s</h2>
                <Link className="para-1" to="/blog">Home</Link>
                <Link className="oara-2" to="/myBlogs">My Blogs</Link>
                <Link className="lara-3" to="/Addblog">Add Blog</Link>

                {/* NEW: Oliver William profile dropdown */}
                <div className="profile-dropdown">
                    <button
                        type="button"
                        className="profile-button"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >

                        <img
                            src={
                                profile.profileImage
                                    ? profile.profileImage.startsWith("http")
                                        ? profile.profileImage
                                        : `http://localhost:3000/${profile.profileImage
                                            .replace(/^\/+/, "")
                                            .replace(/^public\//, "")}`
                                    : icon1
                            }
                            alt="Profile"
                            className="profile-avatar"
                        />


                        <span>
                            {profile.email || userEmail || "My Account"}
                        </span>
                        <span className="profile-arrow">⌄</span>
                    </button>

                    {isProfileOpen && (
                        <div className="profile-menu">
                            <Link
                                to="/addprofile"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                My Profile
                            </Link>

                            <Link
                                to="/login"
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("userEmail");
                                    setUserEmail("");
                                }}
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            {/* NEW: All blogs from MongoDB */}
            <section className="all-blogs-section">
                <h2 className="all-blogs-title"> B l o g s</h2>

                {loading && (
                    <p className="blogs-status">Loading blogs...</p>
                )}

                {!loading && error && (
                    <p className="blogs-error">{error}</p>
                )}

                {!loading && !error && blogs.length === 0 && (
                    <p className="blogs-status">Abhi koi blog available nahi hai.</p>
                )}

                {!loading && !error && blogs.length > 0 && (
                    <div className="blogs-grid">
                        {blogs.map((blog, index) => {
                            const imageUrl = getImageUrl(blog.image);

                            return (
                                <article
                                    className="blog-card"
                                    key={blog._id || index}
                                >
                                    {imageUrl ? (
                                        <img
                                            className="blog-card-image"
                                            src={imageUrl}
                                            alt={blog.title || "Blog image"}
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <img
                                            className="blog-card-image blog-placeholder"
                                            src={icon}
                                            alt="Default blog"
                                        />
                                    )}

                                    <div className="blog-card-content">
                                        <h3>{blog.title || "Untitled Blog"}</h3>

                                        <p className="blog-card-description">
                                            {blog.description || "No description available."}
                                        </p>

                                        <p className="blog-card-author">
                                            By: {blog.userId?.username || blog.userId?.email || "Unknown author"}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Existing footer */}
            <div className="collection-footer">
                <div className="footer-para">
                    <img className="img-1" src={icon} alt="blog" />
                    <h2 className="foot">B l o g s</h2>
                    <p id="wee">Most developer friendly &amp; highly</p>
                    <p id="qww">customisable Admin Dashboard Template</p>
                    <img className="image-wee1" src={icon1} alt="" />
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
                <p>,All rights reserved</p>
            </div>
        </>
    );
}

export default Blog;