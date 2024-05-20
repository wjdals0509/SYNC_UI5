sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (controller) {
    "use strict";

    return controller.extend("sync.zeb.project2.controller.Detail", {

        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onSaknrMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onSaknrMatched, this);
		},

        _onSaknrMatched: function (oEvent) {
            this._bukrs = oEvent.getParameter("arguments").bukrs || this._bukrs || "";
            this._saknr = oEvent.getParameter("arguments").saknr || this._saknr || "";

            this.getView().bindElement("/SakSet(Bukrs='" + this._bukrs + "',Saknr='" + this._saknr + "')");
        },

        onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

        onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onSaknrMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onSaknrMatched, this);
		}
    });
});