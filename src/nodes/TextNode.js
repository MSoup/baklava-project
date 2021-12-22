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
var TextNode = /** @class */ (function (_super) {
    __extends(TextNode, _super);
    function TextNode() {
        var _this = _super.call(this) || this;
        _this.type = "TextNode";
        _this.name = _this.type;
        _this.registerCalled = false;
        _this.addInputInterface("Input");
        _this.addOutputInterface("Output");
        _this.addOption("TextDisplay", "TextOption");
        return _this;
    }
    TextNode.prototype.registerEditor = function (editor) {
        _super.prototype.registerEditor.call(this, editor);
        this.registerCalled = true;
    };
    TextNode.prototype.calculate = function () {
        this.setOptionValue("TextDisplay", "2991");
    };
    return TextNode;
}(core_1.Node));
exports["default"] = TextNode;
