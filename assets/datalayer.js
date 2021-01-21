var dataLayerData = {},
    utmSource = simply.getCookie('__utmz'),
    utmSourceValue = null,
    utmCamValue = null,
    utmMediumValue = null,
    userLogin = true;
if (utmSource) {
    var utmSourceStr = utmSource.split('|');
    utmSourceValue = utmSourceStr[0].split('=')[1];
    utmCamValue = utmSourceStr[1].split('=')[1];
    utmMediumValue = utmSourceStr[2].split('=')[1];
    utmTermValue = typeof utmSourceStr[3] != 'undefined' && utmSourceStr[3].split('=')[1];
}
if (localStorage.getItem("customerInfo") == 'login') {
    userLogin = false;
}
if ((document.URL == window.location.origin + '/account' || window.location.origin + '/account/') && userLogin && typeof jjb != "undefined" && jjb.email) {
    dataLayerData.event = 'Login',
        dataLayerData.login = typeof jjb != "undefined" && jjb.email && 'login';
}
if (typeof jjb != "undefined" && jjb.email) {
    localStorage.setItem("customerInfo", "login");
}
dataLayerData.PageUrl = window.location.href,
    dataLayerData.visitorStore = window.location.host,
    dataLayerData.utm_source = utmSourceValue,
    dataLayerData.utm_medium = utmMediumValue,
    dataLayerData.utm_content = utmCamValue,
    dataLayerData.utm_term = typeof utmTermValue != 'undefined' && utmTermValue,
    dataLayerData.name = typeof jjb != "undefined" && jjb.first_name + ' ' + jjb.last_name,
    dataLayerData.email = typeof jjb != "undefined" && jjb.email && jjb.email,
    dataLayerData.date = new Date(),
    dataLayerData.phone = typeof jjb != "undefined" && jjb.phoneNumbers && jjb.phoneNumbers;
dataLayer.push(dataLayerData);
if (window.location.href.indexOf("thank_you") > -1) {
    if (typeof Shopify.checkout != "undefined") {
        var orderSku = [],
            productItemLength = [],
            productItemType = [],
            productItemPrice = [],
            productItem = Shopify.checkout.line_items;
        for (var i = 0; i < productItem.length; i++) {
            if (productItem[i].properties.Type !== "Lens") {
                orderSku.push(productItem[i].sku);
                productItemLength.push(productItem[i].quantity);
                productItemType.push(productItem[i].properties.Type);
                productItemPrice.push(productItem[i].price);
            }
        }
        dataLayerData = {
            'transactionId': Shopify.checkout.order_id,
            'transactionPrice': productItemPrice,
            'transactionType':  productItemType,
            'transactionCurrency': Shopify.checkout.currency,
            'transactionTotal': Shopify.checkout.payment_due,
            'transactionProducts': orderSku,
            'visitorProductQty': productItemLength,
            'visitorPageType': 'SuccessPage',
            'visitormobile': Shopify.checkout.billing_address.phone,
            'visitoremail': Shopify.checkout.email,
            'utmSource': typeof utmSourceValue != 'undefined' && utmSourceValue
        };
        dataLayer.push(dataLayerData);
    }
}