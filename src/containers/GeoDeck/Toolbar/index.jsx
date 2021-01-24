import React from "react";
import {
  ScissorOutlined,
  HighlightOutlined,
  RadiusSettingOutlined,
  AimOutlined,
  FormatPainterOutlined,
  NodeIndexOutlined,
  StarOutlined,
  FunctionOutlined,
  CodepenOutlined,
  DragOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { changeWidget } from "../../../redux/actions";

const useStylesBootstrap = makeStyles((theme) => ({
  // arrow: {
  //   color: theme.palette.common.black,
  // },
  // tooltip: {
  // backgroundColor: theme.palette.common.black,
  // marginRight: "-15px",
  // },
}));

// const StyledTooltip = withStyles({
//   tooltipPlacementRight: {
//     margin: "0px -5px",
//   },
// })(Tooltip);

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip classes={classes} {...props} />;
}

const tools = [
  AimOutlined,
  RadiusSettingOutlined,
  CodepenOutlined,
  ClearOutlined,
  ScissorOutlined,
  HighlightOutlined,
  FormatPainterOutlined,
  NodeIndexOutlined,
  StarOutlined,
  FunctionOutlined,
  DragOutlined,
];

const toolText = (ind) => {
  switch (ind) {
    case 0:
      return "Point Sampling";
    case 1:
      return "Line Sampling";
    case 2:
      return "Plane Sampling";
    case 3:
      return "Clear";
    default:
      return "Tool Item";
  }
};

const widgetText = (ind) => {
  switch (ind) {
    case 0:
      return "point";
    case 1:
      return "line";
    case 2:
      return "plane";
    default:
      return null;
  }
};
const Toolbar = ({ three, changeWidget, isToolbarEnable }) => {
  return (
    <>
      {tools.map((v, ind) => {
        return (
          <BootstrapTooltip
            title={toolText(ind)}
            key={ind}
            placement="right"
            onClick={() =>
              isToolbarEnable ? changeWidget(widgetText(ind)) : null
            }
          >
            {React.createElement(
              v,
              {
                index: ind,
                className: `geo-icon ${
                  !!three.activeWidget && three.activeWidget === widgetText(ind)
                    ? "selected"
                    : ""
                }`,
              },
              null
            )}
          </BootstrapTooltip>
        );
      })}
    </>
  );
};

function mapStateToProps({ three }) {
  return {
    three: three,
  };
}
const mapDispatchToProps = {
  changeWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
