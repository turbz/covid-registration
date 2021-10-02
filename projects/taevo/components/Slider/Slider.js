import React, { useState, useEffect } from "react"

import "./Slider.css"

// Desktop Banners

import banner1 from "../../../static/bg-banner.jpg"
import banner2 from "../../../static/bg-banner-2.jpg"
import banner3 from "../../../static/bg-banner-3.jpg"

// Movile banners

// import ipad1 from "../../../static/bg-ipad.png";
// import ipad2 from "../../../static/bg-ipad-2.png";

export default function Slider() {
  const [slide, setSlide] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide => slide + 1)

      if (slide === 3) {
        setSlide(1)
      }
    }, 8000)
    return () => {
      clearInterval(interval)
    }
  }, [slide])

  return (
    <>
      <div className="Slider desktop">
        {slide === 1 && (
          <img
            src={banner1}
            alt="slide"
            className=" animate__animated animate__bounce slower "
          />
        )}
        {slide === 2 && (
          <img
            src={banner2}
            alt="slide"
            width="1360"
            height="500"
            className=" animate__animated animate__lightSpeedInRight faster"
          />
        )}
        {slide === 3 && (
          <img
            src={banner3}
            alt="slide"
            width="1360"
            height="500"
            className=" animate__animated animate__backInLeft faster"
          />
        )}

        <ul>
          <li
            tabIndex="0"
            style={
              slide === 1
                ? { backgroundColor: "#323742", transition: "ease-in 1s" }
                : null
            }
            onClick={() => setSlide(1)}
          ></li>
          <li
            tabIndex="1"
            style={
              slide === 2
                ? { backgroundColor: "#323742", transition: "ease-in 1s" }
                : null
            }
            onClick={() => setSlide(2)}
          ></li>
          <li
            tabIndex="2"
            style={
              slide === 3
                ? { backgroundColor: "#323742", transition: "ease-in 1s" }
                : null
            }
            onClick={() => setSlide(3)}
          ></li>
        </ul>
      </div>

      {/* <div className="Slider mobile">
        {slide === 1 && (
          <img
            src={ipad1}
            alt="slide"
            className="animate__animated animate__bounce slower "
          />
        )}
        {slide === 2 && (
          <img
            src={ipad2}
            alt="slide"
            width="1360"
            height="500"
            className="animate__animated animate__slideInRight faster"
          />
        )}
        <ul>
          <li tabIndex="0" style={ slide === 3 ? {backgroundColor: "#323742",
        transition: "ease-in 1s"} : null} onClick={() => setSlide(1)}></li>
          <li tabIndex="0" style={ slide === 3 ? {backgroundColor: "#323742",
        transition: "ease-in 1s"} : null} onClick={() => setSlide(2)}></li>
        </ul>
      </div> */}
    </>
  )
}
