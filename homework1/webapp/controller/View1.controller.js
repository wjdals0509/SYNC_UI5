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
            }
        });
    });
