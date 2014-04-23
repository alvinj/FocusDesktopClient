Ext.define('Focus.store.Tasks', {
    extend: 'Ext.data.Store',
    requires: 'Focus.model.Task',
    model: 'Focus.model.Task',

    proxy: {
        type: 'ajax',
        url: '/server/tasks',
        reader: {
            type: 'json',
            root: 'tasks'
        }
    },
    autoLoad: true

    // this url shows some more store options:
    // http://www.learnsomethings.com/2012/07/26/adding-store-events-to-your-controller-in-extjs-4-1/
});

