import React from "react";
import computer_science_icon from "../src/major_images/computer-science.png";
import computer_engineering_icon from "../src/major_images/computer-engineering.png";
import electrical_engineering_icon from "../src/major_images/electrical-engineering.png";
import mechanical_engineering_icon from "../src/major_images/mechanical-engineering.png";
import civil_engineering_icon from "../src/major_images/civil-engineering.png";
import chemical_engineering_icon from "../src/major_images/chemical-engineering.png";
import bioengineering_icon from "../src/major_images/biomedical-engineering.png";
import aerospace_engineering_icon from "../src/major_images/aerospace-engineering.png";
import i18next from "./i18n";

class Member extends React.Component {
  // lol this tutorial helped https://www.youtube.com/watch?v=taMJct5oeoI
  render() {
    var major_icon = "";
    if (this.props.member.major === "Computer Science") {
      major_icon = computer_science_icon;
    } else if (this.props.member.major === "Computer Engineering") {
      major_icon = computer_engineering_icon;
    } else if (this.props.member.major === "Electrical Engineering") {
      major_icon = electrical_engineering_icon;
    } else if (this.props.member.major === "Mechanical Engineering") {
      major_icon = mechanical_engineering_icon;
    } else if (this.props.member.major === "Civil Engineering") {
      major_icon = civil_engineering_icon;
    } else if (this.props.member.major === "Chemical Engineering") {
      major_icon = chemical_engineering_icon;
    } else if (this.props.member.major === "Biomedical Engineering") {
      major_icon = bioengineering_icon;
    } else if (this.props.member.major === "Aerospace Engineering") {
      major_icon = aerospace_engineering_icon;
    }

    var class_str = String(this.props.member.class);
    class_str = class_str.substr(2);
    if (class_str != undefined && class_str != "") {
      var class_div = (
        <div className="">
          {i18next.t("class-of")} '{class_str}
        </div>
      );
    }
    var img_src = this.props.member.img_src;
    if (img_src == undefined) {
    }

    return (
      <div className="member-profile">
        <img alt="member profile" src={img_src}></img>
        <div className="member-name">{this.props.member.name}</div>
        <div className="member-major">
          {i18next.t(this.props.member.major)}
          <img src={major_icon} />
        </div>
        {class_div}
        {/* <div>{this.props.member.hometown}</div> */}
        {/* <div className="italic">{this.props.member.catchphrase}</div> */}
      </div>
    );
  }
}

export default Member;
