/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synczeb/account_amount/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
