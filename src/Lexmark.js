const Uppy = require("@uppy/core");

module.exports = class Lexmark {

    sendMessageToESF(msg) {
        window.writeDebugMsg("Sending message to ESF: " + msg);
        if (typeof (lxkwebapp) !== 'undefined') lxkwebapp.sendMessageToEsf('{\"msg":\"' + msg + '\"}');
    }
}


window.base64toBlob = function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}


window.writeDebugMsg = function writeDebugMsg(msg) {
    const debug = false;
    const isDevEnvironment = false;
    if (!debug) return;

    if (isDevEnvironment) document.getElementById("dbg_txt").value = document.getElementById("dbg_txt").value + msg + "\n";
    else console.log("UppyLexmark: " + msg);

}


window.processEsfMessage = function processEsfMessage(message) {

    let msg = JSON.parse(message);

    if (msg.file) {
        let file = {
            source: "" + Date.now(),
            name: "" + Date.now() + ".pdf",
            type: "pdf",
            data: base64toBlob(msg.file)
        };

        let files = [file];
        window._mfpUppy.addFiles(files);
        writeDebugMsg(JSON.stringify(window._mfpUppy.getFiles()));

    }

};
