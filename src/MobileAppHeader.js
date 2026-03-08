import React from "react";
import AppPagesEnum from "./AppPagesEnum.ts";
import history_icon from "./icons/history.png";
import gallery_icon from "./icons/gallery.png";
import home_icon from "./icons/home.png";
import mission_icon from "./icons/mission.png";
import members_icon from "./icons/members.png";
import silly_icon from "./icons/silly.png";
import PsiEps from "./PsiEps.png";
// import members_icon from "./icons/members.png"
import HeaderCollection from "./HeaderCollection.js";

class MobileAppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.headerCollection = (
      <HeaderCollection
        setPage={props.setPage}
        toggleModal={() => {
          this.toggleModal();
        }}
      />
    );
  }

  toggleModal() {
    console.log("openModal called");
    console.log("this.modalOpen is " + this.modalOpen);
    if (!this.modalOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
    this.modalOpen = !this.modalOpen;
  }
  componentDidMount() {
    this.svg = document.getElementById("modal-svg");
    this.header_collection = document.getElementById("header-collection");
    this.backdrop = document.getElementById("backdrop");
    this.body = document.getElementsByTagName("body")[0];
  }

  closeModal() {
    // animate the svg by rotating it 90 degrees
    this.svg.style.transform = "rotate(0)";
    this.header_collection.style.opacity = "0";
    this.header_collection.style.left = "-100%";
    this.backdrop.style.zIndex = "-1";
    this.backdrop.style.opacity = "0";
    this.body.style.overflowY = "auto";
  }
  openModal() {
    // animate the svg by rotating it 90 degrees
    this.svg.style.transform = "rotate(90deg)";
    this.header_collection.style.opacity = "1";
    this.header_collection.style.left = "0";
    this.backdrop.style.opacity = "1";
    this.backdrop.style.zIndex = "1";
    this.body.style.overflowY = "hidden";
  }
  modalOpen = false;

  render() {
    console.log("AppPagesEnum is ");
    console.log(AppPagesEnum);

    return (
      <div className="HeaderWrapper mobile-header">
        <head>
          <link rel="icon" href={PsiEps} />
          <title> Psi Epsilon Chapter </title>
        </head>
        <div>
          {/* <svg width="20vw" height="20vw" viewBox="0 0 210 297" id="svg5"> */}
          {/* <g id="layer1"> */}
          {/* <rect */}
          {/* id="rect846" */}
          {/* width="118.99841" */}
          {/* height="18.341551" */}
          {/* x="35.081596" */}
          {/* y="49.158695" */}
          {/* ry="9.1707754" */}
          {/* /> */}
          {/* <rect */}
          {/* id="rect846-3" */}
          {/* width="118.99841" */}
          {/* height="18.341551" */}
          {/* x="35.081596" */}
          {/* y="79.089935" */}
          {/* ry="9.1707754" */}
          {/* /> */}
          {/* <rect */}
          {/* id="rect846-3-6" */}
          {/* width="118.99841" */}
          {/* height="18.341551" */}
          {/* x="35.081596" */}
          {/* y="109.02118" */}
          {/* ry="9.1707754" */}
          {/* /> */}
          {/* </g> */}
          {/* </svg> */}

          <svg
            onClick={() => this.toggleModal()}
            fill="#000000"
            version="1.1"
            id="modal-svg"
            width="10vw"
            viewBox="0 0 24.75 24.75"
            className="mobile-menu-icon"
          >
            <g>
              <path
                d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
		c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
              />
            </g>
          </svg>
          <img id="logo" src={PsiEps} width="40vw" alt="Psi Epsilon Logo" />
          <div className="App-header MobileAppHeader">
            {this.headerCollection}
          </div>
        </div>
      </div>
    );
  }
}

export default MobileAppHeader;
