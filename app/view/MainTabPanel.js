Ext.define('Focus.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    activeTab: 0,

    // items: [
    //     {
    //         xtype: 'panel',
    //         closable: false,
    //         iconCls: 'home',
    //         title: 'Work',
    //         layout: 'fit'
    //     }
    // ]

});
