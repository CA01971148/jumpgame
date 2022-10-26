import {character} from "./character"
import {characterRabbitEdge} from "./characterRabbitEdge"

export class characterRabbit extends character{
    rabbitEdge:characterRabbitEdge[]=new Array//rabbitが画面端にいるとき、もう片方の画面端にもrabbitを映すためのクラスを格納するための配列
    constructor(){
        super()
        this.imageName="rabbit.png"
        this.createImgElement(this.imageName)//キャラクターのimg要素を追加する
        this.setImgElement()//img要素を取得して初期化する
        this.rabbitEdge[0]=new characterRabbitEdge("character","rabbit_L")//左端処理用rabbitクラス(見た目上のもの)
        this.rabbitEdge[1]=new characterRabbitEdge("character","rabbit_R")//右端処理用rabbitクラス(見た目上のもの)
    }

    public move(){//慣性で移動する関数
        super.move()
        this.rabbitEdge[0].load(-1)
        this.rabbitEdge[1].load(1)
    }

    protected newCharacterEdge(){

    }
}
