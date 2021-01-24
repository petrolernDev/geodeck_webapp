import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Popover } from "@material-ui/core";

const sortList = ["default", "title", "date"];

class GalleryFilterButton extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
  };

  state = { anchorEl: null, selected: "default" };

  componentDidUpdate(prevProps) {
    const { sortFlag } = this.props;
    const { selected } = this.state;
    if (sortFlag !== prevProps.sortFlag && selected !== "default") {
      this.setState({ selected: "default" });
    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSort = (property) => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
    this.setState({ selected: property });
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div>
        <button
          className="table__btn"
          aria-describedby={id}
          type="button"
          onClick={this.handleClick}
        >
          <h5>Sort By</h5>
          <DownIcon className="table__icon" />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          className="material-table__filter-menu"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {sortList.map((sort, index) => {
            const isSelected = this.state.selected === sort;
            return (
              <MenuItem
                key={index}
                onClick={this.handleSort(sort)}
                className={`material-table__filter-menu-item`}
                style={isSelected ? { color: "#F2AB1f" } : {}}
              >
                {sort}
              </MenuItem>
            );
          })}
        </Popover>
      </div>
    );
  }
}

export default GalleryFilterButton;
