import React, { useState, useContext } from "react"
import { Link } from "gatsby"
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation"
import { store } from "../../../../projects/taevo/libs/state"
import { IoMdClose } from "react-icons/io"

import "./PortalHeader.css"

import menu from "../../../images/menu-icon.svg"

export default function PortalHeader({
  proxyURL,
  position,
  props,
  clearSearch,
}) {
  const [toggle, setToggle] = useState(false)

  const { state } = useContext(store)

  const { recruiter, userProfile } = state

  const pathname = typeof window !== "undefined" ? window.location.pathname : ""

  const onToggle = () => {
    setToggle(!toggle)
  }

  const styleLogin = {
    position: "fixed",
    justifyContent: "flex-start",
    width: "70%",
    left: "2em",
    bottom: "11em",
    animationName: "fadeInRight",
    animationDuration: "1s",
  }

  const onLoginForm = () => {
    setToggle(false)
    sessionStorage.setItem("url", pathname)
  }

  return (
    <header
      style={{
        height: toggle && "100%",
        backgroundColor: pathname !== "/" && "white",
      }}
      className="Portal-Main-Header"
    >
      <div>
        <Link className="logo" to="/">
          <img
            width="118px"
            className="logo-desktop"
            height="32px"
            src={`${proxyURL}/uploads/images/logo-career-portal.svg?slug=demo`}
            alt="logo"
          />

          <img
            width="24px"
            className="logo-mobile"
            height="24px"
            src={`${proxyURL}/uploads/images/logo-icon.svg?slug=demo`}
            alt="logo"
          />
        </Link>

        <ul>
          <li>
            <Link to="/jobs">Find Jobs</Link>
          </li>
          <li>
            <Link to="/market">Market</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            {!recruiter && (
              <Link to="/recruiter/login">Employer/Recruiter</Link>
            )}
          </li>
        </ul>
        {userProfile && (
          <>
            {/* {!toggle ? (
            <Link
              style={{ display: recruiter && "none" }}
              className="logo"
              to="/"
            >
              <img src={logo} alt="logo" />
            </Link>
          ) : (
            <>
              <Link
                style={{ display: recruiter && "none" }}
                className="logo"
                to="/"
              >
                <img src={logo} alt="logo" />
              </Link>
            </>
          )} */}
          </>
        )}
        <div>
          {/* {!userProfile && ( */}
          <nav
            // style={{ display: recruiter && "none" }}
            className={
              !toggle
                ? "main-nav"
                : "toggle animate__animated animate__slideInRight"
            }
          >
            <>
              {!toggle ? (
                <img
                  src={menu}
                  alt="menu"
                  width="16px"
                  height="8px"
                  onClick={onToggle}
                />
              ) : (
                <span onClick={onToggle} className="close">
                  <IoMdClose />
                </span>
              )}
            </>
            {!toggle && (
              <span className="cart">
                <span>0</span>
              </span>
            )}
            <DesktopNavigation
              position={position}
              toggle={toggle}
              onToggle={() => setToggle(false)}
              clearSearch={clearSearch}
            />
          </nav>

          <ul className="login" style={toggle ? styleLogin : null}>
            {!userProfile && (
              <li onClick={() => setToggle(false)}>
                <Link
                  to={!recruiter ? "/recruiter/login" : "/company/new-post"}
                >
                  Post A Job
                </Link>
              </li>
            )}
            {!userProfile && !recruiter ? (
              <>
                <li onClick={onLoginForm}>
                  <Link to="/user/login">Login/Register</Link>
                </li>
              </>
            ) : (
              <li onClick={onLoginForm}>
                <Link to={userProfile ? `/profile` : `/company`}>
                  {userProfile ? "View Profile" : "Dashboard"}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
