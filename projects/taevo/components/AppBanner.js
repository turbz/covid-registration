import React from "react"
import {
  IoIosFingerPrint,
  IoIosPulse,
  IoMdCloudDone,
  IoMdTrendingUp,
} from "react-icons/io"

import "./AppBanner.css"

import Slider from "./Slider/Slider"

export default function AppBanner({ onTrialToggle }) {
  let dots = []

  for (let i = 0; i < 5; i++) {
    dots.push(i)
  }
  return (
    <section className="App-Banner">
      <div>
        <div className="content">
          <div>
            <h4>
              <span></span>
              <span>Get Work Done</span>
            </h4>
            <h2>Forge the Tools of Transformation</h2>
            <p>
              A cloud-based Human resource information system that elevates an
              organization's ability to identify, recruit and develop its
              workforce and help organizations create the HR function that the
              business needs.
            </p>
            <ul>
              <li>
                {" "}
                <a href="#home" onClick={onTrialToggle}>
                  GET FREE TRIAL
                </a>
              </li>
              <li>
                <span>from</span>
                <span>25</span>
                <span>
                  <span>ZAR</span>
                  <span></span>pp/monthtly
                </span>
              </li>
            </ul>
          </div>
          <div className="dots">
            {dots.map(dot => (
              <span key={dot}></span>
            ))}
          </div>
        </div>
        <Slider />
      </div>
      <div id="features">
        <h3>
          <span>Our Solutions</span>
          <span>Transform your employee experience.</span>
        </h3>
        <p>
          Simple and easy-to-follow software solution that reduce human errors.
        </p>
        <ul>
          <li>
            <div>
              <span></span>
              <span></span>
              <IoMdCloudDone />
            </div>
            <span>
              Provide trustworthy data to complete day-to-day task more
              efficient.
            </span>
          </li>
          <li>
            <div>
              <span></span>
              <span></span>
              <IoMdTrendingUp />
            </div>
            <span>
              {" "}
              Generate value using people analytics to solve business problems.
            </span>
          </li>
          <li>
            <div>
              <span></span>
              <span></span>
              <IoIosPulse />
            </div>
            <span>
              Automate human resources processes and reporting systems.
            </span>
          </li>
          <li>
            <div>
              <span></span>
              <span></span>
              <IoIosFingerPrint />
            </div>
            <span>
              Maximizes connectivity and collaboration while mitigating risks.
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}
