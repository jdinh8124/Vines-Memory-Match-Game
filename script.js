$(document).ready(initalizeApp)

function initalizeApp(){
  $(".card").on("click", handleCardClick);

}


function handleCardClick(event){
  $(event.currentTarget).find('.back').toggleClass("hidden");
}
