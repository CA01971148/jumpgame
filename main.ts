document.write('<img id="character" src="resource/rabbit.png">')//キャラ出現
class character{
    private x:number//X座標
    private y:number=0//y座標
    private dx:number//x方向の速度
    private dy:number//y方向の速度
    move(){
        this.y+=32;
        document.getElementById('character').style.top=this.y+"px";
    }
}

let rabbit=new character()

document.getElementById('character').onclick=rabbit.move()
