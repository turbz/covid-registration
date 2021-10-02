import React from "react"
import PortalLayout from "../../../src/components/portal/portal-layout"
import PortalSinglePost from "../../../src/components/portal/PortalSinglePost/PortalSinglePost"

export default function PortalPost(props) {
  return (
    <PortalLayout>
      <PortalSinglePost props={props} />
    </PortalLayout>
  )
}
