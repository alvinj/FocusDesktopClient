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

    // store loading urls:
    // http://www.curiousm.com/labs/2012/11/13/sencha-touch-2-dynamically-loading-the-store-of-a-list-and-asking-the-server-for-data-by-parameter/
    handleTabChange: function(tabName, panel) {
        console.log('ENTERED handleTabChange');
        var me = this;  // need this to access `this` inside `each` loop below

        if (!Ext.getStore('Tasks')) {
            console.log('handleTabChange: Tasks store did not exist');
            Ext.create('Tasks');
        }

        // STORE: http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Store
        //Ext.getStore('Tasks').load();
        var tasksStore = this.getTasksStore();
        //var tasksStore = Ext.getStore('Tasks');

        tasksStore.getProxy().extraParams.projectId = 1;
        tasksStore.load();
        console.log('COUNT = ' + tasksStore.count());

        // tasksStore.load({
        //     callback: function(records, operation, success) {
        //         // do something after the load finishes
        //     },
        //     scope: this
        // });

        // tasksStore.load({
        //     callback: function(records, operation, success) {
        //         console.log('tasksStore.load called');
        //         console.log('    success:   ' + success);
        //         console.log('    operation: ' + operation);
        //         console.log('    records:   ' + records);
        //         for (var i = 0; i < records.length; i++) {
        //             console.log('RECORD:');
        //             //VP.util.Utils.dumpObject(records[i].data);
        //             //console.log(records[i]);
        //         }
        //         // records.each(function(record) {
        //         //     //console.log('    record: ' + record);
        //         //     //VP.util.Utils.dumpObject(record);
        //         // });
        //     }
        //     // scope: this,
        // });

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
        // TODO don't add textfield if it already exists
        var textField = me.createTextField();
        me.addTextfieldListener(textField);
        panel.add(textField);

        // MAKE THE CHECKBOXES
        var groupItemId = me.makeGroupItemIdName(tabName);
        var group = me.createCheckboxGroup(groupItemId);
        //panel.body.update(group);
        var count = 1;
        // TODO i don't know how to reference a method in this class/object
        // inside a block like this; a 'this' reference does not work by itself;
        // if i remember right, i need to pass something else to the function.
        console.log('ABOUT TO LOOP OVER TASK STORE ITEMS');
        console.log('TASK STORE COUNT: ' + tasksStore.count());
        tasksStore.each(function(record) {
            var task = record.data.description;
            console.log('TASK: ' + task)
            var checkbox = me.createCheckbox(task, count++);
            me.addCheckboxToGroup(group, checkbox);
        });
        panel.add(group);
        panel.doLayout();
    },

    // each checkbox group must have a different itemId. make the itemId from the
    // projectName, which must be unique per user.
    makeGroupItemIdName: function(projectName) {
        return VP.util.Utils.removeSpaces(VP.util.Utils.capitalizeEachWord(projectName));
    },

    createLegalIdNameFromString: function(s) {
        var x = VP.util.Utils.capitalizeEachWord(s);
        var y = VP.util.Utils.stripNonWordCharacters(x);
        return VP.util.Utils.removeSpaces();
    },

    createTextField: function() {
        return Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Task:',
            name: 'taskfield',
            enableKeyEvents: true
        });
    },

    addTextfieldListener: function(textfield) {
        textfield.on('keyup', function(field, event, options) {
            if (event.getCharCode() === event.ENTER) {
               Ext.Msg.alert('Alert', 'Task: ' + field.getValue()); 
            }
        });
    },
    
    createCheckboxGroup: function(nameOfId) {
        var grp = new Ext.form.CheckboxGroup({
            //fieldLabel: 'CheckboxGroup',
            columns: 1,
            id: nameOfId,
            itemId: nameOfId,
            listeners: {
                // may only be available after the 'load' event; see
                // http://pritomkumar.blogspot.com/2013/08/extjs-add-checkbox-group-to-panel-on-fly.html
                check: {
                    element: 'el', //bind to the underlying el property on the panel
                    foo: function (clickedObject, isChecked){
                        console.log(clickedObject);
                        console.log(isChecked);
                        console.log("Check box check status changed.");
                        // var group = Ext.getCmp (nameOfId);
                        // var length = group.items.getCount ();
                        // var isCheck = group.items.items[0].checked;
                    }
                },
                change: {
                    element: 'el', //bind to the underlying el property on the panel
                    foo: function (field, newVal, oldVal){
                        console.log('CHNAGE!');
                        console.log(field);
                    }
                },
                // // NOT WORKING
                // change: function(foo) {
                //     console.log('CHANGE!');
                // },
                // this works
                afterrender: function(foo) {
                    console.log('afterrender');
                },
                // change: {
                //     element: 'el', //bind to the underlying el property on the panel
                //     fn: function(cb, checked) {
                //         //Ext.getCmp('myTextField').setDisabled(!checked);
                //         Ext.Msg.alert('You changed something'); 
                //         console.log('CHECKED: ' + checked);
                //     },
                //     fn2: function(cb, newVal, oldVal) {
                //         //Ext.getCmp('myTextField').setDisabled(!checked);
                //         console.log('CHECKED: ' + newVal);
                //     }
                // },
                click: {
                    element: 'el', //bind to the underlying el property on the panel
                    fn: function(){ 
                        //Ext.Msg.alert('You clicked something');
                        console.log('CLICKED: (something)');
                    }
                }
             }
            // items: [
            //     {boxLabel: 'Do foo', name: 'task', inputValue: '1', id: 'box1', checked: true},
            //     {boxLabel: 'Do bar-baz', name: 'task', inputValue: '1', id: 'box1', checked: false}
            // ]
        });
        return grp;
    },

    // TODO add a listener to each box
    createCheckbox: function(taskName, count) {
        var me = this;
        //var group = Ext.getCmp('conditions');
        // TODO the 'id' must be more unique; add projectName or tabName or tabNumber
        // TODO its possible 'name' may also need to be more unique

        // this rendered 'Object object'
        // var label = new Ext.form.Label({
        //     //itemId: 'box' + count,
        //     //text: 'http://your-link-here.com',
        //     autoEl: {
        //         tag: 'a',
        //         href: '#',
        //         html: taskName
        //     },
        // });

        var checkboxFieldClass = 'checkboxFieldClass';
        var checkbox = new Ext.form.field.Checkbox({
            boxLabel: '<a href="#" class="taskName">' + taskName + '</a>',
            boxLabelCls: checkboxFieldClass,
            value: taskName,
            name: 'task',
            //itemId: me.createLegalIdNameFromString(taskName) + '_box_' + count,
            itemId: 'box' + count,
            inputValue: '1', // TODO
            checked: false,
            // found: http://stackoverflow.com/questions/15160466/enable-disable-text-field-on-checkbox-selection-extjs
            listeners: {
                change: function(checkbox, newValue, oldValue, eOpts) {
                    console.log('CHECKBOX CHANGED');
                    console.log(this.boxLabel);  // this works
                },
                render: function(component) {
                    component.getEl().on('click', function(event) {
                        //VP.util.Utils.dumpObject(component.getEl().down('.boxLabelCls').dom.innerText);
                        //console.log(component.getEl().down('.boxLabelCls').dom.innerText);
                        event.stopEvent();
                        var taskText = component.getEl().down('.'+checkboxFieldClass).dom.innerText;
                        Ext.Msg.alert('Now Working On', taskText); 
                    });    
                }
            }            
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
















