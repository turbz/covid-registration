import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { store } from "../../../../libs/state"

import "./NavBar.css"

import curriculum from "../assets/curriculum.svg"
import gear from "../assets/gear.svg"
import archives from "../assets/archives.svg"
import lamp from "../assets/lamp.svg"
import archive from "../assets/archive.svg"
import compass from "../assets/compass.svg"
import avatar from "../assets/user-login-icon.svg"
import out from "../assets/out.svg"

export default function NavBar({ toggle, onToggle }) {
  const { state, getSubdomain } = useContext(store)

  const { userProfile, recruiter } = state

  const onUserLogout = async () => {
    // User Logout Route
    await fetch(`/api/logout?slug=${getSubdomain()}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(res => {
        console.log(res)
        res.json()
      })
      .then(data => {
        sessionStorage.removeItem("userEmail")
        sessionStorage.removeItem("url")
        window.location.assign("/")
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      {/* {toggle && ( */}

      <div
        style={{
          display: !toggle && "none",
        }}
        className="wrapper animate__animated animate__slideInRight animate__fast"
      >
        <ul>
          <li>
            {!recruiter &&
            userProfile &&
            userProfile.profiles !== null &&
            userProfile.profiles.avatar !== null ? (
              <>
                <span>
                  <img
                    src={`${
                      window.location.origin
                    }${userProfile.profiles.avatar.slice(3)}`}
                    alt="avatar"
                  />
                </span>
                <ul>
                  {userProfile.basic_information && (
                    <li>
                      {userProfile.basic_information.first_name.slice(0, 1)}
                      {". "}
                      {userProfile.basic_information.last_name}
                    </li>
                  )}
                  <li>{userProfile.email}</li>
                </ul>
              </>
            ) : (
              !recruiter &&
              userProfile && (
                <>
                  <img src={avatar} alt="avatar" />
                  <span>
                    <ul>
                      {userProfile.basic_information && (
                        <li>
                          {userProfile.basic_information.first_name.slice(0, 1)}{" "}
                          {userProfile.basic_information.last_ame}
                        </li>
                      )}
                      <li>{userProfile.email}</li>
                    </ul>
                  </span>
                </>
              )
            )}
          </li>

          <li>
            <Link onClick={onToggle} to={`/profile/applications`}>
              <span>
                <img className="menu" src={archive} alt="application" />
              </span>
              <span>Job Applications</span>
            </Link>
          </li>

          <li>
            <Link onClick={onToggle} to={`/profile/overview`}>
              <span>
                <img className="menu" src={compass} alt="account" />
              </span>

              <span>Profile Overview</span>
            </Link>
          </li>
          <li>
            <Link onClick={onToggle} to={`/profile/resume`}>
              <span>
                <img className="menu" src={curriculum} alt="resume" />
              </span>
              <span>Resume</span>
            </Link>
          </li>
          <li>
            <Link onClick={onToggle} to={`/profile/documents`}>
              <span>
                <img className="menu" src={archives} alt="documents" />
              </span>
              <span>Documents</span>
            </Link>
          </li>
          <li>
            <Link onClick={onToggle} to={`/profile/settings`}>
              <span>
                <img className="menu" src={gear} alt="settings" />
              </span>
              <span>Settings</span>
            </Link>
          </li>

          <li>
            <Link to="#">
              <span>
                <img className="menu" src={lamp} alt="Support" />
              </span>
              <span>Support</span>
            </Link>
          </li>
          <li onClick={onUserLogout}>
            <Link to="#">
              <span>
                <img className="menu" src={out} alt="logout" />
              </span>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
