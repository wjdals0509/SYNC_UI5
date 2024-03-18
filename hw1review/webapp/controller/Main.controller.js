sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
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

                // Fragment의 Dialog를 오픈하도록 한다.
                let oView = this.getView();
                let oDialog = oView.byId("idDialog");
                // 아래 2가지 경우도 가능하긴 하지만 위의 구문이 정석
                // oDialog = this.byId("idDialog");
                // oDialog = this.getView().byId("idDialog");

                // oModel 경로를 현재경로로 취급
                let currnetModelPath = oContext.getPath();
                oView.bindElement(currnetModelPath);

                if (oDialog) {
                    // Main 화면에서 있을 때
                    oDialog.open();
                } else {
                    // Main 화면에서 없을 때
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.hw1review.view.Info",
                        type: "XML",
                        controller: this
                    }).then(   
                        // load가 완료됐을 때
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
