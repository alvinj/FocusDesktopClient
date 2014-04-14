Ext.define('Focus.view.FooPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fooPanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    items: [
        {
            xtype: 'panel',
            closable: false,
            //iconCls: 'home',
            //title: 'Work',
            layout: 'fit'
        }
    ]
});
