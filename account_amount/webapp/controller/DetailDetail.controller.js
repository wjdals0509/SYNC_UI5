sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (controller, Filter, FilterOperator) {
    "use strict";

	return controller.extend("sync.zeb.accountamount.controller.DetailDetail", {
        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter = this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSaknrMatched, this);
		},

        _onSaknrMatched: function (oEvent) {
            this._saknr = oEvent.getParameter("arguments").saknr || this._saknr || "";
            this._shkzg = oEvent.getParameter("arguments").shkzg || this._shkzg || "";

            let aFilters = [];
            if (this._saknr) {
                aFilters.push(new Filter("Saknr", FilterOperator.EQ, this._saknr));
            }
            if (this._shkzg) {
                aFilters.push(new Filter("Shkzg", FilterOperator.EQ, this._shkzg));
            }

            let oTable = this.getView().byId("idBsegTable");
            let oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },

        onSearch: function ( oEvent ) {
            var aFilter = [],
                sQuery = oEvent.getParameter("query");
            
            if (!sQuery) {
                sQuery = oEvent.getSource().getValue();
            }
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("Bktxt", FilterOperator.Contains, sQuery);
                aFilter.push(oFilter);
            }

            this.oView.byId("idBsegTable").getBinding("items").filter(aFilter, "Application");
        },

        onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onSaknrMatched, this);
		}
    });
});