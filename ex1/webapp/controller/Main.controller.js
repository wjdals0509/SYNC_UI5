sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.e21.ex1.controller.Main", {
            onInit: function () {
                let data = {
                    value1: 0,
                    value2: 0,
                    result1: 0,
                    result2: 0,
                    result3: 0,
                    result4: 0,
                };
                let oModel = new JSONModel( data );

                this.getView().setModel(oModel);
            },
            
            onAdd: function () {
                let oView = this.getView();
                let oModel = oView.getModel();
                
                let data = oModel.getData();

                let value1 = data.value1;
                let value2 = data.value2;
                let result1 = value1 + value2
                
                data.result1 = result1;

                oModel.setData(data);
            },

            onSub: function () {
                let oView = this.getView();
                let oModel = oView.getModel();
                
                let data = oModel.getData();

                let value1 = data.value1;
                let value2 = data.value2;
                let result2 = value1 - value2
                
                data.result2 = result2;

                oModel.setData(data);
            },

            onMulti: function () {
                let oView = this.getView();
                let oModel = oView.getModel();
                
                let data = oModel.getData();

                let value1 = data.value1;
                let value2 = data.value2;
                let result3 = value1 * value2
                
                data.result3 = result3;

                oModel.setData(data);

            },

            onDiv: function () {
                let oView = this.getView();
                let oModel = oView.getModel();
                
                let data = oModel.getData();

                let value1 = data.value1;
                let value2 = data.value2;
                let result4 = value1 / value2
                
                data.result4 = result4;

                oModel.setData(data);

            }
        });
    });
