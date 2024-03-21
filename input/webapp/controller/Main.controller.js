sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e21.input.controller.Main", {
            onInit: function () {

            },
            onAdd: function () {
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다,");
            }
        });
    });
