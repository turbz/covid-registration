import React, { useEffect, useState } from "react"
import AppBanner from "../components/AppBanner"
import ContactPage from "../components/ContactPage"
import LayoutNavigation from "../components/layout-navigation"
import PricingPage from "../components/PricingPage"
import Services from "../components/Services"

export default function Home() {
  // const [demoToggle, setDemoToggle] = useState(false)
  const [trialToggle, setTrialToggle] = useState(false)

  // const onDemoToggle = () => {
  //   setDemoToggle(!demoToggle)
  // }

  const onTrialToggle = () => {
    setTrialToggle(!trialToggle)
  }

  let dotsArray = []

  for (let count = 0; count < 12000; count++) {
    dotsArray.push(count)
  }

  useEffect(() => {
    const element = document.getElementById("gatsby-focus-wrapper")
    element.classList.remove("about-header")
  }, [])

  return (
    <>
      <LayoutNavigation>
        <AppBanner onTrialToggle={onTrialToggle} />
        <Services />
        <PricingPage />
        <ContactPage />
      </LayoutNavigation>
    </>
  )
}
