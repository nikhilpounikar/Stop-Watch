// get html for dom manipulation
var startButton = document.getElementById('startBtn');
var stopButton = document.getElementById('stopBtn');
var resetButton = document.getElementById('resetBtn');

// //array to maintain timer
// index 0 => hour / 60 minnutes
// 1 => sigle digit minnutes
// 2 => double digit seconds
// 3 => single digit seconds
// 4 => double digit miliseconds
// 5 => single digit miliseconds
var timeArray = [0, 0, 0, 0, 0, 0];

var startWatchInterval;

var startStopwatch = function (event) {

    event.preventDefault();

    // clear already running inteval
    if(startWatchInterval != undefined)
     clearInterval(startWatchInterval);
    // once start button is click start the interval

    // get the reference to current interval in order to clear it if required
    startWatchInterval = setInterval(function () {
        updateTimeAtIntevarl();
    }, 10);
};


var stopStopWatch = function (event) {
    // once stop button is click stop the interval but keep the current time as it is
    clearInterval(startWatchInterval);
};

var resetStopWatch = function (e) {
    //if reset button clicked
    clearInterval(startWatchInterval);

    // update the time to zero
    let tempTimeArrar = [0, 0, 0, 0, 0, 0];

    timeArray = tempTimeArrar;

    updateWatchView();
}

function updateTimeAtIntevarl() {

    //starting to update time from end i.e milisecond first, second and so on
    updateTime(timeArray.length - 1);
    //after updating time the page should reflect on same time 
    updateWatchView();
}

function updateTime(index) {

    // 1 hour has been completed
    if (index < 0)
        return;

    let time = timeArray[index];

    // update time by one unit
    time++;

    // check if time cycle should start again
    // index 0 represent hour and 2 represent minutes
    if (time === 10 && index != 0 && index != 2) {

        //reseting time to zero
        time = 0;

        // call recursively so that next count can be increased
        // in case when time is 10 current indexed element should get reset to zero while one should be carried forward

        updateTime(index - 1);
    } else if (time === 6 && (index == 0 || index == 2)) {
        //reseting time to zero
        time = 0;

        // call recursively so that next count can be increased
        // in case when time is 10 it should get reset to zero while one should be carried forward

        updateTime(index - 1);
    }

    // updating new time into array
    timeArray[index] = time;

}

function updateWatchView() {

    //iteratevely updating watch view on page
    for (let i = 0; i < timeArray.length; i++) {
        let timeSpan = document.getElementById('time' + i);

        timeSpan.innerHTML = timeArray[i];
    }
}


startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopWatch);
resetButton.addEventListener('click', resetStopWatch);
