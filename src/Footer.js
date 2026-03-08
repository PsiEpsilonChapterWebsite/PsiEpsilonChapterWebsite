import React from "react";
import theta_tau_logo from "./theta-tau.png";
import instagram_logo from "./icons/instagram-logo.png";
import facebook_logo from "./icons/facebook-logo.png";
import discord_logo from "./icons/discord-logo.png";
import GearUtils from "./Gears.jsx";
import i18next from "./i18n";

class Footer extends React.Component {
  render() {
    var gears = GearUtils.getGearsFooter();
    return (
      <div className="footer">
        {" "}
        <img className="theta-tau-logo" src={theta_tau_logo} />{" "}
        <div>
          <div>
            <div>
              <div className="big">{i18next.t("contact-title")}</div>
              <p> psiepsilonchapter@gmail.com </p>
            </div>
            <div>
              <div className="big">{i18next.t("address-title")}</div>
              <p>150W. University Boulevard, 32901 Melbourne, FL </p>
            </div>
            <div>
              <div className="big">{i18next.t("socials-title")}</div>
              <div className="social-icons">
                <img
                  src={instagram_logo}
                  onClick={() => {
                    // direct to instagram page
                    window.open(
                      "https://www.instagram.com/thetataufloridatech/"
                    );
                  }}
                />
                <img
                  src={facebook_logo}
                  onClick={() => {
                    window.open("https://www.facebook.com/FloridaTechThetaTau");
                  }}
                />
                <img id="discord_logo" src={discord_logo} />
              </div>
            </div>
            <br />
            <div>
              <div className="big">{i18next.t("credits-title")}</div>
            </div>
          </div>
        </div>
        {gears}
      </div>
    );
  }
}

export default Footer;
