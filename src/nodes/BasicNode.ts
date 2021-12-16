import { Editor, Node } from "@baklavajs/core";


// A basic node has 1 input and 1 output with a title

export default class BasicNode extends Node {
    public type = "BasicNode";
    public name = this.type;
    public registerCalled = false;

    constructor() {
        super();
        this.addInputInterface("Input")
        this.addOutputInterface("Output")
    }

    public registerEditor(editor: Editor) {
        super.registerEditor(editor);
        this.registerCalled = true;
    }

    public calculate() {
        this.getInterface("Output").value = this.getInterface("Input").value;
    }

}