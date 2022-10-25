import {character} from "./character"
import {rabbit,stylesheet,canvas} from "../index"

/* メインのrabbitの右側と左側に幻影のrabbit(当たり判定等を持たない)を作成し、
rabbitが画面端にいるとき、もう片方の画面端からもrabbitが見えるようにするためのクラス */
export class characterRabbitEdge extends character{
    private IDname:string
    private characterEdgeID:HTMLElement//getElementByID用

    constructor(originID:string,_IDName:string){
        super()
        this.IDname=_IDName
        this.createCSSRule()
        document.write('<img id="'+this.IDname+'" src="./../resource/image/rabbit.png">')//キャラ出現
        this.characterEdgeID=document.getElementById(this.IDname)!
        this.characterID=document.getElementById(originID)!
    }

    private createCSSRule(){//CSSルールを作成
        const contents:string="#"+this.IDname+"{position: absolute;z-index: 2;top: 0px;left: 0px;transform: rotateY(0deg);filter: saturate(1);width: 50px;height: 50px;}"
        stylesheet.insertRule(contents,stylesheet.cssRules.length)//スタイルシートの末尾に変数contentsで設定した中身を追加
    }

    public load(LorR:number){//本体のx座標等を読み込んでコピーするための関数 Lが-1,Rが1
        this.characterEdgeID.style.width=this.characterID.style.width//大きさ設定(幅)
        this.characterEdgeID.style.height=this.characterID.style.height//大きさ設定(高さ)
        const standard_x:number=(rabbit.x)+(canvas.width/2)-(rabbit.characterSize/2)
        this.characterEdgeID.style.left=String(standard_x+(LorR*canvas.width))+"px"//x座標設定
        this.characterEdgeID.style.top=this.characterID.style.top//y座標設定
        this.characterEdgeID.style.transform=this.characterID.style.transform//向き設定
    }
}