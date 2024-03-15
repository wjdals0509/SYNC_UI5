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
                let Carr = oContext.getProperty("Carrid");
                let Conn = oContext.getProperty("Connid");
                let Cntfr = oContext.getProperty("Countryfr");
                let Ctfr = oContext.getProperty("Cityfrom");
                let Cntto = oContext.getProperty("Countryto");
                let Ctto = oContext.getProperty("Cityto");
                sap.m.MessageToast.show("선택하신 라인은 항공사: " + Carr + ", 항공편: " + Conn + "의 정보입니다." );

                let oView = this.getView();
                let oDialog = this.byId("idDialog");

                if ( oDialog ){
                    let oText = this.byId("idText");
                    oText.setText("");
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
                        let oText = oView.byId("idText");
                        oText.setText();    
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
