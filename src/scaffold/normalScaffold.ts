import {scaffold} from "./scaffold"
import {playerCamera, stylesheet} from "../index"
import {canvas} from "../index"

export class normalScaffold extends scaffold{
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        document.write('<img id="'+this.IDName+'" src="./../resource/image/scaffold/normalScaffold.jpg">')//足場出現
        this.scaffoldID=document.getElementById(this.IDName)!//IDを取得
        this.scaffoldID.style.width=this.width+"px"//初期大きさ設定(幅)
        this.scaffoldID.style.height=scaffold.thickness+"px"//初期大きさ設定(厚さ)
        this.scaffoldID.style.left=((this.x)+(canvas.width/2)-(this.width/2))+"px"//x座標設定
        this.scaffoldID.style.top=(canvas.height-(this.y-playerCamera.y))+"px"//y座標設定 高さは"50
    }
}