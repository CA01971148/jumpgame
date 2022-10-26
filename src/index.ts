import {characterRabbit} from "./character/characterRabbit"
import {characterEdge} from "./character/characterEdge"
import {scaffold} from "./scaffold/scaffold"
import {normalScaffold} from "./scaffold/normalScaffold"
import {slipScaffold} from "./scaffold/slipScaffold"
import {carryScaffold} from "./scaffold/carryScaffold"
import {movingScaffold} from "./scaffold/movingScaffold"
import {keyDown} from "./other/keyDown/keyDown"
import {camera} from "./other/camera/camera"

export const canvas:HTMLCanvasElement=<HTMLCanvasElement>document.getElementById("myCanvas")//canvasを取得
export const stylesheet:CSSStyleSheet=document.styleSheets.item(0)//CSSを読み込むための宣言

export let rabbit=new characterRabbit()//rabbitクラス
export let key=new keyDown()//キーボードが押されたかどうか判断するクラス
export let playerCamera=new camera()//プレイヤーに追随する視点用カメラ
export let scaffolds:scaffold[]=new Array//足場配列を作成

export type scaffoldsType="normal"|"slip"|"carry"|"moving"//足場のタイプを型として宣言
const scaffoldsTypeList:scaffoldsType[]=["normal","slip","carry","moving"]//型を纏めたリスト配列
let lotteryBox:scaffoldsType[]=new Array//足場の種類を重み付き抽選するための箱を作成
lotteryBox=["normal","slip","carry","moving"]
const defaultMaxLevel:number=10//初期作成足場数
const loadScaffoldFrequency=5//足場の作成頻度
let canCreateScaffold:boolean=true//現在、足場を作れるかどうか(現在足場を作っている間は作れないようにする)
export function createRandomScaffold(type:scaffoldsType=(lotteryBox[Math.floor(Math.random()*lotteryBox.length)]),width:number=Math.random()*100+75,level:number=scaffolds.length){//足場を作成する関数
    switch (type){
        case "normal":
            scaffolds[level]=new normalScaffold(level,width)
            break
        case "slip":
            scaffolds[level]=new slipScaffold(level,width)
            break
        case "carry":
            scaffolds[level]=new carryScaffold(level,width)
            break
        case "moving":
            scaffolds[level]=new movingScaffold(level,width)
            break
        default:
            break
    }
}
function createScaffolds(repetition:number){//足場をたくさん作る関数
    canCreateScaffold=false
    for(let i:number=0;i<repetition;i++){//足場配列に新しい足場を追加していく
        createRandomScaffold()//次の足場を作成
    }
    canCreateScaffold=true
}
function loadNewScaffold(){//キャラが足場を昇る度に足場を追加して無限に昇れるようにする関数
    if((rabbit.currentScaffold().level>(scaffolds.length-1)-loadScaffoldFrequency)&&(canCreateScaffold)){//もうそろそろ足場の最大数まで昇るかなってときに足場の数を追加するよ。足場を作っている間は新しく重複して作れないようにしてるよ。
        //createScaffolds(loadScaffoldFrequency)
    }
}
createRandomScaffold("normal")//初期足場を作成
createScaffolds(defaultMaxLevel)//初期読み込み分の足場を作成

/* デバッグ用関数等 */
const sampleArea:HTMLElement=document.getElementById("sampleArea")
const showScore:HTMLElement=document.getElementById("showScore")
function loadDebugArea(){//デバッグ用エリアを更新するための関数
    /* デバッグ用エリア(何か見たい変数等があればここに追加すれば画面下に文字が表示される) */
    sampleArea.innerHTML=`Level:${rabbit.currentScaffold().level}/${scaffolds.length}`
    showScore.innerHTML="score:"+String(Math.round(rabbit.height))
}
export function sleep(waitMsec:any){//スリープさせる関数(デバッグ用)
    var startMsec:any = new Date();
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (true){
        var testVar:any=new Date()
        if(testVar - startMsec > waitMsec) {
            break;
        }
    };
}

function updateDisplay(){//画面更新用処理
    rabbit.move()
    playerCamera.y=rabbit.height-100

    for(let i:number=0;i<scaffolds.length;i++){//for文で全部の足場を更新
        scaffolds[i].scrole()
    }
}

function isKeyDown(){//キーが押されているかどうか判断するための関数
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
}

requestAnimationFrame(main)//メインループ、起動

function main(){//メインループ
    addEventListener("keydown",key.keyDownFunc)//キーボードが押された時、keyDownFunc関数を呼び出す
    addEventListener("keyup",key.keyUpFunc)//キーボードが離された時、keyUpFunc関数を呼び出す

    isKeyDown()//キーが押されているかどうか判断

    loadDebugArea()//デバッグ用エリアを更新
    updateDisplay()//画面を更新(rabbitやscaffolds等)
    loadNewScaffold()//足場を途切れないように追加していく処理

    requestAnimationFrame(main)////main関数(自分自身)を呼び出すことでループさせる
}