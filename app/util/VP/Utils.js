Ext.define('VP.util.Utils', {

    statics : {

    	// 'dump' all object details to the console for debugging
        dumpObject: function(obj) {
            var output, property;
            for (property in obj) {
                output += property + ': ' + obj[property] + '; ';
            }
            console.log(output);
        },

        // returns a string with each 'word' in the string capitalized
        capitalizeEachWord: function(str) {
		    return str.replace(/\w\S*/g, function(txt) {
		        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		    });
		},

		// returns a string with all blank spaces removed
		removeSpaces: function(str) {
		    return str.replace(/ /g, '');
		},

		// removes any character not in [a-zA-Z_0-9]
		stripNonWordCharacters: function(str) {
		    return str.replace(/\W/g, '_');
		},

		stringsAreEqualIgnoringCase: function(s1, s2) {
			if (s1.trim().toLowerCase() == s2.trim().toLowerCase()) {
				return true;
			} else {
				return false;
			}
		}

    }
});

