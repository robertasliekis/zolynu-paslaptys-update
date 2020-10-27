import React, { Component } from "react";
import { connect } from "react-redux";
import { changePageNumber, hoveredChanged } from "../actions";

export class ResetZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hoveredType: "",
    };
    //this.hoverZonesContainerRef = React.createRef();
  }

  mouseEnterHandler = (event, type) => {
    this.setState({ hovered: true, hoveredType: type });
    this.props.hoveredChanged(true);
  };

  mouseLeaveHandler = () => {
    this.clearTimer();
    this.setState({ hovered: false });
    this.props.hoveredChanged(false);
  };

  onTimeout = () => {
    switch (this.state.hoveredType) {
      case "reset":
        this.props.changePageNumber(0);
        break;
      default:
    }
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hovered !== prevProps.hovered) {
      if (this.state.hovered) {
        let hoverTime;
        if (this.state.hoveredType === "reset") {
          hoverTime = 120000;
        }
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return (
      <div
        className="reset-box-container"
        onMouseEnter={(event) => this.mouseEnterHandler(event, "reset", undefined)}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <div className="reset-box reset-box-left"></div>
        <div className="reset-box reset-box-right"></div>
        <div className="reset-box reset-box-top"></div>
        <div className="reset-box reset-box-bottom"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
  };
};

const mapDispatchToProps = {
  changePageNumber,
  hoveredChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetZone);
