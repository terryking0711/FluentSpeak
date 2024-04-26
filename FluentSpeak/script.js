const topics = [
    "Describe your favorite book and why you like it.",
    "Talk about a memorable event in your life.",
    "Discuss the impact of technology on education."
];

const topicButton = document.getElementById('topicButton');
const topicDisplay = document.getElementById('topicDisplay');
topicButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    topicDisplay.textContent = topics[randomIndex];
});

let timer;
let seconds = 0;
const timerDisplay = document.getElementById('timer');

const recordButton = document.getElementById('recordButton');
const stopRecordButton = document.getElementById('stopRecordButton');
const audioPlayback = document.getElementById('audioPlayback');
let mediaRecorder;
let audioChunks = [];

let dotCount = 0;

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

        // 更新 "計時中..." 的文字
        dotCount = (dotCount + 1) % 4;
        const dots = '.'.repeat(dotCount);
        const timerMessageElement = document.getElementById('timer-message');
        timerMessageElement.textContent = `計時中${dots}`;
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
    seconds = 0; // 重置秒數
    timerDisplay.textContent = "00:00"; // 重設計時器顯示
}

recordButton.addEventListener('click', () => {
    // 清空前一次的錄音資料
    audioChunks = [];
    const timerMessageElement = document.getElementById('message');
    timerMessageElement.textContent = '';

    // 將 <audio> 元素還原成最初的模樣
    const audioPlayback = document.getElementById('audioPlayback');
    audioPlayback.src = '';
    audioPlayback.load();

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            startTimer(); // 開始計時
            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });
        });
});
stopRecordButton.addEventListener('click', () => {
    mediaRecorder.stop(); // 停止錄音
    stopTimer(); // 停止計時
    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks); // 將錄音資料轉換為 Blob 物件
        const audioUrl = URL.createObjectURL(audioBlob); // 將 Blob 物件轉換為 URL
        audioPlayback.src = audioUrl; // 將 URL 設定為音訊播放的來源
        // 隱藏 "計時中" 的文字
        const timerMessageElement = document.getElementById('timer-message');
        timerMessageElement.textContent = '';
        // 在網頁上顯示 "錄音檔已經建構"
        const messageElement = document.getElementById('message');
        messageElement.textContent = "錄音檔已經建構";
    });
});