import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import LineChart from '../../Two/LineChart'
import HeatMap from '../../Two/Heatmap'
import Dist from '../../Two/Dist'

const data = [];

for (let i = 0; i < 20; i += 1) {
  const series = [];
  for (let j = 0; j < 100; j += 1) {
    series.push({ x: j, y: ((i / 10) + 1) * Math.sin((Math.PI * (i + j)) / 50) });
  }
  data.push({
    color: i, key: i, data: series, opacity: 0.8,
  });
}

const chartForm = (s) => {
  if (s === 'plane')return <><p>Live Chart</p><HeatMap /></>
  else if (s === 'point' || s === 'line') return <><p>Live Chart</p><LineChart /></>
  else return <><p>Live Chart</p><Dist /></>
}

const LineSeriesWithManyColors = ({ three }) => (
  <div style={{ height: "360px"}} className="detail-chart">
    {chartForm(three.activeWidget)}
  </div>
)

function mapStateToProps ({
  three
  }) {
  return {
    three
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(LineSeriesWithManyColors))
