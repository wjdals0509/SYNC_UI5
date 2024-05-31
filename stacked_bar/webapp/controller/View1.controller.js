sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/Popover",
    "sap/ui/core/format/NumberFormat",
    "sync/zeb/stackedbar/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Popover, NumberFormat,  formatter, Filter, FilterOperator) {
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
      },
      handleChange: function (oEvent) {
        let oTableDateState = [],
        sQuery = oEvent.getParameter("query");

        // 검색어가 input 필드에서 제대로 가져와지는지 확인
        if (!sQuery) {
            sQuery = oEvent.getSource().getValue();
        }
        if (sQuery && sQuery.length === 7) {
            let startDate = sQuery + "-01";
            let endDate = sQuery + "-31";

            // 필터 생성 (시작일과 종료일 사이)
            let oStartDateFilter = new Filter("Acqdate", FilterOperator.GE, startDate);
            let oEndDateFilter = new Filter("Acqdate", FilterOperator.LE, endDate);

            // 필터 배열에 추가
            oTableDateState = new Filter({
                filters: [oStartDateFilter, oEndDateFilter],
                and: true
            });
        }
        // console.log(oTableDateState);

        let oDataset = this.byId("chartContainerContentTable");
        let oBinding = oDataset.getBinding("items");
        oBinding.filter(oTableDateState, "Application");
      }
    });
  }
);
