Ext.define('Focus.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',

    // TODO is this needed?
    requires: [
        'Ext.ux.IFrame'
    ],

    activeTab: 0

});
