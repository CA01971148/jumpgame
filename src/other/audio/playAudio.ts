import {testList} from "./../test"

export type SEtype="jump"//SEの種類

const BGM=new Audio("./../resource/sound/bgm/bgm1.wav")//BGM

export function playJumpSE(audioType:SEtype){//ジャンプSEを再生する関数
    switch(audioType){
        case "jump":
            const jumpSound=new Audio("./../resource/sound/se/jump.wav")//ジャンプSE
            jumpSound.play()//ジャンプSEを再生する
    }
    testList["playAudio playJumpSE()"]=true
}

export function playBGM(){//BGMを再生する関数
    BGM.loop=true//ループ再生をオンにする
    BGM.play()//BGMを再生する
    testList["playAudio playBGM()"]=true
}