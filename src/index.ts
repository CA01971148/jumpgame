import {characterRabbit} from "./character/characterRabbit"
import {characterRabbitEdge} from "./character/characterRabbitEdge"
import {scaffold} from "./scaffold/scaffold"
import {normalScaffold} from "./scaffold/normalScaffold"
import {slipScaffold} from "./scaffold/slipScaffold"
import {carryScaffold} from "./scaffold/carryScaffold"
import {movingScaffold} from "./scaffold/movingScaffold"
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
export let playerCamera=new camera()//プレイヤーに追随する視点用カメラ
export let scaffolds:scaffold[]=new Array//足場配列を作成

scaffolds[0]=new normalScaffold(0)//初期足場を作成

type scaffoldsType="normal"|"slip"|"carry"|"moving"//足場のタイプを型として宣言
let scaffoldsTypeList:scaffoldsType[]=["normal","slip","carry","moving"]//型を纏めたリスト配列

let lotteryBox:scaffoldsType[]=new Array//足場の種類を重み付き抽選するための箱を作成
for(let i:number=0;i<1;i++){
    lotteryBox.push("normal")
}
for(let i:number=0;i<1;i++){
    lotteryBox.push("slip")
}

function createRandomScaffold(level:number,type:scaffoldsType=(lotteryBox[Math.floor(Math.random()*lotteryBox.length)]),width:number=(Math.random()*100+50)){//足場を作成する関数
    switch (type){
        case "normal":
            scaffolds[level]=new normalScaffold(level,width)
            a+="無"
            break
        case "slip":
            scaffolds[level]=new slipScaffold(level,300)
            a+="氷"
            break
        case "carry":
            scaffolds[level]=new carryScaffold(level,width)
            a+="運"
            break
        case "moving":
            scaffolds[level]=new movingScaffold(level,width)
            a+="雲"
            break
        default:
            break
    }
}


const maxLevel:number=10//仮変数 いつか消す
let a:string=""

/* createRandomScaffold(1,"normal",100)
createRandomScaffold(2,"slip",300)
createRandomScaffold(3,"normal",100)
createRandomScaffold(4,"slip",300)
createRandomScaffold(5,"slip",300)
createRandomScaffold(6,"normal",100)
createRandomScaffold(7,"normal",100)
createRandomScaffold(8,"slip",300) */

/* for(let i:number=1;i<maxLevel;i++){//足場配列に新しい足場を追加していく
createRandomScaffold(i)
} */

/* for(let i:number=1;i<maxLevel;i+=2){//氷通常氷通常、交互に作成
    createRandomScaffold(i,"slip",300)
    createRandomScaffold(i+1,"normal",100)
} */

/* for(let i:number=1;i<maxLevel;i++){//ランダムに作成
    createRandomScaffold(i,scaffoldsTypeList[Math.floor(Math.random()*2)])
} */

/* let typeCommand:scaffoldsType[]=["normal","slip","normal"]
for(let i:number=1;i<typeCommand.length+1;i++){
    createRandomScaffold(i,typeCommand[i-1],100)
} */

let typeCommand:scaffoldsType[]=new Array
for(let i:number=0;i<5;i++){
    typeCommand.push(lotteryBox[Math.floor(Math.random()*lotteryBox.length)])
    //typeCommand.push(scaffoldsTypeList[(Math.floor(Math.random()*scaffoldsTypeList.length))])
}
for(let i:number=1;i<typeCommand.length+1;i++){
    createRandomScaffold(i,typeCommand[i-1],100)
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
    sampleArea.innerHTML="scaffolds["+rabbit.currentScaffold().level+"] instanceof slipScaffold:"+String(rabbit.currentScaffold() instanceof slipScaffold)
    sampleArea2.innerHTML="無"+a+"<br>"
    sampleArea2.innerHTML+="normal,"+typeCommand+"<br>"
    for(let i:number=0;i<scaffolds.length;i++){
        var type:scaffoldsType
        if(scaffolds[i] instanceof normalScaffold){
            type="normal"
        }else if(scaffolds[i] instanceof slipScaffold){
            type="slip"
        }
        sampleArea2.innerHTML+="scaffolds["+i+"]:"+type+"Scaffold"+"<br>"
    }
    showScore.innerHTML="score:"+String(Math.round(rabbit.height))

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