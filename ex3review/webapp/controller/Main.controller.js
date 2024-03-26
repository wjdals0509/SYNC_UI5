sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.e21.ex3review.controller.Main", {
            onInit: function () {
                let data = {
                    Data: {
                        Carrid: "",
                        Connid: "0000",
                        Coutnryfr: "",
                        Cityfrom: "",
                        Airpfrom: "",
                        Countryto: "",
                        Cityto: "",
                        Airpto: "",
                        Distance: 0,
                        Distid: "KM"    // 기본값
                    },
                    DistanceUnit: [
                        { key: "KM", name: "킬로미터" },
                        { key: "MI", name: "마일" }
                    ]
                }

                let oModel = new sap.ui.model.json.JSONModel( data ) ;
                this.getView().setModel(oModel, "new");
            },

            onCreate: function () {
                //sap.m.MessageToast.show("신규생성 버튼을 눌렀습니다.");

                let oView = this.getView();
                let oDialog = oView.byId("idDialog");

                if ( oDialog ) {
                    oDialog.open();
                } else {
                    sap.ui.core.Fragment.load({
                        id: oView.getId(),
                        name: 'sync.e21.ex3review.view.New',
                        type: 'XML',
                        controller: this
                    }).then(function(oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            },

            onClose: function () {
                this.byId("idDialog").close();
            },

            
            onSave: function () {
                let oView = this.getView();
                let oModel = oView.getModel(); // SAP Gateway에 연결된 Model
                let oNewModel = oView.getModel("new"); // JSON Model 팝업의 Input 데이터를 담당
                let newData = oNewModel.getProperty("/Data");

                // create( 경로, 신규데이터, 결과처리)
                oModel.create(
                    "/ConnectionSet",
                    newData,
                    { 
                        success: function ( oData, oResponse ) {
                            sap.m.MessageBox.success( oData.Carrid + "," + oData.Connid + "가 생성되었습니다.");
                        }, 
                        error: function ( oError ) {
                            console.log(oError);
                            sap.m.MessageBox.error("생성 중 오류가 발생했습니다.");
                    }}
                );
            }
        });
    });
