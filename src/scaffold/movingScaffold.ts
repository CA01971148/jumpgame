import {scaffold} from "./scaffold"

export class movingScaffold extends scaffold{
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        document.write('<img id="'+this.IDName+'" src="./../resource/movingScaffold.jpg">')//足場出現
        document.getElementById(this.IDName)!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById(this.IDName)!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }
}