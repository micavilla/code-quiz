var leaderBoard = document.getElementById("leaderboard-list");
var highScores = leaderboards.length;
var leaderboards = [];
function listHighScores() {
    console.log(leaderboards)
    for (var i = 0; i < leaderboards.length; i++) {
        var highScores = leaderboards[i];
        var li = document.createElement("li");
        li.textContent = highScores.initials + "Your score is " + score + " out of 100, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
        leaderBoard.appendChild(li);
    }
}
function store() {
    var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
    if (storedHighScores != null) {
        leaderboards = storedHighScores;
    }
    listHighScores()
}
store();