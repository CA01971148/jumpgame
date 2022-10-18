import {scaffold} from "./scaffold"


export class movingScaffold extends scaffold{
    private _direction:number=1//足場が動く方向 左が0,右が1
    public readonly moveVelocity=3//足場が動くスピード(絶対値)
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        this.direction=Math.floor(Math.random()*2)//向きを0(左)か1(右)でランダムに代入
        document.write('<img id="'+this.IDName+'" src="./../resource/movingScaffold.jpg">')//足場出現
        document.getElementById(this.IDName)!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById(this.IDName)!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }

    /* getter/setter */
    get x():number{
        return this._x
    }
    protected set x(x:number){
        /* ここに足場が画面外まで出ないようにする処理を記述する */
        this._x=x
    }

    public get direction():number{
        return this._direction
    }
    private set direction(direction:number){
        this._direction=direction
    }

    public scrole(){//画面更新用処理
        /* ここに足場を動かす処理を記述する */
        super.scrole()
    }
}