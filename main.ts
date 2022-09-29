let canvas:any=document.getElementById("myCanvas")
class character{
    readonly characterSize:number=50//キャラの大きさ
    x:number=0//X座標
    y:number=50//y座標
    height:number=0//昇った高さ
    dx:number=0//x方向の速度
    dy:number=0//y方向の速度
    jumpVelocity:number=0//ジャンプ速度
    readonly moveVelocity:number=5//横移動科測量
    isOnGround:boolean=true//接地しているかどうか
    isSlip:boolean=false//滑るかどうか
    isCarry:boolean=false//動かされているかどうか
    isOnMoving:boolean=false//動く床に乗っているかどうか

    constructor(){
        document.write('<img id="character" src="resource/rabbit.png">')//キャラ出現
        document.getElementById('character')!.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        document.getElementById('character')!.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
    }

    move(){//慣性で移動する関数
        this.x+=this.dx
        this.y+=this.dy
        if(this.isSlip===false){
            this.dx=0
        }
        document.getElementById('character')!.style.left=((this.x)+(window.innerWidth/2)-(this.characterSize/2))+"px"
        document.getElementById('character')!.style.top=(640-(this.y+this.characterSize))+"px"
    }
    moveLeft(){//左に移動する関数
        this.dx-=this.moveVelocity
    }
    moveRight(){//右に移動する関数
        this.dx+=this.moveVelocity
    }
    jumpCharge(){//跳躍力を貯める関数

    }
    jump(){//跳躍力を解放してジャンプする関数

    }

}
abstract class scaffold{//初期足場
    x:number=0//X座標
    y:number=0//y座標
    height:number=0//昇った高さ
    level:number//階層(一番下の初期足場は0階層目)
    width:number//広さ
    static readonly defaultWidth:number=150//基本の足場広さ
    static readonly thickness:number=20//厚さ
    static readonly scaffoldDistance:number=200//足場同士の上下幅
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        this.level=_level
        if(this.level===0){
            this.width=360
            this.x=0
        }else{
            this.width=_width
            /* 0階層目(初期足場)以外のとき、ランダムなx座標に設定するプログラムを後でここらへんに書く */
        }
        document.write('<img id="scaffold" src="resource/normalScaffold.jpg">')//足場出現
        document.getElementById('scaffold')!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById('scaffold')!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }
    scrole(){
        document.getElementById('scaffold')!.style.left=((this.x)+(window.innerWidth/2)-(this.width/2))+"px"//x座標設定
        this.y=50+scaffold.scaffoldDistance*this.level
        document.getElementById('scaffold')!.style.top=(640-(this.y))+"px"//y座標設定 高さは"50+200*level"
    }
}

class defaultScaffold extends scaffold{

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
                break
            }
    }
}

let rabbit=new character()
let key=new keyDown()
let scaffolds:scaffold[]=new Array//足場配列を作成
scaffolds[0]=new defaultScaffold(0)//初期足場を作成
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
    //sampleArea.innerHTML=String(canvas.width)

    rabbit.move()
    for(let i:number=0;i<scaffolds.length;i++){
        scaffolds[i].scrole()
    }
    requestAnimationFrame(main)////main関数(自分自身)を呼び出すことでループさせる
}