// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// ], function (controller) {
//     "use strict";

// 	return controller.extend("sync.zeb.project2.controller.DetailDetail", {
//         onInit: function () {
// 			var oOwnerComponent = this.getOwnerComponent();

// 			this.oRouter = oOwnerComponent.getRouter();
// 			this.oModel = oOwnerComponent.getModel();

// 			// this.oRouter.getRoute("master").attachPatternMatched(this._onSaknrMatched, this);
// 			// this.oRouter.getRoute("detail").attachPatternMatched(this._onSaknrMatched, this);
// 			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSaknrMatched, this);
// 		},

//         _onSaknrMatched: function (oEvent) {
//             this._bukrs = oEvent.getParameter("arguments").bukrs || this._bukrs || "";
//             this._saknr = oEvent.getParameter("arguments").saknr || this._saknr || "";
//             this._shkzg = oEvent.getParameter("arguments").shkzg || this._shkzg || "";

//             this.getView().bindElement("/SakSet(Bukrs='" + this._bukrs + "',Saknr='" + this._saknr + "',Shkzg='" + this._shkzg + "')");
			
//         },

//         onExit: function () {
// 			// this.oRouter.getRoute("master").detachPatternMatched(this._onSaknrMatched, this);
// 			// this.oRouter.getRoute("detail").detachPatternMatched(this._onSaknrMatched, this);
// 			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onSaknrMatched, this);
// 		}
//     });
// });