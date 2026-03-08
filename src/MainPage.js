import React from "react";
import MainCarousel from "./MainCarousel";
import "./index.css";
import Orientation from "./Orientation";
import Contact from "./Contact";
import thetatau2 from "./thetatau2.jpg";
import PirateLaneCleanup from "../src/images/everyone_piratelane_cleanup_cropped.png";
import EveryoneCamping from "../src/images/everyone_camping_upscaled_cropped.png";
import ThetaPaddle from "../src/images/theta_paddle.png";
import GarrettPeterFacebook from "../src/images/garrett_peter_facebook.png";
import OldCafeteriaEveryone from "../src/images/old_cafeteria_everyone2.png";
import GarretPresidentsCup from "../src/images/garrett_presidents_cup.png";
import RanMichaelPeter from "../src/images/ran_michael_peter.png";
import sus_regionals from "../src/images/sus_regionals.png";
import adli_landon_cleanup_cropped from "../src/images/adli_landon_cleanup_cropped.png";
import i18next from "./i18n";
import { Trans } from "react-i18next";

class MainPage extends React.Component {
  render() {
    let isMobile = this.props.isMobile;
    let volunteeringContent = (
      <div className="MainPointContent">{i18next.t("we_provide_service")} </div>
    );
    let volunteeringDistributePics = (
      <div className="distribute-pics">
        {" "}
        <div className="polaroid" style={{ transform: "rotate(+3deg)" }}>
          {" "}
          <img
            id="pirate-lane-cleanup"
            alt="Changeme"
            src={PirateLaneCleanup}
          />{" "}
          <div className="polaroid-content"></div>{" "}
        </div>{" "}
        <div className="polaroid" style={{ transform: "rotate(-3deg)" }}>
          {" "}
          <img
            id="pirate-lane-cleanup"
            alt="Changeme"
            src={adli_landon_cleanup_cropped}
          />{" "}
          <div className="polaroid-content"></div>{" "}
        </div>{" "}
        <div className="polaroid" style={{ transform: "rotate(+3deg)" }}>
          {" "}
          <img
            id="pirate-lane-cleanup"
            alt="Changeme"
            src={OldCafeteriaEveryone}
          />{" "}
          <div className="polaroid-content"></div>{" "}
        </div>{" "}
      </div>
    );
    console.log("This state's isMobile is ", this.props.isMobile);
    let greetingPicture = (
      <div className="greeting-picture polaroid ">
        {" "}
        <img id="greeting-picture" alt="Changeme" src={thetatau2} />{" "}
      </div>
    );
    let volunteeringInner = [volunteeringContent, volunteeringDistributePics];
    if (this.props.isMobile) {
      volunteeringInner = [volunteeringDistributePics, volunteeringContent];
      greetingPicture = "";
    }
    return (
      <div className="MainPage">
        <MainCarousel />
        <div className="main-content">
          <div id="WhatIsThetaTau" className="what-is-theta-tau hor-flex">
            <h1>{i18next.t("what-is-theta-tau")}</h1>
            <div
              id="greeting-content"
              className="greeting-content mainpage-text-and-images"
            >
              {greetingPicture}
              <div className="MainPointContent">
                <Trans i18nKey="what-is-theta-tau-theta-tau-part1" />{" "}
                <Trans
                  i18nKey="what-is-theta-tau-coed-professional"
                  components={[<b />]}
                />
                {/* https://stackoverflow.com/questions/61268001/react-i18n-trans-component-with-translations-that-contain-html-tags-not-working */}
                <Trans i18nKey="what-is-theta-tau-focus" />{" "}
                <Trans
                  i18nKey="what-is-theta-tau-professional-development"
                  components={[<b />]}
                />
                <Trans
                  i18nKey="what-is-theta-tau-brotherhood"
                  components={[<b />]}
                />{" "}
                <Trans
                  i18nKey="what-is-theta-tau-volunteering"
                  components={[<b />]}
                />
              </div>
            </div>
          </div>
          <div className="MissionStatement">
            <h1>{i18next.t("mission-title")}</h1>
            <div className="MainPointContent">
              {i18next.t("mission_statement")}
            </div>
          </div>
          <div id="MainPoints">
            <div>
              <h1>{i18next.t("professionalism-title")}</h1>
              <div className="mainpage-text-and-images">
                <div className="distribute-pics">
                  <div
                    className="polaroid"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={GarretPresidentsCup}
                    />

                    <div className="polaroid-content"></div>
                  </div>
                  <div
                    className="polaroid"
                    style={{ transform: "rotate(+3deg)" }}
                  >
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={RanMichaelPeter}
                    />
                    <div className="polaroid-content"></div>
                  </div>
                  <div className="polaroid">
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={sus_regionals}
                    />
                    <div className="polaroid-content"> </div>
                  </div>
                </div>
                <div className="MainPointContent">
                  {i18next.t("we_provide_professional")}
                </div>
              </div>
            </div>
            <div>
              <h1>{i18next.t("volunteering-title")}</h1>
              <div className="mainpage-text-and-images">
                {volunteeringInner}
              </div>
            </div>
            <div>
              <h1>{i18next.t("brotherhood-title")}</h1>
              <div className="mainpage-text-and-images">
                <div className="distribute-pics">
                  <div
                    className="polaroid"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={EveryoneCamping}
                    />

                    <div className="polaroid-content"></div>
                  </div>

                  <div
                    className="polaroid"
                    style={{ transform: "rotate(+3deg)" }}
                  >
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={ThetaPaddle}
                    />
                    <div className="polaroid-content"></div>
                  </div>
                  <div
                    className="polaroid"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <img
                      id="pirate-lane-cleanup"
                      alt="Changeme"
                      src={GarrettPeterFacebook}
                    />

                    <div className="polaroid-content"></div>
                  </div>
                </div>
                <div className="MainPointContent">
                  {i18next.t("we_provide_brotherhood")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
