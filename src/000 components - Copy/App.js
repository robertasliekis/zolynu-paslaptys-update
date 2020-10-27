import React from "react";
import ChangePageButtons from "./components/ChangePageButtons";
import Audio from "./components/Audio";
import HoverZones from "./components/HoverZones";
import VideoBackground from "./components/VideoBackground";
import { connect } from "react-redux";

import "./App.css";
//"homepage": "http://https://robertasliekis.github.io/zolynu-paslaptys/",
//"homepage": "http://localhost:3000/",

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="content-wrapper">
          <ChangePageButtons />
          {/* <Audio /> */}
          <VideoBackground />
          <HoverZones />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.changePageNumber.pageNumber
  };
};

export default connect(mapStateToProps)(App);
