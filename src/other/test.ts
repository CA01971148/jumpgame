import { character } from "../character/character"

export let testList:{[testName:string]:boolean}={}//テストが成功したかどうか管理するための配列(キーはテストの名前、値はテストが成功したかどうか)
/* テスト一覧 */
/* index.ts */
testList["index getLotteryBox()"]=false
testList["index createRandomScaffold()"]=false
testList["index createRandomScaffold()_normal"]=false
testList["index createRandomScaffold()_slip"]=false
testList["index createRandomScaffold()_carry"]=false
testList["index createRandomScaffold()_moving"]=false
testList["index createRandomScaffold()_default"]=true//例外処理なのでtrueにならない
testList["index createScaffolds()"]=false
testList["index createDefaultScaffold()"]=false
testList["index loadNewScaffold()"]=false
testList["index updateDisplay()"]=false
testList["index isKeyDown()"]=false
testList["index isKeyDown()_left"]=false
testList["index isKeyDown()_right"]=false
testList["index isKeyDown()_space"]=false
testList["index showScoreArea()"]=false
testList["index main()"]=false
/* scaffold */
testList["slipScaffold constructor()"]=false
testList["carryScaffold constructor()"]=false
testList["carryScaffold get direction()"]=false
testList["carryScaffold set direction()"]=false
testList["carryScaffold setImgElement()"]=false
testList["movingScaffold get x()"]=false
testList["movingScaffold set x()"]=false
testList["movingScaffold set x() 右端"]=false
testList["movingScaffold set x() 左端"]=false
testList["movingScaffold set x() 通常"]=false
testList["movingScaffold get direction()"]=false
testList["movingScaffold set direction()"]=false
testList["movingScaffold scrole()"]=false
testList["normalScaffold constructor()"]=false
testList["scaffold constructor() 初期足場のとき"]=false
testList["scaffold constructor() 初期足場以外のとき"]=false
testList["scaffold constructor()"]=false
testList["scaffold get x()"]=false
testList["scaffold set x()"]=false
testList["scaffold get y()"]=false
testList["scaffold set y()"]=false
testList["scaffold get width()"]=false
testList["scaffold set width()"]=false
testList["scaffold get height()"]=false
testList["scaffold set height()"]=false
testList["scaffold get friction()"]=false
testList["scaffold set friction()"]=false
testList["scaffold createImgElement() 初期足場"]=false
testList["scaffold createImgElement() 初期足場以外"]=false
testList["scaffold createImgElement()"]=false
testList["scaffold setImgElement()"]=false
testList["scaffold createCSSRule()"]=false
testList["scaffold scrole()"]=false
/* other */
testList["playAudio playJumpSE()"]=false
testList["playAudio playBGM()"]=true//trueにならない仕様
testList["keyDown keyDownFunc()"]=false
testList["keyDown keyDownFunc()_A"]=false
testList["keyDown keyDownFunc()_D"]=false
testList["keyDown keyDownFunc()_Space"]=false
testList["keyDown keyUpFunc()"]=false
testList["keyDown keyUpFunc()_A"]=false
testList["keyDown keyUpFunc()_D"]=false
testList["keyDown keyUpFunc()_Space"]=false
testList["reload reload()"]=false
testList["camera get y()"]=false
testList["camera set y()"]=false
/* character */
testList["character get x()"]=false
testList["character set x()"]=false
testList["character set x()_左端"]=false
testList["character set x()_右端"]=false
testList["character set x()_通常"]=false
testList["character get y()"]=false
testList["character set y()"]=false
testList["character get height()"]=false
testList["character set height()"]=false
testList["character get dx()"]=false
testList["character set dx()_右最大値超過"]=false
testList["character set dx()_左最大値超過"]=false
testList["character set dx()_通常"]=false
testList["character set dx()"]=false
testList["character get dy()"]=false
testList["character set dy()"]=false
testList["character get jumpVelocity()"]=false
testList["character set jumpVelocity()_最大値超過"]=false
testList["character set jumpVelocity()_通常"]=false
testList["character set jumpVelocity()"]=false
testList["character createImgElement()"]=false
testList["character setImgElement()"]=false
testList["character move()"]=false
testList["character moveX()"]=false
testList["character moveX()_地上"]=false
testList["character moveX()_空中"]=false
testList["character moveX()_地上_carry"]=false
testList["character moveX()_地上_moving"]=false
testList["character moveX()_地上_通常"]=false
testList["character moveY()"]=false
testList["character moveY()_空中"]=false
testList["character moveY()_地上"]=false
testList["character moveY()_足場に留まる"]=false
testList["character moveY()_足場に留まらない"]=false
testList["character updateImages()"]=false
testList["character getStates()"]=false
testList["character currentScaffold()"]=false
testList["character checkAboveScaffold()"]=false
testList["character checkAboveScaffold()_足場上"]=false
testList["character checkAboveScaffold()_足場外"]=false
testList["character checkOnGround()"]=false
testList["character checkOnGround()_接地"]=false
testList["character checkOnGround()_空中"]=false
testList["character moveLeft()_空中"]=false
testList["character moveLeft()"]=false
testList["character moveRight()_空中"]=false
testList["character moveRight()"]=false
testList["character getSpeed()"]=false
testList["character jumpCharge()_最大縮み"]=false
testList["character jumpCharge()_通常縮み"]=false
testList["character jumpCharge()"]=false
testList["character jump()_接地"]=false
testList["character jump()"]=false
testList["character movedVelocity()"]=false
testList["character movedVelocity()_carry"]=false
testList["character movedVelocity()_moving"]=false
testList["characterRabbit constructor()"]=false
testList["characterRabbit move()"]=false
testList["characterEdge constructor()"]=false
testList["characterEdge load()"]=false

type exportOption="console"|"html"
export function showAllTest(option:exportOption):string{//テストの結果を取得するための関数
    let newLine:string=""
    switch(option){
        case "console":
            newLine="\n"
            break
        case "html":
            newLine="<br>"
            break
    }
    let result:string=""
    let countSuccess:number=0//テストが成功した数
    const testLength:number=Object.keys(testList).length//テストの数
    for(let i in testList){//テストリストの中身(キーと値)を一括で取得する
        const testTitle=i
        const isTestSuccess=testList[i]
        result+=`${testTitle}:${isTestSuccess}`+newLine
        if(isTestSuccess){//テストが成功した数を数える
            countSuccess++
        }
    }
    result=result.replace(/false/g,redText("false",option))//"falseを赤文字でハイライト"
    result+=`Total:${countSuccess}/${testLength}\t${Math.round((countSuccess/testLength)*1000)/10}%`
    return result
}

function redText(text:string,option:exportOption):string{//コンソールやhtmlに出力する文字を赤文字に変換するための関数
    let red=""
    let reset=""
    switch(option){
        case "console":
            red="\u001b[31m"
            reset="\u001b[0m"
            break
        case "html":
            red="<font color='red'>"
            reset="</font>"
    }

    const result =red+text+reset
    return result
}