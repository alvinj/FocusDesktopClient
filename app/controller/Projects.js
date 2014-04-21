Ext.define('Focus.controller.Projects', {
    extend: 'Ext.app.Controller',

    requires: [
        'VP.util.Utils',
        'Focus.controller.ProjectUtils'
    ],

    stores: [
        'Projects',
        'Tasks'
    ],

    views: [
        'MainTabPanel',
        'TaskListPanel'
    ],

    refs: [
        {
            ref: 'mainTabPanel',
            selector: 'mainTabPanel'
        }
    ],

    init: function(application) {
        console.log("Project::init called");
        this.control({
            // lookup the 'My Stocks' button on the menu and add a click handler.
            // the name 'basic-panels' is the xtype declared in view.menu.Menu.
            // "basic-panels button#myStocks": {
            //     click: this.onMyStocksButtonClick
            // },
            // the MainTabPanel is rendered when the MainViewport is rendered
            // by the Login controller.
            "mainTabPanel": {
                render: this.onMainTabPanelRender,
                tabchange: this.onMainTabPanelTabChange,
            }
        });
    },

    onLaunch: function() {
        // i don't know why, but this needs to be here for the store
        // to *really* be loaded
        var projectsStore = this.getProjectsStore();
        projectsStore.load();
        // if (!Ext.getStore('Tasks')) {
        //     Ext.create('Focus.store.Tasks');
        // }
        // console.log('BEFORE getTasksStore');
        // var tasksStore = this.getTasksStore();
        // console.log('BEFORE tasksStore.load');
        // tasksStore.load();
        // console.log('AFTER tasksStore.load');
    },

    // info on tab panel listeners:
    // http://blog.jardalu.com/2013/6/10/simple-tab-dynamic-content-extjs-sencha
    // http://goo.gl/llbcqn (long appfoundation.com url)
    onMainTabPanelTabChange: function(mainTabPanel, panel) {
        // panel (title: Finance; alias: widget.finance, etc.)
        console.log(panel.title);
        this.handleTabChange(panel.title, panel);
    },

    handleTabChange: function(tabName, panel) {
        var tasksStore = this.getTasksStore();
        tasksStore.load();
        // var content = '<ul>';
        // // TODO render those tasks as a list of checkboxes onto the panel
        // tasksStore.each(function(record) {
        //     var task = record.data.description;
        //     console.log('TASK: ' + task);
        //     content += '<li>' + task + '</li>';
        // });
        // content += '</ul>';
        // panel.body.update(content);
        // panel.doLayout();

        var group = Focus.controller.ProjectUtils.createCheckboxGroup('foo');
        //VP.util.Utils.dumpObject(group);
        //panel.body.update(group);
        var count = 1;
        tasksStore.each(function(record) {
            var task = record.data.description;
            // TODO how to refer to this shorthand???
            var checkbox = Focus.controller.ProjectUtils.createCheckbox(task, count++);
            Focus.controller.ProjectUtils.addCheckboxToGroup(group, checkbox);
        });
        panel.add(group);
        panel.doLayout();
    },
    
    /**
     * Handle the rendering of the MainTabPanel.
     * As it's rendered, dynamically add one tab for each project.
     * from 'mastering', p. 109
     */
    onMainTabPanelRender: function(component, options) {
        // 1) get the store
        var projectsStore = this.getProjectsStore();
        // projectsStore.load();
        // 2) create a tab for each project
        var mainTabPanel = this.getMainTabPanel();
        //var tabsArray = new Array();
        projectsStore.each(function(record) {
            console.log(record.data.name);
            //tabsArray.push(record.data.name);
            var tab = mainTabPanel.add({
                xtype: 'taskListPanel',
                closable: true,
                title: record.data.name, // the text on the tab
                html: '<h1>' + record.data.name + '</h1>',
                alias: 'widget.' + record.data.name.toLowerCase(),
                iconCls: record.data.name.toLowerCase(),  // renders 'class="finance"'
                listeners : {
                    click: function () { 
                        console.log("YOU CLICKED A TAB !!!");
                    },
                    // beforeclose : function(tab) {
                    //     tab.removeAll();
                    //     tab.destroy();
                    //     return true;
                    // }
                }
            });
        });
        mainTabPanel.setActiveTab(0);
        // TODO i think i need to create these tabs as an array so i can
        // access them, and also know which one is in the foreground
    },

    // statics : {
    //     // TODO pass an array into this function
    //     createCheckbox: function(taskName, count) {
    //         //var group = Ext.getCmp('conditions');
    //         var checkbox = new Ext.form.field.Checkbox({
    //             boxLabel: taskName,
    //             name: 'task',
    //             id: 'box' + count,      // TODO
    //             inputValue: '1', // TODO
    //             checked: false  
    //         });
    //         return checkbox;
    //     }
    // }

});
















