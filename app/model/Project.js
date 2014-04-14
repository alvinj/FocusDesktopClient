Ext.define('Focus.model.Project', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name: 'id' },
        { name: 'name' }
    ],

    // should the Model or Store have the proxy?
    // see: http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-2
    proxy: {
        type: 'ajax',
        url: 'data/projects.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }

});


