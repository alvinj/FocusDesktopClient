/**
 * This panel will display the list of tasks for 
 * a given project.
 */
Ext.define('Focus.view.TaskListPanel', {
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.form.FormPanel',
    alias: 'widget.taskListPanel',

    // requires: [
    //     'Ext.ux.IFrame'
    // ],

    items: [
        {
            xtype: 'panel',
            layout: 'fit'
        }
    
    ]

});
