Ext.define('Focus.controller.Projects', {
    extend: 'Ext.app.Controller',

    requires: [
        'VP.util.Utils'
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
        var me = this;  // need this to access `this` inside `each` loop below
        var tasksStore = me.getTasksStore();
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

        // TEXTFIELD
        var txt = me.createTextField();
        me.addTextfieldListener(txt);
        panel.add(txt);

        // CHECKBOXES
        var group = me.createCheckboxGroup('foo');
        //VP.util.Utils.dumpObject(group);
        //panel.body.update(group);
        var count = 1;
        // TODO i don't know how to reference a method in this class/object
        // inside a block like this; a 'this' reference does not work by itself;
        // if i remember right, i need to pass something else to the function.
        tasksStore.each(function(record) {
            var task = record.data.description;
            // TODO how to refer to this shorthand???
            var checkbox = me.createCheckbox(task, count++);
            //Focus.controller.ProjectUtils.addCheckboxToGroup(group, checkbox);
            me.addCheckboxToGroup(group, checkbox);
        });
        panel.add(group);
        panel.doLayout();
    },

    createTextField: function() {
        return Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Task:',
            name: 'taskfield',
            enableKeyEvents: true
        })
    },

    addTextfieldListener: function(textfield) {
        textfield.on('keyup', function(field, event, options) {
            if (event.getCharCode() === event.ENTER) {
               Ext.Msg.alert('Alert', 'Task: ' + field.getValue()); 
            }
        })
    },
    
    createCheckboxGroup: function(nameOfId) {
        var grp = new Ext.form.CheckboxGroup({
            //fieldLabel: 'CheckboxGroup',
            columns: 1,
            // items: [
            //     {boxLabel: 'Do foo', name: 'task', inputValue: '1', id: 'box1', checked: true},
            //     {boxLabel: 'Do bar-baz', name: 'task', inputValue: '1', id: 'box1', checked: false}
            // ]
        });
        return grp;
    },

    // TODO add a listener to each box
    createCheckbox: function(taskName, count) {
        //var group = Ext.getCmp('conditions');
        // TODO the 'id' must be more unique; add projectName or tabName or tabNumber
        // TODO its possible 'name' may also need to be more unique
        var checkbox = new Ext.form.field.Checkbox({
            boxLabel: taskName,
            name: 'task',
            id: 'box' + count,
            inputValue: '1', // TODO
            checked: false  
        });
        return checkbox;
    },

    addCheckboxToGroup: function(group, checkbox) {
        //var col = group.panel.items.get(group.items.getCount() % group.panel.items.getCount());
        group.items.add(checkbox);
        //col.add(checkbox);
        //group.panel.doLayout();
    },

    // Usage: var string2 = stringWithoutSpaces(string1);
    stringWithoutSpaces: function(string) {
        // str.replace(/\s/g, '');
        return string.replace(/ /g,'');
    },

    capitalizeAllWords: function(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
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

});
















