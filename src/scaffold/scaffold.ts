abstract class scaffold{//初期足場
    protected _x:number=0//X座標
    protected _y:number=0//y座標
    protected _height:number=0//足場の位置する高さ
    protected level:number//階層(一番下の初期足場は0階層目)
    public static readonly defaultWidth:number=150//基本の足場広さ
    protected _width:number=scaffold.defaultWidth//広さ
    public static readonly thickness:number=20//厚さ
    public static readonly scaffoldDistance:number=200//足場同士の上下幅

    constructor(_level:number,_width:number=scaffold.defaultWidth){
        this.level=_level
        this.height=this.level*scaffold.scaffoldDistance//足場の位置する高さを"階層×足場同士の幅"として設定
        if(this.level===0){
            this.width=360
            this.x=0
        }else{
            this.width=_width
            this.x=Math.random()//作りかけ
            /* 0階層目(初期足場)以外のとき、ランダムなx座標に設定するプログラムを後でここらへんに書く */
        }
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
    protected set y(y:number){
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

    scrole(){
        document.getElementById('scaffold')!.style.left=((this.x)+(window.innerWidth/2)-(this.width/2))+"px"//x座標設定
        this.y=50+scaffold.scaffoldDistance*this.level
        this.height=scaffold.scaffoldDistance*this.level
        document.getElementById('scaffold')!.style.top=(640-(this.y))+"px"//y座標設定 高さは"50+200*level"
    }
}