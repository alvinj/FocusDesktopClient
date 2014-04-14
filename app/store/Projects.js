Ext.define('Focus.store.Projects', {
    extend: 'Ext.data.Store',
    requires: 'Focus.model.Project',
    model: 'Focus.model.Project',

    // TODO duplicated from the model atm
    proxy: {
        type: 'ajax',
        url: 'data/projects.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    // autoLoad: true,

    init: function(application) {
        console.log('Projects store created');
    }

});

