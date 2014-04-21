Ext.define('Focus.controller.Tasks', {
    extend: 'Ext.app.Controller',

    requires: [
        'VP.util.Utils'
    ],

    stores: [
        'Tasks'
    ],

    views: [
        // 'Login',
        // 'Header'
    ],

    init: function(application) {
        this.control({
            // "login form button#submit": {
            //     click: this.onButtonClickSubmit
            // },
        });
    }

});




