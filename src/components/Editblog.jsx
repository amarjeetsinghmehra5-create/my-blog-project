import axios from "axios";
import React from "react";
import '../css/Editblog.css';
import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";

import { useState } from "react";
import { Link } from "react-router-dom";

function Editblog() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img className="img-2" src={icon} alt="blog" />
            <div className="container-09">
                <h2 className="blog-1231" >B l o g s</h2>
                <Link className="para-1" to="/">Home</Link>
                <Link className="oara-2" to="/Blog">My Blogs</Link>
                <Link className="lara-3" to="/Addblog">Add Blog</Link>


                <div className="profile-container">
                    {/* Top Profile Button */}
                    <button
                        className="profile-btn"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img src={icon2} alt="profile" />
                        <span>Oliver William</span>
                        <span className="arrow">⌄</span>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="dropdown">
                            <div className="profile-info">
                                <img src={icon2} alt="profile" />
                                <span>Oliver William</span>
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

                    <h1 className="blog-qw-qw" >Edit Blog</h1>
                    <p className="joly-je" >Title</p>
                    <input className="input-one" type="text" placeholder="Write here" />
                    <p className="joly-je" >Description</p>
                    <input className="input-two" type="text" placeholder="Write here" />

                    <p className="joly-je" >Upload Image</p>
                    <img className="icon-image1234" src={icon3} alt="icon" />
                    <input className="input-three" type="text"  />
                    <button className="btnmet-q" >Update</button>


            <div className="collection-footer-qw12q">

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
export default Editblog;