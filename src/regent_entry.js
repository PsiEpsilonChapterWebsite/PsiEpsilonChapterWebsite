import React from "react";
import i18next from "./i18n";

class Regent extends React.Component {
  // lol this tutorial helped https://www.youtube.com/watch?v=taMJct5oeoI
  render() {
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
    var time_of_regency = this.props.time_of_regency;
    console.log("time_of_regency");
    console.log(time_of_regency);

    return (
      <div className="member-profile">
        <img alt="member profile" src={img_src}></img>
        <div className="member-name">{this.props.member.name}</div>
        {class_div}
        <p>{time_of_regency}</p>
      </div>
    );
  }
}

export default Regent;
