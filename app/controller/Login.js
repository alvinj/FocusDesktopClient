Ext.define('Focus.controller.Login', {
    extend: 'Ext.app.Controller',

    requires: [
        'Packt.util.MD5',
        'Packt.util.Alert',
        'Focus.view.MainViewport',
        'Packt.util.Util',
        'Packt.util.SessionMonitor'
    ],

    views: [
        'Login',
        'Header'
    ],

    init: function(application) {
        console.log("Login::init called");
        this.control({
            "login form button#submit": {
                click: this.onButtonClickSubmit
            },
            "login form button#cancel": {
                click: this.onButtonClickCancel
            },
            "login form textfield": {
                specialkey: this.onTextfieldSpecialKey
            },
            "login form textfield[name=password]": {
                keypress: this.onTextfieldKeyPress
            },
            "appheader button#logout": {
                click: this.onButtonClickLogout
            }
        });
    },

    onButtonClickSubmit: function(button, e, options) {
        var formPanel = button.up('form'),
            login = button.up('login'),
            user = formPanel.down('textfield[name=user]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue();   

        if (formPanel.getForm().isValid()) {
            // pass = Packt.util.MD5.encode(pass);
            Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');
            Ext.Ajax.request({
                //
                // TODO put your login url here
                //
                url: '/server/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                jsonData: {
                    'username': user,
                    'password': pass
                },
                success: function(conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();
                    var result = Packt.util.Util.decodeJSON(conn.responseText);
                    if (result.success) {
                        login.close();
                        Ext.create('Focus.view.MainViewport');
                        //var mainController = this.getController('Main');
                        //mainController.init();
                        //Ext.create('Focus.controller.Main');
                        Packt.util.SessionMonitor.start();
                    } else {
                        // TODO get the 'msg' from the json and display it
                        Packt.util.Util.showErrorMsg(conn.responseText);
                    }
                },
                failure: function(conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();
                    // TODO get the 'msg' from the json and display it
                    Packt.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }    
    },    

    onButtonClickCancel: function(button, e, options) {
        button.up('form').getForm().reset();
    },

    onTextfieldSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER){
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onTextfieldKeyPress: function(field, e, options) {
        var charCode = e.getCharCode(); 
        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){
            if(this.getCapslockTooltip() === undefined){
                Ext.widget('capslocktooltip');
            }
            this.getCapslockTooltip().show();
        } else {
            if(this.getCapslockTooltip() !== undefined){
                this.getCapslockTooltip().hide();
            }
        }
    },
    
    onButtonClickLogout: function(button, e, options) {
        Ext.Ajax.request({
            //
            // TODO fix this
            //
            url: 'http://localhost/masteringextjs/php/logout.php',
            success: function(conn, response, options, eOpts){
                var result = Packt.util.Util.decodeJSON(conn.responseText);
                if (result.success) {
                    button.up('MainViewport').destroy();
                    window.location.reload();
                } else {
                    Packt.util.Util.showErrorMsg(conn.responseText);
                }
            },
            failure: function(conn, response, options, eOpts) {
                Packt.util.Util.showErrorMsg(conn.responseText);
            }
        });
    }
});




