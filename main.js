"use strict";
document.write('<img id="character" src="resource/rabbit.png">'); //キャラ出現
class character {
    constructor() {
        this.x = 0; //X座標
        this.y = 0; //y座標
        this.dx = 0; //x方向の速度
        this.dy = 0; //y方向の速度
    }
    move(a) {
        rabbit.y += 32;
        document.getElementById('character').style.top = rabbit.y + "px";
    }
}
let rabbit = new character();
/* document.getElementById('character')!.onclick=function(){
    rabbit.y += 32
    document.getElementById('character')!.style.top=rabbit.y+"px"
} */
let u;
document.getElementById('character').onclick = u;
rabbit.move(u);
