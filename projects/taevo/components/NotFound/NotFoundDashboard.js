import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/logo-full-color.svg";

import "./NotFound.css";

import "./Notification.css";

export default function NotFoundDashboard() {
  return (
    <section className="Not-Found">
      <header>
        <img src={logo} alt="taevo logo" />
      </header>
      <article>
        <h1>404 Page Not Found</h1>
        <Link to="/dashboard">Return Home</Link>
      </article>
    </section>
  );
}
