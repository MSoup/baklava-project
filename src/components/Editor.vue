<template>
    <v-container class="editor-container">
        <h2>{{EditorName}}</h2>
        <baklava-editor :plugin="viewPlugin" :class="EditorName"></baklava-editor>
    </v-container>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
// import { NodeBuilder } from "@baklavajs/core";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import BasicNode from "../nodes/BasicNode";

export default {
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin(),
        }
    },
    methods: {
        // GET information

        // get list of nodes
        getNodes() {
            return this.editor.nodes
        },
        // get position of a node
        // node: BasicNode Object
        // returns [x,y]: Array<String>
        getPosition(node) {
            return [node.position.x, node.position.y]
        },
        findNode(nodeName) {
            return this.getNodes().find(node=>node.name==nodeName)
        },
        // ADD information
        // node1: node
        // node2: node
        makeSimpleConnection(node1,node2, interface1name="Output", interface2name="Input") {
            this.editor.addConnection(
                node1.getInterface(interface1name),
                node2.getInterface(interface2name))
        },

        // Adds nodeType object to list of nodes
        // nodeName: String, 
        // nodeType: Node Object
        // returns node instance

        makeNode(nodeName, nodeType) {
            const n = new nodeType()
            n.name = nodeName
            this.editor.addNode(n)
            return n
        },

        // Inserts node below referenced node
        // name: name of new node: String
        // node: BasicNode
        insertNodeBelow(name, node) {
            const referencedPosition = this.getPosition(node)
            const newPosition = [referencedPosition[0], referencedPosition[1] + 150]
            const newNode = this.makeNode(name, BasicNode)
            newNode.position.x = newPosition[0]
            newNode.position.y = newPosition[1]
            },
        // Inserts node above referenced node
        // node: BasicNode
        insertNodeAbove(name, node) {
            const referencedPosition = this.getPosition(node)
            const newPosition = [referencedPosition[0], referencedPosition[1] - 150]
            const newNode = this.makeNode(name, BasicNode)
            newNode.position.x = newPosition[0]
            newNode.position.y = newPosition[1]
            },
        // n1, n2: numbers
        bindNodes(n1, n2) {
            this.makeSimpleConnection(this.findNode("node-" + n1),this.findNode("node-" + n2))
        },
        // insertNodeRight(node) {
        insertNodeRight(name, node) {
            const referencedPosition = this.getPosition(node)
            const newPosition = [referencedPosition[0] + 300, referencedPosition[1]]
            const newNode = this.makeNode(name, BasicNode)
            newNode.position.x = newPosition[0]
            newNode.position.y = newPosition[1]
            },
        // Moves name to position relative to refNode
        moveNode(name, refNodeName, position) {
            if (typeof name == undefined || typeof refNodeName == undefined || typeof position == undefined) {
                throw "Either name, refNodeName or position was undefined in moveNode"
            }
            const curNode = this.findNode(name)
            const refNode = this.findNode(refNodeName)
            const referencedPosition = this.getPosition(refNode)

            switch (position) {
                case "left":
                    curNode.position.x = referencedPosition[0] - 300
                    curNode.position.y = referencedPosition[1]
                    break
                case "right":
                    curNode.position.x = referencedPosition[0] + 300
                    curNode.position.y = referencedPosition[1]
                    break
                case "above":
                    curNode.position.x = referencedPosition[0]
                    curNode.position.y = referencedPosition[1] - 150
                    break
                case "below":
                    curNode.position.x = referencedPosition[0]
                    curNode.position.y = referencedPosition[1] + 150
                    break
            }
        },
        colorNode(name, color) {
            const node = this.findNode(name)
            node.customClasses += color
        }
    },
    props: {
        EditorName: String,
        contents: undefined || Array,
    },
    created() {
        // const contents = this.contents? this.contents: {"id":1,"connects_to":"","file_name":"","file_number":0,"file_description":"no info provided"}
        // console.log(contents)
        this.editor.use(this.viewPlugin);
        this.viewPlugin.scaling = 0.39
        this.viewPlugin.panning = {x: 10, y: 400}
        this.viewPlugin.useStraightConnections = true
        this.viewPlugin.backgroundGrid.gridSize = 200
        this.viewPlugin.hooks.renderNode.tap(this, (node) => {
            if (node.data.type === "BasicNode") {
                node.$el.style.backgroundColor = "#647687";
            }
            return node;
        });

        this.editor.use(new OptionPlugin());
        this.editor.registerNodeType("BasicNode", BasicNode)

        // MAKING NODES FOR DEMO
        // adding 12 nodes to nodelist
        // TODO: Make this function real (pull from data points)
        // Currently, the below code errors (reading position doesnt work)
        // for (let i = 0; i < this.contents.length; i++) {
        //     this.makeNode("node-"+i,BasicNode)
        // }

        for (let n = 0; n < 12; n++) {
            this.makeNode("node-"+n,BasicNode)
        }
        console.log(this.getNodes())

        // drawing first 3 nodes
        for (var n = 1; n < 4; n++) {
            let lastNode = this.findNode("node-"+(n-1))
            let curNode = this.findNode("node-"+n)
            // make connections
            this.moveNode(curNode.name, lastNode.name, "right")
        }
        // bottom node
        // 4
        this.moveNode("node-" + n, "node-1", "below")
        n++
        // 5
        this.moveNode("node-" + n, "node-3", "above")
        n++
        // 6
        this.moveNode("node-" + n, "node-5", "above")
        n++
        // 7
        this.moveNode("node-" + n, "node-6", "right")
        n++
        // 8
        this.moveNode("node-" + n, "node-5", "right")
        n++
        // 9
        this.moveNode("node-" + n, "node-8", "right")
        n++
        // 10
        this.moveNode("node-" + n, "node-9", "right")
        n++
        // 11
        this.moveNode("node-" + n, "node-3", "right")

        this.bindNodes(0,1)
        this.bindNodes(1,2)
        this.bindNodes(4,2)
        this.bindNodes(2,5)
        this.bindNodes(6,7)
        this.bindNodes(6,8)
        this.bindNodes(5,7)
        this.bindNodes(5,8)
        this.bindNodes(3,7)
        this.bindNodes(3,8)
        this.bindNodes(11,9)
        this.bindNodes(8,9)
        this.bindNodes(9,10)

        // coloring
        this.colorNode("node-1", "blue")
        this.colorNode("node-4", "blue cut")
        this.colorNode("node-2", "red")
        this.colorNode("node-3", "green")
        this.colorNode("node-11", "cut")
    },

}
</script>

<style>
.__port {
  opacity: 0.0;
}
.blue {
    background-color: #4682B4;
}
.red {
    background-color: #CD5C5C;
}
.green {
    background-color: #6B8E23;
}

.cut {
    clip-path: polygon(75% 0, 100% 40%, 100% 100%, 0 100%, 0 0);
}

.node > .__title {
    background-color: #647687;
}

.node:hover {
  opacity: 0.95;
}

.background {
    min-height: 300px;
    max-height: 400px;
    background-color: #E0E4E7 !important;
}

.node-editor {
    min-height: 300px;
    margin-bottom: 15px;
    max-height: 400px;
    border-radius: 10px;
    filter: drop-shadow(0 0 0.75rem #E0E4E7);
}

.--selected {
    border: solid rgb(255, 77, 77);
}

g .connection {
    stroke: red;
}


.inputOnly {
    min-height: 100px;
}

.node > .__title > span  {
  font-size: 16px;
}

.--output {
  opacity: 0;   
}
.--input {
  opacity: 0;   
}

.__options {
    color: white;
}

</style>