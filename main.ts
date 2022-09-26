document.write('<img id="character" src="resource/rabbit.png">')//キャラ出現
class character{
    private x:number=0//X座標
    y:number=64//y座標
    private dx:number=0//x方向の速度
    private dy:number=0//y方向の速度

    public move(){
        rabbit.y += 32
        document.getElementById('character')!.style.top=rabbit.y+"px"
    }
}

let rabbit=new character()

 document.getElementById('character')!.onclick=function(){
    rabbit.y += 32
    document.getElementById('character')!.style.top=rabbit.y+"px"
} 

//document.getElementById('character')!.onclick=rabbit.move()