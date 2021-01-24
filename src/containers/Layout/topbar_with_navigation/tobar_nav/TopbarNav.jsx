import React from 'react';
import { NavLink } from 'react-router-dom';
import TopbarNavDashboards from './TopbarNavDashboards';
// import TopbarNavUIElements from './TopbarNavUIElements';
// import TopbarNavOtherPages from './TopbarNavOtherPages';
// import TopbarNavLink from './TopbarNavLink';

const TopbarNav = () => (
  <nav className="topbar__nav">
    <TopbarNavDashboards />
  </nav>
);

export default TopbarNav;
