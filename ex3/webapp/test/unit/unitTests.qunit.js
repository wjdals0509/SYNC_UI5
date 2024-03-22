/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"synce21/ex3/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
