<template>
    <v-container class="editor-container">
        <h2>{{EditorName}}</h2>
        <baklava-editor ref="editor" :plugin="viewPlugin" :class="EditorName"></baklava-editor>
    </v-container>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
// import { NodeBuilder } from "@baklavajs/core";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import BasicNode from "../nodes/BasicNode";
import TextNode from "../nodes/TextNode";

export default {
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin(),
            dependencyGraph: [],
            // hard coding names of data for now
            data: [
                {"id":1,"connects_to":[2050],"file_name":"","file_number":10012,"file_description":"EGマウント特性（パラメーター）"},
                {"id":2,"connects_to":[2040],"file_name":"2050_MA_10Nm_2nd_11111341.csv","file_number":2050,"file_description":"EGマウント特性（諸元）"},
                {"id":4,"connects_to":[2020],"file_name":"","file_number":2040,"file_description":"EGマウント静特性"},
                {"id":5,"connects_to":[2000,2001],"file_name":"","file_number":2031,"file_description":"EGマウント動特性"},
                // below
                {"id":3,"connects_to":[2040],"file_name":"10011_Sample_2.CSV","file_number":10011,"file_description":"EGマウント座票"},
                // above
                {"id":6,"connects_to":[2000,2001],"file_name":"","file_number":2020,"file_description":"EG脈動"},
                {"id":7,"connects_to":[2000,2021],"file_name":"","file_number":2022,"file_description":"EG脈動（ボデー側）"},

                {"id":8,"connects_to":[],"file_name":"","file_number":2001,"file_description":"EG変位"},
                {"id":9,"connects_to":[201],"file_name":"","file_number":2000,"file_description":"EGマウント伝達力"},
                {"id":11,"connects_to":[200],"file_name":"","file_number":201,"file_description":"EGマウント寄与"},
                {"id":12,"connects_to":[],"file_name":"","file_number":200,"file_description":"EGマウント合計寄与"},
                {"id":10,"connects_to":[201],"file_name":"","file_number":2010,"file_description":"EGマウントボデーOO度"},
            ],
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
        // Find node by node name
        findNodeByTitle(nodeName) {
            return this.getNodes().find(node=>node.name==nodeName)
        },
        findNodeByClassName(className) {
            return this.getNodes().find(node=>node.customClasses.split().includes(className))
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

        makeNode(nodeName, nodeType, options={}) {
            const n = new nodeType()
            n.name = nodeName
            n.options = options
            n.customClasses = n.name
            this.editor.addNode(n)
            return n
        },

        // n1, n2: numbers
        bindNodes(n1, n2) {
            this.makeSimpleConnection(this.findNodeByTitle("node-" + n1),this.findNodeByTitle("node-" + n2))
        },

        // Moves name to position relative to refNode
        moveNode(name, refNodeName, position) {
            if (typeof name == undefined || typeof refNodeName == undefined || typeof position == undefined) {
                throw "Either name, refNodeName or position was undefined in moveNode"
            }
            const curNode = this.findNodeByTitle(name)
            const refNode = this.findNodeByTitle(refNodeName)
            const referencedPosition = this.getPosition(refNode)

            switch (position) {
                case "left":
                    curNode.position.x = referencedPosition[0] - 480
                    curNode.position.y = referencedPosition[1]
                    break
                case "right":
                    curNode.position.x = referencedPosition[0] + 480
                    curNode.position.y = referencedPosition[1]
                    break
                case "above":
                    curNode.position.x = referencedPosition[0]
                    curNode.position.y = referencedPosition[1] - 220
                    break
                case "below":
                    curNode.position.x = referencedPosition[0]
                    curNode.position.y = referencedPosition[1] + 220
                    break
            }
        },
        colorNode(name, color) {
            const node = this.findNodeByTitle(name)
            node.customClasses += " " + color
        },
        findConnected(refNode) {
            // refNode title being referenced
            if (this.findNodeByTitle(refNode) !== undefined) {
                const currentNode = this.findNodeByTitle(refNode)
                const leftConnectionsList = this.getNodes().filter(node=>node.state.connects_to.includes(currentNode.state.file_number))
                const rightConnectionsList = this.findNodeByClassName(refNode).state.connects_to
                return {left: leftConnectionsList, right: rightConnectionsList}
            }
            // refNode classname being referenced
            if (this.findNodeByClassName(refNode) !== undefined) {
                const currentNode = this.findNodeByClassName(refNode)
                // node-2
                const leftConnectionsList = this.getNodes().filter(node=>node.state.connects_to.includes(currentNode.state.file_number)).map(node=>node.state.file_number)
                const rightConnectionsList = this.findNodeByClassName(refNode).state.connects_to
                return  {left: leftConnectionsList, right: rightConnectionsList}
            }
            // both undefined
            throw "refNode returned undefined"
            },
        // takes in {left: arr, right: arr}
        // colorConnected({left, right}) {
        //     const leftSide = {left}
        //     const rightSide = {right}
        //     console.log("Within colorconnected", leftSide.left, rightSide.right)
        //     // clear all colors first

        //     // TODO
        //     const nodeList = this.getNodes()
        //     nodeList.forEach(node => node.customClasses.split().splice(1,0,"blue").join(" "))
        //     nodeList.forEach(node => node.customClasses.split().splice(1,0,"green").join(" "))
        //     // left nodes
        //     for (let i = 0; i < leftSide.left.length; i++) {
        //         console.log("leftside", i)
        //         const result = nodeList.filter(node=>node.state.file_number === leftSide.left[i])[0]
        //         result.customClasses += " blue"
        //     }
        //     // right nodes
        //     for (let i = 0; i < rightSide.right.length; i++) {
        //         // do stuff
        //         console.log("rightside", i)

        //         const result = nodeList.filter(node=>node.state.file_number === rightSide.right[i])[0]
        //         result.customClasses += " green"
        //     }
        // },
    },
    props: {
        EditorName: String,
        contents: undefined || Array,
    },
    created() {
        for (let i = 0; i < this.data.length; i++) {
            const thisFile = this.data[i].file_number;
            const connectsTo = this.data[i].connects_to;

            this.dependencyGraph.push({"file": thisFile, "connectsTo": connectsTo})
        }
        this.editor.use(this.viewPlugin);
        this.viewPlugin.scaling = .26
        this.viewPlugin.panning = {x: 10, y: 500}
        this.viewPlugin.useStraightConnections = false
        this.viewPlugin.backgroundGrid.gridSize = 0
        this.viewPlugin.hooks.renderNode.tap(this, (node) => {
            if (node.data.type === "BasicNode") {
                node.$el.style.backgroundColor = "#647687";
            }
            return node;
        });

        this.editor.use(new OptionPlugin());
        this.editor.registerNodeType("BasicNode", BasicNode)
        this.editor.registerNodeType("TextNode", TextNode)

        // TODO: Make this function real (pull from data points)
        // Currently, the below code errors (reading position doesnt work)
        // for (let i = 0; i < this.contents.length; i++) {
        //     this.makeNode("node-"+i,BasicNode)
        // }

        for (let n = 0; n < 12; n++) {
            this.makeNode("node-"+n,BasicNode)
        }

        // drawing first 3 nodes
        for (var n = 1; n < 4; n++) {
            let lastNode = this.findNodeByTitle("node-"+(n-1))
            let curNode = this.findNodeByTitle("node-"+n)
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
        this.colorNode("node-0", "cut")
        this.colorNode("node-4", "cut")
        this.colorNode("node-11", "cut")

        for (let i = 0; i < 12; i++) {
            let node = this.findNodeByTitle("node-" + i)
            node.name = this.data[i].file_number + "\n" + this.data[i].file_description
            node.state = this.data[i]
        }

        // finally adding event listeners to all nodes

    },
    mounted() {
        this.$watch("$refs.editor.selectedNodes", () => {
        if (!this.$refs.editor) {
            return;
        }
        if (this.$refs.editor.selectedNodes.length === 0) {
            return;
        }
        // get curNodeName
        const currentNode = this.$refs.editor.selectedNodes[0].customClasses
        // console.log(this.findNodeByClassName(currentNode))
        console.log("selected", currentNode)
        const connectedNodes = this.findConnected(currentNode)
        console.log("connected to ", connectedNodes);
        // this.colorConnected(connectedNodes);
    });
    }
    
}
</script>

<style>

.node {
    min-height: 200px;
    min-width: 420px;
    display:flex;
    flex-direction: column;
    justify-content: end;
}

.node > .__title {
    background: none !important;
    order: 1;
}

.node > .__title > span {
    font-size: 26px;
}

.node:hover {
  opacity: 0.95;
}

.__port {
  opacity: 0;
}
.blueDesign {
    background-color: #4682B4 !important;
}
.redDesign {
    background-color: #CD5C5C !important;
}
.greenDesign {
    background-color: #6B8E23 !important;
}
.cut {
    clip-path: polygon(70% 0, 100% 30%, 100% 100%, 0 100%, 0 0);
}


.__content {
    display: flex;
    justify-content: space-between;
}
.__outputs {
    order: 1;
}
.__inputs {
    order: -1;
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
    filter: drop-shadow(0 0 0.75rem #ca1c1c);
    background-color: #CD5C5C !important;
}

g .connection {
    stroke: red;
}


.inputOnly {
    min-height: 100px;
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

.connection {
    stroke-width: 1px !important;
}
</style>