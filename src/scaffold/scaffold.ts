import {playerCamera, stylesheet} from "../index"
import {canvas} from "../index"

export abstract class scaffold{//初期足場
    public static readonly firstHeight:number=50//初期足場がどれだけ浮いているか
    protected _x:number=0//X座標
    protected _y:number=0//y座標
    protected _height:number=0//足場の位置する高さ
    public level:number//階層(一番下の初期足場は0階層目)
    public static readonly defaultWidth:number=150//基本の足場広さ
    protected _width:number=scaffold.defaultWidth//広さ
    public static readonly thickness:number=20//厚さ
    public static readonly scaffoldDistance:number=400//足場同士の上下幅
    protected IDName:string//CSSで使うID用のフィールド

    constructor(_level:number,_width:number=scaffold.defaultWidth){
        this.level=_level
        this.IDName="scaffold"+String(this.level)//CSSで使うIDを「scaffold」+「階層番号」に設定
        this.createCSSRule()//ID名でCSSルールを作成
        this.height=this.level*scaffold.scaffoldDistance//足場の位置する高さを"階層×足場同士の幅"として設定
        if(this.level===0){
            this.width=canvas.width
            this.x=0
        }else{
            this.width=_width
            this.x=Math.random()*-(canvas.width-this.width)+(canvas.width-this.width)/2//作りかけ
            /* 0階層目(初期足場)以外のとき、ランダムなx座標に設定するプログラムを後でここらへんに書く */
        }
        this.y=scaffold.firstHeight+scaffold.scaffoldDistance*this.level
        this.height=scaffold.scaffoldDistance*this.level
    }

    /* getter/setter */
    get x():number{
        return this._x
    }
    protected set x(x:number){
        this._x=x
    }

    get y():number{
        return this._y
    }
    public set y(y:number){
        this._y=y
    }

    get width():number{
        return this._width
    }
    protected set width(width:number){
        this._width=width
    }

    get height():number{
        return this._height
    }
    protected set height(height:number){
        this._height=height
    }

    protected createCSSRule(){//足場それぞれにCSSルールを作成
        const contents:string="#"+this.IDName+"{position: absolute;object-fit: none;z-index: 1;top: 0px;left: 0px;width: 150px;height: 20px;}"
        stylesheet.insertRule(contents,stylesheet.cssRules.length)//スタイルシートの末尾に変数contentsで設定した中身を追加
    }

    public scrole(){//画面更新用処理
        document.getElementById(this.IDName)!.style.left=((this.x)+(canvas.width/2)-(this.width/2))+"px"//x座標設定
        document.getElementById(this.IDName)!.style.top=(canvas.height-(this.y-playerCamera.y))+"px"//y座標設定 高さは"50+200*level"
    }
}