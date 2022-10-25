import {scaffold} from "./scaffold"
import {canvas} from "../index"

export class movingScaffold extends scaffold{
    private _direction:number=1//足場が動く方向 左が-1,右が1
    public readonly moveVelocity=3//足場が動くスピード(絶対値)
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        this.direction=Math.floor(Math.random()*2)*2-1//向きを-1(左)か1(右)でランダムに代入
        document.write('<img id="'+this.IDName+'" src="./../resource/image/scaffold/movingScaffold.jpg">')//足場出現
        document.getElementById(this.IDName)!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById(this.IDName)!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }

    /* getter/setter */
    get x():number{
        return this._x
    }
    protected set x(x:number){
        /* 足場が画面外まで出ないようにする処理 */
        if(x+this.width/2>canvas.width/2){//画面の右端に出そうなとき
            this._x=canvas.width/2-this.width/2//右端にギリギリまで寄せる処理
            this.direction=-1//左を向く 右端まで行ったら次は左へ行く
        }else if(x-this.width/2<-canvas.width/2){//画面の左端に出そうなとき
            this._x=-(canvas.width/2-this.width/2)
            this.direction=1//右を向く 左端まで行ったら次は右へ行く
        }else{//通常処理
            this._x=x
        }
    }

    public get direction():number{
        return this._direction
    }
    private set direction(direction:number){
        this._direction=direction
    }

    public scrole(){//画面更新用処理
        this.x+=this.direction*this.moveVelocity//足場を動かす処理 画面端まで行った時の処理はthis.xのsetterに記述
        super.scrole()
    }
}