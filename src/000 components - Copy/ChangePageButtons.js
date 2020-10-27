import React, { Component } from "react";
import { connect } from "react-redux";
import { changePageNumber, hoveredChange } from "../actions";

export class ChangePageButtons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonBackClick = this.handleButtonBackClick.bind(this);
    this.handleButtonNextClick = this.handleButtonNextClick.bind(this);
  }

  handleButtonBackClick() {
    this.props.changePageNumber(-1);
    this.props.hoveredChange(false);
  }
  handleButtonNextClick() {
    this.props.changePageNumber(1);
    this.props.hoveredChange(false);
  }

  render() {
    return (
      <div
        className="change-page-buttons"
        style={{ justifyContent: this.props.pageNumber === -1 ? "flex-end" : "space-between" }}
      >
        <div
          className="btn btn-back"
          style={{ display: this.props.pageNumber === -1 ? "none" : "flex", opacity: 0 }}
          onClick={this.handleButtonBackClick}
        >
          BACK
        </div>
        <h1>PAGE {this.props.pageNumber}</h1>
        <div
          className="btn btn-next"
          style={{ display: this.props.pageNumber > 6 ? "none" : "flex", opacity: 0 }}
          onClick={this.handleButtonNextClick}
        >
          NEXT
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.changePageNumber.pageNumber,
  };
};

const mapDispatchToProps = {
  hoveredChange,
  changePageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButtons);
