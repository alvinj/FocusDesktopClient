Ext.define('Focus.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'VP.util.Utils'
    ],

    views: [
        'MainTabPanel'
    ],

    refs: [
        {
            ref: 'mainTabPanel',
            selector: 'mainTabPanel'
        }
    ],

    init: function(application) {
        console.log("Main::init called");
        this.control({
            // lookup the 'My Stocks' button on the menu and add a click handler.
            // the name 'basic-panels' is the xtype declared in view.menu.Menu.
            // "mainTabPanel": {
            //     render: this.onMainTabPanelRender
            // }
        });
    },

});












