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

    // note: this is called before the user logs in (currently)
    init: function(application) {
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
                afterrender: this.onMainTabPanelAfterRender,
                tabchange: this.onMainTabPanelTabChange,
            },
            "taskListPanel": {
                activate: this.onTaskListPanelActivate,
                afterrender: this.onTaskListPanelAfterRender,
                beforerender: this.onTaskListPanelBeforeRender,
                beforestaterestore: this.onTaskListPanelBeforeStateRestore,
                enable: this.onTaskListPanelEnable,
                render: this.onTaskListPanelRender,
                show: this.onTaskListPanelShow,
                staterestore: this.onTaskListPanelStateRestore,
            }
        });
    },

    onTaskListPanelActivate: function(panel, options) {
        // console.log("ENTERED onTaskListPanelActivate");
        // // VP.util.Utils.dumpObject(panel);
        // if ('null' == panel) {
        //     console.log('  PANEL WAS NULL');            
        // }
        // //var textfield = panel.down('#taskTextfield');
        // //var textfield = panel.down('textfield[itemId=taskTextfield]');
        // //var textfield = Ext.getCmp('textfield[name=taskTextfield]');
        // //var textfield = panel.getComponent('taskTextfield');
        // var textfield = Ext.ComponentQuery.query('#taskTextfield').el;
        // console.log('  AFTER GETTING THE TEXTFIELD');
        // console.log(textfield);
        // if (null === textfield) {
        //     console.log('  TEXTFIELD WAS NULL');            
        // }
        // //textfield.focus(false, 200);
    },

    onTaskListPanelAfterRender: function(panel, options) {
        console.log("ENTERED onTaskListPanelAfterRender");
    },

    onTaskListPanelBeforeRender: function() {
        console.log("ENTERED onTaskListPanelBeforeRender");
    },

    onTaskListPanelBeforeStateRestore: function() {
        console.log("ENTERED onTaskListPanelBeforeStateRestore");
    },

    onTaskListPanelEnable: function() {
        console.log("ENTERED onTaskListPanelEnable");
    },

    onTaskListPanelRender: function() {
        console.log("ENTERED onTaskListPanelRender");
    },

    onTaskListPanelShow: function() {
        console.log("ENTERED onTaskListPanelShow");
    },

    onTaskListPanelStateRestore: function() {
        console.log("ENTERED onTaskListPanelStateRestore");
    },

    onLaunch: function() {
        console.log('ENTERED onLaunch');
        // i don't know why, but this needs to be here for the store
        // to *really* be loaded
    },

    // info on tab panel listeners:
    // http://blog.jardalu.com/2013/6/10/simple-tab-dynamic-content-extjs-sencha
    // http://goo.gl/llbcqn (long appfoundation.com url)
    onMainTabPanelTabChange: function(mainTabPanel, panel) {
        // panel (title: Finance; alias: widget.finance, etc.)
        console.log(panel.title);
        this.handleTabChange(panel.title, panel);
    },

    addTextfieldToPanel: function(textField, panel) {
        this.addTextfieldListener(textField);
        panel.add(textField);
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

        // TODO probably want a urlencoded tabname here
        // these add the params as cgi parameters to the GET url
        tasksStore.getProxy().extraParams.projectId = me.getProjectId(tabName);
        //tasksStore.getProxy().extraParams.projectName = tabName;

        // it's important to do these actions inside the load() method,
        // because the load process can fail, and you need to handle that failure
        tasksStore.load({
            callback: function(records, operation, success) {
                console.log('tasksStore.load called');
                console.log('    success:   ' + success);

                // clear the panel
                panel.removeAll();

                // add the textfield
                me.addTextfieldToPanel(me.createTextField(), panel);

                // add hidden fields with the projectId and status.
                // TODO can handle the status as a simple form param
                panel.add(me.createHiddenProjectIdField(tabName));
                panel.add(me.createHiddenStatusField());

                if (success == true) {
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
                        console.log('TASK: ' + task);
                        var checkbox = me.createCheckbox(task, count++);
                        me.addCheckboxToGroup(group, checkbox);
                    });
                    panel.add(group);
                    panel.doLayout();
                } else {
                    // the store didn't load, anything to do?
                }
            }
            // scope: this,
        });
        console.log('COUNT = ' + tasksStore.count());
    },

    // get the projectId from the projectName
    getProjectId: function(projectName) {
        var projectsStore = this.getProjectsStore();
        var project = projectsStore.findRecord('name', projectName);
        return project.get('id');
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

    createHiddenProjectIdField: function(projectName) {
        return Ext.form.Field({
            xtype: 'hiddenfield',
            name: 'projectId',
            value: this.getProjectId(projectName)
        });
    },

    createHiddenStatusField: function() {
        return Ext.form.Field({
            xtype: 'hiddenfield',
            name: 'status',
            value: 'c'
        });
    },

    createTextField: function() {
        return Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Task:',
            name: 'task',
            itemId: 'taskTextfield',
            autofocus: true,
            enableKeyEvents: true,
            listeners: {
                // this works, putting focus in the textfield
                afterrender: function(field) {
                    field.focus(false, 250);
                },
                // ADDOption1
                specialkey: function(field, event, options) {
                    console.log('ENTERED specialkey');
                    if (event.getKey() == event.ENTER) {
                        console.log('    got ENTER key');
                        console.log('    field value: ' + field.getValue());
                        // var saveBtn = field.up('researchLinkForm').down('button#save');
                        // saveBtn.fireEvent('click', saveBtn, event, options);
                    }                    
                }
            }
        });
    },

    // ADDOption2
    addTextfieldListener: function(textfield) {
        var me = this;
        textfield.on('keyup', function(field, event, options) {
            if (event.getCharCode() === event.ENTER) {
                var formPanel = textfield.up('form');
                var tasksStore = me.getTasksStore();
                // if the form is valid, send the data
                if (formPanel.getForm().isValid()) {
                    Ext.Ajax.request({
                        url: 'server/tasks/add',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        params : Ext.JSON.encode(formPanel.getValues()),
                        success: function(conn, response, options, eOpts) {
                            var result = Packt.util.Util.decodeJSON(conn.responseText);
                            if (result.success) {
                                Packt.util.Alert.msg('Success!', 'Task was saved.');
                                textfield.setValue();
                                // TODO do whatever is needed to add the checkbox to the list of checkboxes
                                // TODO should also sync up the store
                                // tasksStore.load();
                            } else {
                                Packt.util.Util.showErrorMsg(result.msg);
                            }
                        },
                        failure: function(conn, response, options, eOpts) {
                            // TODO get the 'msg' from the json and display it
                            Packt.util.Util.showErrorMsg(conn.responseText);
                        }
                    });
                }
            }
        });
    },
    
    createCheckboxGroup: function(nameOfId) {
        var grp = new Ext.form.CheckboxGroup({
            //fieldLabel: 'CheckboxGroup',
            //hideLabel: true,
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
                // works
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
        });
        return grp;
    },

    // TODO add a listener to each box
    createCheckbox: function(taskName, count) {
        var me = this;

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
            boxLabel: ' <a href="#" class="taskName">' + taskName + '</a>',
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
        console.log('ENTERED onMainTabPanelRender, trying to get ProjectsStore');
        var mainTabPanel = this.getMainTabPanel();
        //var tabsArray = new Array();
        var projectsStore = this.getProjectsStore();
        projectsStore.load({
            callback: function(records, operation, success) {
                console.log('projectsStore.load called');
                console.log('    success:      ' + success);
                if (success == true) {
                    projectsStore.each(function(record) {
                        //tabsArray.push(record.data.name);
                        var tab = mainTabPanel.add({
                            xtype: 'taskListPanel',
                            closable: false,
                            title: record.data.name, // the text on the tab
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
                } else {
                    console.log('    success was false (bad)');
                }
            }
        });

        mainTabPanel.setActiveTab(0);
        mainTabPanel.doLayout();
        // TODO i may need to create these tabs as an array so i can
        // access them, and also know which one is in the foreground
    },

    onMainTabPanelAfterRender: function(tabPanel, options) {
        console.log('ENTERED onMainTabPanelAfterRender');
        tabPanel.setActiveTab(0);
    }

});
















