// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Titanium.Network.registerForPushNotifications({
	types : [Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT],
	success : function(e) {
		var deviceToken = e.deviceToken;
		Ti.API.info("Push notification device token is: " + deviceToken);
		alert('device token is' + e.deviceToken);
		Ti.UI.Clipboard.setText(e.deviceToken);
		Ti.API.info("Push notification types: " + Titanium.Network.remoteNotificationTypes);
		Ti.API.info("Push notification enabled: " + Titanium.Network.remoteNotificationsEnabled);
	},
	error : function(e) {
		Ti.API.info("Error during registration: " + e.error);
	},
	callback : function(e) {
		// called when a push notification is received.
		//Titanium.Media.vibrate();
		var data = JSON.parse(e.data);
		var badge = data.badge;
		if (badge > 0) {
			Titanium.UI.iPhone.appBadge = badge;
		}
		var message = data.message;
		if (message != '') {
			var my_alert = Ti.UI.createAlertDialog({
				title : '',
				message : message
			});
			my_alert.show();
		}
	}
}); 