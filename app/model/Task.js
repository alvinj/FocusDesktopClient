Ext.define('Focus.model.Task', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    // {"id":1,"userId":1,"projectId":1,"parentId":0,"description":"Foo bar","status":"c","dateCreated":"2014-04-13"}
    fields: [
        { name: 'id',          type: 'int' },
        // { name: 'userId',      type: 'int' },
        { name: 'projectId',   type: 'int' },
        // { name: 'parentId',    type: 'int' },
        { name: 'description', type: 'string' },
        { name: 'status',      type: 'string' },      // 'c' = created, 'f' = finished
        { name: 'dateCreated', type: 'string' }  //TODO or sort order
    ]

    // // should the Model or Store have the proxy?
    // // see: http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-2
    // proxy: {
    //     type: 'ajax',
    //     url: 'data/projects.json',
    //     reader: {
    //         type: 'json',
    //         root: 'results'
    //     }
    // }

});


