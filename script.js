$(document).ready(initalizeApp)


var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;


function initalizeApp(){
  $(".card").on("click", handleCardClick);
}


function handleCardClick(event){
  $(event.currentTarget).find('.back').addClass("hidden");
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    return;
  } else {
    secondCardClicked = $(event.currentTarget);
  }

  if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
    matches += 1;
    firstCardClicked = null;
    secondCardClicked = null;

    // if(matches === max_matches){

    // }
  } else {
    setTimeout(function () {

      firstCardClicked.find('.back').removeClass("hidden");
      secondCardClicked.find('.back').removeClass("hidden");
      firstCardClicked = null;
      secondCardClicked = null;
    }, 1500);
  }
}
