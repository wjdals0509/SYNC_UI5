sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.zeb.project1.controller.View1", {
            onInit: function() {
                var oModel = new sap.ui.model.json.JSONModel({
                    book: [{
                        "City": "New York ",
                        "Cost": 295584.81,
                        "Item Category": "Action Movies",
                        "Profit": 173793.31,
                        "Revenue": 469378.12,
                        "Unit Price": 1240.79,
                        "Units Available": 17336,
                        "Units Sold": 57571
                    }, {
                        "City": "New York ",
                        "Cost": 215065.45,
                        "Item Category": "Alternative Movies",
                        "Profit": 140874.87,
                        "Revenue": 355940.33,
                        "Unit Price": 1319.07,
                        "Units Available": 11270,
                        "Units Sold": 48552
                    }]
                });
                this.getView().setModel(oModel);
            }
        });
    });
