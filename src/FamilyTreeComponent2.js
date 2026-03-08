import React, { useEffect } from "react";
import "./App.css"; // contains .diagram-component CSS

// src/FamilyTree.js
import go from "gojs";
import { GojsDiagram, ModelChangeEventType } from "gojs-react";

function FamilyTreeComponent2() {
  let myDiagram;

  useEffect(() => {
    const $ = go.GraphObject.make;

    myDiagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        { figure: "Rectangle", fill: "lightgray" },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, { margin: 8 }, new go.Binding("text", "name"))
    );
  }, []);

  const model = {
    nodeDataArray: [
      { key: 1, name: "Grandfather", color: "lightblue" },
      { key: 2, name: "Grandmother", color: "pink" },
      { key: 3, parent: 1, parent: 2, name: "Father", color: "lightblue" },
      { key: 4, parent: 1, parent: 2, name: "Uncle", color: "lightblue" },
      { key: 5, parent: 3, name: "Child", color: "orange" },
      { key: 6, parent: 3, name: "Child2", color: "orange" },
    ],
    linkDataArray: [
      { from: 1, to: 3 },
      { from: 2, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 3, to: 6 },
    ],
  };

  const handleModelChange = (event) => {
    if (event.eventType === ModelChangeEventType.Remove) {
      let idx = model.nodeDataArray.findIndex(
        (e) => e.key === event.nodeData.key
      );
      if (idx !== -1) {
        model.nodeDataArray.splice(idx, 1);
      }
    }
  };

  return (
    <div>
      <GojsDiagram
        diagramId="myDiagramDiv"
        model={model}
        createDiagram={(diagramId) => {
          const $ = go.GraphObject.make;
          const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.Center,
          });
          return myDiagram;
        }}
        onModelChange={handleModelChange}
      />
    </div>
  );
}

export default FamilyTreeComponent2;
