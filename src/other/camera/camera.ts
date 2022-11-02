import {testList} from "./../test"

export class camera{
    private _y:number=0

    /* getter/setter */
    get y():number{
        testList["camera get y()"]=true
        return this._y
    }
    set y(y:number){
        testList["camera set y()"]=true
        this._y=y
    }
}