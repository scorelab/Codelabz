# Important points while using the "test data" file:-
- You can use the data in the  "testdata" file by importing while starting the emulators,please refer firebase_import_export.md file for indetailed information.
- If you import the data using "testdata" file the you can see the sample data that contains users,sample tutorials and organisation details.
- If your using the script for importing and exporting the data, all the changes made in emulators will be reflecting the data associated in the "testdata" file upon exporting it.
- Don't perform export operation,if no changes are made to the emulators(like adding newuser, creating new orgs and create new codelabz tutorial) this may change the data in the testdata file.
- Do not use export operation if you haven't import the data from testdata before
  - You can perform export operation if you have performed import operation while starting the emulators so that the data from testdata file will i.e., remain no change or additional data is appended
# Export the Emulators data in your own file:-
Insted of using the pre-existing data file "testdata" you can export the data in your own file externally.
- To export the data to any external file you can use the below command in the terminal
```
firebase emulators:export file_name
```
- You can give the file name with preferred file location(on your local) in the "file_name" flag if you don't mention location ,the file will be created in the current folder itself and  if the file is already existing you are asked to over ride the data in it while performing this task.
- If the file isn't exist already a new file will be create at the given location with the given file name and data is exported into that file.
# Import data from your own file to Emulators:-
- You import that specific data file while starting emulators only using the following command:-
```
firebase emulators:start --import=file_name
```
