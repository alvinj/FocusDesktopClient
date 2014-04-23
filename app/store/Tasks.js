Ext.define('Focus.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'Focus.model.Task',

    requires: [
        'Focus.model.Task',
        'VP.util.Utils'
    ],

    proxy: {
        type: 'ajax',
        // url: '/server/tasks',
        url: 'data/tasks.json',
        // some vars to help control the url
        noCache: false,
        limitParam: false,
        enablePagingParams: false,
        startParam: false,
        // TODO I REALLY WANT 'POST' HERE
        // because i want 'read' to be a POST
        // actionMethods: {
        //     create : 'POST',
        //     read   : 'GET', // defaults to GET
        //     update : 'POST',
        //     destroy: 'POST'
        // },
        reader: {
            type: 'json',
            root: 'tasks'
        },
        // see: http://stackoverflow.com/questions/11000819/how-to-configure-extjs-4-store-proxy-and-reader-to-read-metadata
        afterRequest: function(req, res) {
            console.log("In Tasks Proxy, Operation Response: ");
            VP.util.Utils.dumpObject(req.operation.response);
        }
        // extraParams:{ // so i can pass in the projectId
        //     //format: 'json'
        // }
    },

    autoLoad: true

    // this url shows some more store options:
    // http://www.learnsomethings.com/2012/07/26/adding-store-events-to-your-controller-in-extjs-4-1/
});

