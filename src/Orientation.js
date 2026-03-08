import React from "react";
import thetatau1 from "./thetatau1.jpg";
import GearUtils from "./Gears.jsx";
import i18next from "./i18n";

class Orientation extends React.Component {
  render() {
    var gears = GearUtils.getGearsOrientation();
    return (
      <div className="orientation">
        <div id="HowToJoin" className="hor-flex red-background">
          <div>
            <div className="joining-headers HowToJoinTitle">
              {i18next.t("how-do-i-join-title")}
            </div>{" "}
            <div className="right-aligned-vert">
              <div className="joining-headers">
                {i18next.t("recruitment-point-title")}
              </div>

              <p>{i18next.t("recruitment-point-content")}</p>

              <div className="joining-headers">
                {i18next.t("orientation-point-title")}
              </div>

              <p>{i18next.t("orientation-point-content")}</p>

              <div className="joining-headers">
                {i18next.t("testing-point-title")}
              </div>

              <p>{i18next.t("testing-point-content")}</p>

              <div className="joining-headers">
                {i18next.t("voting-point-title")}
              </div>

              <p>{i18next.t("voting-point-content")}</p>
            </div>
          </div>
          <div>
            <img src={thetatau1} width="50%" alt="" />
          </div>
        </div>
        {gears}
      </div>
    );
  }
}

export default Orientation;
