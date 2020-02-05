$(document).ready(initalizeApp)

let imagesArray = [
  'wednesday','okGif','lying', 'chickenGif', 'dancingGif', 'merryGif', 'highfiveGif', 'hatersGif', 'mcdsGif',
  'wednesday', 'okGif','lying','chickenGif', 'dancingGif', 'merryGif', 'highfiveGif','hatersGif', 'mcdsGif',
];
let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
let max_matches = 1;
let attempts = 0;
let games_played = 1;
let lockBoard = false;

function initalizeApp(){
  shuffle(imagesArray);
  makeCards(imagesArray);
  $(".overlay-text").on("click", () => {
    $(".overlay-text").addClass("hidden").removeClass("overlay-text")
  })
  $(".card").on("click", handleCardClick);
  $(".refreshButton").click( ()  => {
    location.reload();
  });
  $(".buttonPlayAgain").click( () => {
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

 const handleCardClick = event => {
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
    setTimeout( () => {
      firstCardClicked.find('.back').removeClass("hidden");
      secondCardClicked.find('.back').removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
      lockBoard = false;
    }, 1500);
  }
}
const calculateAccuracy = () => {
  let dividedStats = (matches /attempts  * 100).toFixed(2);
  return dividedStats;
}

const displayStats = () => {
  let acrruracyCalulation = calculateAccuracy();
  $(".gameAttempts").text(attempts);
  $(".gameAccuracy").text(acrruracyCalulation + '%');
  $(".gamesPlayed").text(games_played);
}

const resetStats = () => {
  matches = null;
  attempts = null;
  $(".gameAttempts").text(0);
  $(".gameAccuracy").text( 0 + '%');
}
const makeCards = (imageArray) => {
  let pictureElements;
  let backElement;
  let counter = 0;
  imageArray.map(pic => {
      pictureElements = $("<div>").addClass("front " + pic);
      $("#card" + [counter]).append(pictureElements);
      backElement = $("<div>").addClass("back");
      $("#card" + [counter]).append(backElement);
      counter++
  })
}
const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
