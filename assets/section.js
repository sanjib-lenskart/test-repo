
simply.refundFormSection = function(){
 if(!simply.getURLParameter){
  simply.getURLParameter =function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
     .exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  };
}

initializeForm();
function initializeForm(){
  order_num = simply.getURLParameter('id');
  order_email =simply.getURLParameter('email') ;
  order_name = simply.getURLParameter('name')
  if( order_num && order_num != "" 
   && order_name && order_name != ""
   && order_email && order_email != "" ){
    $('#order_number').val(order_num);
  $('#order_email').val(order_email);
  $('#order_name').val(order_name);
  $('span.order_name').html(order_name);
  $('span.order_email').html(order_email);
}
else{
  location.href = '/';
}
}
};
// Footer
simply.footerSection = function(){
 $("footer.main_footer .nav p.title").click(function(event) {
  var b= $(window).width(); 
  if (b < 992){
    $(this).next().stop().slideToggle();
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  }
});
};


//home-video
simply.homeVideoSection = function(){
  $("#home_video .fancybox")
  .attr('rel', 'gallery')
  .fancybox({
    padding     : 0,
        margin      : [20, 60, 20, 60] // Increase left/right margin 
      });

};

//home-products-slider
simply.homeProductSlider = function(){
 var home_page_slider =  $("#home_products_slider .lightSlider").lightSlider({
  item: 3,
  enableDrag:false,
  loop:true,
  auto:true,
  pause:7000,
  pager:false,
  onSliderLoad: function() {
    simply.imgBlur();
  }
});

};
//home Collection
simply.homeCollectionSection = function(){
  $("#home_collections ul.list li").hover(function(){
    $(this).find(".name").stop().fadeIn().addClass("active");
  },
  function(){
    $(this).find(".name").stop().fadeOut().removeClass("active");
  });
};
//testimonials-image
simply.testimonialsImageSection = function(){
//home page slider
var home_testimonials_images =  $("#home_testimonials_text .lightSlider").lightSlider({
  item: 1,
  enableDrag:false,
  loop:true,
  auto:true,
  pause:7000,
  pager:false,
  mode:'fade',
  onSliderLoad: function() {
    simply.imgBlur();
  }
});
};
//testimonials-text
simply.testimonialsSection = function(){
//home page slider
var home_testimonials_images =  $("#home_testimonials_text .lightSlider").lightSlider({
  item: 1,
  enableDrag:false,
  loop:true,
  auto:true,
  pause:7000,
  pager:false,
  mode:'fade',
  onSliderLoad: function() {
    simply.imgBlur();
  }
});
};
// product-template
simply.productTemplateEvent = function(){ //product-template
  //call form 
  $("#product_page .m_info .know_more").click(function(event) {
    $(this).hide();
    $(this).next().fadeIn();
  });
  $("#product_page .m_info .close").click(function(event) {
    $(".m_info").remove();
//       parent.hide();
});
  $(document).on('mouseover', '#product_page .lSSlideWrapper.usingCss', function(event) {
    event.preventDefault();
    var h =$(this).height();
    var target = $(".m_info");
    target.height(h);
    target.fadeIn();
  });
  $(document).on('mouseleave', '#product_page .m_info', function(event) {
    event.preventDefault();
    $(this).hide();
  });
  if($(window).width() < 768){
    $(".product_details").prepend($(".product_form .swatches"));
// $(".wishlist").insertAfter($("#AddToCart"));
}
simply.skuCallBack = function(data){
//     console.log(data);
}
simply.ajaxForm($("#product_page .sku_form"),simply.skuCallBack);
currentSkuId = jQuery(".swatch-element.active").attr("data-sku");

};
// home-collections
simply.sectionHoverEvent = function(){//hover
  $("#home_collections ul.list li").hover(function(){
    $(this).find(".name").stop().fadeIn().addClass("active");
  },
  function(){
    $(this).find(".name").stop().fadeOut().removeClass("active");
  });
}

simply.sectionClickEvent = function(){//click
  $("#home_products .more").click(function(){
    var count = 0;
    var on_work = false;
    simply.MoreItem(count,on_work);
  });
  $("#gift_card .video_img").click(function(){
    $(this).find("img").hide();
    $(this).find(".video_wrapper").show();
    var src = $(this).attr("data-video");
    $(this).find(".video_wrapper iframe").attr("src",src);
  });
  $("#our_story .video_link").click(function(){
    $(this).hide();
    var link = $(this).attr("data-src");
    $(".header_img").hide();
    $(".video_wrapper iframe").attr("src",link);
    $(".video_wrapper").fadeIn();
  });



};
simply.moreProductsCount = function(){
  var count_c = $("#home_products ul").children().length;
  $("#home_products").attr("data-count",count_c);
};
simply.MoreItem = function(count,on_work){
  if(! on_work){
    on_work = true;
    $("#more").html("Loading...");
    var nexturl = $("#more").attr('data-next');
    $.get(nexturl, function(data){
      var collection_item  = $(data).find('#home_products ul.list li');
      $('#home_products ul.list').append(collection_item);
      simply.moreProductsCount();
      var loadmore = $(data).find('#more');
      if(loadmore.length == 0 ){
        $("#more").remove();
      }
      if(loadmore.length > 0 ){
        $('#more').attr('data-next',loadmore.attr('data-next'));
        $("#more").html("More +");
        if($(window).width() <768){
          $("#home_products ul.list li.col-xs-hide").show();
        }
      }
      on_work = false;
      count++;
    });
  }
};

simply.homeSliderSection = function(){
  simply.homeSliderInit = function(){
    var home_page_slider =  $(".home_slider .lightSlider").lightSlider({
      item: 1,
      enableDrag:false,
      loop:true,
      auto:true,
      pause:7000,
      onSliderLoad: function() {
        $('.home_slider .slide_text').fadeIn();
        simply.sliderCallback(".home_slider");
        home_page_slider.refresh();
      }
    });              
  };
  simply.homeSliderInit();
  $(".home_slider .fancybox")
  .attr('rel', 'gallery')
  .fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    nextEffect  : 'none',
    prevEffect  : 'none',
    padding     : 0,
    margin      : [20, 60, 20, 60],
    'type': 'iframe'
  });

  $(".home_slider .video_link").fancybox({
    maxWidth  : 1600,
    maxHeight : 1200,
    fitToView : true,
    width   : '90%',
    height    : '90%',
    autoSize  : true,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
  });

};

// page-events-1
simply.pageeventSliderSection = function(){
  simply.eventSlidersInit = function(){
    simply.eventSliders = [];
    $(".events_slider .lightSlider").each(function(index,item){
      var settings = {
        item: 3,
        loop:true,
        pager:false,
        enableDrag:false,
        slideMargin:0,
        onSliderLoad: function() {
          simply.sliderCallback(".events_slider");
        }
      };
      simply.eventSliders[index] =  $(item).lightSlider(settings);
    });
  };
  simply.eventSlidersInit();
  $(document).on('shopify:section:load',".event_page_sliders",function(){
    console.log("Event slider Section Load");
    simply.eventSlidersInit();
  });
  $(".events_slider .fancybox")
  .attr('rel', 'gallery')
  .fancybox({
    padding     : 0,
      margin      : [20, 60, 20, 60] // Increase left/right margin
    });
};

simply.homeInstaFeedSection = function(){

  simply.instaFeed = function(){
    $(".home_instagram").each(function(index,item){
      if($(".instafeed").length > 0){
        var target = $(item) ;
        var id = target.attr("data-id");
        var limit = target.attr("data-limit");
        var like =  cb(target.attr("data-like"));
        var tag = cb(target.attr("data-tag"));
        var width = target.attr("data-width");
        var gutter= cb(target.attr("data-gutter"));
        var gutterClass= "no_gutter";

        if(!cn(id)){
          $("ul",target).instagramLite({
            accessToken: id,
            urls: true,
            limit: limit,
            captions: tag,
            likes: like,
            success: function () { 
              $("li",target).addClass(width);
              if(gutter){
                $("li",target).addClass(gutterClass);
                $(".il-photo__likes",target).addClass(gutterClass);
              }

            },
            error: function() {
              console.log('There was an error with your request.');
            }
          });
        }
      }
    });
  };

  simply.instaFeed();
};
// article-fashion
simply.fashionArticleTextHeight = function(){
  var parent = '#article_fashion .products .product .text_wrapper';
  var child = '#article_fashion .products .product .text'
  if($(window).width() > 767){ 
    simply.miniHeight(parent,child);  
  }
  else{
    $(parent).css("height","auto");
  } 

  $(window).resize(function(event) {
    if ($(window).width() == simply.current_width) {
      return;
    }
    if($(window).width() > 767){
      simply.miniHeight(parent,child);  
    }
    else{
      $(parent).css("height","auto");
    } 
  });
};
simply.sectionInit = function(){
  if($("body.template-index").length > 0){
    simply.homeSliderSection();
    simply.homeInstaFeedSection();
  }
  simply.sectionClickEvent();
  simply.fashionArticleTextHeight();
  simply.sectionHoverEvent(); 
  simply.pageeventSliderSection();
  simply.productTemplateEvent();
  simply.testimonialsSection();
  simply.homeCollectionSection();
  simply.homeProductSlider();
  simply.homeVideoSection();
  simply.footerSection();
  if($("#refund_form").length > 0){ 
  simply.refundFormSection();
}
  simply.testimonialsImageSection();
};
$(document).ready(function(){
  simply.sectionInit();
});
$(window).load(function(){
  function instaHeight(){
    var h = 10000;
    $(".instafeed a").each(function(){
      if($(this).outerHeight() < h){
        h = $(this).outerHeight();
      }
    });
    $(".instafeed li").height(h);
  }
  setTimeout(function(){instaHeight(); }, 3000);
});



