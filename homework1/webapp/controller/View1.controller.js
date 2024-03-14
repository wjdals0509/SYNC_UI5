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

                // Popup.fragment.xml 을 팝업창으로 호출하는 로직
                let oView = this.getView();
                let oDialog = this.byId("idDialog");
                if ( oDialog ){
                    oDialog.open(); // Fragment를 Load한 적이 있으면 byId로 찾을 수 있따.
                                    // 그렇게 찾은 Fragment를 팝업창으로 보여준다.
                } else {
                    // Popup.fragment.xml 파일을 읽어옴
                    // Controller도 연결함
                    let oFragment = sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.homework1.view.Info",
                        type: "XML",
                        controller: this
                    });

                    // Fragment Load 가 완료되면 Main View에 연결함 ( Main View의 모델도 이용 가능 )
                    oFragment.then(function( oDialog ) {
                        oView.addDependent(oDialog); // View에 연결
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
