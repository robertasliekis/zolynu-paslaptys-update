import React, { Component } from "react";
import { connect } from "react-redux";
import { changePageNumber, hoveredChanged } from "../actions";

export class ChangePageButtons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonBackClick = this.handleButtonBackClick.bind(this);
    this.handleButtonNextClick = this.handleButtonNextClick.bind(this);
  }

  handleButtonBackClick() {
    let currentPage = this.props.page - 1;
    this.props.changePageNumber(currentPage);
  }
  handleButtonNextClick() {
    let currentPage = this.props.page + 1;
    this.props.changePageNumber(currentPage);
  }

  mouseEnterHandler = () => {
    this.props.hoveredChanged(false);
  };

  render() {
    return (
      <div
        className="change-page-buttons"
        style={{ justifyContent: this.props.page === 0 ? "flex-end" : "space-between" }}
      >
        <div
          className="btn btn-back"
          style={{ display: this.props.page === 0 ? "none" : "flex" }}
          onClick={this.handleButtonBackClick}
          onMouseEnter={this.mouseEnterHandler}
        >
          BACK
        </div>
        <h1>PAGE {this.props.page}</h1>
        <div
          className="btn btn-next"
          style={{ display: this.props.page > 6 ? "none" : "flex" }}
          onClick={this.handleButtonNextClick}
          onMouseEnter={this.mouseEnterHandler}
        >
          NEXT
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButtons);
