/**
 * This is the main "viewport" for the application.
 * A viewport is like a Java JFrame, you pretty much want just one.
 */
Ext.define('Focus.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

    requires: [
        'Focus.view.Header',
        'Focus.view.MainPanel'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'appheader',
            region: 'north'
        },
        {
            xtype: 'mainpanel',
            region: 'center'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 30,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<div id="titleHeader"><center><span style="font-size:10px;">ExtJS Login Demo</span></center></div>'
        }
    ]
});
