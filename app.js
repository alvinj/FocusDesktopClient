Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Packt.util': 'app/util',
        'Packt.model': 'app/model',
        'Packt.store': 'app/store',
        'Packt.view': 'app/view',
        'VP.util': 'app/util/VP'
    }
});

Ext.application({
    name: 'Focus',
    extend: 'Focus.Application',

    requires: [
        'Ext.menu.Menu',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.data.proxy.Ajax',
        'Ext.form.FieldSet',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.form.CheckboxGroup',
        'Ext.layout.container.Border'
    ],

    views: [
        // note: when do i need these?
        // 'Main',
        // 'Viewport',
    ],

    // stores: [
    //     'Stocks'
    // ],

    controllers: [
        'Login'
    ],

    splashscreen: {},

    //autoCreateViewport: true,

    init: function() {

        // Start the mask on the body and get a reference to the mask
         splashscreen = Ext.getBody().mask('Loading application', 'splashscreen');

        // Add a new class to this mask as we want it to look different from the default.
         splashscreen.addCls('splashscreen');

        // Insert a new div before the loading icon where we can place our logo.
        // Search for the first div tag that contains the '.x-mask-msg' class,
        // and add a new div tag as a child (p. 29 of Mastering Ext JS book).
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });

    },

    launch: function() {

        Ext.tip.QuickTipManager.init();
        var task = new Ext.util.DelayedTask(function() {

            //Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });

            //Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts ){
                        Ext.widget('login');
                    }
                }
            });

       });

       task.delay(2000);

    }

});







