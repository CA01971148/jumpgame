import {character} from "./character"
import {rabbit,stylesheet,canvas} from "../index"

/* メインのrabbitの右側と左側に幻影のrabbit(当たり判定等を持たない)を作成し、
rabbitが画面端にいるとき、もう片方の画面端からもrabbitが見えるようにするためのクラス */
type LorR="L"|"R"
export class characterEdge extends character{
    protected originIDName:string//CSSで使うキャラクターの元のID
    protected originID:HTMLElement//getElementByIdで取得する元のHTML要素

    constructor(_imageName:string,side:LorR){
        super()
        this.originIDName=this.IDName//本体のIDを保存
        this.IDName+=side//画面端処理用キャラクタークラスのHTML用IDを"character"+"L"or"R"に設定
        this.imageName=_imageName
        this.createImgElement(this.imageName)//画像を表示
        this.characterID=document.getElementById(this.IDName)!//img要素を取得
        this.originID=document.getElementById(this.originIDName)!//本体のimg要素を取得
    }

    public load(direction:number){//本体のx座標等を読み込んでコピーするための関数 向き(direction)は左が-1,右が1
        this.characterID.style.width=this.originID.style.width//大きさ設定(幅)
        this.characterID.style.height=this.originID.style.height//大きさ設定(高さ)
        const standard_x:number=(rabbit.x)+(canvas.width/2)-(rabbit.characterSize/2)//本体のx座標を取得
        this.characterID.style.left=String(standard_x+(direction*canvas.width))+"px"//x座標設定
        this.characterID.style.top=this.originID.style.top//y座標設定
        this.characterID.style.transform=this.originID.style.transform//向き設定
    }
}