import {key,rabbit} from "../../index"
import {testList,showAllTest} from "./../test"

export class keyDown{//キーが押されているかどうか判断するためのクラス
    key_left:boolean=false//左移動キーが押されているかどうか
    key_right:boolean=false//右移動キーが押されているかどうか
    key_jump:boolean=false//ジャンプキーが押されているかどうか

    keyDownFunc(event:any){//キーボードが押されたときに呼び出される関数
        switch(event.keyCode){
            case 65://「A」キーが押されたとき
                this.key_left=true
                key.key_left=this.key_left
                testList["keyDown keyDownFunc()_A"]=true
                break
            case 68://「D」キーが押されたとき
                this.key_right=true
                key.key_right=this.key_right
                testList["keyDown keyDownFunc()_D"]=true
                break
            case 32://「Space」キーが押されたとき
                this.key_jump=true
                key.key_jump=this.key_jump
                testList["keyDown keyDownFunc()_Space"]=true
                break
        }
        testList["keyDown keyDownFunc()"]=true
    }
    keyUpFunc(event:any){//キーボードが押されたときに呼び出される関数
        switch(event.keyCode){
            case 65://「A」キーが離されたとき
                this.key_left=false
                key.key_left=this.key_left
                testList["keyDown keyUpFunc()_A"]=true
                break
            case 68://「D」キーが離されたとき
                this.key_right=false
                key.key_right=this.key_right
                testList["keyDown keyUpFunc()_D"]=true
                break
            case 32://「Space」キーが離されたとき
                this.key_jump=false
                key.key_jump=this.key_jump
                rabbit.jump()//Spaceキーが離されたとき、rabbitの跳躍力を解放
                testList["keyDown keyUpFunc()_Space"]=true
                break

            case 13://「Enter」キーが離されたとき(デバッグ用)
                /* デバッグ用処理 */
                console.log(showAllTest("console"))//コンソールにテストを出力する
                break
            }
            testList["keyDown keyUpFunc()"]=true
    }
}