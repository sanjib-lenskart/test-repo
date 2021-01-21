var app_coll = {};
app_coll.authtoken = 'lenskartinit';
app_coll.serverName = 'lenskart';
app_coll.appversion = '1.3';
app_coll.response = {};
var ajaxReq;
simply.alldittoimg = [];
simply.dittoElementArray = [];
app_coll.bunch = 6;
app_coll.dittoAccess = "";
app_coll.dittoSignature = "";
app_coll.init = function( callback ){
	app_coll.dittoAccess = "";
	app_coll.dittoSignature = "";
	var dittoId = simply.ditto_id = simply.getCookie('sgdittoId');  
	$.get("/tools/"+app_coll.authtoken+"/ditto-auth-credentials/?message=" + dittoId, function(response) {  
		app_coll.dittoAccess = response['X-Ditto-Access-Key-Id'];
		app_coll.dittoSignature =  response['X-Ditto-Signature'];
		callback();
	});  
}

app_coll.dittoProcessing = false;
app_coll.displayTryOnFrontal = function() { 
	if(simply.dittoElementArray.length > 0 && !cn(simply.try3d) ){ 
		app_coll.dittoProcessing = true;
		
		var i = 6 ;
		while (i > 0){
			if(simply.dittoElementArray.length == 0 ){
				break;
			}
			var dittoobj = simply.dittoElementArray.shift();
			var selector = dittoobj.selector;
			var sku = dittoobj.product_sku;
			var dittoId = dittoobj.ditto_id;
			var _this = this;			
			var	targetUrl ="https://vto."+_this.serverName+".api.ditto.com/api/"+_this.appversion+"/dittos/"+dittoId +
			"/frontal-frame/?product_id=" +
			sku +'&size=300x300';

			$.ajax({
				type: "GET",
				url: targetUrl,
                xhrFields: { responseType: 'blob' },
				headers: {
					"X-Ditto-Access-Key-Id": app_coll.dittoAccess,
					"X-Ditto-Signature": app_coll.dittoSignature
				},
				beforeSend  : function(jqXHR) {
		            jqXHR.selector = selector;
		            jqXHR.targetUrl = targetUrl;
		            // XHR.selfData = 'here is my self defined data';
		        },
				success: function(result,textStatus, jqXHR) {
					// debugger;
					
					if(jqXHR.status == 200){
						if(!cn(simply.try3d)){
                          var selector = jqXHR.selector;
                          selector.find('.coll_ditto .ditto_img')[0].src = URL.createObjectURL(result);
                          selector.closest('.item').removeClass('ditto_processing').addClass('ditto_success');
                          selector.find('.coll_ditto .ditto_img').fadeIn();
							// app_coll.displayTryOnFrontal();
						}
					}
					else{
						selector.closest('.item').removeClass('ditto_processing').removeClass('ditto_success');
					}
				},
				failure: function(jqXHR, textStatus, errorThrown) {
					var selector = jqXHR.selector;
					selector.closest('.item').removeClass('ditto_processing');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					var selector = jqXHR.selector;
					selector.closest('.item').removeClass('ditto_processing');
				}
			});
		}
	}
	else{
		app_coll.dittoProcessing = false;
		return;
	}
	app_coll.dittoProcessing = false;
}

simply.isTryOn = function() {
	simply.try3d = simply.getCookie('try3d');
	if(cn(simply.try3d)){
		$('.try3d_enable input#try3d_enable').prop('checked',false);
		$('.try3d_enable input#try3d_enable_mobile').prop('checked',false);
	} else {
		simply.ditto_id = simply.getCookie('sgdittoId');
		if(!cn(simply.ditto_id)){
			$('.try3d_enable input#try3d_enable').prop('checked',true);
			$('.try3d_enable input#try3d_enable_mobile').prop('checked',true);
		}

	}
}

simply.storeDittoImg = function(){
	if (typeof(Storage) !== "undefined") {
		sessionStorage.allDittoimg = JSON.stringify(simply.alldittoimg);
	  } else {
	  // Sorry! No Web Storage support..
	}
}

simply.getDittoFromSession = function(){
	simply.alldittoimg = JSON.parse(sessionStorage.allDittoimg);
	if((!cn(simply.alldittoimg)) && simply.alldittoimg.length > 0){
		for(var key in simply.alldittoimg){
			var sku = simply.alldittoimg[key].sku;
			var src = simply.alldittoimg[key].src;
			var item = '#collection_page .collection .list > li[data-sku='+sku+']';
			$(item).find('.coll_ditto .ditto_img').attr('src',src);
		}
	}	
}

simply.redirectToCreateDitto = function(){
	simply.ditto_id = simply.getCookie('sgdittoId');
	if(cn(simply.ditto_id)){
		window.location.href = '/pages/compare-looks'; 
	} else {
      	app_coll.init(function(){
			simply.showCollectionWithDittoCanvas(); 
		});
	}
}

simply.showCollectionWithDittoCanvas = function(itemcount){
	
	simply.ditto_id = simply.getCookie('sgdittoId');
	simply.try3d = simply.getCookie('try3d');
	if(cn(simply.ditto_id)){
      //window.location.href = 'https://international.lenskart.com/pages/compare-looks'
  } else {

  	if(!cn(simply.try3d)){

  		$('#collection_page .collection .item').not('.ditto_processing').not('.ditto_success').not('.ditto_failed').each(function(){
  			var docViewTop = $(window).scrollTop();
  			var docViewBottom = docViewTop + $(window).height();
  			var elemTop = $(this).offset().top;
  			var elemBottom = elemTop + $(this).height() - 700;
  			if(elemBottom <= docViewBottom){
  				var item = this;
  				var product_sku = $(item).data('sku');
  				$(item).addClass('ditto_processing');
  				$(item).find('.coll_ditto').fadeIn().css('display','flex');
  				$(item).find('.product_img').hide();
  				$(item).find('.alter_img').addClass('hide');
  				var ditto_src = $(item).find('.coll_ditto img.ditto_img').attr('src');
  				var obj = $(item);
  				if(ditto_src == ''){
  					var dittoObject = {};
  					dittoObject.selector = obj;
  					dittoObject.product_sku = product_sku;
  					dittoObject.ditto_id = simply.ditto_id;
  					simply.dittoElementArray.push(dittoObject);
  				} else {
  					
  					$(item).find('.coll_ditto img.ditto_img').fadeIn();
  				}
  			}
  		});
  		if(!app_coll.dittoProcessing){
  			app_coll.displayTryOnFrontal();	
  		}
  	} else {
  		$('#collection_page .collection .list > li').each(function(){
  			simply.dittoElementArray = [];
  			$(this).find('.coll_ditto,.ditto_img').hide();
  			$(this).find('.product_img').fadeIn();
  			$(this).find('.alter_img').removeClass('hide');
  		});
  	}
  }
}

$(document).ready(function(){
	simply.ditto_id = simply.getCookie('sgdittoId');
	simply.lastCollection = simply.getCookie('lastCollection');
	simply.try3d = simply.getCookie('try3d');
	app_coll.init(function(){
		simply.showCollectionWithDittoCanvas(); 
	})
	simply.isTryOn();  

	if(window.location.href.indexOf('/collections/') > -1){
		simply.lastCollection = $('#collection_page').data('collection');
		if(!cn(simply.lastCollection)){
			simply.setCookie('lastCollection',simply.lastCollection,1);
          simply.setCookie('lastCollectionpp','ppoff',1);
		}
	}

	$(window).scroll(function(){
		if(window.location.href.indexOf('/collections/') > -1){
			simply.try3d = simply.getCookie('try3d');
			if(!cn(simply.try3d)){
				var windowtop = parseInt($(window).scrollTop() + $(window).height());
				var itecount = app_coll.bunch;
				var item = '#collection_page .collection .list > li[data-product-count='+itecount+']';
				app_coll.bunch += app_coll.bunch;
              	app_coll.init(function(){
					simply.showCollectionWithDittoCanvas(itecount); 
				});
			}
		}
	});

	$(document).on('change','.try3d_enable input[type="checkbox"]',function(e){
		$('#collection_page .collection .list > li.item').removeClass('ditto_processing').removeClass('ditto_success');
		if($(this).is(':checked')){
			simply.setCookie('try3d',1,1);
		} else {
			simply.setCookie('try3d',0,-1);
		}
		simply.redirectToCreateDitto();
	});
});


$(document).ready(function(){
    $('.backtocollections').click(function(){
      var referrer = document.referrer;
      if(referrer == ''){
        window.location.href = '/collections/eyeglasses';
      }else{
        parent.history.back();
      }
    });
});