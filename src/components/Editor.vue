<template>
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
</template>

<script>
import { Editor } from "@baklavajs/core";
import { ViewPlugin } from "@baklavajs/plugin-renderer-vue";
// import { BlockBuilder } from "../helpers/BlockBuilder";
import { NodeBuilder } from "@baklavajs/core";
import {MathNode} from "../nodes/MathNode"
import { OptionPlugin } from "@baklavajs/plugin-options-vue";

export default {
    data() {
        return {
            editor: new Editor(),
            viewPlugin: new ViewPlugin(),
            InputsInfo: [{name: "Block in 1"}, {name: "Block in 2"}],
            OutputsInfo: [{name: "Block out 1"}, {name: "Block out 2"}]
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
        createBasicNode(nodeName) {
            return new NodeBuilder(nodeName)
                .setName("Display")
                .addInputInterface("Input: String")
                .addOption("ValueText", "TextOption")
                .addOption("What's your name?", "InputOption")
                .onCalculate(n => {
                    let value = n.getInterface("Value").value;
                    if (typeof value === "number") {
                        value = value.toFixed(3);
                    }
                    n.setOptionValue("ValueText", value);
                }).build()
        },
        createInputOnlyNode() {
            return new NodeBuilder("InputOnlyNode",{ customClasses: "inputOnly" }).build()
        }
    },
    created() {
        this.editor.use(this.viewPlugin);

        const testNode = this.createBasicNode("DisplayNode")
        // Allows me to right click and physically clone node
        this.editor.registerNodeType("DisplayNode", testNode)

        const inputOnlyNode = this.createInputOnlyNode()
        console.log("To avoid TS errors for now", inputOnlyNode)




        const testMathNode = new NodeBuilder("Test2")
            .setName("Test Node 2")
            .addInputInterface("Val1", "Connect Me", 10)
            .onCalculate(n => {
                let value = n.getInterface("Val1").value;
                if (value > 10) {
                    console.log("val > 10");
                }
            })
            .addOutputInterface("Output Interface")
            .build()
        this.editor.registerNodeType("Testy", MathNode)
        this.editor.registerNodeType("DisplayNode", testNode)
        this.addNodeWithCoordinates(testNode, 400, 140);
        this.addNodeWithCoordinates(testMathNode, 600, 340);
        this.editor.use(new OptionPlugin());
    }
}
</script>