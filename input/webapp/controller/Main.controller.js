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

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1"); 
                let oInput2 = oView.byId("idInput2");
                let oText = oView.byId("idText");
                
                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                // 정수 value1, value2 계산 결과
                // 가져온 값을 정수로 취급하면, 소수가 없어짐
                let result = parseInt(value1) + parseInt(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==>" + result);
            }
        });
    });
