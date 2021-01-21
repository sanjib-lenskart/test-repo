//zoom -image
!function(a){var b={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};a.zoom=function(b,c,d,e){var f,g,h,i,j,k,l,m=a(b),n=m.css("position"),o=a(c);return m.css("position",/(absolute|fixed)/.test(n)?n:"relative"),m.css("overflow","hidden"),d.style.width=d.style.height="",a(d).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:d.width*e,height:d.height*e,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(b),{init:function(){g=m.outerWidth(),f=m.outerHeight(),c===m[0]?(i=g,h=f):(i=o.outerWidth(),h=o.outerHeight()),j=(d.width-g)/i,k=(d.height-f)/h,l=o.offset()},move:function(a){var b=a.pageX-l.left,c=a.pageY-l.top;c=Math.max(Math.min(c,h),0),b=Math.max(Math.min(b,i),0),d.style.left=b*-j+"px",d.style.top=c*-k+"px"}}},a.fn.zoom=function(c){return this.each(function(){var n,d=a.extend({},b,c||{}),e=d.target||this,f=this,g=a(f),h=a(e),i=document.createElement("img"),j=a(i),k="mousemove.zoom",l=!1,m=!1;(d.url||(n=g.find("img"),n[0]&&(d.url=n.data("src")||n.attr("src")),d.url))&&(!function(){var a=h.css("position"),b=h.css("overflow");g.one("zoom.destroy",function(){g.off(".zoom"),h.css("position",a),h.css("overflow",b),j.remove()})}(),i.onload=function(){function c(c){b.init(),b.move(c),j.stop().fadeTo(a.support.opacity?d.duration:0,1,!!a.isFunction(d.onZoomIn)&&d.onZoomIn.call(i))}function h(){j.stop().fadeTo(d.duration,0,!!a.isFunction(d.onZoomOut)&&d.onZoomOut.call(i))}var b=a.zoom(e,f,i,d.magnify);"grab"===d.on?g.on("mousedown.zoom",function(d){1===d.which&&(a(document).one("mouseup.zoom",function(){h(),a(document).off(k,b.move)}),c(d),a(document).on(k,b.move),d.preventDefault())}):"click"===d.on?g.on("click.zoom",function(d){return l?void 0:(l=!0,c(d),a(document).on(k,b.move),a(document).one("click.zoom",function(){h(),l=!1,a(document).off(k,b.move)}),!1)}):"toggle"===d.on?g.on("click.zoom",function(a){l?h():c(a),l=!l}):"mouseover"===d.on&&(b.init(),g.on("mouseenter.zoom",c).on("mouseleave.zoom",h).on(k,b.move)),d.touch&&g.on("touchstart.zoom",function(a){a.preventDefault(),m?(m=!1,h()):(m=!0,c(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(a){a.preventDefault(),b.move(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])}),a.isFunction(d.callback)&&d.callback.call(i)},i.src=d.url)})},a.fn.zoom.defaults=b}(window.jQuery);
$(document).ready(function(){   
var men_degree_img;
  var women_degree_img;

  var current_variant_sku = $('.current_variant_sku').text();
  var coll = $("#product_page").attr("data-collection");
  
  if (current_variant_sku != ''){
    $.ajax({      
      url: 'https://singapore.lenskart.com/new_prj_2/product_replica_api_to_shopify.php?item_sku='+current_variant_sku,
      context: 'application/json'
    }).done(function(response1){
     
      
      if (response1 != '0 results'){
        var objq = $.parseJSON(response1);
        
        //$('.fsize .two').text(objq[0].size);
          $('.fmaterial .two').text(objq[0].material);
          $('.fshape .two').text(objq[0].shape);
          $('.ftype .two').text(objq[0].frame_type);
          //$('.fweight .two').text(objq[0].weight);
          $('.fheight .two').text(objq[0].height);
          //$('.fsz .two').text(objq[0].frame_size);
          //$('.measurementsize .bridge_size').text(objq[0].bridge_size+' mm');
          //$('.measurementsize .eye_size').text(objq[0].eye_size+' mm');
          //$('.measurementsize .temple_size').text(objq[0].temple_size+' mm');

          var men_degree_img1 = objq[0].men180;
          var women_degree_img1 = objq[0].women180;
          simply.men_ajax = men_degree_img1;
          simply.women_ajax = women_degree_img1;
        
        if (coll != 'Eyeglasses For Kids'){
          //       180 images image
          var men_degree_img1 = simply.men_ajax
          var women_degree_img1 = simply.women_ajax

          //if (men_degree_img1 != 'NA' || men_degree_img1 != 'NULL' || women_degree_img1 != 'NA' || women_degree_img1 != 'NULL') {

          if (men_degree_img1 != 'NA' && men_degree_img1 != 'NULL') {
            $('.rotate_180_swipe').removeClass('hide');
            $('.product-tab-images').removeClass('hide');
            men_degree_img = men_degree_img1;
            $(".degree_btn.women").append('<span style="background-image:url('+women_degree_img1+')"></span');
          } else {
            $(".degree_btn.men").hide();          
          }

          if (women_degree_img1 != 'NA' && women_degree_img1 != 'NULL') {
            $('.rotate_180_swipe').removeClass('hide');
            $('.product-tab-images').removeClass('hide');
            women_degree_img = women_degree_img1;
            $(".degree_btn.men").append('<span style="background-image:url('+men_degree_img1+')"></span');
          } else {
            $(".degree_btn.women").hide();          
          }

          $(window).on('load', function() {
            var onloadurl = window.location.href;   
            if (window.location.href.indexOf("women") > -1) { 
              if(women_degree_img1 != 'NA'){
                $(".degree_btn_wrapper .women").click();
              }
            }
            else if(men_degree_img1 == 'NA'){
              $(".degree_btn_wrapper .women").click();
            }
          });

          if (women_degree_img1 == 'NA' || men_degree_img1 == 'NA' || women_degree_img1 == 'NULL' || men_degree_img1 == 'NULL') {
            $(".degree_btn.women").hide();
            $(".degree_btn.men").hide();
            console.log('any one null');          
          }

          if (men_degree_img != 'NA') {
            $(".degree_section").fadeIn();
            if ($("#product_card .rotate_img").length > 0) {
              simply.imageRotate(men_degree_img);
            } else {
              simply.normalRotate(men_degree_img);
            }
          } else {
            if (women_degree_img != 'NA') {
              $(".degree_section").fadeIn();
              if ($("#product_card .rotate_img").length > 0) {
                simply.imageRotate(women_degree_img);
              } else {
                simply.normalRotate(women_degree_img);
              }
            }
          }

          $('.menimgurl').text(men_degree_img1)
          $('.womenimgurl').text(women_degree_img1)
        }//kids collection eyeglass if
        // }
        //180 images images end
      }//when 0 row found
      else{
        $('#product_card .measurement').hide();
        $('#product_card .measurement_shopify').removeClass('hide');
      }

    }).fail(function(response){
      $('#product_card .measurement').hide();
      $('#product_card .measurement_shopify').removeClass('hide');
      //console.log("Fail 2: "+ response);
    });

    //fill_product_data_localdb END
  }
    
    //   180 men women swtich
  $("#product_page .degree_btn_wrapper .degree_btn").click(function() {
    var type = $(this).attr("data-target");
    $("#product_page .degree_btn_wrapper .degree_btn").removeClass("active");
    $(this).addClass("active");
    var men_degree_img;
    var women_degree_img;
    if (type == "men") {
      simply.currentDegreeImage = "men";
      if (!cn(simply.men_ajax)) {
        men_degree_img = simply.men_ajax;
      } else {
        men_degree_img = simply.men_ajax;
      }
      if (!cn(men_degree_img)) {
        $(".degree_section").fadeIn();
        if ($("#product_card .rotate_img").length > 0) {
          simply.imageRotate(men_degree_img);
        } else {
          simply.normalRotate(men_degree_img);
        }
      }
    } else {
      simply.currentDegreeImage = "women";
      if (!cn(simply.women_ajax)) {
        women_degree_img = simply.women_ajax;
      } else {
        women_degree_img = simply.women_ajax;
      }
      if (!cn(women_degree_img)) {
        $(".degree_section").fadeIn();
        if ($("#product_card .rotate_img").length > 0) {
          simply.imageRotate(women_degree_img);
        } else {
          simply.normalRotate(women_degree_img);
        }
      }
    }
  });

  $(".lens_input1").click(function(){
      //var power = $(this).next('.head_label').text(); 
      var power = $(this).val();
      $("#powerfield").val(power);
    });
  
           //Our promise product page
     $(".promise-sectiopn .tooltip").click(function(){
       $(this).parents('.promise-sectiopn').find('.tooltiptext').css('display','block');
       $('.bgoverlay_promise').show();
     });
     $(".promise-sectiopn .closetooltip").click(function(){     
       $(this).parents('.promise-sectiopn').find('.tooltiptext').css('display','none');
       $('.bgoverlay_promise').hide();
     });
  
});//doc ready end

   var hostName = window.location.hostname; 
  if(getUA() == 'iPhone' && hostName == 'lenskart.us'){
    
    document.getElementById("whtus_pp").style.display = "none";
  document.getElementById("ios_msgus").style.display = "block";
  }