export let testList:{[testName:string]:boolean}={}//テストが成功したかどうか管理するための配列(キーはテストの名前、値はテストが成功したかどうか)
/* テスト一覧 */
testList[""]=false

export function showAllTest():string{//テストの結果を取得するための関数
    let result:string=""
    let countSuccess:number=0//テストが成功した数
    for(let i in testList){//テストリストの中身(キーと値)を一括で取得する
        const testTitle=i
        const isTestSuccess=testList[i]
        result+=`${testTitle}:${isTestSuccess}`+"\n"
        if(isTestSuccess){//テストが成功した数を数える
            countSuccess++
        }
    }
    result+=`Total:${countSuccess}/${testList.length}`
    return result
}