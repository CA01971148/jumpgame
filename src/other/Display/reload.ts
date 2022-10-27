export function reload(){//リロードしたときにゲーム画面ではなくタイトル画面を読み込む処理
    if(window.performance){
        if(window.performance.navigation.type === 1){
            location.href="./../title.html"//タイトル画面を読み込む
        }
    }
}