/**
 * This panel will display the list of tasks for 
 * a given project.
 */
Ext.define('Focus.view.TaskListPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.taskListPanel',

    requires: [
        'Ext.ux.IFrame'
    ],

    items: [
        {
            xtype: 'panel',
            closable: false,
            iconCls: 'home',
            title: 'Tasks',
            layout: 'fit',
            // items: [
            // {
            //     xtype: 'checkboxgroup',
            //     fieldLabel: '',
            //     id: 'tasksAsCheckboxes',
            //     //itemId: 'tasks',
            //     labelSeparator: '',
            //     itemCls: 'x-check-group-alt',
            //     columns: 1,
            //     items: [{}]
            // }
            // ]
        }
    ]




});
