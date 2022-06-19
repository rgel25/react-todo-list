import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/css/style.css";
import { Helmet } from "react-helmet";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Tasks</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <script
        src="https://kit.fontawesome.com/66c6b559ae.js"
        crossorigin="anonymous"
      ></script>
    </Helmet>
    <App />
  </>
);
