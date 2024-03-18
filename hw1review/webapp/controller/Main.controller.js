sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("sync.e21.hw1review.controller.Main", {
            onInit: function () {

            },
            // oEvent는 선택한 라인의 데이터를 담고 있음
            onSelectionChange: function ( oEvent ) {
                let olistItem = oEvent.getParameter("listItem");
                let oContext = olistItem.getBindingContext();
                let carrid = oContext.getProperty("Carrid");
                let connid = oContext.getProperty("Connid");

                MessageToast.show("선택하신 라인은 항공사:" + carrid + ", 항공편:" + connid + "의 정보입니다.");
            } 
        });
    });
