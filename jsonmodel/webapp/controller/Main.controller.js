sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.jsonmodel.controller.Main", {
            onInit: function () {
                let data = {
                    firstName: "John", // 문자열
                    enabled: true      // boolean 타입(true/false)
                };

                // sap.ui.model.json.JSONModel의 객체가 생성되면서
                // 동시에, 변수 data에 기록된 Structure 정보가
                // Model의 데이터로 전달된다.
                let oModel = new JSONModel(data);

                // JSON Model의 Binding Mode 를 Two-Way에서 One-Way로 변경
                // 입력필드에 다른 값을 넣어도 Model에 기록되지 않아서
                // 입력필드 위에 있는 Text는 변경되지 않는다
                oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

                // 이 Controller와 연결된 View의 기본 모델로 설정
                this.getView().setModel(oModel);
            }
        });
    });
