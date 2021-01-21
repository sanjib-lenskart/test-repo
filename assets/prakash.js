simply.goldMemebership = function(){
	$(".gold_member_add").click(function(event) {
		var form = $("<form action='/cart/add.js'>");
		var input = $("<input name='id' value='"+$(this).attr("data-vid")+"'>");
		form.append(input);
		simply.ajaxFormShopify(form,function(){
			window.location.href = '/cart';
		});
	});
};
$(document).ready(function() {
	simply.goldMemebership();
});