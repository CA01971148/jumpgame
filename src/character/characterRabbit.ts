import {character} from "./character"

export class characterRabbit extends character{
    constructor(){
        super()
        document.write('<img id="character" src="./../resource/image/rabbit.png">')//キャラ出現
        this.characterID.style.width=this.characterSize+"px"//初期大きさ設定(幅)
        this.characterID.style.height=this.characterSize+"px"//初期大きさ設定(高さ)
    }
}