import { Link } from "gatsby"
import React from "react"
import moment from "moment"
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im"

import "./AppFooter.css"

import logo from "../../static/logo-icon.svg"

export default function AppFooter() {
  return (
    <footer id="footer" className="App-footer">
      <div>
        <div></div>
        <div></div>
      </div>

      <div>
        <div>
          <h4>
            <img width="42px" height="42px" src={logo} alt="taevo logo" />
          </h4>
          <ul>
            <li>
              <span>©</span>
              <span>{moment().format("YYYY")} taevo (Pty) Ltd</span>
            </li>
            <li>
              <a href="/">Terms of Service</a> | <a href="/">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>About us</h4>
          <ul>
            <li>
              <Link to="/about">
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <a href="/#services">
                <span>Services</span>
              </a>
            </li>
            <li>
              <a href="/#pricing">
                <span>Pricing</span>
              </a>
            </li>
            <li>
              <a
                href="https://careers.taevo.co.za"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Career Portal</span>
              </a>
            </li>
            <li>
              <a href="/#contact">
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
                <Link to="/headcount">
                  <span>Headcount Management</span>
                </Link>
              </li>
              <li>
                <Link to="/recruiting">
                  <span>Recruiting & Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/training">
                  <span>Training & Development</span>
                </Link>
              </li>
              <li>
                <Link to="/payroll">
                  <span>Payroll</span>
                </Link>
              </li>
              <li>
                <Link to="/attendance">
                  <span>Time and Attendance</span>
                </Link>
              </li>
              <li>
                <Link to="/security">
                  <span>Data Security</span>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            {/* <li><a href="/#about"><span>112 BindaSteet, Credi Section, Katlegong Gauteng 1432</span></a></li> */}
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
