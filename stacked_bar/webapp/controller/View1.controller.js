sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/Popover",
    "sap/ui/core/format/NumberFormat",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Popover, NumberFormat) {
    "use strict";

    return Controller.extend("sync.zeb.stackedbar.controller.View1", {
      onInit: function () {
        var oVizFrame = this.byId("idVizFrame");
        // Attach popover
        var oPopover = new Popover({});
        var oFormat = NumberFormat.getFloatInstance({
          minFractionDigits: 0,
          maxFractionDigits: 2,
        });
        oPopover.connect(oVizFrame.getVizUid());
        oPopover.setFormatString(oFormat);
      },
    });
  }
);
