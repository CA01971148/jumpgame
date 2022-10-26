export type SEtype="jump"//SEの種類

const jumpSound=new Audio("./../resource/sound/se/jump.wav")//ジャンプSE

export function playJumpSE(audioType:SEtype){//ジャンプSEを再生する
    switch(audioType){
        case "jump":
            jumpSound.play()
    }
}