$(document).ready(initalizeApp)


var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 1;

function initalizeApp(){
  $(".card").on("click", handleCardClick);
  $(".refreshButton").click(function () {
    location.reload();
  });
  $(".buttonPlayAgain").click(function () {
    $(".modal").removeClass('showmodal');
    $(".back").removeClass("hidden");
    games_played += 1;
    $(".gamesPlayed").text(games_played);
  });

}


function handleCardClick(event){
  $(event.currentTarget).find('.back').addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    return;
  } else {
    secondCardClicked = $(event.currentTarget);
    attempts += 1;
   displayStats();

  }
  if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
    matches += 1;
    firstCardClicked = null;
    secondCardClicked = null;
    displayStats();
    if((matches /games_played) === max_matches){
      $(".modal").addClass("showmodal")
    }
  } else {
    setTimeout(function () {

      firstCardClicked.find('.back').removeClass("hidden");
      secondCardClicked.find('.back').removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
    }, 1200);
  }
}

function calculateAccuracy(){
  var dividedStats = (matches /attempts  * 100).toFixed(2);
  return dividedStats;
}

function displayStats(){
  var acrruracyCalulation = calculateAccuracy();
  $(".gameAttempts").text(attempts);
  $(".gameAccuracy").text(acrruracyCalulation + '%');
  $(".gamesPlayed").text(games_played);
}
// if (attempts > 1) { displayStats();
