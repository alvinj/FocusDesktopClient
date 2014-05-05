/**
 * This is the main "viewport" for the application.
 * A viewport is like a Java JFrame, you pretty much want just one.
 */
Ext.define('Focus.view.MainViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainViewport',

    requires: [
        'Focus.view.Header',
        'Focus.view.MainTabPanel'
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
            xtype: 'mainTabPanel',
            region: 'center'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 30,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<div id="titleHeader"><center><span style="font-size:10px;">focus</span></center></div>'
        }
    ]
});
