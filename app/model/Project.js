Ext.define('Focus.model.Project', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id' },
        { name: 'userId' },
        { name: 'name' },
        { name: 'displayOrder' },
        { name: 'dateCreated' }
    ]

});


