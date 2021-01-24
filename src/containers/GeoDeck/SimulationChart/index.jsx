import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Col, Container, Row } from "reactstrap";
import PlotList from "./components/PlotList";
import SimulationPanel from "./components/SimulationPanel";
import { fetchPlots } from "../../../redux/actions/plotAction";
import SimulationPanelEmpty from "./components/SimulationPanelEmpty";

const SimulationChart = (props) => {
  const [selectedPlot, setSelectedPlot] = useState(0); // state for detect active plot
  const [plotList, setPlotList] = useState([]); // list of plots
  const { plots } = props;

  useEffect(() => {
    setPlotList(plots);
  }, [plots]);

  useEffect(() => {
    props.fetchPlots();
  }, []);

  // if (_.isEmpty(plotList)) {
  //   return null;
  // }

  const currentPlot = plotList[selectedPlot]; // current active plot

  return (
    <Container className="simulation">
      <Row className="simulation__container" key="simulation__container">
        <Col
          key="simulation__sidebar-plot-panel"
          md="2"
          className="simulation__sidebar simulation__plot__panel"
          // style={{ maxHeight: controlBar ? "calc(100vh - 115px)" : "66vh" }}
        >
          {currentPlot ? (
            <SimulationPanel currentPlot={currentPlot} />
          ) : (
            <SimulationPanelEmpty />
          )}
        </Col>

        <Col md="10" key="simulation__plot" className="simulation__plot">
          <PlotList
            plots={plots}
            selectedPlot={selectedPlot}
            setSelectedPlot={setSelectedPlot}
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { plots: Object.values(state.plots) };
};

export default connect(mapStateToProps, { fetchPlots })(SimulationChart);
