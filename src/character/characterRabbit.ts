import {character} from "./character"
import {characterEdge} from "./characterEdge"

export class characterRabbit extends character{
    constructor(){
        super()
        this.imageName="rabbit.png"
        this.createImgElement(this.imageName)//キャラクターのimg要素を追加する
        this.setImgElement()//img要素を取得して初期化する
        this.newCharacterEdge()//画面端処理(もう片方の画面にもキャラを表示する処理)用クラスをnewする
    }

    public move(){//慣性で移動する関数
        super.move()
        this.characterEdges[0].load(-1)
        this.characterEdges[1].load(1)
    }

    protected newCharacterEdge(){//画面端処理(もう片方の画面にもキャラを表示する処理)用クラスをnewするメソッド
        /*  必ず本体のimg要素を作成してから実行すること */
        this.characterEdges[0]=new characterEdge(this.imageName,"L")//左端処理用クラス(見た目上のもの)
        this.characterEdges[1]=new characterEdge(this.imageName,"R")//右端処理用クラス(見た目上のもの)
    }
}
