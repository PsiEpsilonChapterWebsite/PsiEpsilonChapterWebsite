// Define the tree data
var treeData = {
  name: "Fraternity",
  children: [
    {
      name: "Member 1",
      image: "member1.jpg",
      biography: "Biography of Member 1",
      htmlComponent: "<button>Button 1</button>",
    },
    {
      name: "Member 2",
      image: "member2.jpg",
      biography: "Biography of Member 2",
      htmlComponent: "<button>Button 2</button>",
    },
    // Add more members here...
  ],
};

// Create the tree diagram
var margin = { top: 20, right: 90, bottom: 30, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3
  .select("#tree")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var i = 0,
  duration = 750,
  root;

var tree = d3.tree().size([height, width]);

root = d3.hierarchy(treeData, function (d) {
  return d.children;
});
root.x0 = height / 2;
root.y0 = 0;

update(root);

function update(source) {
  // Compute the new tree layout
  var treeData = tree(root);

  // Compute the tree nodes
  var nodes = treeData.descendants(),
    links = treeData.descendants().slice(1);

  // Normalize for fixed-depth
  nodes.forEach(function (d) {
    d.y = d.depth * 180;
  });

  // Update the nodes...
  // Update the nodes...
  var node = svg.selectAll("g.tree-node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  // Enter any new nodes at the parent's previous position
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "tree-node")
    .attr("transform", function (d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    .on("click", click);

  nodeEnter
    .append("circle")
    .attr("r", 10)
    .style("fill", function (d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
    })
    .attr("transform", "rotate(-90)")
    .text(function (d) {
      return d.data.name;
    });

  // Transition nodes to their new position
  var nodeUpdate = node
    .merge(nodeEnter)
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  nodeUpdate
    .select("circle")
    .attr("r", 10)
    .style("fill", function (d) {
      return d._children ? "lightsteelblue" : "#fff";
    })
    .attr("cursor", "pointer");

  // Transition exiting nodes to the parent's new position
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

  nodeExit.select("circle").attr("r", 0);

  nodeExit.select("text").style("fill-opacity", 0);

  // Update the links...
  var link = svg.selectAll("path.link").data(links, function (d) {
    return d.id;
  });

  // Enter any new links at the parent's previous position
  var linkEnter = link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("d", function (d) {
      var o = { x: source.x0, y: source.y0 };
      return diagonal(o, o);
    });

  // Transition links to their new position
  link.merge(linkEnter).transition().duration(duration).attr("d", diagonal);

  // Transition exiting nodes to the parent's new position
  link
    .exit()
    .transition()
    .duration(duration)
    .attr("d", function (d) {
      var o = { x: source.x, y: source.y };
      return diagonal(o, o);
    })
    .remove();

  // Stash the old positions for transition
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

// Create a curved diagonal path between two points
function diagonal(s, d) {
  return (
    "M" +
    s.y +
    "," +
    s.x +
    "C" +
    (s.y + d.y) / 2 +
    "," +
    s.x +
    " " +
    (s.y + d.y) / 2 +
    "," +
    d.x +
    " " +
    d.y +
    "," +
    d.x
  );
}
