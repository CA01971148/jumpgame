import {playerCamera, scaffolds} from "../index"
import {scaffold} from "../scaffold/scaffold"
import {normalScaffold} from "../scaffold/normalScaffold"
import {slipScaffold} from "../scaffold/slipScaffold"
import {canvas} from "../index"

export abstract class character{
    readonly characterSize:number=50//キャラの大きさ
    readonly footSize:number=20//足の広さ
    protected _x:number=0//X座標
    protected _y:number=scaffold.firstHeight//y座標
    protected _height:number=0//昇った高さ
    protected _dx:number=0//x方向の速度
    readonly moveVelocity:number=1//横移動加速量
    readonly dxMax:number=5//最大横加速量
    readonly deceleration:number=0.9//横移動減速率
    protected _dy:number=0//y方向の速度
    readonly dyMax:number=10//最大縦加速量
    protected _jumpVelocity:number=0//ジャンプ速度
    readonly jumpChargeAmount:number=0.7//跳躍力の貯めやすさ
    readonly jumpChargeMax:number=18//跳躍力の貯め限界
    readonly fallVelocitiy:number=0.5//落下速度
    isOnGround:boolean=true//接地しているかどうか
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

    get height():number{
        return this._height
    }
    protected set height(height:number){
        this._height=height
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
        this.moveX()//x軸移動
        this.moveY()//y軸移動
        this.updateImages()//画像の位置更新
        this.getStates()//状態更新
    }
    protected moveX(){//x軸移動
        this.x+=this.dx
        if(this.isOnGround===true){//減速処理
            this.dx*=(1-this.currentScaffold().friction)//今いる足場の摩擦分滑る
        }else{
            this.dx*=this.deceleration//空中にいるとき、減速する
        }
    }
    protected moveY(){//y軸移動
        if(this.isOnGround===false){//空中にいるとき、落ちる
            this.dy-=this.fallVelocitiy
        }else if(this.dy<0){//地上にいるとき、落ちない
            this.dy=0
        }

        if((this.checkAboveScaffold())&&(this.height+(this.dy)<this.currentScaffold().height)){//足場の直上にいて、これ以上落ちたら足場を貫通してしまう場合、足場の上に留まる
            this.y=this.currentScaffold().y
            this.height=this.currentScaffold().height
        }else{
            this.y+=this.dy
            this.height+=this.dy
        }
    }
    protected updateImages(){//画像の位置更新
        document.getElementById('character')!.style.left=((this.x)+(canvas.width/2)-(this.characterSize/2))+"px"//x座標を更新
        document.getElementById('character')!.style.top=(canvas.height-((this.y+this.heightSize)-playerCamera.y))+"px"//y座標を更新
    }
    protected getStates(){//状態更新
        /* is～系のboolian型変数を更新するための関数 */
        this.isOnGround=this.checkOnGround()//接地しているかどうかを判断し、変数に代入
    }

    public currentScaffold():scaffold{//今いる区間の足場を算出するメソッド
        return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]
    }
    protected checkAboveScaffold():boolean{//今いる区間の足場の上にいるかどうか(接地しているかどうかは問わない)
        if(((this.x-this.footSize/2)<=(this.currentScaffold().width/2+this.currentScaffold().x))&&((this.x+this.footSize/2)>=(-this.currentScaffold().width/2+this.currentScaffold().x))){
            return true
        }else{
            return false
        }
    }
    protected checkOnGround():boolean{//接地しているかどうか
        if((this.height===this.currentScaffold().height)&&(this.checkAboveScaffold())){//「自分の高さが、今いる区間の足場と同じ」かつ「自分のx座標が、今いる区間の足場の範囲に入っている」場合
            return true
        }else{
            return false
        }
    }

    public moveLeft(){//左に移動する関数
        if(this.isOnGround===false){
            this.dx-=this.moveVelocity
        }
        document.getElementById('character')!.style.transform="rotateY(0deg)"//左を向く
    }
    public moveRight(){//右に移動する関数
        if(this.isOnGround===false){
            this.dx+=this.moveVelocity
        }

        document.getElementById('character')!.style.transform="rotateY(180deg)"//右を向く
    }

    public jumpCharge(){//跳躍力を貯める関数
        this.jumpVelocity+=this.jumpChargeAmount//跳躍力を貯める
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
        this.heightSize=this.characterSize//縮みを戻す
        document.getElementById('character')!.style.height=this.characterSize+"px"//踏ん張り縮み解放
        if(this.isOnGround===true){//接地しているなら、跳躍力を解放
            this.dy+=this.jumpVelocity
        }
        this.jumpVelocity=0
    }
}