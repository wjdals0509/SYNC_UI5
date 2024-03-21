sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.odatamodelmultidelete.controller.Main", {
            onInit: function () {
                let data = {
                    Currency:[
                        {Key:"KRW", Name:"원화"},
                        {Key:"USD", Name:"달러"},
                        {Key:"EUR", Name:"유로"},
                        {Key:"AUD", Name:"호주"},
                        {Key:"CAD", Name:"캐나다"},
                    ]
                };

                let oViewModel = new JSONModel(data);
                this.getView().setModel(oViewModel, "view");
            },

            onDelete: function () {
                //debugger;

                // oTable 이라는 이름의 변수를 선언
                // View에서 id 속성값이 idTable인 항목을 찾음
                let oTable = this.byId("idTable"); 
                
                // a : array
                let aIndex = oTable.getSelectedIndices();

                if ( !aIndex || aIndex.length == 0 ) {
                    // 선택된 항목이 없을 때
                    sap.m.MessageBox.information("삭제할 라인을 선택하세요.");
                    return; // 메세지를 출력하고 중단
                }

                // oData 모델을 View에서 가져온다.
                let oModel = this.getView().getModel();


                // const는 상수를 선언하는 방법, 상수는 값이 변경되지 않는 특징
                for (const index of aIndex){
                    // 선택된 라인들 중 순서대로 하나씩 모델 연결정보를 가져옴
                    let oSelectedContext = oTable.getContextByIndex(index);
                    let carrid = oSelectedContext.getProperty("Carrid");

                    // 해당 모듈의 정보에 대한 경로
                    let path = oSelectedContext.getPath();

                    // oData 모델의 remove(경로, 결과처리) 메소드를 이용하려면,
                    // 해당 데이터를 삭제명령 보낼 수 있다.
                    // 해당 삭제명령은 이 경우 SAP Gateway의 YE21_GW005의 
                    // CARRIERSET_DELETE_ENTITY 메소드가 실행된다.
                    oModel.remove(path, {
                        success: function() {
                            // Exception이 발생하지 않은 경우
                            sap.m.MessageBox.success( carrid + "삭제 성공" );
                            oTable.clearSelection();
                        },
                        error: function( oError ) {
                            // 삭제 중 Exception이 발생한 경우
                            sap.m.MessageBox.error("삭제 오류");
                        }
                    });
                }
            }
        });
    });
