$(document).ready(initalizeApp)


var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var attempts = 0;
var games_played = 0;

function initalizeApp(){
  $(".card").on("click", handleCardClick);
  $(".refreshButton").click(function () {
    location.reload();
  });
  $(".buttonPlayAgain").click(function () { $(".modal").removeClass('showmodal');
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
    if(attempts > 1) {displayStats();
  }
  }
  if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
    matches += 1;
    firstCardClicked = null;
    secondCardClicked = null;

    if(matches === max_matches){
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
  var dividedStats = (matches / (attempts - 1) * 100).toFixed(2);
  return dividedStats;
}

function displayStats(){
  var acrruracyCalulation = calculateAccuracy();
  $(".gamesPlayed").text();
  $(".gameAttempts").text(attempts);
  $(".gameAccuracy").text(acrruracyCalulation + '%');

}
