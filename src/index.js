import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Login from "views/Login";
import Signup from "views/Signup";
import PatientHome from "views/PatientHome";
import DoctorHome from "views/DoctorHome";
import Pharmacy from "views/Pharmacy";
import Orders from "views/Orders";
import AboutUs from "views/AboutUs";
import AboutCovid from "views/AboutCovid";
import Faq from "views/Faq";
import SuperUserHome from "views/SuperUserHome";
import SuperUserPharmacy from "views/SuperUserPharmacy";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

      {/* General Routes */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/aboutcovid" component={AboutCovid} />
      <Route path="/faq" component={Faq} />

      {/* Doctor Routes */}
      <Route path="/doctor/home" component={DoctorHome} />
      <Route path="/doctor/pharmacy" component={Pharmacy} />
      <Route path="/doctor/orders" component={Orders} />

      {/* Patient Routes */}
      <Route path="/patient/home" component={PatientHome} />
      <Route path="/patient/pharmacy" component={Pharmacy} />
      <Route path="/patient/orders" component={Orders} />

      {/* Admin Routed */}
      <Route path="/superuser/home" component={SuperUserHome} />
      <Route path="/superuser/pharmacy" component={SuperUserPharmacy} />

      {/* Redirect Rules */}
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
