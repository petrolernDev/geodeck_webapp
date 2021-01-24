import React, { Component } from 'react';
import {
  Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Table from '../DetailTable';
import Export from './Export'
import Well from './Well'

class DefaultTabsBorderedTop extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeTab: '1',
    };
  }

  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { t } = this.props;
    const { activeTab } = this.state;

    return (
            <div className="tabs tabs--bordered-bottom nav-fill">
              <div className="tabs__wrap">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      Export
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' })}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      Reservoir
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} style={{paddingLeft:'30px'}}>
                  <TabPane tabId="1">
                    <Export />
                  </TabPane>
                  <TabPane tabId="2">
                    <Table />
                  </TabPane>
                  <TabPane tabId="3">
                    <Well />
                  </TabPane>
                </TabContent>
              </div>
            </div>

    );
  }
}

export default withTranslation('common')(DefaultTabsBorderedTop);
