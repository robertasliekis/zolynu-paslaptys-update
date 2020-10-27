import React, { Component } from "react";
import BackgroundVideo from "../videos/video_page1.mp4";

export class VideoBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.videoRef = React.createRef();
  }
  render() {
    const setPlayBack = () => {
      this.videoRef.current.playbackRate = 10;
    };
    return (
      <div className="video-container">
        <video muted autoPlay ref={this.videoRef} onCanPlay={() => setPlayBack()}>
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        {/* <div className="background-image background-image-page1"></div> */}
      </div>
    );
  }
}

export default VideoBackground;
