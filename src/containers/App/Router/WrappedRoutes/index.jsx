import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Layout from "../../../Layout/index";
import Commerce from "./Commerce";
import Finance from "./Finance";
import Documentation from "./Documentation";
import DefaultPages from "./DefaultPages";
import Account from "./Account";
import ECommerce from "./ECommerce";
import Maps from "./Maps";
import Charts from "./Charts";
import Tables from "./Tables";
import Forms from "./Forms";
import UI from "./UI";

import Chat from "../../../Chat/index";
import Todo from "../../../Todo/index";

import OnLineMarketingDashboard from "../../../Dashboards/OnLineMarketing/index";
import AppDashboard from "../../../Dashboards/App/index";
import BookingDashboard from "../../../Dashboards/Booking/index";
import FitnessDashboard from "../../../Dashboards/Fitness/index";
import VisDash from "../../../Main";
import Projects from "../../../GeoDeck/Projects";
import Gallery from "../../../GeoDeck/Gallery";

import Mail from "../../../Mail/index";

export default () => {
  return (
    <div>
      <Layout>
        <div className="container__wrap">
          <Route path="/e_commerce_dashboard" component={Commerce} />
          <Route
            path="/online_Marketing_dashboard"
            component={OnLineMarketingDashboard}
          />
          <Route exact path="/app_dashboard" component={AppDashboard} />
          <Route path="/booking_dashboard" component={BookingDashboard} />
          <Route path="/finance_dashboard" component={Finance} />
          <Route path="/fitness_dashboard" component={FitnessDashboard} />
          <Route path="/ui" component={UI} />
          <Route path="/mail" component={Mail} />
          <Route path="/chat" component={Chat} />
          <Route path="/todo" component={Todo} />
          <Route path="/forms" component={Forms} />
          <Route path="/tables" component={Tables} />
          <Route path="/charts" component={Charts} />
          <Route path="/maps" component={Maps} />
          <Route path="/account" component={Account} />
          <Route path="/e-commerce" component={ECommerce} />
          <Route path="/default_pages" component={DefaultPages} />
          <Route path="/documentation" component={Documentation} />
          <Route path="/main" component={VisDash} />
          <Route path="/projects" component={Projects} />
          <Route path="/gallery" component={Gallery} />
        </div>
      </Layout>
    </div>
  );
};
