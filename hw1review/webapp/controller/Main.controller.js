sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e21.hw1review.controller.Main", {
            onInit: function () {

            },
            // oEvent는 선택한 라인의 데이터를 담고 있음
            onSelectionChange: function ( oEvent ) {
                debugger;
            } 
        });
    });
