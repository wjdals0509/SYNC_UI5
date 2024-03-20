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
                    ],
                    // 생성버튼일때
                    CreateMode: true
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
                // 아무것도 입력되지 않은 깨끗한 상태의 팝업창
                let data = {
                    Carrid: "",
                    Carrname: "",
                    Currcode: "",
                    Url: ""
                };

                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", true);

                // 항공사ID, 항공사명, 통화코드, 웹페이지 주소가 입력이 가능해야함
                this.openDialog();
            },

            onUpdate: function ( oEvent ) {
                // 내가 선택한 라인의 데이터가 자동으로 입력되어 있는 상태의 팝업창
                let oButton = oEvent.getSource(); // oEvent가 발생한 출처(source)는 button
                let oContext = oButton.getBindingContext();
                let path = oContext.getPath();      // 내가 선택한 라인과 연결된 모델의 경로 /CarrierSet('AA')
                let data = oContext.getProperty();  // 어떤 데이터가 들어가나?
                
                let oNewModel = new JSONModel(data);
                this.getView().setModel(oNewModel, "new");

                // 항공사ID는 입력할 수 있으면 안된다.
                let oViewModel = this.getView().getModel("view");
                oViewModel.setProperty("/CreateMode", false);

                // 항공사명, 통화코드, 웹페이지 주소는 입력이 가능해야 한다.
                this.openDialog();
            },
            
            openDialog: function () {
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

                let oViewModel = oView.getModel("view");
                let createMode = oViewModel.getProperty("/CreateMode"); // true(생성) 또는 false(수정)

                if ( createMode ) {
                    // 생성
                    // oModel.create(경로, 신규 데이터, 결과처리);
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
                } else {
                    // 수정
                    // oModel.update(경로, 변경할 데이터, 결과처리);
                    oModel.update(
                        // /CarrierSet('AA') 와 같이 만들기 위해
                        // 문자열 /CarrierSet(' 와 ') 의 사이에 항공사 코드(AA)를 합치는 작업
                        // A + B + C => 완성된 경로 /CarrierSet('AA')
                        // A : /CarrierSet('
                        // B : 항공사코드 (ex. AA)
                        // C : ')
                        "/CarrierSet('" + newData.Carrid + "')",
                    newData,{
                        success: function() {
                            sap.m.MessageToast.show( newData.Carrid + "항공사가 수정되었습니다.");
                        },
                        error: function ( oError ) {
                            sap.m.MessageToast.error("수정 중 오류가 발생했습니다.");
                        }
                    }
                    );
                }

                // HTTP Method 에서 POST 방식으로 호출하는 방법

                // 생성을 위한 팝업창 닫기
                this.onSaveCancel();
            },

            onDelete: function ( oEvent ) {
                // oEvent의 getSource()는 이벤트가 발생한 object를 의미
                debugger;
                let oRow = oEvent.getSource(); // 특정 라인의 버튼
                let oContext = oRow.getBindingContext(); // 그 버튼에 연결된 Model 정보
                let path = oContext.getPath(); // Model 정보의 경로 (/CarrierSet('AA'))

                let oView = this.getView();
                let oModel = oView.getModel();

                // HTTP Method 에서 Delete에 해당하는 명령
                oModel.remove(
                    // 삭제할 데이터의 경로
                    path, {
                    // 결과처리
                    success: function(){
                        sap.m.MessageToast.show("항공사 삭제됨");
                    },
                    error: function( oError ){
                        sap.m.MessageBox.error("삭제 중 오류가 발생함.")
                    }
                })
            },

            onRefresh: function () {
                // let은 변수를 선언하지만, 특별하게 타입을 구별하지는 않음
                // 아래와 같이 /** @type {타입} */을 적게 되는 경우
                // 그 아래에 나온 let으로 선언한 변수는
                // 특정 타입으로 지정되어 손쉽게 정보를 얻을 수 있음
                /** @type {sap.ui.model.odata.v2.ODataModel} */
                let oModel = this.getView().getModel();
                // 한번 실행될 때 마다 GET_ENTITY_SET가 돌아감
                // 좋은 방법은 아님
                oModel.refresh();
            }

        });
    });
