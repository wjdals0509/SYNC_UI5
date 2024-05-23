sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (controller) {
    "use strict";

    return controller.extend("sync.zeb.project2.controller.Detail", {

        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onSaknrMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onSaknrMatched, this);
			// this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSaknrMatched, this);
		},

        _onSaknrMatched: function (oEvent) {
            this._bukrs = oEvent.getParameter("arguments").bukrs || this._bukrs || "";
            this._saknr = oEvent.getParameter("arguments").saknr || this._saknr || "";

			// debugger;
            let sPath = "/SakSet(Bukrs='" + this._bukrs + "',Saknr='" + this._saknr + "')";
			this.getView().bindElement(sPath);
		
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

		// onToConnectionTableItemPress: function ( oEvent ) {
		// 	var oItem = oEvent.getSource();
        //     var oCtx = oItem.getBindingContext();
        //     var sBukrs = oCtx.getProperty("Bukrs");
        //     var sSaknr = oCtx.getProperty("Saknr");
        //     var sShkzg = oCtx.getProperty("Shkzg");

		// 	this.oRouter.navTo("detailDetail", { // 새로운 뷰로 네비게이션
		// 		layout: fioriLibrary.LayoutType.ThreeColumnsEndExpanded,
        //         bukrs: sBukrs,
        //         saknr: sSaknr,
		// 		   shkzg: sShkzg
        //     });
		// }
    });
});