import React, { useState, useRef, useEffect } from "react";
import {
  StepBackwardOutlined,
  FastBackwardOutlined,
  CaretRightOutlined,
  FastForwardOutlined,
  StepForwardOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import Slider from "../../../shared/components/range_slider/Slider";
import { changeSample } from "../../../redux/actions";

const Player = ({ three, changeSample }) => {
  const frame = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    frame.current.onchange = (e) => {

      if (e.target.value > three.sample.total) {
        setCurrentTime(three.sample.total);
      } else {
        setCurrentTime(parseInt(e.target.value));
        changeSample({
          ...three.sample,
          time: parseInt(e.target.value),
        });
      }
    };
  }, []);

  return (
    <div className="time-play">
      <div className="player-buttons">
        <StepBackwardOutlined className="geo-icon" />
        <FastBackwardOutlined className="geo-icon" />
        <CaretRightOutlined className="geo-icon" />
        <FastForwardOutlined className="geo-icon" />
        <StepForwardOutlined className="geo-icon" />
      </div>
      <div className="player-input">
        <span style={{fontSize: "15px"}}>Timestep</span>
        <div className="time-input">
          <input type="number" defaultValue={0} ref={frame} />
          <div className="time-label">{`/ ${24}`}</div>
        </div>
        <CameraOutlined className="geo-icon" />
      </div>
      <div className="player-slider">
        <Slider min={0} max={24} value={currentTime} />
      </div>
    </div>
  );
};

function mapStateToProps({ three }) {
  return {
    three: three,
  };
}
const mapDispatchToProps = {
  changeSample,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
