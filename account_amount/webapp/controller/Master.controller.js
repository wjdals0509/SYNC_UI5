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

        return Controller.extend("sync.zeb.accountamount.controller.Master", {
            onInit: function () {
                this.oView = this.getView();
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            onListItemPress: function ( oEvent ) {
                var oItem = oEvent.getSource(),
                oCtx = oItem.getBindingContext(),
                sBukrs = oCtx.getProperty("Bukrs"),
                sSaknr = oCtx.getProperty("Saknr");

                this.oRouter.navTo("detail", {
                    layout: fioriLibrary.LayoutType.TwoColumnsBeginExpanded,
                    bukrs: sBukrs,
                    saknr: sSaknr
                    
                });
            },

            handleValueHelp: function() {
                // debugger;
                if (!this._oValueHelpDialog) {
                    Fragment.load({
                        name: "sync.zeb.accountamount.view.Dialog",
                        controller: this
                    }).then(function(oValueHelpDialog){
                        this._oValueHelpDialog = oValueHelpDialog;
                        this.oView.addDependent(this._oValueHelpDialog);
                        this._configValueHelpDialog();
                        this._oValueHelpDialog.open();
                    }.bind(this));
                } else {
                    this._configValueHelpDialog();
                    this._oValueHelpDialog.open();
                }
            },

            _configValueHelpDialog: function() {
                var sInputValue = this.oView.byId("sakInput").getValue(),
                    oModel = this.oView.getModel(),
                    aProducts = oModel.getProperty("/SakSet");
    
                    if (!aProducts) {
                        console.error("계정정보가 없습니다");
                        return;
                    }
                
                    // Ensure the selected property exists and is set
                    aProducts.forEach(function (oProduct) {
                        if (oProduct) {
                            oProduct.selected = (oProduct.Saknr === sInputValue);
                        }
                    });
                
                    // Update the model
                    oModel.setProperty("/SakSet", aProducts);
                    // Optional: Refresh bindings if necessary
                    oModel.refresh(true);
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
                    
                    // 선택한 값을 검색 조건으로 사용
                    var sSelectedKey = oSelectedItem.getTitle();
                    var oFilter = new Filter({
                        filters: [
                            new Filter("Saknr", FilterOperator.Contains, sSelectedKey)
                        ]
                    });

                    // 테이블 필터링
                    var oTable = this.oView.byId("idSakTable");
                    var oBinding = oTable.getBinding("items");
                    oBinding.filter([oFilter]);
                }
    
                if (!oSelectedItem) {
                    oInput.resetProperty("value");
                }
            },
            handleClear: function (oEvent) {
                var oInput = this.oView.byId("sakInput");
                oInput.setValue("");
                var oTable = this.oView.byId("idSakTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter([]);
            }
        });
    });
