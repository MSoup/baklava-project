import { Editor, Node } from "@baklavajs/core";

// A basic node has 1 input and 1 output with a title

export default class TextNode extends Node {
    public type = "TextNode";
    public name = this.type;
    public registerCalled = false;

    constructor() {
        super();
        this.addInputInterface("Input")
        this.addOutputInterface("Output")
        this.addOption("TextDisplay", "TextOption")
    }

    public registerEditor(editor: Editor) {
        super.registerEditor(editor);
        this.registerCalled = true;
    }
    
    public calculate() {
        this.setOptionValue("TextDisplay", "2991")
    }

}