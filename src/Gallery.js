import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import React from "react";
import GalleryImage from "./GalleryImage";
import i18next from "./i18n";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.listOfImages = [];
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  importAll(r) {
    return r.keys().map(r);
  }

  componentWillMount() {
    this.listOfImages = this.importAll(
      require.context("../public/images/", false, /\.(png)$/)
    );
  }

  randomRotation() {
    // console.log("Random rotation is being called");
    let rotation = Math.floor(Math.random() * 6) - 1;
    // console.log(`Rotation: ${rotation}`);
    return rotation;
  }

  render() {
    let thumbImageUrls = this.listOfImages;
    // console.log(`thumbImageUrls: ${thumbImageUrls}`);
    // console.log(`listOfImages: ${this.listOfImages}`);
    var innerItems = this.listOfImages.map((item, index) => {
      var deg = this.randomRotation();
      var props = {
        key: index,
        src: item,
        index: index,
        deg: deg,
      };
      return <GalleryImage index={index} item={item} deg={deg} />;
    });
    return (
      <PhotoProvider>
        <div>{i18next.t("gallery_click_prompt")}</div>
        <div className="gallery-list">{innerItems}</div>
      </PhotoProvider>
    );
  }
}

export default Gallery;
