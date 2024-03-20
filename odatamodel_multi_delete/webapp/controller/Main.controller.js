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
            }
        });
    });
