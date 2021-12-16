"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var core_1 = require("@baklavajs/core");
var TestNode = /** @class */ (function (_super) {
    __extends(TestNode, _super);
    function TestNode() {
        var _this = _super.call(this) || this;
        _this.type = "TestNode";
        _this.name = _this.type;
        _this.registerCalled = false;
        _this.addInputInterface("Input", "CheckboxOption", false, { type: "boolean" });
        _this.addInputInterface("Test", "NumberOption", 5, { type: "number" });
        _this.addOutputInterface("Output", { type: "boolean" });
        _this.addOption("test", "InputOption");
        _this.addOption("Select", "SelectOption", "Test1", undefined, { items: ["Test1", "Test2", "Test3"] });
        _this.addOption("This is a checkbox", "CheckboxOption", true);
        _this.addOption("Number", "NumberOption", 5, undefined, { min: 0, max: 10 });
        _this.addOption("Slider", "SliderOption", 0.5, undefined, { min: 0, max: 1 });
        return _this;
    }
    TestNode.prototype.registerEditor = function (editor) {
        _super.prototype.registerEditor.call(this, editor);
        this.registerCalled = true;
    };
    TestNode.prototype.calculate = function () {
        this.getInterface("Output").value = this.getInterface("Input").value;
    };
    return TestNode;
}(core_1.Node));
exports["default"] = TestNode;
