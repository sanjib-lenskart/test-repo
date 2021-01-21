$(document).ready(function(){
  $(".checkout_step_2 .reviewSection .fakeCart").hide();
  $(".order-summary__section__content").append($(".checkout_step_2 .reviewSection"));
  
  if($(".order-summary__section__content").height() > 200){
  $(".order-summary__scroll-indicator").show();
  }
});
