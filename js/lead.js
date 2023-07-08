var leaderBoard = document.getElementById("leaderboard-list");
var highScores = leaderboards.length;
var leaderboards = [];

// lists scores saved in local storage and connects to script js
function listHighScores() {
    console.log(leaderboards)
    for (var i = 0; i < leaderboards.length; i++) {
        var highScores = leaderboards[i];
        var li = document.createElement("li");
        li.textContent = highScores.Initials + ": " + highScores.Score + " out of 4";
        leaderBoard.appendChild(li);
    }
}
function displayHighscore() {
    var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
    if (storedHighScores != null) {
        leaderboards = storedHighScores;
    }
    listHighScores();
}
displayHighscore();