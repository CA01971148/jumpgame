"use strict";
//let canvas:any=document.getElementById("myCanvas")
class character {
    constructor() {
        this.characterSize = 50; //キャラの大きさ
        this._x = 0; //X座標
        this._y = 50; //y座標
        this.height = 0; //昇った高さ
        this._dx = 0; //x方向の速度
        this.moveVelocity = 5; //横移動加速量
        this.dxMax = 10; //最大横加速量
        this._dy = 0; //y方向の速度
        this.dyMax = 10; //最大縦加速量
        this._jumpVelocity = 0; //ジャンプ速度
        this.jumpChargeAmount = 5; //跳躍力の貯めやすさ
        this.jumpChargeMax = 100; //跳躍力の貯め限界
        this.fallVelocitiy = 5; //落下速度
        this.isOnGround = true; //接地しているかどうか
        this.isSlip = false; //滑るかどうか
        this.isCarry = false; //動かされているかどうか
        this.isOnMoving = false; //動く床に乗っているかどうか
    }
    /* getter/setter */
    get x() {
        return this._x;
    }
    set x(x) {
        if (x < -360 / 2) {
            this._x = 360 / 2;
        }
        else if (x > 360 / 2) {
            this._x = -360 / 2;
        }
        else {
            this._x = x;
        }
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get dx() {
        return this._dx;
    }
    set dx(dx) {
        if (dx > this.dxMax) {
            this._dx = this.dxMax;
        }
        else if (dx < -this.dxMax) {
            this._dx = -this.dxMax;
        }
        else {
            this._dx = dx;
        }
    }
    get dy() {
        return this._dy;
    }
    set dy(dy) {
        this._dy = dy;
    }
    get jumpVelocity() {
        return this._jumpVelocity;
    }
    set jumpVelocity(jumpVelocity) {
        if (jumpVelocity > this.jumpChargeMax) {
            this._jumpVelocity = this.jumpChargeMax;
        }
        else {
            this._jumpVelocity = jumpVelocity;
        }
    }
    move() {
        this.x += this.dx;
        if ((this.checkAboveScaffold()) && (this.height + this.dy < this.currentScaffold().height)) { //足場の直上にいて、これ以上落ちたら足場を貫通してしまう場合、足場の上に留まる
            this.y = this.currentScaffold().y;
            this.height = this.currentScaffold().height;
        }
        else {
            this.y += this.dy;
            this.height += this.dy;
        }
        if (this.isOnGround === false) { //空中にいるとき、落ちる
            this.dy -= this.fallVelocitiy;
        }
        else if (this.dy < 0) { //地上にいるとき、落ちない
            this.dy = 0;
        }
        if (this.isSlip === false) {
            this.dx = 0;
        }
        else { //滑るときの処理 調整は適当
            if ((this.dx < this.moveVelocity) && (this.dx > -this.moveVelocity)) {
                this.dx = 0;
            }
            else {
                this.dx *= 0.95;
            }
        }
        document.getElementById('character').style.left = ((this.x) + (window.innerWidth / 2) - (this.characterSize / 2)) + "px";
        document.getElementById('character').style.top = (640 - (this.y + this.characterSize)) + "px";
        this.isOnGround = this.checkOnGround();
    }
    currentScaffold() {
        return scaffolds[0];
        //return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]//今いる区間の足場
    }
    checkAboveScaffold() {
        if (((this.x) <= (this.currentScaffold().width / 2 + this.currentScaffold().x)) && ((this.x) >= (-this.currentScaffold().width / 2 + this.currentScaffold().x))) {
            return true;
        }
        else {
            return false;
        }
    }
    checkOnGround() {
        if ((this.height === this.currentScaffold().height) && (this.checkAboveScaffold())) { //「自分の高さが今いる区間の足場と同じ」かつ「自分のx座標が今いる区間の足場の範囲に入っている」場合
            return true;
        }
        else {
            return false;
        }
    }
    moveLeft() {
        this.dx -= this.moveVelocity;
        document.getElementById('character').style.transform = "rotateY(0deg)";
    }
    moveRight() {
        this.dx += this.moveVelocity;
        document.getElementById('character').style.transform = "rotateY(180deg)";
    }
    jumpCharge() {
        this.jumpVelocity += this.jumpChargeAmount;
    }
    jump() {
        this.dy += this.jumpVelocity;
        this.jumpVelocity = 0;
    }
}
class characterRabbit extends character {
    constructor() {
        super();
        document.write('<img id="character" src="resource/rabbit.png">'); //キャラ出現
        document.getElementById('character').style.width = this.characterSize + "px"; //初期大きさ設定(幅)
        document.getElementById('character').style.height = this.characterSize + "px"; //初期大きさ設定(高さ)
    }
}
class scaffold {
    constructor(_level, _width = scaffold.defaultWidth) {
        this._x = 0; //X座標
        this._y = 0; //y座標
        this._height = 0; //足場の位置する高さ
        this._width = scaffold.defaultWidth; //広さ
        this.level = _level;
        this.height = this.level * scaffold.scaffoldDistance; //足場の位置する高さを"階層×足場同士の幅"として設定
        if (this.level === 0) {
            this.width = 360;
            this.x = 0;
        }
        else {
            this.width = _width;
            this.x = Math.random(); //作りかけ
            /* 0階層目(初期足場)以外のとき、ランダムなx座標に設定するプログラムを後でここらへんに書く */
        }
    }
    /* getter/setter */
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    scrole() {
        document.getElementById('scaffold').style.left = ((this.x) + (window.innerWidth / 2) - (this.width / 2) - 10) + "px"; //x座標設定
        this.y = 50 + scaffold.scaffoldDistance * this.level;
        document.getElementById('scaffold').style.top = (640 - (this.y)) + "px"; //y座標設定 高さは"50+200*level"
    }
}
scaffold.defaultWidth = 150; //基本の足場広さ
scaffold.thickness = 20; //厚さ
scaffold.scaffoldDistance = 200; //足場同士の上下幅
class normalScaffold extends scaffold {
    constructor(_level, _width = scaffold.defaultWidth) {
        super(_level, _width);
        document.write('<img id="scaffold" src="resource/normalScaffold.jpg">'); //足場出現
        document.getElementById('scaffold').style.width = this.width + "px"; //初期大きさ設定(幅)
        document.getElementById('scaffold').style.height = scaffold.thickness + "px"; //初期大きさ設定(厚さ)
    }
}
class keyDown {
    constructor() {
        this.key_left = false; //左移動キーが押されているかどうか
        this.key_right = false; //右移動キーが押されているかどうか
        this.key_jump = false; //ジャンプキーが押されているかどうか
    }
    keyDownFunc(event) {
        switch (event.keyCode) {
            case 65: //「A」キーが押されたとき
                this.key_left = true;
                key.key_left = this.key_left;
                break;
            case 68: //「D」キーが押されたとき
                this.key_right = true;
                key.key_right = this.key_right;
                break;
            case 32: //「Space」キーが押されたとき
                this.key_jump = true;
                key.key_jump = this.key_jump;
                break;
        }
    }
    keyUpFunc(event) {
        switch (event.keyCode) {
            case 65: //「A」キーが離されたとき
                this.key_left = false;
                key.key_left = this.key_left;
                break;
            case 68: //「D」キーが離されたとき
                this.key_right = false;
                key.key_right = this.key_right;
                break;
            case 32: //「Space」キーが離されたとき
                this.key_jump = false;
                key.key_jump = this.key_jump;
                rabbit.jump();
                break;
        }
    }
}
let rabbit = new characterRabbit();
let key = new keyDown();
let scaffolds = new Array; //足場配列を作成
scaffolds[0] = new normalScaffold(0); //初期足場を作成
requestAnimationFrame(main); //メインループ、起動
function main() {
    addEventListener("keydown", key.keyDownFunc); //キーボードが押された時、keyDownFunc関数を呼び出す
    addEventListener("keyup", key.keyUpFunc); //キーボードが離された時、keyUpFunc関数を呼び出す
    /*     【仕様】
        左右キーは同時に押すとどちらにも移動できない(どちらか片方を押しているときのみ移動できる)
        ジャンプはジャンプキーを押している間に跳躍力を貯めて、ジャンプキーを離すと貯めた跳躍力の分だけ跳べる
        接地中の移動はできない */
    if ((key.key_left === true) && (key.key_right === false)) { //左移動キーが押されている間、moveLeft関数を呼び出す
        rabbit.moveLeft();
    }
    if ((key.key_right === true) && (key.key_left === false)) { //右移動キーが押されている間、moveRight関数を呼び出す
        rabbit.moveRight();
    }
    if ((key.key_jump === true)) { //ジャンプキーが押されている間、jumpCharge関数を呼び出す
        rabbit.jumpCharge();
    }
    var sampleArea = document.getElementById("sampleArea");
    sampleArea.innerHTML = "a:" + String(rabbit.dy);
    var sampleArea = document.getElementById("sampleArea2");
    sampleArea.innerHTML = "b:" + String(rabbit.height);
    rabbit.move();
    for (let i = 0; i < scaffolds.length; i++) {
        scaffolds[i].scrole();
    }
    requestAnimationFrame(main); ////main関数(自分自身)を呼び出すことでループさせる
}
