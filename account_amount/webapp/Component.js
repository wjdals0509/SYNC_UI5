/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sync/zeb/accountamount/model/models",
        "sap/f/library",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, fioriLibrary, JSONModel) {
        "use strict";

        return UIComponent.extend("sync.zeb.accountamount.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                var oModel = new JSONModel();
                this.setModel(oModel, "comp");

                var oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            _onBeforeRouteMatched: function( oEvent ) {
                var oModel = this.getModel("comp"),
				sLayout = oEvent.getParameters().arguments.layout;

                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = fioriLibrary.LayoutType.OneColumn;
                }

                oModel.setProperty("/layout", sLayout);
		    }
        });
    }
);