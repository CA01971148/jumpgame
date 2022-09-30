//let canvas:any=document.getElementById("myCanvas")

abstract class character{
    readonly characterSize:number=50//キャラの大きさ
    readonly footSize:number=20//足の広さ
    protected _x:number=0//X座標
    protected _y:number=50//y座標
    height:number=0//昇った高さ
    protected _dx:number=0//x方向の速度
    readonly moveVelocity:number=5//横移動加速量
    readonly dxMax:number=10//最大横加速量
    protected _dy:number=0//y方向の速度
    readonly dyMax:number=10//最大縦加速量
    protected _jumpVelocity:number=0//ジャンプ速度
    readonly jumpChargeAmount:number=2//跳躍力の貯めやすさ
    readonly jumpChargeMax:number=25//跳躍力の貯め限界
    readonly fallVelocitiy:number=1//落下速度
    isOnGround:boolean=true//接地しているかどうか
    protected isSlip:boolean=false//滑るかどうか
    protected isCarry:boolean=false//動かされているかどうか
    protected isOnMoving:boolean=false//動く床に乗っているかどうか

    constructor(){}

    /* getter/setter */
    get x():number{
        return this._x
    }
    set x(x:number){
        if(x<-360/2){
            this._x=360/2
        }else if(x>360/2){
            this._x=-360/2
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

    move(){//慣性で移動する関数
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

        document.getElementById('character')!.style.left=((this.x)+(window.innerWidth/2)-(this.characterSize/2))+"px"
        document.getElementById('character')!.style.top=(640-(this.y+this.characterSize))+"px"
        this.isOnGround=this.checkOnGround()
    }

    currentScaffold():scaffold{
        return scaffolds[0]
        //return scaffolds[Math.floor(this.height/scaffold.scaffoldDistance)]//今いる区間の足場
    }
    checkAboveScaffold():boolean{//今の足場の範囲にいるかどうか(y座標は問わない)
        if(((this.x-this.footSize/2)<=(this.currentScaffold().width/2+this.currentScaffold().x))&&((this.x+this.footSize/2)>=(-this.currentScaffold().width/2+this.currentScaffold().x))){
            return true
        }else{
            return false
        }
    }
    checkOnGround():boolean{//接地しているかどうか
        if((this.height===this.currentScaffold().height)&&(this.checkAboveScaffold())){//「自分の高さが今いる区間の足場と同じ」かつ「自分のx座標が今いる区間の足場の範囲に入っている」場合
            return true
        }else{
            return false
        }
    }

    moveLeft(){//左に移動する関数
        this.dx-=this.moveVelocity
        document.getElementById('character')!.style.transform="rotateY(0deg)"
    }
    moveRight(){//右に移動する関数
        this.dx+=this.moveVelocity
        document.getElementById('character')!.style.transform="rotateY(180deg)"
    }

    jumpCharge(){//跳躍力を貯める関数
        this.jumpVelocity+=this.jumpChargeAmount
    }
    jump(){//跳躍力を解放してジャンプする関数
        if(this.isOnGround===true){
            this.dy+=this.jumpVelocity
        }
        this.jumpVelocity=0
    }
}

class characterRabbit extends character{
    constructor(){
        super()
        document.write('<img id="character" src="resource/rabbit.png">')//キャラ出現
        document.getElementById('character')!.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        document.getElementById('character')!.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
    }
}


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

class normalScaffold extends scaffold{
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        document.write('<img id="scaffold" src="resource/normalScaffold.jpg">')//足場出現
        document.getElementById('scaffold')!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById('scaffold')!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }
}

class keyDown{//キーが押されているかどうか
    key_left:boolean=false//左移動キーが押されているかどうか
    key_right:boolean=false//右移動キーが押されているかどうか
    key_jump:boolean=false//ジャンプキーが押されているかどうか

    keyDownFunc(event:any){//キーボードが押されたときに呼び出される関数
        switch(event.keyCode){
        case 65://「A」キーが押されたとき
            this.key_left=true
            key.key_left=this.key_left
            break
        case 68://「D」キーが押されたとき
            this.key_right=true
            key.key_right=this.key_right
            break
        case 32://「Space」キーが押されたとき
            this.key_jump=true
            key.key_jump=this.key_jump
            break
        }
    }
    keyUpFunc(event:any){//キーボードが押されたときに呼び出される関数
        switch(event.keyCode){
            case 65://「A」キーが離されたとき
                this.key_left=false
                key.key_left=this.key_left
                break
            case 68://「D」キーが離されたとき
                this.key_right=false
                key.key_right=this.key_right
                break
            case 32://「Space」キーが離されたとき
                this.key_jump=false
                key.key_jump=this.key_jump
                rabbit.jump()
                break
            }
    }
}

let rabbit=new characterRabbit()
let key=new keyDown()
let scaffolds:scaffold[]=new Array//足場配列を作成
scaffolds[0]=new normalScaffold(0)//初期足場を作成
requestAnimationFrame(main)//メインループ、起動

function main(){//メインループ
    addEventListener("keydown",key.keyDownFunc)//キーボードが押された時、keyDownFunc関数を呼び出す
    addEventListener("keyup",key.keyUpFunc)//キーボードが離された時、keyUpFunc関数を呼び出す

/*     【仕様】
    左右キーは同時に押すとどちらにも移動できない(どちらか片方を押しているときのみ移動できる)
    ジャンプはジャンプキーを押している間に跳躍力を貯めて、ジャンプキーを離すと貯めた跳躍力の分だけ跳べる
    接地中の移動はできない */

	if((key.key_left===true)&&(key.key_right===false)){//左移動キーが押されている間、moveLeft関数を呼び出す
        rabbit.moveLeft()
    }
	if((key.key_right===true)&&(key.key_left===false)){//右移動キーが押されている間、moveRight関数を呼び出す
        rabbit.moveRight()
    }
    if((key.key_jump===true)){//ジャンプキーが押されている間、jumpCharge関数を呼び出す
        rabbit.jumpCharge()
    }

    var sampleArea:any=document.getElementById("sampleArea")
    sampleArea.innerHTML="a:"+String(rabbit.jumpVelocity)+"/"+String(rabbit.jumpChargeMax)
    var sampleArea:any=document.getElementById("sampleArea2")
    sampleArea.innerHTML="b:"+String(rabbit.height)

    rabbit.move()
    for(let i:number=0;i<scaffolds.length;i++){
        scaffolds[i].scrole()
    }
    requestAnimationFrame(main)////main関数(自分自身)を呼び出すことでループさせる
}