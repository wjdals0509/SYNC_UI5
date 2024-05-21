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
            onFilterSearch: function (oEvent) {
                var oSmartFilterBar = this.byId("smartFilterBar"),
                    oTable = this.byId("idSakTable"),
                    oBinding = oTable.getBinding("items"),
                    aFilters = oSmartFilterBar.getFilters();
    
                oBinding.filter(aFilters, "Application");
            },
            onSearch: function (oEvent) {
                var aFilter = [],
                    sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    var oFilter = new Filter("Schlw", FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }
                this.oView.byId("idSakTable").getBinding("items").filter(aFilter, "Application");

                // if (sQuery && sQuery.length > 0) {
                //     var aQueries = sQuery.split(" "); // 스페이스로 구분된 여러 조건
                //     aQueries.forEach(function(query) {
                //         aFilter.push(new Filter("Schlw", FilterOperator.Contains, query));
                //         aFilter.push(new Filter("Saknr", FilterOperator.Contains, query));
                //     });
                // }

                // this.oView.byId("idSakTable").getBinding("items").filter(new Filter({
                //     filters: aFilter,
                //     and: false
                // }), "Application");
            },

            // onSort: function ( oEvent ) {
            //     // sort 정보를 역으로바꾸기 위해 !를 사용
            //     // 내림차순 -> 오름차순으로 바꾸고
            //     // 오름차순 -> 내림차순으로 바꾸기 위해 true <=> false로 전환
            //     this._bDescendingSort = !this._bDescendingSort;
            //     var oBinding = this.oView.byId("idSakTable").getBinding("items"),
            //         oSorter = new Sorter("Saknr", this._bDescendingSort);
    
            //     oBinding.sort(oSorter);
            // },

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
