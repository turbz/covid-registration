import React from "react"
import AppHeader from "./app-header"
import AppFooter from "./AppFooter"

export default function LayoutNavigation({ children }) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  )
}
