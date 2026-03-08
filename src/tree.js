import React from "react";
import dTree from "d3-dtree";

class Tree extends React.Component {
  treeData = [
    {
      name: "Niclas Superlongsurname",
      class: "man",
      textClass: "emphasis",
      marriages: [
        {
          spouse: {
            name: "Iliana",
            class: "woman",
            extra: {
              nickname: "Illi",
            },
          },
          children: [
            {
              name: "James",
              class: "man",
              marriages: [
                {
                  spouse: {
                    name: "Alexandra",
                    class: "woman",
                  },
                  children: [
                    {
                      name: "Eric",
                      class: "man",
                      marriages: [
                        {
                          spouse: {
                            name: "Eva",
                            class: "woman",
                          },
                        },
                      ],
                    },
                    {
                      name: "Jane",
                      class: "woman",
                    },
                    {
                      name: "Jasper",
                      class: "man",
                    },
                    {
                      name: "Emma",
                      class: "woman",
                    },
                    {
                      name: "Julia",
                      class: "woman",
                    },
                    {
                      name: "Jessica",
                      class: "woman",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  componentDidMount() {
    dTree.init(this.treeData, {
      target: "#graph",
      debug: true,
      height: 800,
      width: 1200,
      callbacks: {
        nodeClick: function (name, extra) {
          console.log(name);
        },
        textRenderer: function (name, extra, textClass) {
          // THis callback is optinal but can be used to customize
          // how the text is rendered without having to rewrite the entire node
          // from screatch.
          if (extra && extra.nickname)
            name = name + " (" + extra.nickname + ")";
          return "<p align='center' class='" + textClass + "'>" + name + "</p>";
        },
        nodeRenderer: function (
          name,
          x,
          y,
          height,
          width,
          extra,
          id,
          nodeClass,
          textClass,
          textRenderer
        ) {
          // This callback is optional but can be used to customize the
          // node element using HTML.
          // textRenderer(name, extra, textClass)
          let node = (
            <div
              styles={{ height: "100%", width: "100%" }}
              className={nodeClass}
              id={"node" + id}
            >
              {" "}
            </div>
          );
          return node;
        },
      },
    });
  }
  render() {
    return <div id="graph" style={{ height: "100%", width: "100%" }}></div>;
  }
}

export default Tree;
