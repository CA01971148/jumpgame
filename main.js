"use strict";
//let myCanvas:any=document.getElementById("myCanvas")
class character {
    constructor() {
        this.characterSize = 50; //キャラの大きさ
        this.x = 0; //X座標
        this.y = 0; //y座標
        this.height = 0; //昇った高さ
        this.dx = 0; //x方向の速度
        this.dy = 0; //y方向の速度
        this.jumpVelocity = 0; //ジャンプ速度
        this.moveVelocity = 5; //横移動科測量
        this.secAdd = 0; //ジャンプ用時間計測変数
        this.isOnGround = true; //接地しているかどうか
        this.isSlip = false; //滑るかどうか
        this.isCarry = false; //動かされているかどうか
        this.isOnMoving = false; //動く床に乗っているかどうか
        document.write('<img id="character" src="resource/rabbit.png">'); //キャラ出現
        document.getElementById('character').style.width = this.characterSize + "px"; //初期大きさ設定(幅)
        document.getElementById('character').style.height = this.characterSize + "px"; //初期大きさ設定(高さ)
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.isSlip === false) {
            this.dx = 0;
        }
        document.getElementById('character').style.left = ((this.x) + (window.innerWidth / 2) - (this.characterSize / 2)) + "px";
        document.getElementById('character').style.top = ((640 - 640 * 1 / 5) - (this.y)) + "px";
    }
    moveLeft() {
        this.dx -= this.moveVelocity;
    }
    moveRight() {
        this.dx += this.moveVelocity;
    }
    jumpCharge() {
    }
    jump() {
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
                break;
        }
    }
}
let rabbit = new character();
let key = new keyDown();
requestAnimationFrame(main); //メインループ、起動
let a = false;
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
    sampleArea.innerHTML = "表示したい文字列";
    rabbit.move();
    requestAnimationFrame(main); ////main関数(自分自身)を呼び出すことでループさせる
}
