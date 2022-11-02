import {scaffold} from "./scaffold"
import {testList} from "./../other/test"

export class carryScaffold extends scaffold{//キャラが乗ると動かされる足場
    private _direction:number=1//キャラが動かされる方向 左が-,右が1
    public readonly carryVelocity=3//キャラを運ぶスピード(絶対値)
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        this.direction=Math.floor(Math.random()*2)*2-1//向きを-1(左)か1(右)でランダムに代入
        this.imageName="carryScaffold.jpg"
        this.createImgElement(this.imageName)//足場のimg要素を追加する
        this.setImgElement()//img要素を取得して初期化する
    }

    /* getter/setter */
    public get direction():number{
        return this._direction
    }
    private set direction(direction:number){
        this._direction=direction
    }

    setImgElement(){
        super.setImgElement()
        this.scaffoldID.style.transform="rotateY("+String(((this.direction+1)/2)*180)+"deg)"//左右を向く -1or1を0or1に変換して使用する
    }
}