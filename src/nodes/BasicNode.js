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
// A basic node has 1 input and 1 output with a title
var BasicNode = /** @class */ (function (_super) {
    __extends(BasicNode, _super);
    function BasicNode() {
        var _this = _super.call(this) || this;
        _this.type = "BasicNode";
        _this.name = _this.type;
        _this.registerCalled = false;
        _this.addInputInterface("Input");
        _this.addOutputInterface("Output");
        return _this;
    }
    BasicNode.prototype.registerEditor = function (editor) {
        _super.prototype.registerEditor.call(this, editor);
        this.registerCalled = true;
    };
    BasicNode.prototype.calculate = function () {
        this.getInterface("Output").value = this.getInterface("Input").value;
    };
    return BasicNode;
}(core_1.Node));
exports["default"] = BasicNode;
