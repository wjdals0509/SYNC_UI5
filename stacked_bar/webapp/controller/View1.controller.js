sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/Popover",
    "sap/ui/core/format/NumberFormat",
    "sync/zeb/stackedbar/formatter"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Popover, NumberFormat,  formatter) {
    "use strict";

    return Controller.extend("sync.zeb.stackedbar.controller.View1", {
      formatter: formatter,
      onInit: function () {
        var oVizFrame = this.byId("idVizFrame");
        // Attach popover
        var oPopover = new Popover({});
        oPopover.connect(oVizFrame.getVizUid());

        // Customizing the Popover to show the original values
        var oRemamtFormat = NumberFormat.getFloatInstance({
          minFractionDigits: 0,
          maxFractionDigits: 2,
          groupingEnabled: true,
          groupingSeparator: ",",
          decimalSeparator: "."
        });

        var oSumamtFormat = NumberFormat.getFloatInstance({
          minFractionDigits: 0,
          maxFractionDigits: 2,
          groupingEnabled: true,
          groupingSeparator: ",",
          decimalSeparator: "."
        });

        oPopover.setFormatString({
          "Remamt": oRemamtFormat,
          "Sumamt": oSumamtFormat
        });
      }
    });
  }
);
