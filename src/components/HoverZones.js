import React, { Component } from "react";
import { connect } from "react-redux";

import { changePageNumber, mouseEnterCorner, mouseEnterPlant, mouseEnterMovie, hoveredChanged } from "../actions";

export class HoverZones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      hoveredType: "",
      plantIndex: null,
      cornerIndex: null
    };
    this.hoverZonesContainerRef = React.createRef();
  }
  mouseEnterHandler = (event, type) => {
    this.setState({ hovered: true, hoveredType: type });
    this.props.hoveredChanged(true);
    switch (type) {
      case "plant":
        let plantId = event.target.id;
        let plantIndex = plantId.replace("plant", "");
        this.setState({
          plantIndex: plantIndex
        });
        break;
      case "corner":
        let cornerId = event.target.id;
        let cornerIndex = cornerId.replace("corner", "");
        this.setState({
          cornerIndex: cornerIndex
        });
        break;
      default:
        break;
    }
  };

  mouseLeaveHandler = () => {
    this.props.hoveredChanged(false);
    this.clearTimer();
    this.setState({ hovered: false });
  };

  onTimeout = () => {
    switch (this.state.hoveredType) {
      case "person":
        let personOpen = { plantIndex: 0, open: true };
        this.props.mouseEnterPlant(personOpen);
        break;
      case "corner":
        this.props.mouseEnterCorner(this.state.cornerIndex);
        break;
      case "plant":
        let plantOpen = { plantIndex: this.state.plantIndex, open: true };
        this.props.mouseEnterPlant(plantOpen);
        break;
      case "movie":
        this.props.mouseEnterMovie(true);
        break;
      default:
    }
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hovered !== prevProps.hovered) {
      if (this.state.hovered) {
        let hoverTime = 20;
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }
    if (this.props.page !== prevProps.page) {
      this.hoverZonesContainerRef.current.classList.remove("hover-zones-animation-class");
      this.hoverZonesContainerRef.current.classList.add("hover-zones-animation-class");
    }
  }

  componentDidMount() {
    this.hoverZonesContainerRef.current.classList.add("hover-zones-animation-class");
  }

  render() {
    const plantContainerNumbers = [1, 2, 3, 4];

    const plantNumbers = [this.props.page * 4 - 3, this.props.page * 4 - 2, this.props.page * 4 - 1, this.props.page * 4];

    return (
      <div className="hover-zones-container " ref={this.hoverZonesContainerRef} key={`hoverZonesKey${this.props.page}`}>
        {this.props.page > 0 ? (
          <div className="plants-wrapper">
            <div
              className="hover-zone corner-zone"
              id="corner1"
              onClick={(event) => this.mouseEnterHandler(event, "corner")}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
            <div
              className="hover-zone corner-zone"
              id="corner2"
              onClick={(event) => this.mouseEnterHandler(event, "corner")}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
            <div className="plant-zone-wrapper">
              {plantContainerNumbers.map((number, index) => {
                return (
                  <div
                    className={`plant-zone plant${number} hover-zone`}
                    id={`plant${plantNumbers[index]}`}
                    key={`plant${number}`}
                    onClick={(event) => this.mouseEnterHandler(event, "plant")}
                    onMouseLeave={this.mouseLeaveHandler}
                  >
                    {/* <h3>{plantNumbers[index]}</h3> */}
                    <div className="white-box" id={`plant${plantNumbers[index]}`}></div>
                  </div>
                );
              })}
            </div>

            <div
              className="hover-zone corner-zone"
              id="corner3"
              onClick={(event) => this.mouseEnterHandler(event, "corner")}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
            <div
              className="hover-zone corner-zone"
              id="corner4"
              onClick={(event) => this.mouseEnterHandler(event, "corner")}
              onMouseLeave={this.mouseLeaveHandler}
            ></div>
          </div>
        ) : (
          <div className="person-wrapper">
            <div className="hover-zone" onClick={(event) => this.mouseEnterHandler(event, "person")} onMouseLeave={this.mouseLeaveHandler}>
              <div className="white-box"></div>
            </div>
            <div className="hover-zone" onClick={(event) => this.mouseEnterHandler(event, "movie")} onMouseLeave={this.mouseLeaveHandler}>
              <div className="white-box"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page
  };
};

const mapDispatchToProps = {
  changePageNumber,
  mouseEnterCorner,
  mouseEnterPlant,
  mouseEnterMovie,
  hoveredChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(HoverZones);
