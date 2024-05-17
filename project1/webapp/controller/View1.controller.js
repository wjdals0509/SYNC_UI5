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
                    }, {
                        "City": "New York ",
                        "Cost": 115132.04,
                        "Item Category": "Audio Equipment",
                        "Profit": 56994.34,
                        "Revenue": 172126.37,
                        "Unit Price": 763.21,
                        "Units Available": 11248,
                        "Units Sold": 37303
                    }, {
                        "City": "New York ",
                        "Cost": 171742.42,
                        "Item Category": "Cameras",
                        "Profit": 81093.4,
                        "Revenue": 252835.82,
                        "Unit Price": 1143.57,
                        "Units Available": 14917,
                        "Units Sold": 51664
                    }, {
                        "City": "New York ",
                        "Cost": 331033.94,
                        "Item Category": "Comedy Movies",
                        "Profit": 150465.23,
                        "Revenue": 481499.18,
                        "Unit Price": 2268.02,
                        "Units Available": 22449,
                        "Units Sold": 69005
                    }, {
                        "City": "New York ",
                        "Cost": 207854.46,
                        "Item Category": "Country Music",
                        "Profit": 115242.56,
                        "Revenue": 323097.02,
                        "Unit Price": 1456.91,
                        "Units Available": 17996,
                        " Units Sold": 45346
                    }]
                });
                this.getView().setModel(oModel);
            }
        });
    });
