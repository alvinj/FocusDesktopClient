Ext.define('VP.util.Utils', {

    statics : {

        dumpObject: function(obj) {
            var output, property;
            for (property in obj) {
                output += property + ': ' + obj[property] + '; ';
            }
            console.log(output);
        }

    }
});

