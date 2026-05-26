
let timer = 1500;
let timerInterval;
let isBreak = false;
let isPaused = false;
let clickSound = new Audio("button.mp3");
let timeUpSound = new Audio("timerend.mp3");
let tickingSound = new Audio("ticking.mp3");
clickSound.preload = "auto";
tickingSound.preload = "auto";
timeUpSound.preload = "auto";
document.getElementById("start-btn").addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.cloneNode().play();
    startTimer();
});
document.getElementById("timer").textContent = formatTime(timer);
document.getElementById("pause-btn").addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.cloneNode().play();
    pauseTimer();
});
document.getElementById("reset-btn").addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.cloneNode().play();
    resetTimer();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    
    clearInterval(timerInterval);
    document.getElementById("start-btn").style.display = "none";
    if(isBreak){
    document.querySelector(".controls").style.display = "none";
   }else{
    document.querySelector(".controls").style.display = "flex";
    }
    document.getElementById("pause-btn").style.display = "block";
    document.getElementById("reset-btn").style.display = "block";
    document.getElementById("timer").style.fontSize = "90px";
    document.getElementById("timer").style.marginBottom = "-15px";
    document.getElementById("timer").style.marginTop = "-10px";
    if (isBreak) {
        document.getElementById("active-cat").style.display = "none";
        document.getElementById("pause-cat").style.display = "none";
        document.getElementById("break-cat").style.display = "block";
        document.getElementById("break-cat").style.width = "200px";
    } else {
        document.getElementById("active-cat").style.display = "block";
        document.getElementById("pause-cat").style.display = "none";
        document.getElementById("break-cat").style.display = "none";
    }
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = formatTime(timer);
        if(timer <= 5 && timer > 0){
            tickingSound.currentTime = 0;
            tickingSound.play();
        }
        if (timer <= 0) {
            clearInterval(timerInterval);
            timeUpSound.play();
            document.getElementById("active-cat").style.display = "none";
            document.getElementById("pause-cat").style.display = "block";
            document.getElementById("pause-cat").style.width = "200px";
            document.getElementById("break-cat").style.display = "none";
            document.querySelector(".controls").style.display = "none";
            document.getElementById("timer").textContent = "TIME'S UP!";
            document.getElementById("timer").style.fontSize = "90px";
            if (!isBreak) {
                isBreak = true;
                timer = 300;
                document.querySelector(".controls").style.display = "none";
                setTimeout(() => {
                document.getElementById("timer").textContent = "BREAK TIME!";
                document.getElementById("timer").style.fontSize = "85px";}, 6000);
                setTimeout(() => {
                document.getElementById("timer").textContent = formatTime(timer);
                document.getElementById("timer").style.fontSize = "90px";
                 startTimer();}, 8000);
            }else{
                isBreak = false;
                timer = 1500;
                document.getElementById("active-cat").style.display = "none";
                document.getElementById("pause-cat").style.display = "block";
                document.getElementById("pause-cat").style.width = "200px";
                document.getElementById("break-cat").style.display = "none";
                document.querySelector(".controls").style.display = "none";
                document.getElementById("timer").textContent = "BREAK OVER!";
                document.getElementById("timer").style.fontSize = "85px";
                
                 setTimeout(() => {resetTimer();  }, 8000);
            }
        }

    }, 1000);
}

function pauseTimer() {
    
    if (isPaused) {
        document.getElementById("pause-btn").textContent = "PAUSE";
        startTimer();
        isPaused = false;
    } else {
        clearInterval(timerInterval);
        document.getElementById("active-cat").style.display = "none";
        document.getElementById("pause-cat").style.display = "block";
        document.getElementById("break-cat").style.display = "none";
        document.getElementById("pause-btn").textContent = "RESUME";
        isPaused = true;
    }
}

function resetTimer() {
   
    clearInterval(timerInterval);
    timer = 1500;
    isBreak = false;
    isPaused = false;
    document.getElementById("timer").textContent = formatTime(timer);
    document.getElementById("active-cat").style.display = "none";
    document.getElementById("pause-cat").style.display = "none";
    document.getElementById("break-cat").style.display = "none";
    document.getElementById("pause-btn").style.display = "none";
    document.getElementById("reset-btn").style.display = "none";
    document.getElementById("start-btn").style.display = "block";
    document.querySelector(".controls").style.display = "none";
    document.getElementById("timer").style.fontSize = "120px";
    document.getElementById("timer").style.marginBottom = "20px";
    document.getElementById("timer").style.marginTop = "30px";
    document.getElementById("pause-btn").textContent = "PAUSE";
}

