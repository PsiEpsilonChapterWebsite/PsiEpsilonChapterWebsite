import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

class GalleryImage extends React.Component {
  randomRotation() {
    // console.log("Random rotation is being called");
    let rotation = Math.floor(Math.random() * 6) - 1;
    // console.log(`Rotation: ${rotation}`);
    return rotation;
  }

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      deg: this.props.deg,
      previousDeg: 0,
    };
    this.item = this.props.item;
    this.index = this.props.index;
  }

  handleMouseEnter = () => {
    this.setState({
      isHovered: true,
      deg: this.randomRotation(),
      previousDeg: this.state.deg,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      isHovered: false,
      deg: this.state.previousDeg,
      previousDeg: this.state.deg,
    });
  };

  render() {
    const scale = this.state.isHovered ? "scale(1.2)" : "";
    return (
      <PhotoView key={this.index} src={this.item}>
        <div
          className="polaroid"
          style={{
            transform: `rotate(${this.state.deg}deg) ${scale}`,
            zIndex: this.state.isHovered ? 1 : 0,
            position: "relative",
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <img src={this.item} alt="" />
          <div></div>
        </div>
      </PhotoView>
    );
  }
}

export default GalleryImage;
