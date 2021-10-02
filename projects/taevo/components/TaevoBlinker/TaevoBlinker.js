import React from "react";

import "./TaevoBlinker.css";

export default function TaevoBlinker() {
  return (
    <div className="taevo-spinner">
      <img
        src={`${window.location.origin}/uploads/images/logo-icon.svg`}
        alt="taevo Logo"
      />
    </div>
  );
}
