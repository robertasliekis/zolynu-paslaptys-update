import React, { Component } from "react";
import { connect } from "react-redux";
import { changePageNumber, hoveredChanged, resetChanged } from "../actions";

export class ResetZone extends Component {
  constructor(props) {
    super(props);
    //this.hoverZonesContainerRef = React.createRef();
  }

  mouseEnterHandler = () => {
    this.props.hoveredChanged(false);
  };

  mouseLeaveHandler = () => {
    this.clearTimer();
    this.props.hoveredChanged(true);
  };

  onTimeout = () => {
    this.props.changePageNumber(0);
    this.props.resetChanged();
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentDidUpdate(prevProps, prevState) {
    // if (this.props. hoveredGlobal !== prevProps. hoveredGlobal) {
    //   console.log("hovered state " + this.props. hoveredGlobal);
    //   if (!this.props. hoveredGlobal) {
    //     let hoverTime;
    //     if (this.props.movieOpen) {
    //       hoverTime = 610000;
    //     } else {
    //       hoverTime = 20000;
    //     }
    //     this.timer = setTimeout(this.onTimeout, hoverTime);
    //   } else {
    //     this.clearTimer();
    //   }
    // }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    return (
      <div
        className="reset-box-container"
        onMouseEnter={this.mouseEnterHandler}
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
    hoveredGlobal: state.hoveredChanged.hoveredGlobal,
    movieOpen: state.mouseEnterMovie.movieOpen,
  };
};

const mapDispatchToProps = {
  changePageNumber,
  hoveredChanged,
  resetChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetZone);
