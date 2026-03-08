import React, { useEffect, useRef } from "react";
import { useState } from "react";
import * as d3 from "d3";
import Tree from "./tree.js";

function FamilyTree(data) {
  const [count, setCount] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    // D3.js code here
    //

    const data = {
      name: "John Doe",
      children: [
        {
          name: "Jane Smith",
          children: [
            {
              name: "Mark Johnson",
            },
            {
              name: "Lisa Anderson",
            },
          ],
        },
        {
          name: "Robert Brown",
          children: [
            {
              name: "Emily Davis",
            },
          ],
        },
      ],
    };
    var width = 600;
    var height = 400;

    var svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    console.log("Using effect!");

    var g = svg.append("g").attr("transform", "translate(50, 50)");

    var tree = d3.tree().size([height - 100, width - 100]);

    var root = d3.hierarchy(data);
    var links = tree(root).links();

    var link = g
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      );

    var node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    node.append("circle").attr("r", 4.5);

    // const tooltip = d3
    // .select("body")
    // .append("div")
    // .attr("class", "tooltip")
    // .style("opacity", 0);

    // const showTooltip = (d) => {
    // tooltip.transition().duration(200).style("opacity", 0.9);
    // tooltip
    // .html(d.data.name)
    // .style("left", d3.event.pageX + "px")
    // .style("top", d3.event.pageY - 28 + "px");
    // };

    // const hideTooltip = (d) => {
    // tooltip.transition().duration(500).style("opacity", 0);
    // };

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -10 : 10))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
    // .on("mouseover", showTooltip)
    // .on("mouseout", hideTooltip);

    // var tooltip = d3
    // .select("body")
    // .append("div")
    // .attr("class", "tooltip")
    // .style("opacity", 0);
  }, []);

  return <svg ref={svgRef} width={400} height={300}></svg>;
}

export default FamilyTree;
