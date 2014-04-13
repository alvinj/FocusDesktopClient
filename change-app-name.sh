#!/bin/sh

OLD_APP_NAME='ExtJSLogin'
NEW_APP_NAME='Focus'
FILELIST=files.txt

# to use this script:
#
# 1) create `files.txt` like this:
#
#    find . -type f -exec grep -l 'ExtJSLogin' {} \; | grep -v 'change-app-name.sh' > files.txt
#
# 2) change the NEW_APP_NAME in this script
#
# 3) run this script to change the application name in all the files
#

for file in `cat $FILELIST`
do
  # need the empty '' on mac osx systems
  sed -i '' "s/$OLD_APP_NAME/$NEW_APP_NAME/g" $file
done


