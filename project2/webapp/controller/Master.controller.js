sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/f/library',
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, fioriLibrary, Fragment) {
        "use strict";

        return Controller.extend("sync.zeb.project2.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
                // this._bDescendingSort = false;
                // this.oSakTable = this.oView.byId("idSakTable");
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            // onSearch: function (oEvent) {
            //     var aFilter = [],
            //         sQuery = oEvent.getParameter("query");

            //     if (sQuery && sQuery.length > 0) {
            //         var oFilter = new Filter("Schlw", FilterOperator.Contains, sQuery);
            //         aFilter.push(oFilter);
            //     }
            //     this.oView.byId("idSakTable").getBinding("items").filter(aFilter, "Application");
            // },

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
            },

            handleValueHelp: function() {
                // debugger;
                if (!this._oValueHelpDialog) {
                    Fragment.load({
                        name: "sync.zeb.project2.view.Dialog",
                        controller: this
                    }).then(function(oValueHelpDialog){
                        this._oValueHelpDialog = oValueHelpDialog;
                        this.oView.addDependent(this._oValueHelpDialog);
                        // this._configValueHelpDialog();
                        this._oValueHelpDialog.open();
                    }.bind(this));
                } else {
                    // this._configValueHelpDialog();
                    this._oValueHelpDialog.open();
                }
            },
    
            _configValueHelpDialog: function() {
                var sInputValue = this.oView.byId("sakInput").getValue(),
                    oModel = this.oView.getModel(),
                    aProducts = oModel.getProperty("/SakSet");
    
                aProducts.forEach(function (oProduct) {
                    oProduct.selected = (oProduct.Saknr === sInputValue);
                });
                oModel.setProperty("/SakSet", aProducts);
            },

            handleSearch: function(oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter({
                    filters: [
                        new Filter("Saknr", FilterOperator.Contains, sValue),
                        new Filter("Schlw", FilterOperator.Contains, sValue)
                    ]
                });
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            },

            handleValueHelpClose : function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem"),
                    oInput = this.oView.byId("sakInput");
    
                if (oSelectedItem) {
                    oInput.setValue(oSelectedItem.getTitle());
                }
    
                if (!oSelectedItem) {
                    oInput.resetProperty("value");
                }
            }
        });
    });
