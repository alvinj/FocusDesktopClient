Ext.define('Focus.view.TaskListPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.taskListPanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    items: [
        {
            xtype: 'panel',
            closable: false,
            //iconCls: 'home',
            //title: 'Tasks',
            layout: 'fit'
        }
    ]
});
