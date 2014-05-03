Ext.define('Focus.store.Projects', {
    extend: 'Ext.data.Store',
    requires: 'Focus.model.Project',
    model: 'Focus.model.Project',

    // TODO duplicated from the model atm
    proxy: {
        type: 'ajax',
        url: '/server/projects',
        method: 'GET',
        noCache: false,
        reader: {
            type: 'json'
            //root: 'results'
        }
    },
    // autoLoad: true,

    // this is never called
    init: function(application) {
        console.log('Projects store created');
    }

});

