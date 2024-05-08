sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sync.eb.fcl.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onCarrierMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onCarrierMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._carrid = oEvent.getParameter("arguments").carrid || this._carrid || "0";
			this.getView().bindElement({
				path: "/CarrierSet(" + this._carrid + ")"
			});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onCarrierMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onCarrierMatched, this);
		}
	});
});