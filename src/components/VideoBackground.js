import React, { Component } from "react";
import { connect } from "react-redux";

import videoIntro0 from "../videos/intro/page0.mp4";
import videoIntro1 from "../videos/intro/page1.mp4";
import videoIntro2 from "../videos/intro/page2.mp4";
import videoIntro3 from "../videos/intro/page3.mp4";
import videoIntro4 from "../videos/intro/page4.mp4";
import videoIntro5 from "../videos/intro/page5.mp4";
import videoIntro6 from "../videos/intro/page6.mp4";
import videoIntro7 from "../videos/intro/page7.mp4";

import videoPlants0 from "../videos/plants/page1plants.mp4";
import videoPlants1 from "../videos/plants/page1plants.mp4";
import videoPlants2 from "../videos/plants/page2plants.mp4";
import videoPlants3 from "../videos/plants/page3plants.mp4";
import videoPlants4 from "../videos/plants/page4plants.mp4";
import videoPlants5 from "../videos/plants/page5plants.mp4";
import videoPlants6 from "../videos/plants/page6plants.mp4";
import videoPlants7 from "../videos/plants/page7plants.mp4";

import plantSound from "../sounds/plants_moving.mp3";

const videoIntro = [videoIntro0, videoIntro1, videoIntro2, videoIntro3, videoIntro4, videoIntro5, videoIntro6, videoIntro7];

const videoPlants = [videoPlants0, videoPlants1, videoPlants2, videoPlants3, videoPlants4, videoPlants5, videoPlants6, videoPlants7];

export class VideoBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.videoBackgroundRef = React.createRef();
    this.videoRef = React.createRef();
    this.cornerVideosContainerRef = React.createRef();
    this.cornerVideo1Ref = React.createRef();
    this.cornerVideo2Ref = React.createRef();
    this.cornerVideo3Ref = React.createRef();
    this.cornerVideo4Ref = React.createRef();

    this.plantAudio1Ref = React.createRef();
    this.plantAudio2Ref = React.createRef();
    this.plantAudio3Ref = React.createRef();
    this.plantAudio4Ref = React.createRef();
  }

  componentDidMount() {
    //  console.log(this.videoRef.current.readyState);
    //this.videoRef.current.play();

    this.videoBackgroundRef.current.classList.add("opacity-animation-class");
    this.cornerVideosContainerRef.current.classList.add("corner-videos-animation-class");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.page !== prevProps.page) {
      // this.videoRef.current.currentTime = 0;
      // this.videoRef.current.muted = true;
      // this.videoRef.current.play();
      this.videoBackgroundRef.current.classList.remove("opacity-animation-class");
      this.videoBackgroundRef.current.classList.add("opacity-animation-class");

      this.cornerVideosContainerRef.current.classList.remove("corner-videos-animation-class");
      this.cornerVideosContainerRef.current.classList.add("corner-videos-animation-class");
    }
    if (this.props.cornerIndex !== prevProps.cornerIndex) {
      switch (this.props.cornerIndex) {
        case "1":
          this.cornerVideo1Ref.current.play();
          this.plantAudio1Ref.current.play();
          break;
        case "2":
          this.cornerVideo2Ref.current.play();
          this.plantAudio2Ref.current.play();

          break;
        case "3":
          this.cornerVideo3Ref.current.play();
          this.plantAudio3Ref.current.play();

          break;
        case "4":
          this.cornerVideo4Ref.current.play();
          this.plantAudio4Ref.current.play();
          break;
        default:
      }
    }
  }

  render() {
    const setPlayBack = () => {
      this.videoRef.current.playbackRate = 1;
    };

    return (
      <div ref={this.videoBackgroundRef} className="video-background-container " key={`containerKey${this.props.page}`}>
        <video autoPlay muted ref={this.videoRef} onCanPlay={() => setPlayBack()} key={`videoKey${this.props.page}`}>
          <source src={videoIntro[this.props.page]} type="video/mp4" />
        </video>
        <div
          className="corner-videos-container "
          ref={this.cornerVideosContainerRef}
          key={`cornerVideosContainerKey${this.props.page}`}
          style={{ display: this.props.page > 0 ? "flex" : "none" }}
        >
          <div className="video-box bottom left" style={{ height: this.props.page > 5 ? "69%" : "50%" }}>
            <video
              autoPlay
              muted
              type="video/mp4"
              ref={this.cornerVideo2Ref}
              className="video-bottom-left"
              key={`cornerVideo${this.props.page}`}
            >
              <source src={videoPlants[this.props.page]} type="video/mp4" />
            </video>
            <audio ref={this.plantAudio2Ref}>
              <source src={plantSound}></source>
            </audio>
          </div>
          <div className="video-box bottom right" style={{ height: this.props.page > 5 ? "69%" : "50%" }}>
            <video
              autoPlay
              muted
              type="video/mp4"
              ref={this.cornerVideo4Ref}
              className="video-bottom-right"
              key={`cornerVideo${this.props.page}`}
            >
              <source src={videoPlants[this.props.page]} type="video/mp4" />
            </video>
            <audio ref={this.plantAudio4Ref}>
              <source src={plantSound}></source>
            </audio>
          </div>
          <div className="video-box top left" style={{ height: this.props.page > 5 ? "31%" : "50%" }}>
            <video
              autoPlay
              muted
              type="video/mp4"
              ref={this.cornerVideo1Ref}
              className="video-top-left"
              key={`cornerVideo${this.props.page}`}
            >
              <source src={videoPlants[this.props.page]} type="video/mp4" />
            </video>
            <audio ref={this.plantAudio1Ref}>
              <source src={plantSound}></source>
            </audio>
          </div>
          <div className="video-box top right" style={{ height: this.props.page > 5 ? "31%" : "50%" }}>
            <video
              autoPlay
              muted
              type="video/mp4"
              ref={this.cornerVideo3Ref}
              className="video-top-right"
              key={`cornerVideo${this.props.page}`}
            >
              <source src={videoPlants[this.props.page]} type="video/mp4" />
            </video>
            <audio ref={this.plantAudio3Ref}>
              <source src={plantSound}></source>
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.changePageNumber.page,
    cornerIndex: state.mouseEnterCorner.cornerIndex
  };
};

export default connect(mapStateToProps)(VideoBackground);
