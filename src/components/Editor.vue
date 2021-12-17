<template>
<v-expand-x-transition>
    <v-container class="editor-container">
        <h2>{{EditorName}}</h2>
        <baklava-editor :plugin="viewPlugin" :class="EditorName"></baklava-editor>
    </v-container>
</v-expand-x-transition>

</template>

<script>
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
// import { NodeBuilder } from "@baklavajs/core";
import { OptionPlugin } from "@baklavajs/plugin-options-vue";
import ExampleNode from "../nodes/ExampleNode";
import BasicNode from "../nodes/BasicNode";

export default {
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin(),
            expand2: false,
        }
    },
    methods: {
        addNodeWithCoordinates(nodeType, x, y) {
            const n = new nodeType();
            this.editor.addNode(n);
            n.position.x = x;
            n.position.y = y;
            return n;
        },
    },
    props: {
        EditorName: String,

    },
    created() {
        this.editor.use(this.viewPlugin);
        this.editor.use(new OptionPlugin());
        this.editor.registerNodeType("ExampleNode", ExampleNode)
        this.editor.registerNodeType("BasicNode", BasicNode)
        const node1 = this.addNodeWithCoordinates(ExampleNode, 100, 50);
        const node2 = this.addNodeWithCoordinates(BasicNode, 350, 50);
        const node3 = this.addNodeWithCoordinates(BasicNode, 650, 50);
        const node4 = this.addNodeWithCoordinates(BasicNode, 950, 50);
        const node5 = this.addNodeWithCoordinates(BasicNode, 1350, 50);

        this.editor.addConnection(
            node1.getInterface("Output"),
            node2.getInterface("Input")
        );

        this.editor.addConnection(
            node2.getInterface("Output"),
            node3.getInterface("Input")
        );

        this.editor.addConnection(
            node3.getInterface("Output"),
            node4.getInterface("Input")
        );

        this.editor.addConnection(
            node4.getInterface("Output"),
            node5.getInterface("Input")
        );
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