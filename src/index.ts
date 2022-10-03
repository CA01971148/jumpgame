import {characterRabbit} from "./character/characterRabbit"
import {scaffold} from "./scaffold/scaffold"
import {normalScaffold} from "./scaffold/normalScaffold"
import {keyDown} from "./other/keyDown/keyDown"

export let display:any=document.getElementById('display');
//let canvas:any=document.getElementById("myCanvas")

export let rabbit=new characterRabbit()
export let key=new keyDown()
export let scaffolds:scaffold[]=new Array//足場配列を作成
scaffolds[0]=new normalScaffold(0)//初期足場を作成
requestAnimationFrame(main)//メインループ、起動

function main(){//メインループ
    addEventListener("keydown",key.keyDownFunc)//キーボードが押された時、keyDownFunc関数を呼び出す
    addEventListener("keyup",key.keyUpFunc)//キーボードが離された時、keyUpFunc関数を呼び出す

/*     【仕様】
    左右キーは同時に押すとどちらにも移動できない(どちらか片方を押しているときのみ移動できる)
    ジャンプはジャンプキーを押している間に跳躍力を貯めて、ジャンプキーを離すと貯めた跳躍力の分だけ跳べる
    接地中の移動はできない */

	if((key.key_left===true)&&(key.key_right===false)){//左移動キーが押されている間、moveLeft関数を呼び出す
        rabbit.moveLeft()
    }
	if((key.key_right===true)&&(key.key_left===false)){//右移動キーが押されている間、moveRight関数を呼び出す
        rabbit.moveRight()
    }
    if((key.key_jump===true)){//ジャンプキーが押されている間、jumpCharge関数を呼び出す
        rabbit.jumpCharge()
    }

    var sampleArea:any=document.getElementById("sampleArea")
    sampleArea.innerHTML="JumpPower:"+String(rabbit.jumpVelocity)+"/"+String(rabbit.jumpChargeMax)
    var sampleArea:any=document.getElementById("sampleArea2")
    sampleArea.innerHTML="Height:"+String(rabbit.y-50)

    rabbit.move()
    for(let i:number=0;i<scaffolds.length;i++){
        scaffolds[i].scrole()
    }
    requestAnimationFrame(main)////main関数(自分自身)を呼び出すことでループさせる
}