"use strict";
document.write('<img id="character" src="resource/rabbit.png">'); //キャラ出現
class character {
    constructor() {
        this.x = 0; //X座標
        this.y = 0; //y座標
        this.dx = 0; //x方向の速度
        this.dy = 0; //y方向の速度
        this.jumpVelocity = 0; //ジャンプ速度
        this.moveVelocity = 10; //横移動科測量
        this.secAdd = 0; //ジャンプ用時間計測変数
        this.isOnGround = true; //接地しているかどうか
        this.isSlip = false; //滑るかどうか
        this.isCarry = false; //動かされているかどうか
        this.isOnMoving = false; //動く床に乗っているかどうか
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.isSlip === false) {
            this.dx = 0;
        }
        document.getElementById('character').style.left = this.x + "px";
        document.getElementById('character').style.top = this.y + "px";
    }
    moveLeft() {
        this.dx -= this.moveVelocity;
    }
    moveRight() {
        this.dx -= this.moveVelocity;
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
                break;
            case 68: //「D」キーが押されたとき
                this.key_right = true;
                var sampleArea = document.getElementById("sampleArea"); //デバッグ用文字エリア
                sampleArea.innerHTML = String(this.key_right);
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
                break;
            case 68: //「D」キーが離されたとき
                this.key_right = false;
                var sampleArea = document.getElementById("sampleArea"); //デバッグ用文字エリア
                sampleArea.innerHTML = String(this.key_right);
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
function main() {
    addEventListener("keydown", key.keyDownFunc); //キーボードが押された時、keyDownFunc関数を呼び出す
    addEventListener("keyup", key.keyUpFunc); //キーボードが離された時、keyUpFunc関数を呼び出す
    /*     【仕様】
        左右キーは同時に押すとどちらにも移動できない(どちらか片方を押しているときのみ移動できる)
        ジャンプはジャンプキーを押している間に跳躍力を貯めて、ジャンプキーを離すと貯めた跳躍力の分だけ跳べる
        跳躍力を貯めている間は接地中の移動ができない */
    /* 	if(((key.key_left===true)&&(key.key_right===false))&&(!((key.key_jump==true)&&(rabbit.isOnGround==true)))){//左移動キーが押されている間、moveLeft関数を呼び出す
            rabbit.moveLeft()
        }
        if(((key.key_right===true)&&(key.key_left===false))&&(!((key.key_jump==true)&&(rabbit.isOnGround==true)))){//右移動キーが押されている間、moveRight関数を呼び出す
            rabbit.moveRight()
        }
        if((key.key_jump===true)){//ジャンプキーが押されている間、jumpCharge関数を呼び出す
            rabbit.jumpCharge()
        } */
    var sampleArea2 = document.getElementById("sampleArea2"); //デバッグ用文字エリア
    sampleArea2.innerHTML = String(key.key_right);
    if (key.key_right == true) {
        kariMove();
    }
    //rabbit.move()
    requestAnimationFrame(main); ////main関数(自分自身)を呼び出すことでループさせる
}
function kariMove() {
    rabbit.x += rabbit.moveVelocity;
    document.getElementById('character').style.left = rabbit.x + "px";
}
