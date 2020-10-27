import React, { Component } from "react";
import { connect } from "react-redux";

import { changePageNumber } from "../actions";

import videoIntro0 from "../videos/page0.mp4";
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

import openPage from "../videos/open_page.mp4";
import openPageMovie from "../videos/open_page_movie.mp4";
import movie from "../videos/ziniuone_movie.mp4";

import forrestSound from "../sounds/forrest.wav";
import meadowSound from "../sounds/meadow.wav";
import gardenSound from "../sounds/garden.wav";
import plantSound from "../sounds/plants_moving.mp3";

//import plants from "./PlantsInfo";

const plantContainerNumbers = [1, 2, 3, 4];

const imageNumbers = [1, 2, 3, 4, 1];

const videoIntro = [videoIntro0, videoIntro1, videoIntro2, videoIntro3, videoIntro4, videoIntro5, videoIntro6, videoIntro7];

const videoPlants = [videoPlants0, videoPlants1, videoPlants2, videoPlants3, videoPlants4, videoPlants5, videoPlants6, videoPlants7];

export class InfoContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personContainerOpen: false,
      videoContainerOpen: false,
      plantDisplay: false,
      imageCarouselScaled: false,
      clickedPlantIndex: 0,
      hovered: false,
      hoveredType: "",
      hoveredCornerRef: "",
      textScrollColumn: 1,
      handDisplay: false
    };
    this.timerHand = null;
    this.videoRef = React.createRef();
    this.cornerVideoLeftRef = React.createRef();
    this.cornerVideoRightRef = React.createRef();
    this.cornerVideoLeftTopRef = React.createRef();
    this.cornerVideoRightTopRef = React.createRef();
    this.containerZoneRef = React.createRef();
    this.openPageVideoRef = React.createRef();
    this.openPageMovieRef = React.createRef();
    this.movieRef = React.createRef();
    this.audioForrestRef = React.createRef();
    this.audioMeadowRef = React.createRef();
    this.audioGardenRef = React.createRef();
    this.plantAudioLeftRef = React.createRef();
    this.plantAudioRightRef = React.createRef();
  }

  //Hover plant handler start
  mouseEnterHandler = (event, type, ref) => {
    this.clearTimerHand();
    this.setState({ hovered: true, hoveredType: type, handDisplay: false });
    switch (type) {
      case "person":
        if (ref.current.readyState === 4) {
          ref.current.play();
        }
        break;
      case "video":
        ref.current.play();
        break;
      case "plant":
        if (ref.current.readyState === 4) {
          ref.current.play();
        }
        let clickedPlantId = event.target.id;

        let clickedPlantIndex = clickedPlantId.replace("plant", "") - 1;
        this.setState({
          clickedPlantIndex: clickedPlantIndex
        });
        break;
      default:
        break;
    }
  };

  mouseLeaveHandler = () => {
    this.clearTimer();
    this.clearTimerHand();
    this.setState({ hovered: false, handDisplay: false });
  };

  onTimeout = () => {
    this.clearTimerHand();
    switch (this.state.hoveredType) {
      case "person": {
        this.setState({
          personContainerOpen: true
        });
        break;
      }
      case "video": {
        this.setState({
          videoContainerOpen: true
        });
        this.audioForrestRef.current.pause();
        this.openPageMovieRef.current.play();
        this.movieRef.current.play();
        break;
      }
      case "play": {
        this.movieRef.current.play();
        break;
      }
      case "pause": {
        this.movieRef.current.pause();
        break;
      }
      case "plant":
        this.setState({
          plantDisplay: true
        });
        break;
      case "image-carousel-scaled":
        let currentState = this.state.imageCarouselScaled;
        this.setState({
          imageCarouselScaled: !currentState,
          hovered: false
        });
        break;
      case "corner-left":
        this.cornerVideoLeftRef.current.play();
        this.plantAudioLeftRef.current.play();
        break;
      case "corner-right":
        this.cornerVideoRightRef.current.play();
        this.plantAudioRightRef.current.play();
        break;
      case "corner-left-top":
        this.cornerVideoLeftTopRef.current.play();
        this.plantAudioLeftRef.current.play();
        break;
      case "corner-right-top":
        this.cornerVideoRightTopRef.current.play();
        this.plantAudioRightRef.current.play();
        break;
      case "close":
        this.setState({
          hovered: false,
          plantDisplay: false,
          personContainerOpen: false,
          videoContainerOpen: false,
          textScrollColumn: 1,
          imageCarouselScaled: false
        });

        this.clearTimer();
        if (this.props.pageNumber === 0) {
          this.movieRef.current.currentTime = 0;
          this.movieRef.current.pause();
        }

        break;
      case "scroll":
        let activeColumn;
        if (this.props.pageNumber > 0) {
          activeColumn = plants[this.state.clickedPlantIndex].textColumns;
        } else {
          activeColumn = person.textColumns;
        }

        if (this.state.textScrollColumn < activeColumn) {
          let columnCurrent = this.state.textScrollColumn + 1;
          this.setState({
            textScrollColumn: columnCurrent
          });
        } else {
          this.setState({
            textScrollColumn: 1
          });
        }

        this.setState({
          hovered: false
        });
        this.clearTimer();
        break;
      case "reset":
        this.props.changePageNumber(-1);
        break;
      default:
    }
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  clearTimerHand = () => {
    clearTimeout(this.timerHand);
  };

  //Hover plant handler end

  componentWillUnmount() {
    this.clearTimer();
    this.clearTimerHand();
  }

  componentDidUpdate(prevProps, prevState) {
    //Open plant container after hovering x seconds
    if (this.state.hovered !== prevProps.hovered) {
      if (this.state.hovered) {
        clearTimeout(this.timerHand);
        //  this.clearTimerHand();
        let hoverTime;
        if (this.state.hoveredType === "plant") {
          hoverTime = 1400;
        } else if (this.state.hoveredType === "close") {
          hoverTime = 1000;
        } else if (
          this.state.hoveredType === "corner-left-top" ||
          this.state.hoveredType === "corner-right-top" ||
          this.state.hoveredType === "corner-right" ||
          this.state.hoveredType === "corner-left"
        ) {
          hoverTime = 50;
        } else if (this.state.hoveredType === "reset") {
          hoverTime = 60000;
        } else if (this.state.hoveredType === "video") {
          hoverTime = 1500;
        } else {
          hoverTime = 500;
        }
        this.timer = setTimeout(this.onTimeout, hoverTime);
      } else {
        this.clearTimer();
      }
    }

    if (this.props.pageNumber === this.props.pageNumber) {
      if (this.props.pageNumber >= 0 && this.props.pageNumber < 4 && this.audioForrestRef.current !== null) {
        this.audioForrestRef.current.volume = 0.01;
      } else if (this.props.pageNumber >= 4 && this.props.pageNumber < 6 && this.audioMeadowRef.current !== null) {
        this.audioMeadowRef.current.volume = 0.06;
      } else if (this.props.pageNumber >= 6 && this.audioGardenRef.current !== null) {
        this.audioGardenRef.current.volume = 1;
      }
    }
    if (this.props.pageNumber >= 0 && this.props.pageNumber !== prevProps.pageNumber) {
      // if (
      //   this.props.pageNumber >= 0 &&
      //   this.props.pageNumber <= 2 &&
      //   !this.state.videoContainerOpen
      // ) {
      //   if (this.audioForrestRef.current.readyState >= 2) {
      //     this.audioForrestRef.current.play();
      //     this.audioForrestRef.current.volume = 0.01;
      //     this.audioMeadowRef.current.pause();
      //     this.audioGardenRef.current.pause();
      //   }
      // } else if (this.props.pageNumber > 2 && this.props.pageNumber <= 5) {
      //   if (this.audioMeadowRef.current.readyState >= 2) {
      //     this.audioMeadowRef.current.play();
      //     this.audioMeadowRef.current.volume = 0.06;
      //     this.audioForrestRef.current.pause();
      //     this.audioGardenRef.current.pause();
      //   }
      // } else if (this.props.pageNumber > 5) {
      //   if (this.audioGardenRef.current.readyState >= 2) {
      //     this.audioGardenRef.current.play();
      //     this.audioGardenRef.current.volume = 1;

      //     this.audioMeadowRef.current.pause();
      //     this.audioForrestRef.current.pause();
      //   }
      // }

      // this.videoRef.current.pause();

      if (this.videoRef.current.readyState >= 3) {
        this.videoRef.current.currentTime = 0;
        this.videoRef.current.play();
      }

      this.clearTimerHand();
      this.clearTimer();
      this.setState({
        hovered: false,
        plantDisplay: false,
        handDisplay: false,
        personContainerOpen: false,
        videoContainerOpen: false,
        textScrollColumn: 1,
        imageCarouselScaled: false
      });

      this.movieRef.current.pause();
      this.movieRef.current.currentTime = 0;

      //change page animation

      this.containerZoneRef.current.classList.remove("container-zones-animation");
      if (this.containerZoneRef.current.classList.contains("container-zones" + this.props.pageNumber)) {
        this.containerZoneRef.current.classList.add("container-zones-animation");
      }
    }
  }

  componentDidMount() {
    if (this.props.pageNumber === this.props.page) {
      this.audioForrestRef.current.volume = 0.01;
    }
    if (this.containerZoneRef.current.classList.contains("container-zones0")) {
      this.containerZoneRef.current.classList.add("container-zones-animation");
    }
  }

  render() {
    let plantInfoClassName = this.state.plantDisplay ? "plant-info-container-clicked" : "";
    let personContainerClassName = this.state.personContainerOpen ? "window-opened" : "";
    let videoContainerClassName = this.state.videoContainerOpen ? "window-opened" : "";
    let windowButtonsClassName =
      this.state.plantDisplay || this.state.personContainerOpen || this.state.videoContainerOpen ? "window-buttons-animation" : "";

    let videoScreenClassName = this.state.videoContainerOpen ? "video-screen-open" : "";

    let handImageClassName = !this.state.hovered ? "" : "hand-image-animation";

    let imageContainerClassName = this.state.plantDisplay || this.state.personContainerOpen ? "image-container-animation" : "";

    //Plants numbering by page
    const plantNumbers = [
      this.props.pageNumber * 4 - 3,
      this.props.pageNumber * 4 - 2,
      this.props.pageNumber * 4 - 1,
      this.props.pageNumber * 4
    ];

    //gera

    //Video playback speed
    const setPlayBack = () => {
      this.videoRef.current.playbackRate = 1;
    };

    return (
      <div className="info-containers info-containers-plants">
        {this.props.pageNumber === this.props.page ? (
          <div>
            {this.props.pageNumber >= 0 && this.props.pageNumber < 4 ? (
              <audio loop autoPlay ref={this.audioForrestRef}>
                <source src={forrestSound}></source>
              </audio>
            ) : (
              ""
            )}
            {this.props.pageNumber >= 4 && this.props.pageNumber < 6 ? (
              <audio loop autoPlay ref={this.audioMeadowRef}>
                <source src={meadowSound}></source>
              </audio>
            ) : (
              ""
            )}
            {this.props.pageNumber >= 6 ? (
              <audio loop autoPlay ref={this.audioGardenRef}>
                <source src={gardenSound}></source>
              </audio>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
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
        <div className={`hand-image ` + handImageClassName} style={{}}></div>
        {/* audio files------------------- */}

        {/* audio files------------------- */}
        <div className="video-container">
          {this.props.page > 0 ? (
            <video muted ref={this.videoRef} onCanPlay={() => setPlayBack()}>
              <source src={videoIntro[this.props.page]} type="video/mp4" />
            </video>
          ) : (
            <video autoPlay muted ref={this.videoRef} onCanPlay={() => setPlayBack()}>
              <source src={videoIntro[0]} type="video/mp4" />
            </video>
          )}
          {/* <div
            className="hand-image"
            style={{ display: this.state.handDisplay ? "flex" : "none" }}
          ></div> */}
        </div>
        <div className={`container-zones container-zones${this.props.page}`} ref={this.containerZoneRef}>
          {this.props.page > 0 ? (
            <div className="plants-wrapper">
              {plantContainerNumbers.map((number, index) => {
                return (
                  <div
                    className={`plant plant${number}`}
                    id={`plant${plantNumbers[index]}`}
                    key={`plant${number}`}
                    onMouseEnter={(event) => this.mouseEnterHandler(event, "plant", this.openPageVideoRef)}
                    onMouseLeave={this.mouseLeaveHandler}
                  >
                    {/* {plantNumbers[index]} */}
                    <div className={`hover-box${number} hover-box`} id={`plant${plantNumbers[index]}`}></div>
                  </div>
                );
              })}
              <div className="corner-videos-container">
                <div className="video-box bottom left" style={{ height: this.props.pageNumber > 5 ? "69%" : "50%" }}>
                  <video muted type="video/mp4" ref={this.cornerVideoLeftRef} className="video-bottom-left">
                    <source src={videoPlants[this.props.page]} type="video/mp4" />
                  </video>
                  <audio ref={this.plantAudioLeftRef}>
                    <source src={plantSound}></source>
                  </audio>
                </div>
                <div className="video-box bottom right" style={{ height: this.props.pageNumber > 5 ? "69%" : "50%" }}>
                  <video muted type="video/mp4" ref={this.cornerVideoRightRef} className="video-bottom-right">
                    <source src={videoPlants[this.props.page]} type="video/mp4" />
                  </video>
                  <audio ref={this.plantAudioRightRef}>
                    <source src={plantSound}></source>
                  </audio>
                </div>
                <div className="video-box top left" style={{ height: this.props.pageNumber > 5 ? "31%" : "50%" }}>
                  <video muted type="video/mp4" ref={this.cornerVideoLeftTopRef} className="video-top-left">
                    <source src={videoPlants[this.props.page]} type="video/mp4" />
                  </video>
                  <audio ref={this.plantAudioLeftRef}>
                    <source src={plantSound}></source>
                  </audio>
                </div>
                <div className="video-box top right" style={{ height: this.props.pageNumber > 5 ? "31%" : "50%" }}>
                  <video muted type="video/mp4" ref={this.cornerVideoRightTopRef} className="video-top-right">
                    <source src={videoPlants[this.props.page]} type="video/mp4" />
                  </video>
                  <audio ref={this.plantAudioRightRef}>
                    <source src={plantSound}></source>
                  </audio>
                </div>
              </div>

              <div
                className="border-box-left-button border-box-button border-box-left border-box"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "corner-left", this.cornerVideoLeftRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
              <div
                className="border-box-right-button border-box-button border-box-right border-box"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "corner-right", this.cornerVideoRightRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
              <div
                className="border-box-left-button border-box-button border-box-left border-box-top-button border-box"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "corner-left-top", this.cornerVideoLeftTopRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
              <div
                className="border-box-right-button border-box-button border-box-right border-box-top-button border-box"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "corner-right-top", this.cornerVideoRightTopRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
            </div>
          ) : (
            <div className="person-wrapper">
              <div
                className="container-left container author-info"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "person", this.openPageVideoRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
              <div
                className="container-right container video-info"
                onMouseEnter={(event) => this.mouseEnterHandler(event, "video", this.openPageMovieRef)}
                onMouseLeave={this.mouseLeaveHandler}
              ></div>
            </div>
          )}
        </div>

        <div className={"window " + plantInfoClassName + personContainerClassName}>
          <video muted ref={this.openPageVideoRef}>
            <source src={openPage} type="video/mp4" />
          </video>
          <div className={"window-content"}>
            <div className="content content-left">
              <div
                className={`image-container plant-image-container ` + imageContainerClassName}
                style={{ transform: this.state.imageCarouselScaled ? "scale(1.5)" : "scale(1)" }}
                onMouseEnter={(event) => this.mouseEnterHandler(event, "image-carousel-scaled", undefined)}
                onMouseLeave={this.mouseLeaveHandler}
              >
                <div className="image-frame"></div>
                <div className="image-carousel-overflow">
                  <div className="image-carousel plant-image-carousel">
                    {imageNumbers.map((imageNumber, index) => {
                      let imageUrl;

                      this.props.page > 0
                        ? (imageUrl = require(`../images/plants/${plants[this.state.clickedPlantIndex].imageName}${imageNumber}.jpg`))
                        : (imageUrl = require(`../images/simkunaite/simkunaite${imageNumber}.jpg`));
                      return (
                        <div
                          key={"image" + index}
                          style={{
                            backgroundImage: `url(${imageUrl})`
                          }}
                          className="image"
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="content content-right">
              <div className="text-container">
                <h1>{this.props.pageNumber > 0 ? plants[this.state.clickedPlantIndex].name : person.name}</h1>
                <div className="text-carousel">
                  <p
                    style={{
                      transform: `translateX(calc(${this.state.textScrollColumn - 1}*(-100% - 4rem)))`
                    }}
                  >
                    {this.props.pageNumber > 0 ? plants[this.state.clickedPlantIndex].description : person.description}
                  </p>
                </div>
                <div className={`window-buttons ` + windowButtonsClassName}>
                  <div
                    className="btn btn-close"
                    onMouseEnter={(event) => this.mouseEnterHandler(event, "close", undefined)}
                    onMouseLeave={this.mouseLeaveHandler}
                  >
                    <div className="hover-box hover-box-left"></div>
                  </div>
                  <div
                    className="btn btn-scroll"
                    onMouseEnter={(event) => this.mouseEnterHandler(event, "scroll", undefined)}
                    onMouseLeave={this.mouseLeaveHandler}
                  >
                    <div className="hover-box hover-box-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"window window-movie " + videoContainerClassName}>
          <video muted ref={this.openPageMovieRef}>
            <source src={openPageMovie} type="video/mp4" />
          </video>
          <div className="window-content" style={{ display: this.props.pageNumber === 0 ? "flex" : "none" }}>
            <div className={`video-screen ` + videoScreenClassName}>
              <video ref={this.movieRef}>
                <source src={movie} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className={`window-buttons window-buttons-movie ` + windowButtonsClassName}>
            <div
              className="btn btn-play"
              onMouseEnter={(event) => this.mouseEnterHandler(event, "play", this.movieRef)}
              onMouseLeave={this.mouseLeaveHandler}
            >
            </div>
            <div
              className="btn btn-pause"
              onMouseEnter={(event) => this.mouseEnterHandler(event, "pause", this.movieRef)}
              onMouseLeave={this.mouseLeaveHandler}
            >
            </div>
            <div
              className="btn btn-close"
              onMouseEnter={(event) => this.mouseEnterHandler(event, "close", undefined)}
              onMouseLeave={this.mouseLeaveHandler}
            >
            </div>
          </div>
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

const mapDispatchToProps = {
  changePageNumber,
  mouseEnterCorner
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainers);
