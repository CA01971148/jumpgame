export let testList:{[testName:string]:boolean}={}//テストが成功したかどうか管理するための配列(キーはテストの名前、値はテストが成功したかどうか)
/* テスト一覧 */
/* indexed.ts */
testList["getLotteryBox()"]=false
testList["createRandomScaffold()"]=false
testList["createRandomScaffold()のnormal"]=false
testList["createRandomScaffold()のslip"]=false
testList["createRandomScaffold()のcarry"]=false
testList["createRandomScaffold()のmoving"]=false
testList["createRandomScaffold()のdefault(trueにはならない)"]=false
testList["createScaffolds()"]=false
testList["createDefaultScaffold()"]=false
testList["loadNewScaffold()"]=false
testList["updateDisplay()"]=false
testList["isKeyDown()"]=false
testList["isKeyDown()_left"]=false
testList["isKeyDown()_right"]=false
testList["isKeyDown()_space"]=false
testList["showScoreArea()"]=false
testList["main()"]=false
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