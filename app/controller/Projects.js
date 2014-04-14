Ext.define('Focus.controller.Projects', {
    extend: 'Ext.app.Controller',

    requires: [
        'VP.util.Utils'
    ],

    stores: [
        'Projects'
    ],

    views: [
        'MainTabPanel',
        'TaskListPanel',
        'FooPanel'
    ],

    refs: [
        {
            ref: 'mainTabPanel',
            selector: 'mainTabPanel'
        },
        {
            ref: 'taskListPanel',
            selector: 'taskListPanel'
        },
        {
            ref: 'fooPanel',
            selector: 'fooPanel'
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
                //click: this.onMainTabPanelClick,
                tabchange: this.onMainTabPanelTabChange,
            }
        });
    },

    onLaunch: function() {
        // i don't know why, but this needs to be here for the store
        // to *really* be loaded
        var projectsStore = this.getProjectsStore();
        projectsStore.load();
    },

    onMainTabPanelTabChange: function(mainTabPanel, panel) {
        // panel (title: Finance; alias: widget.finance, etc.)
        console.log(panel.title);
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
                xtype: 'panel',
                closable: true,
                title: record.data.name,
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
    }

});












