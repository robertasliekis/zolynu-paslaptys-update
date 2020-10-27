import React, { Component } from "react";
import { connect } from "react-redux";

import { hoveredChanged } from "../actions";

export class HandImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handImageRef = React.createRef();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.hovered !== prevProps.hovered) {
      //this.handImageRef.current.classList.remove("hand-image-animation");
      //  this.handImageRef.current.classList.add("hand-image-animation");
      console.log(this.props.hovered);
      if (this.props.hovered) {
        this.handImageRef.current.classList.remove("hand-image-animation");
      } else {
        if (!this.props.movieOpen) {
          this.handImageRef.current.classList.add("hand-image-animation");
        }
      }
    }
  }

  componentDidMount() {
    if (!this.props.hovered) {
      this.handImageRef.current.classList.add("hand-image-animation");
    }
  }

  render() {
    return <div className="hand-image" ref={this.handImageRef}></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    hovered: state.hoveredChanged.hovered,
    movieOpen: state.mouseEnterMovie.movieOpen,
  };
};

const mapDispatchToProps = {
  hoveredChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandImage);
