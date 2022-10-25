import {character} from "./character"
import { characterRabbitEdge } from "./characterRabbitEdge"

export class characterRabbit extends character{
    rabbitEdge:characterRabbitEdge[]=new Array//rabbitが画面端にいるとき、もう片方の画面端にもrabbitを映すためのクラスを格納するための配列
    constructor(){
        super()
        document.write('<img id="character" src="./../resource/image/rabbit.png">')//キャラ出現
        this.characterID=document.getElementById('character')!//IDを取得
        this.characterID.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        this.characterID.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
        this.rabbitEdge[0]=new characterRabbitEdge("character","rabbit_L")//左端処理用rabbitクラス(見た目上のもの)
        this.rabbitEdge[1]=new characterRabbitEdge("character","rabbit_R")//右端処理用rabbitクラス(見た目上のもの)
    }

    public move(){//慣性で移動する関数
        super.move()
        this.rabbitEdge[0].load(-1)
        this.rabbitEdge[1].load(1)
    }
}
