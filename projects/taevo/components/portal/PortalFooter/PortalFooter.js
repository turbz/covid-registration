import React, { useContext } from "react"
import { store } from "../../../../projects/taevo/libs/state"
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im"
import { Link } from "gatsby"

import "./PortalFooter.css"

export default function PortalFooter({ proxyURL }) {
  const { state } = useContext(store)
  const { recruiter } = state

  const timeoutRef = React.useRef(null)

  const onScrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(timeoutRef.current)
    }
    window.scroll(0, window.pageYOffset - 400)
  }

  const scrollToTop = () => {
    timeoutRef.current = setInterval(onScrollStep, 0)
  }

  return (
    <footer className="Portal-footer">
      <div>
        <div>
          <h4>
            <img
              width="42px"
              height="42px"
              src={`${proxyURL}/uploads/images/logo-icon.svg`}
              alt="taevo logo"
            />
          </h4>
          <ul>
            <li>
              <span>©</span>
              <span>{new Date().getFullYear()} taevo (Pty) Ltd</span>/
            </li>
            <li>
              <Link to="/">Terms of Service</Link> |{" "}
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>About us</h4>
          <ul>
            <li>
              <a href="/about#about">
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a href="/about#services">
                <span>Services</span>
              </a>
            </li>
            <li>
              <Link onClick={scrollToTop} to="/jobs">
                <span>Jobs</span>
              </Link>
            </li>
            <li>
              <a href="#/">
                <span>Blog</span>
              </a>
            </li>
            <li>
              <a href="/about#contact">
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <ul>
              <li>
                <Link onClick={scrollToTop} to="/jobs">
                  <span>Browse Jobs</span>
                </Link>
              </li>
              <li>
                <Link
                  to={!recruiter ? "/recruiter/login" : "/company/new-post"}
                >
                  <span>Post A Job </span>
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="/user/login">
                  <span>Job Seeker</span>
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="/recruiter/login">
                  <span>Employer/Recruiter</span>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            {/* <li><a href="#about"><span>112 BindaSteet, Credi Section, Katlegong Gauteng 1432</span></a></li> */}
            <li>
              <a href="/">
                <span>081 342 5982</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>info@taevo.co.za</span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="https://twitter.com/taevo_softwares"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  <ImTwitter />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://tinyurl.com/uc9fsz6"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  <ImFacebook />
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://tinyurl.com/un4s4o5"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  <ImLinkedin2 />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
