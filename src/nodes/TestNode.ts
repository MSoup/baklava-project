import { Editor, Node } from "@baklavajs/core";

export default class TestNode extends Node {

    public type = "TestNode";
    public name = this.type;
    public registerCalled = false;

    constructor() {
        super();
        this.addInputInterface("Input", "CheckboxOption", false, { type: "boolean" });
        this.addInputInterface("Test", "NumberOption", 5, { type: "number" });
        this.addOutputInterface("Output", { type: "boolean" });
        this.addOption("test", "InputOption");
        this.addOption("Select", "SelectOption", "Test1", undefined, { items: ["Test1", "Test2", "Test3"] });
        this.addOption("This is a checkbox", "CheckboxOption", true);
        this.addOption("Number", "NumberOption", 5, undefined, { min: 0, max: 10 });
        this.addOption("Slider", "SliderOption", 0.5, undefined, { min: 0, max: 1 });
    }

    public registerEditor(editor: Editor) {
        super.registerEditor(editor);
        this.registerCalled = true;
    }

    public calculate() {
        this.getInterface("Output").value = this.getInterface("Input").value;
    }

}