import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./component/register";
import Login from "./component/login";
import Account from "./component/account";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/Register" element={<RegisterForm />} />
      <Route path="/" element={<Login />} />
      <Route path="/Account" element={<Account />} />
    </Routes>
  </Router>
);
reportWebVitals();
