Ext.define('Focus.view.CurrentTask', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.currentTaskPanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            title: 'Tasks',
            // html: '<div id="titleHeader"><center><span style="font-size:10px;">CURRENT TASK</span></center></div>'
            layout: 'fit'
        }
    ]
});
