import React from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import member_list from "./member_list.js";

import "./App.css"; // contains .diagram-component CSS

class GenogramLayout extends go.LayeredDigraphLayout {
  constructor() {
    super();
    this.alignOption = go.LayeredDigraphLayout.AlignAll;
    this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    this.spouseSpacing = 30; // minimum space between spouses
    this.isRouting = false;
  }

  add(net, coll, nonmemberonly) {
    const horiz = this.direction == 0.0 || this.direction == 180.0;
    const multiSpousePeople = new go.Set();
    // consider all Nodes in the given collection
    const it = coll.iterator;
    while (it.next()) {
      const node = it.value;
      if (!(node instanceof go.Node) || !node.data) continue;
      if (!node.isLayoutPositioned || !node.isVisible()) continue;
      if (nonmemberonly && node.containingGroup !== null) continue;
      // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
      if (node.isLinkLabel) {
        // get marriage Link
        const link = node.labeledLink;
        if (link.category === "Marriage") {
          const spouseA = link.fromNode;
          const spouseB = link.toNode;
          // create vertex representing both husband and wife
          const vertex = net.addNode(node);
          // now define the vertex size to be big enough to hold both spouses
          if (horiz) {
            vertex.height =
              spouseA.actualBounds.height +
              this.spouseSpacing +
              spouseB.actualBounds.height;
            vertex.width = Math.max(
              spouseA.actualBounds.width,
              spouseB.actualBounds.width
            );
            vertex.focus = new go.Point(
              vertex.width / 2,
              spouseA.actualBounds.height + this.spouseSpacing / 2
            );
          } else {
            vertex.width =
              spouseA.actualBounds.width +
              this.spouseSpacing +
              spouseB.actualBounds.width;
            vertex.height = Math.max(
              spouseA.actualBounds.height,
              spouseB.actualBounds.height
            );
            vertex.focus = new go.Point(
              spouseA.actualBounds.width + this.spouseSpacing / 2,
              vertex.height / 2
            );
          }
        }
      } else {
        // don't add a vertex for any married person!
        // instead, code above adds label node for marriage link
        // assume a marriage Link has a label Node
        let marriages = 0;
        node.linksConnected.each((l) => {
          if (l.category === "Marriage") marriages++;
        });
        if (marriages === 0) {
          net.addNode(node);
        } else if (marriages > 1) {
          multiSpousePeople.add(node);
        }
      }
    }
    // now do all Links
    it.reset();
    while (it.next()) {
      const link = it.value;
      if (!(link instanceof go.Link)) continue;
      if (!link.isLayoutPositioned || !link.isVisible()) continue;
      if (nonmemberonly && link.containingGroup !== null) continue;
      // if it's a parent-child link, add a LayoutEdge for it
      if (link.category === "" && link.data) {
        const parent = net.findVertex(link.fromNode); // should be a label node
        const child = net.findVertex(link.toNode);
        if (child !== null) {
          // an unmarried child
          net.linkVertexes(parent, child, link);
        } else {
          // a married child
          link.toNode.linksConnected.each((l) => {
            if (l.category !== "Marriage" || !l.data) return; // if it has no label node, it's a parent-child link
            // found the Marriage Link, now get its label Node
            const mlab = l.labelNodes.first();
            // parent-child link should connect with the label node,
            // so the LayoutEdge should connect with the LayoutVertex representing the label node
            const mlabvert = net.findVertex(mlab);
            if (mlabvert !== null) {
              net.linkVertexes(parent, mlabvert, link);
            }
          });
        }
      }
    }

    while (multiSpousePeople.count > 0) {
      // find all collections of people that are indirectly married to each other
      const node = multiSpousePeople.first();
      const cohort = new go.Set();
      this.extendCohort(cohort, node);
      // then encourage them all to be the same generation by connecting them all with a common vertex
      const dummyvert = net.createVertex();
      net.addVertex(dummyvert);
      const marriages = new go.Set();
      cohort.each((n) => {
        n.linksConnected.each((l) => {
          marriages.add(l);
        });
      });
      marriages.each((link) => {
        // find the vertex for the marriage link (i.e. for the label node)
        const mlab = link.labelNodes.first();
        const v = net.findVertex(mlab);
        if (v !== null) {
          net.linkVertexes(dummyvert, v, null);
        }
      });
      // done with these people, now see if there are any other multiple-married people
      multiSpousePeople.removeAll(cohort);
    }
  }

  makeNetwork(coll) {
    // generate LayoutEdges for each parent-child Link
    const net = this.createNetwork();
    if (coll instanceof go.Diagram) {
      this.add(net, coll.nodes, true);
      this.add(net, coll.links, true);
    } else if (coll instanceof go.Group) {
      this.add(net, coll.memberParts, false);
    } else if (coll.iterator) {
      this.add(net, coll.iterator, false);
    }
    return net;
  }
}

class FamilyTreeComponent extends React.Component {
  // A custom layout that shows the two families related to a person's parents

  initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      initialAutoScale: go.Diagram.Uniform, // scale the diagram to fit the viewport
      maxScale: 2, // allow at most a 2x zoom in
      minScale: 0.5, // allow at most a 2x zoom out
      // use a custom layout, defined above
      layout: $(GenogramLayout, {
        direction: 90,
        layerSpacing: 30,
        columnSpacing: 10,
      }),
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      "clickCreatingTool.archetypeNodeData": {
        text: "new node",
        color: "lightblue",
      },
      model: new go.GraphLinksModel({
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    // define a simple Node template

    diagram.nodeTemplate = $(
      go.Node,
      "Vertical", // Vertical arranges GraphObjects vertically
      {
        locationSpot: go.Spot.Center, // Node location will be at the center of the node
        locationObjectName: "PICTURE",
        selectionObjectName: "PICTURE",
      },
      // Display the person's picture
      $(
        go.Picture,
        {
          name: "PICTURE",
          desiredSize: new go.Size(100, 100),
          margin: new go.Margin(5, 5, 5, 5),
        },
        new go.Binding("source")
      ),
      $(
        go.Shape,
        "RoundedRectangle",
        { name: "SHAPE", fill: "red", strokeWidth: 0 },
        // Shape.fill is bound to Node.data.color
        new go.Binding("fill", "color")
      ),

      // Display the person's name below the picture
      $(
        go.TextBlock,
        { font: "bold 12pt sans-serif" },
        new go.Binding("text", "name")
      ),
      // Display the person's birthdate below their name
      $(
        go.TextBlock,
        { font: "10pt sans-serif" },
        new go.Binding("text", "birthdate")
      ),

      $(
        go.TextBlock,
        { margin: 8, editable: true }, // some room around the text
        new go.Binding("text").makeTwoWay()
      )
    );

    return diagram;
  }

  render() {
    var modded_members_list = [];
    for (const [key, value] of Object.entries(member_list["members"])) {
      var member_dict = value;
      member_dict["key"] = key;
      modded_members_list.push(member_dict);
    }

    return (
      <div>
        ...
        <ReactDiagram
          initDiagram={this.initDiagram}
          divClassName="diagram-component"
          nodeDataArray={modded_members_list}
          linkDataArray={member_list["linkDataArray"]}
          // onModelChange={handleModelChange}
        />
        ...
      </div>
    );
  }
}
export default FamilyTreeComponent;
