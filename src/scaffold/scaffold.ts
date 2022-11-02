import {playerCamera, stylesheet} from "../index"
import {canvas} from "../index"
import {testList} from "./../other/test"

export abstract class scaffold{//初期足場
    public static readonly firstHeight:number=50//初期足場がどれだけ浮いているか
    protected _x:number=0//X座標
    protected _y:number=0//y座標
    protected _height:number=0//足場の位置する高さ
    public level:number//階層(一番下の初期足場は0階層目)
    public static readonly defaultWidth:number=150//基本の足場広さ
    protected _width:number=scaffold.defaultWidth//広さ
    public static readonly thickness:number=20//厚さ
    public static readonly scaffoldDistance:number=300//足場同士の上下幅
    protected _friction:number=1//摩擦係数(frictionalCoefficient)
    protected IDName:string//CSSで使う足場のID
    protected scaffoldID:HTMLElement//getElementByIdで取得するHTML要素
    protected imageAddress:string="./../resource/image/scaffold/"
    protected imageName:string=""

    constructor(_level:number,_width:number=scaffold.defaultWidth){
        this.level=_level
        this.IDName="scaffold"+String(this.level)//CSSで使うIDを「scaffold」+「階層番号」に設定
        this.createCSSRule(this.IDName)//ID名でCSSルールを作成
        this.height=this.level*scaffold.scaffoldDistance//足場の位置する高さを"階層×足場同士の幅"として設定
        if(this.level===0){//作るのが初期足場のとき、幅や場所を固定
            this.width=canvas.width
            this.x=0
        }else{//それ以外の足場のとき、
            this.width=_width
            this.x=Math.random()*-(canvas.width-this.width)+(canvas.width-this.width)/2//画面内に足場が収まるようにx座標をランダムに設定
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

    get friction():number{
        return this._friction
    }
    protected set friction(friction:number){
        this._friction=friction
    }

    /* 初期処理 */
    protected createImgElement(_imageName:string){//足場のimg要素を追加するメソッド
        if(this.level===0){//初期足場ならdocument.writeでHTML要素で作る(要素を追加する位置の基礎となる0番idを作るため)
            document.write(`<img id="${this.IDName}" src="${this.imageAddress}${_imageName}">`)
        }else{
            const formerScaffoldID:string="scaffold"+String(this.level-1)//1つ下の足場のID
            const formerScaffold:HTMLElement=document.getElementById(formerScaffoldID)!//1つ下の足場のHTML要素
            formerScaffold.insertAdjacentHTML('afterend',`<img id="${this.IDName}" src="${this.imageAddress}${_imageName}">`)//1つ下の足場のimg要素の後に新しい足場のimg要素を追加
        }
    }
    protected setImgElement(){//足場のimg要素を取得して初期化するメソッド(img要素は追加してから実行すること！)
        this.scaffoldID=document.getElementById(this.IDName)!//足場のHTML要素を取得
        this.scaffoldID.style.width=this.width+"px"//初期大きさ設定(幅)
        this.scaffoldID.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
        this.scaffoldID.style.left=((this.x)+(canvas.width/2)-(this.width/2))+"px"//x座標設定
        this.scaffoldID.style.top=(canvas.height-(this.y-playerCamera.y))+"px"//y座標設定 高さは"50
    }

    /* 動作処理 */
    protected createCSSRule(idName:string){//足場それぞれにCSSルールを作成
        const contents:string="#"+idName+"{position: absolute;object-fit: none;z-index: 1;top: 0px;left: 0px;transform: rotateY(0deg);width: 150px;height: 20px;color: white;}"
        stylesheet.insertRule(contents,stylesheet.cssRules.length)//スタイルシートの末尾に変数contentsで設定した中身を追加
    }

    public scrole(){//画面更新用処理
        this.scaffoldID.style.left=((this.x)+(canvas.width/2)-(this.width/2))+"px"//x座標設定
        this.scaffoldID.style.top=(canvas.height-(this.y-playerCamera.y))+"px"//y座標設定 高さは"50+200*level"
    }
}