sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.exercise8.controller.Main", {
            onInit: function () {
                let sPerson = {
                    name: "이정민"
                };
                let oModel = new JSONModel(sPerson);
                let oView = this.getView();
                oView.setModel(oModel); // JSON Model 정보를 현재 View에 등록
            },
            onButtonClick: function() {
                sap.m.MessageToast.show("버튼을 클릭했습니다.");

                // Popup.fragment.xml 을 팝업창으로 호출하는 로직
                let oView = this.getView();
                let oDialog = this.byId("idDialog");
                let oInput = this.byId("idInput"); // View 에서 idInput 인 ID 를 가진 Element 를 찾음
                let name = oInput.getValue(); // 해당 Element 의 getValue 에 메소드를 실행함

                if ( oDialog ){
                    let oNameText = this.byId("idNameText");
                    oNameText.setText(name);
                    oDialog.open(); // Fragment를 Load한 적이 있으면 byId로 찾을 수 있따.
                                    // 그렇게 찾은 Fragment를 팝업창으로 보여준다.
                } else {
                    // Popup.fragment.xml 파일을 읽어옴
                    // Controller도 연결함
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.exercise8.view.Popup",
                        type: "XML",
                        controller: this
                    });

                    // Fragment Load 가 완료되면 Main View에 연결함 ( Main View의 모델도 이용 가능 )
                    oFragment.then(function( oDialog ) {
                        oView.addDependent(oDialog); // View에 연결

                        let oNameText = oView.byId("idNameText");
                        oNameText.setText(name);
                        oDialog.open(); // 팝업창 출력
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
