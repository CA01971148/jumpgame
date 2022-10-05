import {scaffolds} from "../index"
import {scaffold} from "../scaffold/scaffold"
import {canvas} from "../index"

export abstract class character{
    readonly characterSize:number=50//キャラの大きさ
    readonly footSize:number=20//足の広さ
    protected _x:number=0//X座標
    protected _y:number=scaffold.firstHeight//y座標
    protected height:number=0//昇った高さ
    protected _dx:number=0//x方向の速度
    readonly moveVelocity:number=5//横移動加速量
    readonly dxMax:number=10//最大横加速量
    protected _dy:number=0//y方向の速度
    readonly dyMax:number=10//最大縦加速量
    protected _jumpVelocity:number=0//ジャンプ速度
    readonly jumpChargeAmount:number=1//跳躍力の貯めやすさ
    readonly jumpChargeMax:number=25//跳躍力の貯め限界
    readonly fallVelocitiy:number=1//落下速度
    isOnGround:boolean=true//接地しているかどうか
    protected isSlip:boolean=false//滑るかどうか
    protected isCarry:boolean=false//動かされているかどうか
    protected isOnMoving:boolean=false//動く床に乗っているかどうか
    heightSize:number=this.characterSize

    constructor(){}

    /* getter/setter */
    get x():number{
        return this._x
    }
    set x(x:number){
        if(x<-canvas.width/2){
            this._x=canvas.width/2
        }else if(x>canvas.width/2){
            this._x=-canvas.width/2
        }else{
            this._x=x
        }
    }

    get y():number{
        return this._y
    }
    set y(y:number){
        this._y=y
    }

    get dx():number{
        return this._dx
    }
    set dx(dx:number){
        if(dx>this.dxMax){
            this._dx=this.dxMax
        }else if(dx<-this.dxMax){
            this._dx=-this.dxMax
        }else{
            this._dx=dx
        }
    }

    get dy():number{
        return this._dy
    }
    set dy(dy:number){
        this._dy=dy
    }

    get jumpVelocity():number{
        return this._jumpVelocity
    }
    set jumpVelocity(jumpVelocity:number){
        if(jumpVelocity>this.jumpChargeMax){
            this._jumpVelocity=this.jumpChargeMax
        }else{
            this._jumpVelocity=jumpVelocity
        }
    }

    public move(){//慣性で移動する関数
        this.x+=this.dx

        if((this.checkAboveScaffold())&&(this.height+this.dy<this.currentScaffold().height)){//足場の直上にいて、これ以上落ちたら足場を貫通してしまう場合、足場の上に留まる
            this.y=this.currentScaffold().y
            this.height=this.currentScaffold().height
        }else{
            this.y+=this.dy
            this.height+=this.dy
        }

        if(this.isOnGround===false){//空中にいるとき、落ちる
            this.dy-=this.fallVelocitiy
        }else if(this.dy<0){//地上にいるとき、落ちない
            this.dy=0
        }

        if(this.isSlip===false){
            this.dx=0
        }else{//滑るときの処理 調整は適当
            if((this.dx<this.moveVelocity)&&(this.dx>-this.moveVelocity)){
                this.dx=0
            }else{
                this.dx*=0.95
            }
        }

        document.getElementById('character')!.style.left=((this.x)+(canvas.width/2)-(this.characterSize/2))+"px"
        document.getElementById('character')!.style.top=(canvas.height-(this.y+(this.heightSize)))+"px"
        this.isOnGround=this.checkOnGround()
    }

    protected currentScaffold():scaffold{
        //return scaffolds[0]
        return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]//今いる区間の足場
    }
    protected checkAboveScaffold():boolean{//今の足場の範囲にいるかどうか(y座標は問わない)
        if(((this.x-this.footSize/2)<=(this.currentScaffold().width/2+this.currentScaffold().x))&&((this.x+this.footSize/2)>=(-this.currentScaffold().width/2+this.currentScaffold().x))){
            return true
        }else{
            return false
        }
    }
    protected checkOnGround():boolean{//接地しているかどうか
        if((this.height===this.currentScaffold().height)&&(this.checkAboveScaffold())){//「自分の高さが今いる区間の足場と同じ」かつ「自分のx座標が今いる区間の足場の範囲に入っている」場合
            return true
        }else{
            return false
        }
    }

    public moveLeft(){//左に移動する関数
        if(this.isOnGround===false){
            this.dx-=this.moveVelocity
        }
        document.getElementById('character')!.style.transform="rotateY(0deg)"
    }
    public moveRight(){//右に移動する関数
        if(this.isOnGround===false){
            this.dx+=this.moveVelocity
        }

        document.getElementById('character')!.style.transform="rotateY(180deg)"
    }

    public jumpCharge(){//跳躍力を貯める関数
        this.jumpVelocity+=this.jumpChargeAmount
        /* 縮む処理 */
        const heightMin:number=10
        const shrunkenSize:number=this.characterSize*((this.jumpChargeMax-this.jumpVelocity)/this.jumpChargeMax)
        if(shrunkenSize<heightMin){
            this.heightSize=heightMin
        }else{
            this.heightSize=shrunkenSize
        }
        document.getElementById('character')!.style.height=(this.heightSize)+"px"//ジャンプ前の踏ん張り縮み
    }
    public jump(){//跳躍力を解放してジャンプする関数
        this.heightSize=this.characterSize
        if(this.isOnGround===true){
            this.dy+=this.jumpVelocity
        }
        this.jumpVelocity=0
        document.getElementById('character')!.style.height=this.characterSize+"px"//踏ん張り縮み解放
    }
}