var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Titanium.Network.registerForPushNotifications({
    types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT ],
    success: function(e) {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: " + deviceToken);
        alert("device token is" + e.deviceToken);
        Ti.UI.Clipboard.setText(e.deviceToken);
        Ti.API.info("Push notification types: " + Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: " + Titanium.Network.remoteNotificationsEnabled);
    },
    error: function(e) {
        Ti.API.info("Error during registration: " + e.error);
    },
    callback: function(e) {
        var data = JSON.parse(e.data);
        var badge = data.badge;
        badge > 0 && (Titanium.UI.iPhone.appBadge = badge);
        var message = data.message;
        if ("" != message) {
            var my_alert = Ti.UI.createAlertDialog({
                title: "",
                message: message
            });
            my_alert.show();
        }
    }
});

Alloy.createController("index");