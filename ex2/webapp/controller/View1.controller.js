sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("sync.e21.ex2.controller.View1", {
            onInit: function () {

            },
            onSelectionChange: function ( oEvent ) {
                let olistItem = oEvent.getParameter("listItem");
                let oContext = olistItem.getBindingContext();
                let carrid = oContext.getProperty("Carrid");
                let connid = oContext.getProperty("Connid");
                
                let oView = this.getView();
                let oDialog = oView.byId("idDialog");
                let currnetModelPath = oContext.getPath();
                oView.bindElement(currnetModelPath);

                if (oDialog) {
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.ex2.view.Conn",
                        type: "XML",
                        controller: this
                    }).then(   
                        function ( oDialog ) {
                            oView.addDependent(oDialog);
                            oDialog.open();
                        }
                    ); 

                }

            },
            onClosePress: function () {
                let oDialog = this.byId("idDialog");
                if ( oDialog ) {
                    oDialog.close();
                }
            } 
        });
    });
