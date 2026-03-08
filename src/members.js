import React from "react";
import member_list from "./member_list";
import Member from "./member";
import PsiEpsilonImageGray from "../src/PsiEpsProfileGray.png";
import Footer from "./Footer";
import i18next from "./i18n";

class Members extends React.Component {
  importAll(r) {
    console.log("r is ");
    console.log(r);
    console.log(r.keys());
    var mapped_arr = r.keys().map(r);
    var local_arr = r.keys();
    return [mapped_arr, local_arr];
  }
  componentWillMount() {
    var temp = this.importAll(
      require.context("../public/images/member_images/", false, /\.(png)$/)
    );

    this.listOfImages = temp[0];
    this.listOfImageSrcs = temp[1];
  }

  render() {
    var retHTML = [];
    console.log("List of images is ");
    console.log(this.listOfImages);
    for (const [key, value] of Object.entries(member_list.members)) {
      console.log("replaced version is ");
      var modded_src = undefined;
      if (value.img_src == undefined) {
        modded_src = PsiEpsilonImageGray;
      } else {
        modded_src = value["img_src"].replace("./public", ".");
      }

      console.log(modded_src);
      var img_src_ind = this.listOfImageSrcs.indexOf(modded_src);
      console.log("Image src index is ");
      console.log(img_src_ind);
      var replace = value;

      console.log("img_src_ind is ");
      console.log(img_src_ind);
      var replacementImage = this.listOfImages[img_src_ind];
      if (img_src_ind != -1) {
        console.log("img_src_ind is positive ");
        replacementImage = this.listOfImages[img_src_ind];
      }
      replace.major = i18next.t(replace.major);
      replace.img_src = replacementImage;
      // if (modded_src == value["img_src"]) {
      // replace.img_src = PsiEpsilonImageGray;
      // }

      // console.log("Img src is ");
      // console.log(img_src);

      if (replace.include != undefined && replace.include == false) {
        continue;
      }
      retHTML.push(<Member member={replace} />);
    }
    return <div className="member-display">{retHTML}</div>;
  }
}

export default Members;
