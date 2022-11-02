export let testList:{[testName:string]:boolean}={}//テストが成功したかどうか管理するための配列(キーはテストの名前、値はテストが成功したかどうか)
/* テスト一覧 */
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

export function showAllTest():string{//テストの結果を取得するための関数
    let result:string=""
    let countSuccess:number=0//テストが成功した数
    const testLength:number=Object.keys(testList).length//テストの数
    for(let i in testList){//テストリストの中身(キーと値)を一括で取得する
        const testTitle=i
        const isTestSuccess=testList[i]
        result+=`${testTitle}:${isTestSuccess}`+"\n"
        if(isTestSuccess){//テストが成功した数を数える
            countSuccess++
        }
    }
    result+=`Total:${countSuccess}/${testLength}\t${Math.round((countSuccess/testLength)*1000)/10}%`
    return result
}