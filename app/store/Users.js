Ext.define('Focus.store.Users', {
    extend: 'Ext.data.Store',

    requires: [
        'Focus.model.User'
    ],

    model: 'Focus.model.User',

    proxy: {
        type: 'ajax',
        url: 'php/security/users.php',
        
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

