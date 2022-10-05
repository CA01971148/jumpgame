/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/character/character.ts":
/*!************************************!*\
  !*** ./src/character/character.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"character\": () => (/* binding */ character)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\n\r\nvar character = /** @class */ (function () {\r\n    function character() {\r\n        this.characterSize = 50; //キャラの大きさ\r\n        this.footSize = 20; //足の広さ\r\n        this._x = 0; //X座標\r\n        this._y = 50; //y座標\r\n        this.height = 0; //昇った高さ\r\n        this._dx = 0; //x方向の速度\r\n        this.moveVelocity = 5; //横移動加速量\r\n        this.dxMax = 10; //最大横加速量\r\n        this._dy = 0; //y方向の速度\r\n        this.dyMax = 10; //最大縦加速量\r\n        this._jumpVelocity = 0; //ジャンプ速度\r\n        this.jumpChargeAmount = 1; //跳躍力の貯めやすさ\r\n        this.jumpChargeMax = 25; //跳躍力の貯め限界\r\n        this.fallVelocitiy = 1; //落下速度\r\n        this.isOnGround = true; //接地しているかどうか\r\n        this.isSlip = false; //滑るかどうか\r\n        this.isCarry = false; //動かされているかどうか\r\n        this.isOnMoving = false; //動く床に乗っているかどうか\r\n        this.heightSize = this.characterSize;\r\n    }\r\n    Object.defineProperty(character.prototype, \"x\", {\r\n        /* getter/setter */\r\n        get: function () {\r\n            return this._x;\r\n        },\r\n        set: function (x) {\r\n            if (x < -360 / 2) {\r\n                this._x = 360 / 2;\r\n            }\r\n            else if (x > 360 / 2) {\r\n                this._x = -360 / 2;\r\n            }\r\n            else {\r\n                this._x = x;\r\n            }\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(character.prototype, \"y\", {\r\n        get: function () {\r\n            return this._y;\r\n        },\r\n        set: function (y) {\r\n            this._y = y;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(character.prototype, \"dx\", {\r\n        get: function () {\r\n            return this._dx;\r\n        },\r\n        set: function (dx) {\r\n            if (dx > this.dxMax) {\r\n                this._dx = this.dxMax;\r\n            }\r\n            else if (dx < -this.dxMax) {\r\n                this._dx = -this.dxMax;\r\n            }\r\n            else {\r\n                this._dx = dx;\r\n            }\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(character.prototype, \"dy\", {\r\n        get: function () {\r\n            return this._dy;\r\n        },\r\n        set: function (dy) {\r\n            this._dy = dy;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(character.prototype, \"jumpVelocity\", {\r\n        get: function () {\r\n            return this._jumpVelocity;\r\n        },\r\n        set: function (jumpVelocity) {\r\n            if (jumpVelocity > this.jumpChargeMax) {\r\n                this._jumpVelocity = this.jumpChargeMax;\r\n            }\r\n            else {\r\n                this._jumpVelocity = jumpVelocity;\r\n            }\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    character.prototype.move = function () {\r\n        this.x += this.dx;\r\n        if ((this.checkAboveScaffold()) && (this.height + this.dy < this.currentScaffold().height)) { //足場の直上にいて、これ以上落ちたら足場を貫通してしまう場合、足場の上に留まる\r\n            this.y = this.currentScaffold().y;\r\n            this.height = this.currentScaffold().height;\r\n        }\r\n        else {\r\n            this.y += this.dy;\r\n            this.height += this.dy;\r\n        }\r\n        if (this.isOnGround === false) { //空中にいるとき、落ちる\r\n            this.dy -= this.fallVelocitiy;\r\n        }\r\n        else if (this.dy < 0) { //地上にいるとき、落ちない\r\n            this.dy = 0;\r\n        }\r\n        if (this.isSlip === false) {\r\n            this.dx = 0;\r\n        }\r\n        else { //滑るときの処理 調整は適当\r\n            if ((this.dx < this.moveVelocity) && (this.dx > -this.moveVelocity)) {\r\n                this.dx = 0;\r\n            }\r\n            else {\r\n                this.dx *= 0.95;\r\n            }\r\n        }\r\n        document.getElementById('character').style.left = ((this.x) + (_index__WEBPACK_IMPORTED_MODULE_0__.display.clientWidth / 2) - (this.characterSize / 2)) + \"px\";\r\n        document.getElementById('character').style.top = (640 - (this.y + (this.heightSize))) + \"px\";\r\n        this.isOnGround = this.checkOnGround();\r\n    };\r\n    character.prototype.currentScaffold = function () {\r\n        return _index__WEBPACK_IMPORTED_MODULE_0__.scaffolds[0];\r\n        //return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]//今いる区間の足場\r\n    };\r\n    character.prototype.checkAboveScaffold = function () {\r\n        if (((this.x - this.footSize / 2) <= (this.currentScaffold().width / 2 + this.currentScaffold().x)) && ((this.x + this.footSize / 2) >= (-this.currentScaffold().width / 2 + this.currentScaffold().x))) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    };\r\n    character.prototype.checkOnGround = function () {\r\n        if ((this.height === this.currentScaffold().height) && (this.checkAboveScaffold())) { //「自分の高さが今いる区間の足場と同じ」かつ「自分のx座標が今いる区間の足場の範囲に入っている」場合\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    };\r\n    character.prototype.moveLeft = function () {\r\n        if (this.isOnGround === false) {\r\n            this.dx -= this.moveVelocity;\r\n        }\r\n        document.getElementById('character').style.transform = \"rotateY(0deg)\";\r\n    };\r\n    character.prototype.moveRight = function () {\r\n        if (this.isOnGround === false) {\r\n            this.dx += this.moveVelocity;\r\n        }\r\n        document.getElementById('character').style.transform = \"rotateY(180deg)\";\r\n    };\r\n    character.prototype.jumpCharge = function () {\r\n        this.jumpVelocity += this.jumpChargeAmount;\r\n        /* 縮む処理 */\r\n        var heightMin = 10;\r\n        var shrunkenSize = this.characterSize * ((this.jumpChargeMax - this.jumpVelocity) / this.jumpChargeMax);\r\n        if (shrunkenSize < heightMin) {\r\n            this.heightSize = heightMin;\r\n        }\r\n        else {\r\n            this.heightSize = shrunkenSize;\r\n        }\r\n        document.getElementById('character').style.height = (this.heightSize) + \"px\"; //ジャンプ前の踏ん張り縮み\r\n    };\r\n    character.prototype.jump = function () {\r\n        this.heightSize = this.characterSize;\r\n        if (this.isOnGround === true) {\r\n            this.dy += this.jumpVelocity;\r\n        }\r\n        this.jumpVelocity = 0;\r\n        document.getElementById('character').style.height = this.characterSize + \"px\"; //踏ん張り縮み解放\r\n    };\r\n    return character;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/character/character.ts?");

/***/ }),

/***/ "./src/character/characterRabbit.ts":
/*!******************************************!*\
  !*** ./src/character/characterRabbit.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"characterRabbit\": () => (/* binding */ characterRabbit)\n/* harmony export */ });\n/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./character */ \"./src/character/character.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar characterRabbit = /** @class */ (function (_super) {\r\n    __extends(characterRabbit, _super);\r\n    function characterRabbit() {\r\n        var _this = _super.call(this) || this;\r\n        document.write('<img id=\"character\" src=\"./../resource/rabbit.png\">'); //キャラ出現\r\n        document.getElementById('character').style.width = _this.characterSize + \"px\"; //初期大きさ設定(幅)\r\n        document.getElementById('character').style.height = _this.characterSize + \"px\"; //初期大きさ設定(高さ)\r\n        return _this;\r\n    }\r\n    return characterRabbit;\r\n}(_character__WEBPACK_IMPORTED_MODULE_0__.character));\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/character/characterRabbit.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"display\": () => (/* binding */ display),\n/* harmony export */   \"key\": () => (/* binding */ key),\n/* harmony export */   \"rabbit\": () => (/* binding */ rabbit),\n/* harmony export */   \"scaffolds\": () => (/* binding */ scaffolds),\n/* harmony export */   \"stylesheets\": () => (/* binding */ stylesheets)\n/* harmony export */ });\n/* harmony import */ var _character_characterRabbit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./character/characterRabbit */ \"./src/character/characterRabbit.ts\");\n/* harmony import */ var _scaffold_normalScaffold__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scaffold/normalScaffold */ \"./src/scaffold/normalScaffold.ts\");\n/* harmony import */ var _other_keyDown_keyDown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./other/keyDown/keyDown */ \"./src/other/keyDown/keyDown.ts\");\n\r\n\r\n\r\nvar display = document.getElementById('display');\r\n//let canvas:any=document.getElementById(\"myCanvas\")\r\nvar stylesheets = document.styleSheets.item(0);\r\nvar rabbit = new _character_characterRabbit__WEBPACK_IMPORTED_MODULE_0__.characterRabbit();\r\nvar key = new _other_keyDown_keyDown__WEBPACK_IMPORTED_MODULE_2__.keyDown();\r\nvar scaffolds = new Array; //足場配列を作成\r\nscaffolds[0] = new _scaffold_normalScaffold__WEBPACK_IMPORTED_MODULE_1__.normalScaffold(0); //初期足場を作成\r\nrequestAnimationFrame(main); //メインループ、起動\r\nfunction main() {\r\n    addEventListener(\"keydown\", key.keyDownFunc); //キーボードが押された時、keyDownFunc関数を呼び出す\r\n    addEventListener(\"keyup\", key.keyUpFunc); //キーボードが離された時、keyUpFunc関数を呼び出す\r\n    /*     【仕様】\r\n        左右キーは同時に押すとどちらにも移動できない(どちらか片方を押しているときのみ移動できる)\r\n        ジャンプはジャンプキーを押している間に跳躍力を貯めて、ジャンプキーを離すと貯めた跳躍力の分だけ跳べる\r\n        接地中の移動はできない */\r\n    if ((key.key_left === true) && (key.key_right === false)) { //左移動キーが押されている間、moveLeft関数を呼び出す\r\n        rabbit.moveLeft();\r\n    }\r\n    if ((key.key_right === true) && (key.key_left === false)) { //右移動キーが押されている間、moveRight関数を呼び出す\r\n        rabbit.moveRight();\r\n    }\r\n    if ((key.key_jump === true)) { //ジャンプキーが押されている間、jumpCharge関数を呼び出す\r\n        rabbit.jumpCharge();\r\n    }\r\n    var sampleArea = document.getElementById(\"sampleArea\");\r\n    sampleArea.innerHTML = \"stylesheets_number:\" + String(stylesheets);\r\n    var sampleArea = document.getElementById(\"sampleArea2\");\r\n    sampleArea.innerHTML = \"Height:\" + String(rabbit.y - 50);\r\n    rabbit.move();\r\n    for (var i = 0; i < scaffolds.length; i++) {\r\n        scaffolds[i].scrole();\r\n    }\r\n    requestAnimationFrame(main); ////main関数(自分自身)を呼び出すことでループさせる\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/other/keyDown/keyDown.ts":
/*!**************************************!*\
  !*** ./src/other/keyDown/keyDown.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"keyDown\": () => (/* binding */ keyDown)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index */ \"./src/index.ts\");\n\r\n\r\nvar keyDown = /** @class */ (function () {\r\n    function keyDown() {\r\n        this.key_left = false; //左移動キーが押されているかどうか\r\n        this.key_right = false; //右移動キーが押されているかどうか\r\n        this.key_jump = false; //ジャンプキーが押されているかどうか\r\n    }\r\n    keyDown.prototype.keyDownFunc = function (event) {\r\n        switch (event.keyCode) {\r\n            case 65: //「A」キーが押されたとき\r\n                this.key_left = true;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_left = this.key_left;\r\n                break;\r\n            case 68: //「D」キーが押されたとき\r\n                this.key_right = true;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_right = this.key_right;\r\n                break;\r\n            case 32: //「Space」キーが押されたとき\r\n                this.key_jump = true;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_jump = this.key_jump;\r\n                break;\r\n        }\r\n    };\r\n    keyDown.prototype.keyUpFunc = function (event) {\r\n        switch (event.keyCode) {\r\n            case 65: //「A」キーが離されたとき\r\n                this.key_left = false;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_left = this.key_left;\r\n                break;\r\n            case 68: //「D」キーが離されたとき\r\n                this.key_right = false;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_right = this.key_right;\r\n                break;\r\n            case 32: //「Space」キーが離されたとき\r\n                this.key_jump = false;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.key.key_jump = this.key_jump;\r\n                _index__WEBPACK_IMPORTED_MODULE_0__.rabbit.jump();\r\n                break;\r\n        }\r\n    };\r\n    return keyDown;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/other/keyDown/keyDown.ts?");

/***/ }),

/***/ "./src/scaffold/normalScaffold.ts":
/*!****************************************!*\
  !*** ./src/scaffold/normalScaffold.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"normalScaffold\": () => (/* binding */ normalScaffold)\n/* harmony export */ });\n/* harmony import */ var _scaffold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scaffold */ \"./src/scaffold/scaffold.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar normalScaffold = /** @class */ (function (_super) {\r\n    __extends(normalScaffold, _super);\r\n    function normalScaffold(_level, _width) {\r\n        if (_width === void 0) { _width = _scaffold__WEBPACK_IMPORTED_MODULE_0__.scaffold.defaultWidth; }\r\n        var _this = _super.call(this, _level, _width) || this;\r\n        document.write('<img id=\"scaffold\" src=\"./../resource/normalScaffold.jpg\">'); //足場出現\r\n        document.getElementById('scaffold').style.width = _this.width + \"px\"; //初期大きさ設定(幅)\r\n        document.getElementById('scaffold').style.height = _scaffold__WEBPACK_IMPORTED_MODULE_0__.scaffold.thickness + \"px\"; //初期大きさ設定(厚さ)\r\n        return _this;\r\n    }\r\n    return normalScaffold;\r\n}(_scaffold__WEBPACK_IMPORTED_MODULE_0__.scaffold));\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scaffold/normalScaffold.ts?");

/***/ }),

/***/ "./src/scaffold/scaffold.ts":
/*!**********************************!*\
  !*** ./src/scaffold/scaffold.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"scaffold\": () => (/* binding */ scaffold)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ \"./src/index.ts\");\n\r\nvar scaffold = /** @class */ (function () {\r\n    function scaffold(_level, _width) {\r\n        if (_width === void 0) { _width = scaffold.defaultWidth; }\r\n        this._x = 0; //X座標\r\n        this._y = 0; //y座標\r\n        this._height = 0; //足場の位置する高さ\r\n        this._width = scaffold.defaultWidth; //広さ\r\n        this.level = _level;\r\n        this.height = this.level * scaffold.scaffoldDistance; //足場の位置する高さを\"階層×足場同士の幅\"として設定\r\n        if (this.level === 0) {\r\n            this.width = 360;\r\n            this.x = 0;\r\n        }\r\n        else {\r\n            this.width = _width;\r\n            this.x = Math.random(); //作りかけ\r\n            /* 0階層目(初期足場)以外のとき、ランダムなx座標に設定するプログラムを後でここらへんに書く */\r\n        }\r\n    }\r\n    Object.defineProperty(scaffold.prototype, \"x\", {\r\n        /* getter/setter */\r\n        get: function () {\r\n            return this._x;\r\n        },\r\n        set: function (x) {\r\n            this._x = x;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(scaffold.prototype, \"y\", {\r\n        get: function () {\r\n            return this._y;\r\n        },\r\n        set: function (y) {\r\n            this._y = y;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(scaffold.prototype, \"width\", {\r\n        get: function () {\r\n            return this._width;\r\n        },\r\n        set: function (width) {\r\n            this._width = width;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(scaffold.prototype, \"height\", {\r\n        get: function () {\r\n            return this._height;\r\n        },\r\n        set: function (height) {\r\n            this._height = height;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    scaffold.prototype.scrole = function () {\r\n        document.getElementById('scaffold').style.left = ((this.x) + (_index__WEBPACK_IMPORTED_MODULE_0__.display.clientWidth / 2) - (this.width / 2)) + \"px\"; //x座標設定\r\n        this.y = 50 + scaffold.scaffoldDistance * this.level;\r\n        this.height = scaffold.scaffoldDistance * this.level;\r\n        document.getElementById('scaffold').style.top = (640 - (this.y)) + \"px\"; //y座標設定 高さは\"50+200*level\"\r\n    };\r\n    scaffold.defaultWidth = 150; //基本の足場広さ\r\n    scaffold.thickness = 20; //厚さ\r\n    scaffold.scaffoldDistance = 200; //足場同士の上下幅\r\n    return scaffold;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/scaffold/scaffold.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;