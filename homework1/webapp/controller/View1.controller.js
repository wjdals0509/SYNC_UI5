sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e21.homework1.controller.View1", {
            onInit: function () {

            },
            onSelectionChange: function ( oEvent ) {
                let oItem = oEvent.getParameter("listItem");
                let oContext = oItem.getBindingContext();
                let oCarr = oContext.getProperty("Carrid");
                let oConn = oContext.getProperty("Connid");
                sap.m.MessageToast.show("선택하신 라인은 항공사: " + oCarr + ", 항공편: " + oConn + "의 정보입니다." );

                let oView = this.getView();
                let oDialog = this.byId("idDialog");

                if ( oDialog ){
                    oDialog.open(); 
                                    
                } else {
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.homework1.view.Info",
                        type: "XML",
                        controller: this
                    });

                    oFragment.then(function( oDialog ) {
                        oView.addDependent(oDialog); 
                        oDialog.open(); 
                    });
                }
                
            },
            
            onDialogClose: function() {
                let oDialog = this.byId("idDialog");
                if ( oDialog ) {
                    oDialog.close(); // 팝업창을 닫는다.
                }

            }
        });
    });
