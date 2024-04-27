importScripts('lamejs.min.js');

self.onmessage = function(e) {
    const audioData = new Int16Array(e.data);
    const mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128); // mono 44.1kHz 128kbps
    const mp3Data = mp3encoder.encodeBuffer(audioData); // 將 pcm 資料轉換為 mp3
    self.postMessage(mp3Data);
};