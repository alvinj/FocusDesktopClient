Ext.define('Focus.model.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'username' },
        { name: 'password' }
    ]
});

