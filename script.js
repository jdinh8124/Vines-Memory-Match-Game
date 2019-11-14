$(document).ready(initalizeApp)

var imagesArray = [
  'js',
  'php',
  'docker',
  'github',
  'htmlpic',
  'mysql',
  'node',
  'react',
  'css',
  'js',
  'php',
  'docker',
  'github',
  'htmlpic',
  'mysql',
  'node',
  'react',
  'css',
];




var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 1;
var lockBoard = false;

function initalizeApp(){
  // $(".gameSpace").sortable({ 'update':  });
  makeCards(imagesArray);

  $(".card").on("click", handleCardClick);
  $(".refreshButton").click(function () {
    location.reload();
  });
  $(".buttonPlayAgain").click(function () {
    $(".modal").removeClass('showmodal');
    $(".back").removeClass("hidden");
    games_played += 1;
    resetStats();
    $(".gamesPlayed").text(games_played);
  });

}


function handleCardClick(event){
  if(lockBoard){
    return;
  }
  $(event.currentTarget).find('.back').addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    return;
  } else {
    secondCardClicked = $(event.currentTarget);
    attempts += 1;
   displayStats();
    lockBoard = true;
  }
  if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
    matches += 1;
    firstCardClicked = null;
    secondCardClicked = null;
    displayStats();
    lockBoard = false;
    if((matches) === max_matches){
      $(".modal").addClass("showmodal")
    }
  } else {
    setTimeout(function () {

      firstCardClicked.find('.back').removeClass("hidden");
      secondCardClicked.find('.back').removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      lockBoard = false;
    }, 1500);
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

function resetStats(){
  matches = null;
  attempts = null;
  $(".gameAttempts").text(0);
  $(".gameAccuracy").text( 0 + '%');
}


function makeCards(imageArray) {
  var foundImg;
  var pictureElements;
  var backElement;
  for (var loopThroughArray = 0; loopThroughArray < imageArray.length; loopThroughArray++) {
    foundImg = imageArray[loopThroughArray];
    pictureElements = $("<div>").addClass("front " + foundImg);
    $("#card" + [loopThroughArray]).append(pictureElements);
    backElement = $("<div>").addClass("back");
    $("#card" + [loopThroughArray]).append(backElement);
  }
  return foundImg;
}
