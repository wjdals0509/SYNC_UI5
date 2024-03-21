sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.input.controller.Main", {
            onInit: function () {
                let data = {
                    value1: 0,
                    value2: 0,
                    result: 0
                };
                let oModel = new JSONModel( data );

                // 기본 모델로 사용하고자 이름을 주지 않는다.
                this.getView().setModel(oModel);

            },
            onAdd: function () {
                sap.m.MessageToast.show("더하기 버튼을 눌렀습니다,");

                let oView = this.getView();
                let oInput1 = oView.byId("idInput1"); 
                let oInput2 = oView.byId("idInput2");
                let oText = oView.byId("idText");
                
                let value1 = oInput1.getValue();
                let value2 = oInput2.getValue();

                // 입력필드 공백일 때 0으로 취급
                if ( value1 == "" ){ value1 = 0; }
                if ( value2 == "" ){ value1 = 0; }

                // 정수 value1, value2 계산 결과
                // 가져온 값을 정수로 취급하면, 소수가 없어짐
                //let result = parseInt(value1) + parseInt(value2);
                let result = parseFloat(value1) + parseFloat(value2);

                // 계산 결과를 기록
                oText.setText("계산결과는?? ==>" + result);
            },

            onAddJson: function () {
                sap.m.MessageToast.show("JSON으로 더하기 버튼을 눌렀습니다.");
                let oView = this.getView();
                let oModel = oView.getModel(); // 기본 모델을 가져온다.

                let data = oModel.getData(); // JSON Model만 사용할 수 있는
                                             // getData()를 통해 데이터 조회
                let value1 = parseInt(data.value1);
                let value2 = parseInt(data.value2);
                let result = value1 + value2

                data.result = result;

                oModel.setData(data);
            }
        });
    });
