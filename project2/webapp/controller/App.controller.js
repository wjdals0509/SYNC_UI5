sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("sync.zeb.project2.controller.App", {
        onInit: function () {
          this.oOwnerComponent = this.getOwnerComponent();
          this.oRouter = this.oOwnerComponent.getRouter();
          this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
          var sRouteName = oEvent.getParameter("name"),
            oArguments = oEvent.getParameter("arguments");
    
          // Save the current route name
          this.currentRouteName = sRouteName;
          this.currentBukrs = oArguments.bukrs;
          this.currentSaknr = oArguments.saknr;
          this.currentShkzg = oArguments.shkzg;
        },

        onStateChanged: function (oEvent) {
          var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
            sLayout = oEvent.getParameter("layout");
    
          // Replace the URL with the new layout if a navigation arrow was used
          if (bIsNavigationArrow) {
            this.oRouter.navTo(this.currentRouteName, 
              {
                layout: sLayout, 
                bukrs: this.currentBukrs,
                saknr: this.currentSaknr,
                shkzg: this.currentShkzg
              }, 
              true);
          }
        },
        
        onExit: function () {
          this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        }
      });
    }
  );
  