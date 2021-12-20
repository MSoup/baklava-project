<template>
    <v-container class="editor-container">
        <h2>{{EditorName}}</h2>
        <baklava-editor :plugin="viewPlugin" :class="EditorName"></baklava-editor>
    </v-container>
</template>

<script lang="ts">
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
// import { NodeBuilder } from "@baklavajs/core";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import BasicNode from "../nodes/BasicNode";
// import makeGraph1 from "../helpers/makeGraph1";


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
    },
    props: {
        EditorName: String,

    },
    created() {
        this.editor.use(this.viewPlugin);
        this.viewPlugin.scaling = 0.39
        this.viewPlugin.panning = {x: 10, y: 400}

        this.editor.use(new OptionPlugin());
        this.editor.registerNodeType("BasicNode", BasicNode)

        // MAKING NODES FOR DEMO
        // adding 12 nodes to nodelist
        for (let n = 0; n < 12; n++) {
            this.makeNode("node-"+n,BasicNode)
        }

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

        // How do I bind "this" to the function????
        // function bindNodes(n1,n2) {
        //     this.makeSimpleConnection.bind(this)
        //     this.makeSimpleConnection(this.findNode("node-" + n1),this.findNode("node-" + n2))
        // }
        // bindNodes(0,1)


        // Bind all the nodes appropriately
        this.makeSimpleConnection(this.findNode("node-0"),this.findNode("node-1"))
        this.makeSimpleConnection(this.findNode("node-1"),this.findNode("node-2"))
        this.makeSimpleConnection(this.findNode("node-4"),this.findNode("node-2"))
        this.makeSimpleConnection(this.findNode("node-2"),this.findNode("node-5"))
        this.makeSimpleConnection(this.findNode("node-6"),this.findNode("node-7"))
        this.makeSimpleConnection(this.findNode("node-6"),this.findNode("node-8"))
        this.makeSimpleConnection(this.findNode("node-5"),this.findNode("node-7"))
        this.makeSimpleConnection(this.findNode("node-5"),this.findNode("node-8"))
        this.makeSimpleConnection(this.findNode("node-3"),this.findNode("node-7"))
        this.makeSimpleConnection(this.findNode("node-3"),this.findNode("node-8"))
        this.makeSimpleConnection(this.findNode("node-11"),this.findNode("node-9"))
        this.makeSimpleConnection(this.findNode("node-8"),this.findNode("node-9"))
        this.makeSimpleConnection(this.findNode("node-9"),this.findNode("node-10"))
    }
}
</script>

<style>
.background {
    min-height: 300px;
    max-height: 400px;
}

.node-editor {
    min-height: 300px;
    margin-bottom: 15px;
    max-height: 400px;
    border-radius: 10px;
    border: solid red;
}

.inputOnly {
    min-height: 100px;
}

.node > .__title > span  {
  font-size: 16px;
}


</style>