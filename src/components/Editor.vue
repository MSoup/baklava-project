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
        // ADD information
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

        // insertBelow(node) {
        //     this.nodeList.push
        // },
        // insertRight(node) {
        //     this.nodeList.push
        // }

    },
    props: {
        EditorName: String,

    },
    created() {
        this.editor.use(this.viewPlugin);
        this.editor.use(new OptionPlugin());
        this.editor.registerNodeType("BasicNode", BasicNode)
        for (let n = 0; n < 5; n++) {
            this.makeNode("node-"+n,BasicNode)
        }

        let targetNode = this.getNodes().filter(node=>node.name=="node-0")[0]
        this.insertNodeBelow("node-below", targetNode)
        let targetNode2 = this.getNodes().filter(node=>node.name=="node-below")[0]

        this.makeSimpleConnection(targetNode, targetNode2)
        this.insertNodeAbove("node-above", targetNode)

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
}

.inputOnly {
    min-height: 100px;
}

.node > .__title > span  {
  font-size: 16px;
}
</style>