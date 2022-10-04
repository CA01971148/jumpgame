import {character} from "./character"

export class characterRabbit extends character{
    constructor(){
        super()
        document.write('<img id="character" src="./../resource/rabbit.png">')//キャラ出現
        document.getElementById('character')!.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        document.getElementById('character')!.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
    }
}