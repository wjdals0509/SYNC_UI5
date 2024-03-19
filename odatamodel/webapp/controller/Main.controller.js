sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.odatamodel.controller.Main", {
            onInit: function () {
                let data = this.initAirlineData;
                let oNewModel = new JSONModel(data);
                let oView = this.getView();
                oView.setModel(oNewModel, "new");

                // 통화코드 콤보박스를 위해 추가
                let viewData = {
                    Currency: [
                        { key: 'KRW', name: '원화'},
                        { key: 'USD', name: '달러'},
                    ]
                };
                let oViewModel = new JSONModel(viewData);
                oView.setModel(oViewModel, "view");
            },

            onCurrencyChange: function ( oEvent ) {
                let oItem = oEvent.getParameter("selectedItem");
                let oNewModel = this.getView().getModel("new");
                oNewModel.setProperty("/Currcode", oItem.getKey());
            },

            onCreate: function () {
                let oView = this.getView();
                let oDialog = oView.byId("idNewDialog");

                if ( oDialog ) {
                    oDialog.open();
                } else {
                    Fragment.load({
                        id: oView.getId(),
                        name: "sync.e21.odatamodel.view.New",
                        type: "XML",
                        controller: this             // View의 Controller를 공유
                    }).then(function(oDialog){
                        // 화면에 oDialog를 포함시킨다는 뜻       
                        oView.addDependent(oDialog); // View의 Model을 공유
                        oDialog.open();
                    });
                }
            },

            onSaveCancel: function () {
                let oDialog = this.getView().byId("idNewDialog");
                if( oDialog ) {
                    oDialog.close();
                }

                // 빈값만 있는 정보고 새로운 JSONModel을 만들어서
                // 기존의 new 모델을 교체해버림 => 데이터 초기화
                let oNewModel = this.getView().getModel("new");
                oNewModel.setData({
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""    
                });

                // ComboBox 선택된 내용을 지우는 과정
                let oComboBox = this.byId("idComboBox");
                oComboBox.setSelectedKey("");
                oComboBox.setSelectedItem("");
                oComboBox.setSelectedItemId("");
            },

            onSaveConfirm: function () {
                let oView = this.getView();
                let oNewModel = oView.getModel("new"); // JSON Model
                let oModel = oView.getModel();         // OData Model

                // newData에는 내가 Dialog에 입력한 값이 들어간다
                let newData = oNewModel.getData();
                // newData = {Carrid: "~", Carrname: "~", ...}
                // getData(). : 저장되어있는 structure 구조를 가져와라

                debugger;

                // HTTP Method 에서 POST 방식으로 호출하는 방법
                oModel.create(
                  // 경로
                  "/CarrierSet",
                  // 신규데이터
                  newData,
                  // 결과처리
                  {
                    success: function ( oData, oResponse ){
                        // oData: 생성된 데이터 내용 ( 내가 Dialog에 입력한 값 )
                        // oResponse: 응답결과
                        debugger;
                        sap.m.MessageToast.show( oData.Carrid + "항공사가 생성되었습니다.");
                    },
                    error: function( oError ){
                        debugger;
                        sap.m.MessageBox.error("생성 중 오류가 발생되었습니다.");
                    }
                  }
                );
            }

        });
    });
