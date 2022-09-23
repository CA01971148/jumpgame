"use strict";
document.write('<img id="character" src="resource/rabbit.png">'); //キャラ出現
class character {
    constructor() {
        this.y = 0; //y座標
    }
    move() {
        this.y += 32;
        document.getElementById('character').style.top = this.y + "px";
    }
}
let rabbit = new character();
document.getElementById('character').onclick = rabbit.move();
