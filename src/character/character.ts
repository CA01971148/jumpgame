import {playerCamera, scaffolds,scaffoldsType} from "../index"
import {scaffold} from "../scaffold/scaffold"
import {normalScaffold} from "../scaffold/normalScaffold"
import {slipScaffold} from "../scaffold/slipScaffold"
import {carryScaffold} from "../scaffold/carryScaffold"
import {movingScaffold} from "../scaffold/movingScaffold"
import {canvas} from "../index"
import {characterEdge} from "./characterEdge"
import {playJumpSE} from "./../other/audio/playAudio"
import {testList} from "./../other/test"

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
    readonly speedDownMin:number=0.1//跳躍力を貯めている間減速するときの最低速度
    readonly fallVelocitiy:number=0.5//落下速度
    protected isOnGround:boolean=true//接地しているかどうか
    protected isCarry:boolean=false//動かされているかどうか
    protected isOnMoving:boolean=false//動く床に乗っているかどうか
    protected heightSize:number=this.characterSize//キャラの身長
    protected IDName:string="character"//CSSで使うキャラクターのID
    protected characterID:HTMLElement//getElementByIdで取得するHTML要素
    protected imageAddress:string="./../resource/image/character/"
    protected imageName:string=""
    characterEdges:characterEdge[]=new Array//キャラクターが画面端にいるとき、もう片方の画面端にもキャラクターを映すためのクラスを格納するための配列

    constructor(){}

    /* getter/setter */
    get x():number{
        testList["character get x()"]=true
        return this._x
    }
    set x(x:number){
        if(x<-canvas.width/2){
            this._x=canvas.width/2
            testList["character set x()_左端"]=true
        }else if(x>canvas.width/2){
            this._x=-canvas.width/2
            testList["character set x()_右端"]=true
        }else{
            this._x=x
            testList["character set x()_通常"]=true
        }
        testList["character set x()"]=true
    }

    get y():number{
        testList["character get y()"]=true
        return this._y
    }
    set y(y:number){
        this._y=y
        testList["character set y()"]=true
    }

    get height():number{
        testList["character get height()"]=true
        return this._height
    }
    protected set height(height:number){
        this._height=height
        testList["character set height()"]=true
    }

    get dx():number{
        testList["character get dx()"]=true
        return this._dx
    }
    set dx(dx:number){
        if(dx>this.dxMax){
            this._dx=this.dxMax
            testList["character set dx()_右最大値超過"]=true
        }else if(dx<-this.dxMax){
            this._dx=-this.dxMax
            testList["character set dx()_左最大値超過"]=true
        }else{
            this._dx=dx
            testList["character set dx()_通常"]=true
        }
        testList["character set dx()"]=true
    }

    get dy():number{
        testList["character get dy()"]=true
        return this._dy
    }
    set dy(dy:number){
        this._dy=dy
        testList["character set dy()"]=true
    }

    get jumpVelocity():number{
        testList["character get jumpVelocity()"]=true
        return this._jumpVelocity
    }
    set jumpVelocity(jumpVelocity:number){
        if(jumpVelocity>this.jumpChargeMax){
            this._jumpVelocity=this.jumpChargeMax
            testList["character set jumpVelocity()_最大値超過"]=true
        }else{
            this._jumpVelocity=jumpVelocity
            testList["character set jumpVelocity()_通常"]=true
        }
        testList["character set jumpVelocity()"]=true
    }

    /* 初期処理 */
    protected createImgElement(_imageName:string){//キャラクターのimg要素を追加するメソッド
        document.write(`<img id="${this.IDName}" src="${this.imageAddress}${_imageName}">`)//キャラ出現
        testList["character createImgElement()"]=true
    }
    protected setImgElement(){//キャラクターのimg要素を取得して初期化するメソッド(img要素は追加してから実行すること！)
        this.characterID=document.getElementById(this.IDName)!//IDを取得
        this.characterID.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        this.characterID.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
        testList["character setImgElement()"]=true
    }

    /* 動作処理 */
    public move(){//慣性で移動する関数
        this.moveX()//x軸移動
        this.moveY()//y軸移動
        this.updateImages()//画像の位置更新
        this.getStates()//状態更新
        testList["character move()"]=true
    }
    protected moveX(){//x軸移動
        this.x+=this.dx
        if(this.isOnGround===true){//減速処理
            if(this.currentScaffold() instanceof carryScaffold){//動かされる足場に運ばれるときの処理
                this.dx=this.movedVelocity("carry")
                testList["character moveX()_地上_carry"]=true
            }else if(this.currentScaffold() instanceof movingScaffold){//動く足場に運ばれるときの処理
                this.dx=this.movedVelocity("moving")
                testList["character moveX()_地上_moving"]=true
            }else{//通常処理
                this.dx*=(1-this.currentScaffold().friction)//今いる足場の摩擦分滑る
                testList["character moveX()_地上_通常"]=true
            }
            testList["character moveX()_地上"]=true
        }else{
            this.dx*=this.deceleration//空中にいるとき、減速する
            testList["character moveX()_空中"]=true
        }
        testList["character moveX()"]=true
    }
    protected moveY(){//y軸移動
        if(this.isOnGround===false){//空中にいるとき、落ちる
            this.dy-=this.fallVelocitiy
            testList["character moveY()_空中"]=true
        }else if(this.dy<0){//地上にいるとき、落ちない
            this.dy=0
            testList["character moveY()_地上"]=true
        }

        if((this.checkAboveScaffold())&&(this.height+(this.dy)<this.currentScaffold().height)){//足場の直上にいて、これ以上落ちたら足場を貫通してしまう場合、足場の上に留まる
            this.y=this.currentScaffold().y
            this.height=this.currentScaffold().height
            testList["character moveY()_足場に留まる"]=true
        }else{
            this.y+=this.dy
            this.height+=this.dy
            testList["character moveY()_足場に留まらない"]=true
        }
        testList["character moveY()"]=true
    }
    protected updateImages(){//画像の位置更新
        this.characterID.style.left=((this.x)+(canvas.width/2)-(this.characterSize/2))+"px"//x座標を更新
        this.characterID.style.top=(canvas.height-((this.y+this.heightSize)-playerCamera.y))+"px"//y座標を更新
        testList["character updateImages()"]=true
    }
    protected getStates(){//状態更新
        /* is～系のboolian型変数を更新するための関数 */
        this.isOnGround=this.checkOnGround()//接地しているかどうかを判断し、変数に代入
        testList["character getStates()"]=true
    }

    public currentScaffold():scaffold{//今いる区間の足場を算出するメソッド
        testList["character currentScaffold()"]=true
        return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]
    }
    protected checkAboveScaffold():boolean{//今いる区間の足場の上にいるかどうか(接地しているかどうかは問わない)
        testList["character checkAboveScaffold()"]=true
        if(((this.x-this.footSize/2)<=(this.currentScaffold().width/2+this.currentScaffold().x))&&((this.x+this.footSize/2)>=(-this.currentScaffold().width/2+this.currentScaffold().x))){
            testList["character checkAboveScaffold()_足場上"]=true
            return true
        }else{
            testList["character checkAboveScaffold()_足場外"]=true
            return false
        }
    }
    protected checkOnGround():boolean{//接地しているかどうか
        testList["character checkOnGround()"]=true
        if((this.height===this.currentScaffold().height)&&(this.checkAboveScaffold())&&(this.dy<=0)){//「自分の高さが、今いる区間の足場と同じ」かつ「自分のx座標が、今いる区間の足場の範囲に入っている」かつ「跳んでいる状態ではない」場合
            testList["character checkOnGround()_接地"]=true
            return true
        }else{
            testList["character checkOnGround()_空中"]=true
            return false
        }
    }

    public moveLeft(){//左に移動するメソッド
        if(this.isOnGround===false){
            this.dx-=this.getSpeed()
            testList["character moveLeft()_空中"]=true
        }
        this.characterID.style.transform="rotateY(0deg)"//左を向く
        testList["character moveLeft()"]=true
    }
    public moveRight(){//右に移動するメソッド
        if(this.isOnGround===false){
                this.dx+=this.getSpeed()
                testList["character moveRight()_空中"]=true
        }
        this.characterID.style.transform="rotateY(180deg)"//右を向く
        testList["character moveRight()"]=true
    }
    protected getSpeed():number{//跳躍力を貯めている間の横移動減速率を求めるメソッド
        testList["character getSpeed()"]=true
        return this.moveVelocity
        //上の行を下のコメントで置換すると跳躍力を貯めれば貯めるほど減速するようになる
/*         if(this.jumpVelocity===0){//跳躍力を貯めていなければ減速しない
            return this.moveVelocity
        }else if((1-(this.jumpVelocity/this.jumpChargeMax))<this.speedDownMin){//最低減速率より減速率が低ければ調整する
            return this.speedDownMin
        }else{
            return 1-(this.jumpVelocity/this.jumpChargeMax)
        } */
    }

    public jumpCharge(){//跳躍力を貯める関数
        this.jumpVelocity+=this.jumpChargeAmount//跳躍力を貯める
        /* 縮む処理 */
        const heightMin:number=10
        const shrunkenSize:number=this.characterSize*((this.jumpChargeMax-this.jumpVelocity)/this.jumpChargeMax)
        if(shrunkenSize<heightMin){
            this.heightSize=heightMin
            testList["character jumpCharge()_最大縮み"]=true
        }else{
            this.heightSize=shrunkenSize
            testList["character jumpCharge()_通常縮み"]=true
        }
        this.characterID.style.height=(this.heightSize)+"px"//ジャンプ前の踏ん張り縮み
        testList["character jumpCharge()"]=true
    }
    public jump(){//跳躍力を解放してジャンプする関数
        this.heightSize=this.characterSize//縮みを戻す
        this.characterID.style.height=this.characterSize+"px"//踏ん張り縮み解放
        if(this.isOnGround===true){//接地しているなら、跳躍力を解放
            this.dy+=this.jumpVelocity
            playJumpSE("jump")//ジャンプSEを再生
            testList["character jump()_接地"]=true
        }
        this.jumpVelocity=0
        testList["character jump()"]=true
    }

    protected movedVelocity(type:scaffoldsType):number{//動かされる床や動く床に運ばれるときの加速度を求める処理
        testList["character movedVelocity()"]=true
        switch(type){
            case "carry":
                const currentCarryScaffold:carryScaffold=this.currentScaffold() as carryScaffold
                testList["character movedVelocity()_carry"]=true
                return currentCarryScaffold.carryVelocity*currentCarryScaffold.direction//dxを「動かされる速度×向き」に固定する
            case "moving":
                const currentMovingScaffold:movingScaffold=this.currentScaffold() as movingScaffold
                testList["character movedVelocity()moving"]=true
                return currentMovingScaffold.moveVelocity*currentMovingScaffold.direction//dxを「動かされる速度×向き」に固定する
        }
    }
}