import {characterRabbit} from "./character/characterRabbit"
import {characterRabbitEdge} from "./character/characterRabbitEdge"
import {scaffold} from "./scaffold/scaffold"
import {normalScaffold} from "./scaffold/normalScaffold"
import {keyDown} from "./other/keyDown/keyDown"
import {camera} from "./other/camera/camera"

export const canvas:HTMLCanvasElement=<HTMLCanvasElement>document.getElementById("myCanvas")//canvasを取得
export const stylesheet:CSSStyleSheet=document.styleSheets.item(0)//CSSを読み込むための宣言

const sampleArea:HTMLElement=document.getElementById("sampleArea")
const sampleArea2:HTMLElement=document.getElementById("sampleArea2")
const showScore:HTMLElement=document.getElementById("showScore")

export let rabbit=new characterRabbit()//rabbitクラス
export let rabbitEdge:characterRabbitEdge[]=new Array//rabbitが画面端にいるとき、もう片方の画面端にもrabbitを映すためのクラスを格納するための配列
rabbitEdge[0]=new characterRabbitEdge("rabbit_L")//左端処理用rabbitクラス(見た目上のもの)
rabbitEdge[1]=new characterRabbitEdge("rabbit_R")//右端処理用rabbitクラス(見た目上のもの)
export let key=new keyDown()//キーボードが押されたかどうか判断するクラス
export let playerCamera=new camera()
export let scaffolds:scaffold[]=new Array//足場配列を作成

scaffolds[0]=new normalScaffold(0)//初期足場を作成
const maxLevel:number=10//仮変数 いつか消す
for(let i:number=1;i<maxLevel;i++){//足場配列に新しい足場を追加していく
    scaffolds[i]=new normalScaffold(i,(Math.random()*100+50))
}

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

    /* デバッグ用エリア(何か見たい変数等があればここに追加すれば画面下に文字が表示される) */
    sampleArea.innerHTML="rabbit.height:"+String(Math.floor(rabbit.height))+" currentScaffold().height:"+Math.floor(rabbit.currentScaffold().height)
    sampleArea2.innerHTML="rabbit.dx:"+String(Math.floor(rabbit.dx*10)/10)

    /* 画面更新用処理 */
    rabbit.move()
    playerCamera.y=rabbit.height-100
    //playerCamera.y=0
    rabbitEdge[0].load(-1)
    rabbitEdge[1].load(1)
    for(let i:number=0;i<scaffolds.length;i++){//for文で全部の足場を更新
        scaffolds[i].scrole()
    }

    requestAnimationFrame(main)////main関数(自分自身)を呼び出すことでループさせる
}