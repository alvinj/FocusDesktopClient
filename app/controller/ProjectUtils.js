Ext.define('Focus.controller.ProjectUtils', {
	extend: 'Ext.Base',

    statics : {

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

        createCheckbox: function(taskName, count) {
            //var group = Ext.getCmp('conditions');
            var checkbox = new Ext.form.field.Checkbox({
                boxLabel: taskName,
                name: 'task',
                id: 'box' + count,      // TODO
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
	    }

    }
});

