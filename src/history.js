import React from "react";
import member_list from "./member_list";
import Regent from "./regent_entry.js";
import FamilyTreeComponent from "./FamilyTreeComponent.js";
import CytoScapeFamilyTree from "./CytoScapeFamilyTree.js";
import i18next from "./i18n";

class History extends React.Component {
  render() {
    var previousRegents = [];
    for (const [key, value] of Object.entries(member_list.regents.previous)) {
      console.log(`There are ${value.length} regents`);
      for (var i = 0; i < value.length; i++) {
        var regent_prof = member_list["members"][value[i]];
        console.log("regent_prof: ");
        console.log(regent_prof);
        console.log("key: ");
        console.log(key);
        var regent = <Regent member={regent_prof} time_of_regency={key} />;
        previousRegents.push(regent);
      }
    }

    var current_regent = member_list["members"][member_list.regents.current];
    var current_regent_entry = <Regent member={current_regent} />;
    return (
      <div className="HistorySummary">
        <h1>{i18next.t("history-summary-title")}</h1>
        <p>{i18next.t("history-summary-point-1")}</p>

        <p>{i18next.t("history-summary-point-2")}</p>

        <p>{i18next.t("history-summary-point-3")}</p>

        <p>{i18next.t("history-summary-point-4")}</p>

        <p>{i18next.t("history-summary-point-5")}</p>

        <p>{i18next.t("history-summary-point-6")}</p>

        <div></div>

        <h1>{i18next.t("regents-hall-title")}</h1>
        <div id="CurrentRegent"></div>
        <div id="PreviousRegents">
          <div id="regents-list" className="hor-flex">
            {previousRegents}
          </div>
        </div>

        <div>
          <div>
            <h1>{i18next.t("current-regent-title")}</h1>
            {current_regent_entry}
          </div>
          <div></div>
        </div>
        <h1>{i18next.t("family-tree-title")}</h1>
        {/* <FamilyTreeComponent /> */}
        <div id="cy-wrapper">
          <CytoScapeFamilyTree />
        </div>
      </div>
    );
  }
}

export default History;
