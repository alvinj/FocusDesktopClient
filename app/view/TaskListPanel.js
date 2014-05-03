/**
 * This panel will display the list of tasks for 
 * a given project.
 */
Ext.define('Focus.view.TaskListPanel', {
    // extend: 'Ext.panel.Panel',
    extend: 'Ext.form.FormPanel',
    alias: 'widget.taskListPanel',

    //renderTo: Ext.getBody(),  // TODO this creates two horizontal lines in the panel (which is bad)
    style: 'margin: 50px;',   // NOTE can also use bodyStyle

    items: [
        {
            xtype: 'panel',
            layout: 'fit'
        }
    
    ]

});
