$(document).ready(initalizeApp)

var imagesArray = [
  'wednesday','okGif','lying', 'chickenGif', 'dancingGif', 'merryGif', 'highfiveGif', 'hatersGif', 'mcdsGif',
  'wednesday', 'okGif','lying','chickenGif', 'dancingGif', 'merryGif', 'highfiveGif','hatersGif', 'mcdsGif',
];
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 1;
var attempts = 0;
var games_played = 1;
var lockBoard = false;

function initalizeApp(){
  //Added relevant background music
  var backAudio = new Audio('assets/sounds/Vanessa Carlton - A Thousand Miles (Official Instrumental).mp3');
      backAudio.play();
  //dynamically make card fronts/back
  shuffle(imagesArray);
  makeCards(imagesArray);
  // Modal popup, goes away with click
  $(".overlay-text").on("click", function(){
    $(".overlay-text").addClass("hidden").removeClass("overlay-text")
  })
  //Gives player the option to play again or refresh completely
  $(".card").on("click", handleCardClick);
  $(".refreshButton").click(function () {
    location.reload();
  });
  $(".buttonPlayAgain").click(function () {
    $(".front, .back").remove();
    shuffle(imagesArray);
    makeCards(imagesArray);
    $(".modal").removeClass('showmodal');
    $(".back").removeClass("hidden");
    games_played += 1;
    resetStats();
    $(".gamesPlayed").text(games_played);
  });

}


function handleCardClick(event){
  //The Lockboard if statements are to prevent the player from clicking on cards when the cards are being matched
  if(lockBoard){
    return;
  }
  if ($(event.currentTarget).find(".back").hasClass('hidden')) {
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
  //Checking to see if the fronts of the cards are the same to match
  if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
    matches += 1;
    firstCardClicked = null;
    secondCardClicked = null;
    displayStats();
    lockBoard = false;
    //unnecessry false lockboard
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
//Math for the Side Div are bellow
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
  //dynamically create front and back divs to attatched to the cards on the HTML
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
  //function to create shuffled cards each round
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}