sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
        "use strict";

        return Controller.extend("sync.eb.fcl.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
                this._bDescendingSort = false;
                this.oCarrierTable = this.oView.byId("idCarrierTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onSearch: function ( oEvent ) {
                var aFilter = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    // 항공사명으로 검색 가능하게
                    var oFilter = new Filter("Carrname", FilterOperator.Contains, sQuery);
                    aFilter.push(oFilter);
                }
    
                this.oCarrierTable.getBinding("items").filter(aFilter, "Application");
            },

            onSort: function ( oEvent ) {
                // sort 정보를 역으로바꾸기 위해 !를 사용
                // 내림차순 -> 오름차순으로 바꾸고
                // 오름차순 -> 내림차순으로 바꾸기 위해 true <=> false로 전환
                this._bDescendingSort = !this._bDescendingSort;
                var oBinding = this.oCarrierTable.getBinding("items"),
                    oSorter = new Sorter("Carrname", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },

            onListItemPress: function ( oEvent ) {
                // 항공사를 선택했을 때 실행되는 메소드
                var oContext = oEvent.getSource().getBindingContext(),
                vCarrid = oContext.getProperty("Carrid");

			this.oRouter.navTo("detail", 
                {
                    layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, 
                    carrid: vCarrid
                });
		}
        });
    });
