Ext.define('Focus.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'Focus.model.Task',

    requires: [
        'Focus.model.Task',
        'VP.util.Utils'
    ],

    proxy: {
        type: 'ajax',
        url: '/server/tasks',
        //url: 'data/tasks.json',

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
            // model: 'Task',  // this line makes things worse; NPE at line 81 of Projects
            type: 'json',
            idProperty: 'id',
            successProperty: 'success',
            root: 'tasks'
        },
        // see: http://stackoverflow.com/questions/11000819/how-to-configure-extjs-4-store-proxy-and-reader-to-read-metadata
        afterRequest: function(req, res) {
            // console.log("In Tasks Proxy, Operation Response: ");
            // VP.util.Utils.dumpObject(req.operation.response);
        },
        listeners : {
            exception : function(proxy, response, operation) {
                if (operation) {
                    console.log('IN "IF OPERATION" BRANCH');
                } else {
                    // May be a proxy error...
                    console.log('MAY BE A PROXY ERROR');
                }
            }
        }
        // extraParams:{ // so i can pass in the projectId
        //     //format: 'json'
        // }
    },

    // these don't work
    // init: function(application) {
    //     console.log('*** TASKS STORE CREATED (INIT) ***');
    // },
    // initialize: function() {
    //     console.log('*** TASKS STORE CREATED (INITIALIZE) ***');
    // },

    // autoLoad: true,

    // initialize: function () {
    //     this.callParent(arguments);
    //     this._store.load();
    // }

    // this url shows some more store options:
    // http://www.learnsomethings.com/2012/07/26/adding-store-events-to-your-controller-in-extjs-4-1/
});

