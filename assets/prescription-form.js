simply.storedData;
simply.masterArray = [];
var jjsimply = {
  shopid:1,
  interface:"/apps/johnjacobseyewear/interfaces/interfaceOrder.php",
  actions:{
    getOrder:"getOrder"
  }
};

simply.checkoutSelect = function (form, name, min, max, def) {
  var label = $("<label>" + name + ":</label>");
  var select = $("<select class='form-control " + name + "' name='" + name + "' id='" + name + "'></select>");

  var option;
  option = $("<option value='none'>Select</option>");
  select.append(option);

  while (min <= max) {
    var option = $("<option value='" + min + "'>" + min + "</option>");
    select.append(option);
    min = min + def;
  }
  var div = '';
  if(name == "Left-SVPD" || name == "Right-SVPD"){
    div = $("<div class='col-sm-6' id='svpd_id_"+name+"' style='display:none'>"); 
  }
  else 
  {
    div = $("<div class='col-sm-6'>");
  }
  div.append(label);
  div.append(select);
  form.append(div);
};

simply.checkoutForm = function(obj){
  var form  = $(".checkout_form[data-form='"+obj.type+"']");
  $(".order_id",form).val(obj.order_id);
  $(".line_item",form).val(obj.line_item);
  $(".prescription_type",form).val(obj.prescription_type);



  var tags = obj.tag;
  var limitedpower = tags.search("limitedpower");

  var rimless = tags.search("Rimless"); 
  debugger;
  if (limitedpower != -1) {
    $(".right-power-spherical",form).addClass('hide');
    $(".left-power-spherical",form).addClass('hide');
    var normal_rp = $(".right-power-spherical.normal",form);
    var limit_rp = $(".right-power-spherical.limit",form);
    var left_normal_rp = $(".left-power-spherical.normal",form);
    var left_limit_rp = $(".left-power-spherical.limit",form);
    var name_rp = normal_rp.attr("name");
    var left_name_rp = left_normal_rp.attr("name");
    normal_rp.removeAttr('name');
    limit_rp.removeClass('hide');
    left_normal_rp.removeAttr('name');
    left_limit_rp.removeClass('hide');
    if(!cn(name_rp)){
      limit_rp.attr('name', name_rp);
    }
    if(!cn(left_name_rp)){
      left_limit_rp.attr('name', left_name_rp);
    }
  }

  if (rimless != -1) {
    $(".right-power-spherical",form).addClass('hide');
    var normal_rp = $(".right-power-spherical.normal",form);
    var rim_rp = $(".right-power-spherical.rimless",form);
    var name_rp = normal_rp.attr("name");
    normal_rp.removeAttr('name');
    rim_rp.removeClass('hide');
    if(!cn(name_rp)){
      rim_rp.attr('name', name_rp);
    }
    
    $(".left-power-spherical",form).addClass('hide');
    var left_normal_rp = $(".left-power-spherical.normal",form);
    var left_rim_rp = $(".left-power-spherical.rimless",form);
    var left_name_rp = left_normal_rp.attr("name");
    left_normal_rp.removeAttr('name');
    left_rim_rp.removeClass('hide');
    if(!cn(left_name_rp)){
      left_rim_rp.attr('name', left_name_rp);
    }
  }

  //   check data from database

  $.fancybox(form);
};


simply.prescriptionImage = function (obj){
  var action = "/apps/johnjacobseyewear/interfaces/interfacePrescription.php?shopid=1&action=uploadPrescriptionImage";
  var method = "post";
  var form = $("<form method='" + method + "'  action='" + action + "' class='form_vertical clearfix'>");
  var type = obj.type;
  var order_id = obj.order_id;
  order_id = $("<input type='hidden' name='order_id' value='" + order_id + "'>");
  var line_item = obj.line_item;
  line_item = $("<input type='hidden' name='line_item' value='" + line_item + "'>");
  var product_lens = $("<input type='hidden' name='product_lens' value='" + type + "'>");
  form.append(line_item).append(order_id).append(product_lens);
  var presciption_image = $("<div class='prescription_image_form form-group'>");
  var img_type_header = $("<h4 class='text-center'>" + type + "</h4><hr/>");
  var pres_image = $("<div class='col-sm-8'><br/><input type='file' class='form-control' id='img_pres' name='images' accept='image/*'></div>");
  var img_label = $("<h6>Please Upload Prescription Image</h6>");
  var submit_image = $("<div class='col-sm-4'><br/><button type='submit' class='btn btn-primary'>Upload</button></div>");
  form.append(img_label);
  form.append(pres_image);
  form.append(submit_image);
  presciption_image.append(img_type_header);    
  presciption_image.append(form);
  $.fancybox(presciption_image);
}


simply.applyPrescriptionData = function (prescriptionData, obj) {
  $.each(prescriptionData, function (index, item) {

    if (item.order_id == obj.order_id && item.line_item_id == obj.line_item){
      var form  = $(".checkout_form[data-form='"+obj.type+"']");
      $(".left-power-spherical",form).not(".hide").val(item.left_power_spherical);
      $(".right-power-spherical",form).not(".hide").val(item.right_power_spherical);
      $(".left-cylinder",form).val(item.left_cylinder);
      $(".right-cylinder",form).val(item.right_cylinder);
      $(".left-axis",form).val(item.left_axis);
      $(".right-axis",form).val(item.right_axis);
      $(".left-pupillary-distance",form).val(item.left_PD);
      $(".right-pupillary-distance",form).val(item.right_PD);
      $(".left-additional-power",form).val(item.left_ap);
      $(".right-additional-power",form).val(item.right_ap);
      $(".lens-width",form).val(item.top_distance);
      $(".lens-height",form).val(item.edge_distance);
      $(".effective-diameter",form).val(item.effective_dia);
      $(".fitting-height",form).val(item.bottom_distance);
      $(".lenses-distance",form).val(item.near_pd);
      if (item.right_SVPD != null && item.left_SVPD != null) {
        $(".right-svpd",form).val(item.right_SVPD);
        $(".left-svpd",form).val(item.left_SVPD);
        $(".svpd_id_left-svpd",form).removeAttr("style");
        $(".svpd_id_right-svpd",form).removeAttr("style");
        $(".add_svpd",form).hide();
      }
    }
  });
};
simply.customerDetails = function(data){
  var div  = $("#prescription_form .customer_detail");
  var name = data.customer.first_name + " " + data.customer.last_name;
  name = $("<p class='name'>"+name+"</p>");
  var email = data.email;
  email = $("<p class='email'>"+email+"</p>");
  var address1 = data.billing_address.address1;
  var address2 = data.billing_address.address2;
  var address3 = data.billing_address.zip + " " + data.billing_address.city + " " + data.billing_address.province_code;
  var address4 = data.billing_address.country;
  var address = $("<p class='address'>"+address1+"<br/>"+address2+"<br/>"+address3+"<br/>"+address4+"</p>");
  div.append(name);
  div.append(email);
  div.append(address);

};
simply.checkoutCallback = function(dataObject) {
  var data = dataObject;
  var object = {};
  var masterArray = [];
  if(!cn(dataObject.prescription_data)){
    simply.storedData = dataObject.prescription_data;
  }
  if (data.status == "0") {
    var alldata = $.parseJSON(data.order_data);
    $.each(alldata.line_items,function(index,item){
      var lineObj = {};
      $.each(item.properties,function(n,i){
        if (i.name == 'Prescription-form') {
          var tag_check = "Prescription-form_"+item.id
          if (alldata.tags.indexOf(tag_check) != -1) {
            lineObj.get_form_check = "Yes";
          } else {
            lineObj.get_form_check = i.value;
          }
        }
        if(i.name == 'Type'){
          lineObj.product_type = i.value;
        }
        if(item.title == "Sunglass Lens"){
          lineObj.product_type = "Lens";
        }
        if(i.name == "Bundle"){
          lineObj.bundle = i.value;
        }
      });
      if(lineObj.product_type != 'Lens'){
        lineObj.item = item;
        if(lineObj.get_form_check == 'Yes' || lineObj.bundle == '0'){
          $.each(alldata.line_items,function(index,childitem){
            var get_form_check = false;
            var bundle = "";
            var product_type = "";
            $.each(childitem.properties,function(n,i){
              if(i.name == 'Type'){
                product_type = i.value;
              }
              if(i.name == "Bundle"){
                bundle = i.value;
              }
            });
            if(childitem.title == "Sunglass Lens"){
              product_type = "Lens";
            }
            if(product_type == 'Lens'){
              if(bundle == lineObj.bundle ){
                lineObj.childitem = childitem;
              }
            }
          });
        }
        masterArray.push(lineObj);
        simply.masterArray.push(lineObj);
      }
    });
    simply.customerDetails(alldata);
    simply.createPrescritpionTable(masterArray,alldata);
  }

};


simply.createPrescritpionTable = function (arrays, data) {
  var checkout = $("#checkout_form");
  var tbody = $("#checkout_form table tbody");
  if (arrays.length > 0) {
    var array = arrays.pop();
    var name = array;
    var product_id = '';
    var tr = $("<tr>");
    var order_no = $("<td>" + data.order_number + "</td>");
    var product = $("<td>" + name.item.title + "</td>");
    var lens;
    var updatePres;
    var updateImag = '';
    var action;
    var product_tag = '';
    product_id = name.item.product_id;
    $.get("/apps/johnjacobseyewear/interfaces/interfaceProduct.php?shopid=1&action=getProductTag&product_id=" + product_id, function (tagData) {
      var tagData = $.parseJSON(tagData);
      var prescription_type;
      var product_prop = name.item.properties;
      for(var i=0;i<product_prop.length;i++){
        if(product_prop[i].name == 'prescription_type'){
          prescription_type = product_prop[i].value;
          break;
        }
      }
      if (tagData.status == "0") {
        product_tag = tagData.tag;

        if(cn(name.childitem)){
          if(name.get_form_check == 'Yes'){
            lens = $("<td class='text-center'> - </td>");
            updatePres = '<a class="form_edit btn" data-prescription-type="'+prescription_type+'" data-line-item="' + name.childitem.id + '" data-tag="' + product_tag + '" data-order="' + data.id + '"  data-form="Sun-glass">Update Prescription</a>';
            updateImag = '<a class="image_upload btn" data-prescription-type="'+prescription_type+'" data-line-item="' + name.childitem.id + '" data-order="' + data.id + '"  data-form="Sun-glass">Upload Image</a>'; 
            file_cond = '<small>(* Accepted File - Image / PDF)</small>';
            action = $('<td>'+updatePres+'<br><br>'+updateImag+'<br><br>'+file_cond+'</td>');

          }
          else{
            lens = $("<td class='text-center'> - </td>");
            action = $("<td class='text-center'> - </td>");
          }
        }
        else{
          if(name.get_form_check == 'Yes' || name.bundle == '0'){
            lens = $("<td>"+name.childitem.name+"</td>");
            updatePres = '<a class="form_edit btn" data-prescription-type="'+prescription_type+'" data-line-item="' + name.childitem.id + '" data-tag="' + product_tag + '" data-order="' + data.id + '"  data-form="' + name.childitem.name + '">Update Prescription</a>';
            updateImag = '<a class="image_upload btn" data-prescription-type="'+prescription_type+'" data-line-item="' + name.childitem.id + '" data-order="' + data.id + '"  data-form="' + name.childitem.name + '">Upload Image</a>';
            file_cond = '<small>(* Accepted File - Image / PDF)</small>';
            action = $('<td>'+updatePres+'<br><br>'+updateImag+'<br><br>'+file_cond+'</td>');
          }
          else{
            lens = $("<td class='text-center'> - </td>");
            action = $("<td class='text-center'> - </td>");
          }
        }

      } else if (data.status == "1") {

      }

      tr.append(order_no);
      tr.append(product);
      tr.append(lens);
      tr.append(action);
      tbody.append(tr);
      simply.createPrescritpionTable(arrays, data);
    });

  } else {
    $.fancybox.hideLoading();
    checkout.fadeIn();
  }
};



simply.getURLParameter =function(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
                             .exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
};
simply.checkoutScript = function(){
  $.fancybox.showLoading();
  action = jjsimply.actions.getOrder;
  shopid =  jjsimply.shopid;
  order_num = simply.getURLParameter('id');
  email =simply.getURLParameter('email') ;
  vsm_order_id =simply.getURLParameter('vsm_order_id') ;
  url = jjsimply.interface +'?action=' + action + '&shopid=' + shopid + '&vsm_order_id=' + vsm_order_id + '&order_num=' + order_num + '&email=' + email;
  $.ajax({
    url: url,
    dataType: "jsonp",
    jsonpCallback: "simply.checkoutCallback"
  });

};



$(document).ready(function(){
  if($("#prescription_form").length > 0){
    simply.checkoutScript();
    $(document).on("click","#checkout_form .form_edit",function(){
      var order_id = $(this).attr("data-order");
      var target = $(this).attr("data-form");
      var line_item_id = $(this).attr("data-line-item");
      var tags = $(this).attr("data-tag");
      var obj ={};
      obj.type = target;
      obj.order_id = order_id;
      obj.line_item = line_item_id;
      obj.tag = tags;
      obj.prescription_type = $(this).attr("data-prescription-type");
      simply.checkoutForm(obj);

      simply.applyPrescriptionData(simply.storedData, obj);
    });

    $(document).on("submit",".checkout_form form",function(e){
      e.preventDefault();
      var goForm = true;
      $("select",this).not('.left-svpd').not('.right-svpd').not(".hide").each(function(){
        var value =$(this).val();
        if(value == "none"){
          goForm = false;
          var span = $("<span class='error'>Please fill this field</span>");
          $(this).prev(".error").remove();
          span.insertBefore($(this));
        }
        else{
          $(this).prev(".error").remove();
        }
      });
      if(goForm){
        $("button[type='submit']",$(this)).text("Please wait");
        var data = $(this).serialize();
        var url = $(this).attr("action");
        var params = {
          type: 'POST',
          url: url,
          data:data,
          dataType: 'json',
          success: function(line_item) {
            if(line_item.status == 0){
              var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h4>The form has been submitted successfully. Thank you.</h4></div>");

              $("#checkout_form table tbody").html("");
              $(".customer_detail").html("");
              simply.checkoutScript();
              $.fancybox(h4);
            }
          },
          error: function(XMLHttpRequest, textStatus) {
            var error=  JSON.parse((XMLHttpRequest.responseText)).description;
            var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h4>"+error+"</h4></div>");
            $.fancybox(h4);
          }
        };
        jQuery.ajax(params);
      }
    });


    $(document).on("click", "#checkout_form .image_upload", function () {
      var target = $(this).attr("data-form");
      var order_id = $(this).attr("data-order");
      var line_item_id = $(this).attr("data-line-item");
      var obj = {};
      obj.type = target;
      obj.order_id = order_id;
      obj.line_item = line_item_id;
      simply.prescriptionImage(obj);
    });

    $(document).on("submit", ".prescription_image_form form", function (e) {
      e.preventDefault();
      var pls_wait = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h5>Please wait, while we upload the image</h5></div>");
      $.fancybox(pls_wait);
      var url = $(this).attr("action");
      var params = {
        type: 'POST',
        url: url,
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
          var data = $.parseJSON(data);
          if (data.status == "0") {
            var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h5>Image Uploaded Successfully. Thank you.</h5></div>");
            $.fancybox(h4);
          }
          if(data.status == "1"){
            var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h4>Please Choose Only Image file</h4></div>");
            $.fancybox(h4);
          }

          if(data.status == "3"){
            var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h4>Please Choose Image For Upload</h4></div>");
            $.fancybox(h4);
          }
        },
        error: function (XMLHttpRequest, textStatus) {
          var error=  JSON.parse((XMLHttpRequest.responseText)).description;
          var h4 = $("<div class='text-center' style='max-width:600px;padding-top:30px'><h4>"+Error+"</h4></div>");
          $.fancybox(h4);
        }
      };
      jQuery.ajax(params);
    });


    $(document).on("click", ".checkout_form .add_svpd", function () {
      var parent = $(this).closest('.checkout_form');
      $(".svpd_id_Left-SVPD",parent).show();
      $(".svpd_id_Right-SVPD",parent).show();
      $(".add_svpd",parent).hide();
    });


  }
});