import {scaffold} from "./scaffold"
import {canvas} from "../index"
import {testList} from "./../other/test"

export class movingScaffold extends scaffold{
    private _direction:number=1//足場が動く方向 左が-1,右が1
    public readonly moveVelocity=3//足場が動くスピード(絶対値)
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        this.direction=Math.floor(Math.random()*2)*2-1//向きを-1(左)か1(右)でランダムに代入
        this.imageName="movingScaffold.jpg"
        this.createImgElement(this.imageName)//足場のimg要素を追加する
        this.setImgElement()//img要素を取得して初期化する
        testList["movingScaffold constructor()"]=true
    }

    /* getter/setter */
    get x():number{
        testList["movingScaffold get x()"]=true
        return this._x
    }
    protected set x(x:number){
        /* 足場が画面外まで出ないようにする処理 */
        if(x+this.width/2>canvas.width/2){//画面の右端に出そうなとき
            this._x=canvas.width/2-this.width/2//右端にギリギリまで寄せる処理
            this.direction=-1//左を向く 右端まで行ったら次は左へ行く
            testList["movingScaffold set x() 右端"]=true
        }else if(x-this.width/2<-canvas.width/2){//画面の左端に出そうなとき
            this._x=-(canvas.width/2-this.width/2)
            this.direction=1//右を向く 左端まで行ったら次は右へ行く
            testList["movingScaffold set x() 左端"]=true
        }else{//通常処理
            this._x=x
            testList["movingScaffold set x() 通常"]=true
        }
        testList["movingScaffold set x()"]=true
    }

    public get direction():number{
        testList["movingScaffold get direction()"]=true
        return this._direction
    }
    private set direction(direction:number){
        testList["movingScaffold set direction()"]=true
        this._direction=direction
    }

    public scrole(){//画面更新用処理
        this.x+=this.direction*this.moveVelocity//足場を動かす処理 画面端まで行った時の処理はthis.xのsetterに記述
        super.scrole()
        testList["movingScaffold scrole()"]=true
    }
}