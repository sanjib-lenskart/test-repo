
var app = {};
app.authtoken = 'lenskartinit';
app.serverName = 'lenskart';
app.appversion = '1.3';
app.myvar = 'on';

app.createTryOnView = function(selector, sku) {
  var _this = this;
 
  var onlyhost = location.host.replace('www.','')
  
  $('.t-giga').hide();  
  $.get("/tools/"+_this.authtoken+"/ditto-auth-credentials/", function(response) {
    $("#creation").removeClass('hide');
    $('.try_ditto').addClass('hide');
    console.log("ditto creation"); 
    //console.log('Get Response By Auth Token Service');
    var dittoCreation = new ditto.api.DittoCreation(
      {
        selector: selector,
        accessKeyId: response['X-Ditto-Access-Key-Id'],
        clientSignature: response['X-Ditto-Signature'],
        disableScale: true,
        enableFaceAnalysis: true,
        serverNetloc: "https://vto."+_this.serverName+".api.ditto.com/"
      },
      {
        success: function(callbackObject) {          
          console.log("success", callbackObject);
          _this.setCookie('sgdittoId',callbackObject.dittoId,1, onlyhost);
          console.log(window.location.href.indexOf('/pages/compare-looks'));
          if(window.location.href.indexOf('/pages/compare-looks') > -1){
            //$('.comparemain-lk .cmparelk-btn .loading').fadeOut();
            simply.lastCollection = simply.getCookie('lastCollection');
//             if((!cn(simply.lastCollection)) && simply.lastCollection != ''){
//               window.location.href = '/collections/'+simply.lastCollection;
//             } else {
//               window.location.href = '/collections/eyeglasses';
//             }
            
            simply.lastCollectionpp = simply.getCookie('lastCollectionpp');
            
            if((!cn(simply.lastCollection)) && simply.lastCollection != '' && simply.lastCollectionpp == 'ppoff'){
              window.location.href = '/collections/'+simply.lastCollection;
            }
              else if((!cn(simply.lastCollection)) && simply.lastCollection != '' && simply.lastCollectionpp == 'ppon'){
              window.location.href = '/products/'+simply.lastCollection;
                
            } else {
              window.location.href = '/collections/eyeglasses';
            }
            
            simply.setCookie('try3d',1,1);
            return;
          }
          console.log("createTryOnView"); 
          _this.displayTryOnFrontal(selector,sku,callbackObject.dittoId);
          $(".ditto_panel").addClass("show");

        },
        failure: function(callbackObject) {
          console.log("failure", callbackObject);
          $(".backtocollections").show(); 
        },
        progress: function(callbackObject) {
          console.log(callbackObject);
          console.log("progress", callbackObject);
          $(".ditto_panel").removeClass("show");
          $('.tooltip180').fadeOut();
      $('.tooltip180').addClass('hide');
          $(".loadingtryonpage").hide();
        },
        close: function(callbackObject) {
          console.log("close", callbackObject); 
          $(".backtocollections").show(); 
        }
      }
    );
  });
};

app.displayTryOnFrontal = function(selector, sku, dittoId) {
  var _this = this;
  $.get("/tools/"+_this.authtoken+"/ditto-auth-credentials/?message=" + dittoId, function(response) {  
    targetUrl =
      "https://vto."+_this.serverName+".api.ditto.com/api/"+_this.appversion+"/dittos/" +
      dittoId +
      "/frontal-frame/?product_id=" +
      sku;
    $.ajax({
      type: "GET",
      url: targetUrl,
      headers: {
        "X-Ditto-Access-Key-Id": response['X-Ditto-Access-Key-Id'],
        "X-Ditto-Signature": response['X-Ditto-Signature']
      },
      success: function(result) {
        $(".loadingtryonpage").hide();
        console.log("displayTryOnFrontal"); 
        $("#creation").addClass('hide');
        $('#creation-iframe').remove();
        //$('#ditto-thumbnail').removeClass('hide');  
        //$(".first_img_thub").removeClass("hide");
$('.tooltip180').removeClass('hide');
        $('.re_try_ditto').removeClass('hide');
        $('.try_ditto').addClass('hide');
        $('.lSSlide').addClass('screen-hide'); 
        $('.ditto_panel').removeClass('hide');
        $('.product_banner_div').addClass('hide');
        $('.product_banner_thubnail').removeClass('hide');
        if(window.location.href.indexOf('/products/') > -1){
          $('.product_img_sec .loading_ls').fadeOut();

          if($('.lSSlide').hasClass('nothide')){ 
            $('.re_try_ditto').addClass('hide');
            $('.fake_pagination.current').removeClass('hide');
          }
        }
        _this.displayTryOnView('#ditto',sku,dittoId);
      },
      failure: function() {
        console.log("failure");
      },
      error: function(status) {
        console.log("error " + status);
        console.log(window.location.href.indexOf('/pages/compare-looks'));
        if(window.location.href.indexOf('/pages/compare-looks') > -1){
          $('.compare-lk .re_try_ditto').click();
        }
      }
    });
  });
};

app.displayTryOnView = function(selector, sku, dittoId) {
  $('.with_ditto .fake_pagination').addClass('hide');


  var _this = this;
  $.get("/tools/"+_this.authtoken+"/ditto-auth-credentials/?message=" + dittoId, function(
        response
  ) { 
    var options = {
      selector: selector,
      dittoId: dittoId,
      sku: sku,
      thumbnailSelector: '#ditto-thumbnail',
      serverNetloc: "https://vto."+_this.serverName+".api.ditto.com/",
      accessKeyId: response['X-Ditto-Access-Key-Id'],
      signature: response['X-Ditto-Signature'],
    };
    console.log('Try on Viw Response Object');
    new ditto.api.TryOn(options, {
      success: function(resultt) {
$(".loadingtryonpage").hide();

        if (app.myvar == 'on'){
          $("#creation").addClass('hide');
          $('#creation-iframe').remove();
          //$('#ditto-thumbnail').removeClass('hide');  
          //$(".first_img_thub").removeClass("hide");
          $('.re_try_ditto').removeClass('hide');
          $('.tooltip180').removeClass('hide');
          $('.try_ditto').addClass('hide');
          $('.ditto_panel').removeClass('hide');
          $('.product_banner_div').addClass('hide');
          $('.product_banner_thubnail').removeClass('hide');        
          $('.fake_pagination').addClass('hide');
          app.myvar = 'off';
        }
        if(window.location.href.indexOf('/products/') > -1){
          $('.product_img_sec .loading_ls').fadeOut();
        }

        $('.lSSlide').addClass('screen-hide');

        $('.lSGallery li').click(function(){
          $('#ditto').addClass('hide');
          $('.lSSlide').removeClass('screen-hide'); 
        });

        $('#ditto-thumbnail img').click(function(){        	
          $('#ditto').removeClass('hide');
          $('.lSSlide').addClass('screen-hide'); 
          $('.fake_pagination').addClass('hide');
          $('.lSSlide').removeClass('nothide');

        });

        //         Tooltip code start from here
        $('.tooltip180').delay(1000).fadeIn();  

        if ($(window).width() >= 768){
          $(window).scroll(function() {
            if ($(this).scrollTop()>100)
            {
              $('.tooltip180').fadeOut();
            }
            else
            {            
              if($('#product_card .ditto_panel').hasClass('show')){  
                 if($('#product_card #ditto').hasClass('hide')){ 
                }
                else{
                $('.tooltip180').fadeIn();
                }
              } 
              else{ 
               
              }
            }
          });
        }

        if ($(window).width() < 767){
          $(window).scroll(function() {
            if ($(this).scrollTop()>100)
            {
              $('.tooltip180').hide();
            }
            else
            {            
              if($('#product_card .ditto_panel').hasClass('show')){  
                 if($('#product_card #ditto').hasClass('hide')){ 
                }
                else{
                $('.tooltip180').fadeIn();
                }
              } 
              else{ }
            }
          });

          $(".product_img_sec").click(function(){
            $('.tooltip180').hide();
          });

          $(".tooltip180 span").click(function(){
            $('.tooltip180').fadeOut();   
          }); 
        }

        $(document).ready(function(){   
          $("#ditto-thumbnail").click(function(){
            $('.tooltip180').fadeIn();
            $('.tooltip180').removeClass('hideimp');
          });  
        });
        //         Tooltip code end here   

        if($('.lSSlide').hasClass('nothide')){ 
          $('.re_try_ditto').addClass('hide');
          $('.fake_pagination.current').removeClass('hide');
        }
      },

      failure: function() {
        console.log("failure");
        $(".loadingtryonpage").hide();
      },

      error: function(status) {
        $(".loadingtryonpage").hide();
        console.log("error " + status);
        console.log(window.location.href.indexOf('/pages/compare-looks'));
        if(window.location.href.indexOf('/pages/compare-looks') > -1){
          //$('.compare-lk .re_try_ditto').click();
        }
      }
    });
  });
};


app.getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
app.setCookie = function(cname, cvalue, exdays,path) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=."+path;
};


$(document).ready(function(){
  console.log('Ditto js is now loading');
  $('.ditto_sharing_button').addClass('hide');
  // Bind a click event on Try on Button
  $(document).on('click','.try_ditto',function(){ 
    // Call tryOn Ditto Function
    if(window.location.href.indexOf('/products/') > -1){
      if($(this).hasClass('cmparelk-btn')){
        //$(this).find('.loading').fadeIn().css('display','inline-block');
      }
    }
    $('html,body').animate({scrollTop:0},300);
    var currentSkuId = jQuery(".swatch-element.active").attr("data-sku");
    if(app.getCookie('sgdittoId') != ''){

      var onloadurl = window.location.href;
      
      var onloadurl = window.location.href;
   var onlyhost = onloadurl.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
      if(onloadurl == onlyhost+'/pages/compare-looks'){
        app.displayTryOnFrontal('#creation',currentSkuId,app.getCookie('sgdittoId'));
      }
      else{
        app.displayTryOnView('#ditto',currentSkuId,app.getCookie('sgdittoId'));
      }
      
      
         var onloadurl = window.location.href;
         var onloadurl = window.location.href;
   		 var onlyhost = onloadurl.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
      
      if(onloadurl == onlyhost+'/pages/compare-looks'){
        $(".loadingtryonpage").show();
        app.displayTryOnFrontal('#creation',currentSkuId,app.getCookie('sgdittoId'));        
        console.log('I am on compare look page');
        
        //when ditto id exist
      $(".loadingtryonpage").show();
      $(".compare-lk").hide();
      $(".backtocollections").hide();
      }
      
      else{
        //$(".loadingtryonpage").show();
        $('.product_img_sec .loading_ls').css("display","flex");
        app.displayTryOnView('#ditto',currentSkuId,app.getCookie('sgdittoId'));
        $('.dittotextmob_topbox').html('Retry 3D Tryon');
        $('#dittotextmob_topbox').removeClass('tryonmob');
      $('#dittotextmob_topbox').addClass('retryonmob');
        console.log('I am on product page after tryon click');      
      }
            
    } 
    else{
      //app.createTryOnView('#creation',currentSkuId);
      //console.log('Creating New image');
      
      app.createTryOnView('#creation',currentSkuId);
      console.log('Creating New image');
      
      //when ditto id not exist
      $(".loadingtryonpage").show();
      $(".compare-lk").hide();
      $(".backtocollections").hide(); 
      
    }

    console.log('After try on Frontal');
    
    // Now bind the retryditto onclick
    jQuery('.re_try_ditto').unbind();

    jQuery('.re_try_ditto').click(function() {
//       $('html,body').animate({scrollTop:0},300);
//       $("#creation").removeClass('hide');
//       console.log("re_try_ditto button clicked");
//       app.createTryOnView('#creation',currentSkuId);
      
      $(".loadingtryonpage").show();
      $('.tooltip180').fadeOut();
      $('.tooltip180').addClass('hide');
      $('html,body').animate({scrollTop:0},300);
      $("#creation").removeClass('hide');
      console.log("re_try_ditto button clicked");
      app.createTryOnView('#creation',currentSkuId);
      
      
    });

    $(".ditto_panel").addClass('show');
  });

//START:script for hide/show images based on collection try3d button on/off
  simply.try3d = simply.getCookie('try3d');
	if(cn(simply.try3d)){
    }
  else{
simply.ditto_id = simply.getCookie('sgdittoId');
  if(window.location.href.indexOf('/products/') > -1){
    simply.ditto_id = simply.getCookie('sgdittoId');
    if(!cn(simply.ditto_id)){
      console.log('I am on product page');
//       $('.lSSlide').addClass('screen-hide');
//       $('.loading_ls').fadeIn().css('display','flex');
//       $('.try_ditto').click(); 
      
      console.log('I am on product page onload');
      $('.lSSlide').addClass('screen-hide');      
      $('#contentttt').toggle();
      $('.switchimage').click();      
      $('.try_ditto').click(); 
      
    }
  }
}
  // END:script for hide/show images based on collection try3d button on/off

  $(window).scroll(function() {
    if($('.lSSlide').hasClass('nothide')){ 
      $('.ditto_panel').addClass('hide');
      $('#ditto').addClass('hide');
      $('.fake_pagination.current').removeClass('hide');
      $('.re_try_ditto').addClass('hide');
    }
  });

});


$(document).on("click",".first_img_thub",function(){
  //$(".swatch-element.active").click();
  //$('.first_img_thub').click();
  $('.tooltip180').fadeOut();
  $('.tooltip180').addClass('hideimp');
  $('.lSSlide').addClass('nothide');
  //$('.lSSlide').addClass('screen-hide'); 
  $('#ditto').addClass('hide');
  $('.fake_pagination.current').removeClass('hide'); 
  $('.re_try_ditto').addClass('hide');
});


var ts;
$(document).bind('touchstart', function(e) {
  ts = e.originalEvent.touches[0].clientY;
});

$(document).bind('touchmove', function(e) {
  var te = e.originalEvent.changedTouches[0].clientY;
  if (ts > te) {
    //console.log('down');
  } else {
    console.log('up');
    if($('#ditto').hasClass('hide')){ 
      $('.first_img_thub').click();
      //$('.fake_pagination.current').removeClass('hide');

    }
    else{ //$('.first_img_thub').click();
      if(!$('.lSSlide').hasClass('screen-hide')){ 
        //$('.first_img_thub').click();
      }
    }
  }
});