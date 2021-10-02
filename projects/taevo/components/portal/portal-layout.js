import React from "react"
import { StateProvider } from "../../../projects/taevo/libs/state"
import PortalHeader from "./PortalHeader/PortalHeader"
import PortalFooter from "./PortalFooter/PortalFooter"
import { graphql, useStaticQuery } from "gatsby"

export default function PortalLayout(props) {
  const { children } = props

  const data = useStaticQuery(graphql`
    query {
      site {
        proxy {
          prefix
          url
        }
      }
    }
  `)

  const proxyURL = `${data.site.proxy[0].url}${data.site.proxy[0].prefix}`

  return (
    <StateProvider>
      <PortalHeader proxyURL={proxyURL} props={props} />
      {children}
      <PortalFooter proxyURL={proxyURL} />
    </StateProvider>
  )
}
