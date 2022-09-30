"use strict";
class normalScaffold extends scaffold {
    constructor(_level, _width = scaffold.defaultWidth) {
        super(_level, _width);
        document.write('<img id="scaffold" src="resource/normalScaffold.jpg">'); //足場出現
        document.getElementById('scaffold').style.width = this.width + "px"; //初期大きさ設定(幅)
        document.getElementById('scaffold').style.height = scaffold.thickness + "px"; //初期大きさ設定(厚さ)
    }
}
exp;
