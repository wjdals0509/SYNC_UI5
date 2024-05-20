sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, fioriLibrary) {
        "use strict";

        return Controller.extend("sync.zeb.project2.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
                // this._bDescendingSort = false;
                // this.oSakTable = this.oView.byId("idSakTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function (oEvent) {
                var aFilter = [],
                    sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    var oFilter = new Filter("Schlw", FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }

                this.oView.byId("idSakTable").getBinding("items").filter(aFilter, "Application");
            },

            onListItemPress: function ( oEvent ) {
                var oItem = oEvent.getSource(),
                oCtx = oItem.getBindingContext(),
                sBukrs = oCtx.getProperty("Bukrs"),
                sSaknr = oCtx.getProperty("Saknr");

                this.oRouter.navTo("detail", {
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    bukrs: sBukrs,
                    saknr: sSaknr
                });
                // var oItem = oEvent.getSource(),
                // oCtx = oItem.getBindingContext(),
                // sBukrs = oCtx.getProperty("Burks"),
                // sSaknr = oCtx.getProperty("Saknr");

                // var oFCL = this.oView.getParent().getParent();
                // oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
                
                // this.oRouter.navTo("detail", {
                //     layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                //     Bukrs: sBukrs,
                //     Saknr: sSaknr
                // });
            }
        });
    });
