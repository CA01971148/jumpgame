import {scaffold} from "./scaffold"

export class normalScaffold extends scaffold{
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        document.write('<img id="scaffold" src="./../resource/normalScaffold.jpg">')//足場出現
        document.getElementById('scaffold')!.style.width=this.width+"px"//初期大きさ設定(幅)
        document.getElementById('scaffold')!.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
    }
}