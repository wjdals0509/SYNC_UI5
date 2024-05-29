sap.ui.define([], function() {
    "use strict";

    return {
        removeLeadingZeros: function(sValue) {
            if (!sValue) {
                return sValue;
            }
            var parsedValue = parseInt(sValue, 10);
            if (parsedValue === 0) {
                return "";
            }
            return parsedValue.toString();
        }
    };
});