$(document).ready(clickHandlers)

  function clickHandlers(){
$(".card").on("click", clickedCard);

}


function clickedCard(){
  $(this).find('.back').addClass("hidden");
}
