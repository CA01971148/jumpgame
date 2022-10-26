import {scaffold} from "./scaffold"
import {playerCamera, stylesheet} from "../index"
import {canvas} from "../index"

export class normalScaffold extends scaffold{
    constructor(_level:number,_width:number=scaffold.defaultWidth){
        super(_level,_width)
        this.imageName="normalScaffold.jpg"
        this.createImgElement(this.imageName)//足場のimg要素を追加する
        this.setImgElement()//img要素を取得して初期化する
    }
}