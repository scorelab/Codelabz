# Start up Emulators
#### The Emulators can be start based on the user preferences:-
**NOTE**:- To Run the webpage First you need to start Emulators to load the Database You can start the emulators in different mode.
### **Initial Start** 
- To Start all the emulators at a time we can use the command `firebase emulators:start` 

![image](https://user-images.githubusercontent.com/80961448/176614967-c3fd2564-6661-49c5-a44f-73b1b87847cf.png)

### **Start Particular Emulator** 
- By including `--only` flag will  Limit which emulators to start. Supply a comma-separated list of emulator names, specifying one or more of 'auth', 'database', 'firestore', 'functions', 'hosting', or 'pubsub'. 
- Example:-`firebase emulators:start --only firestore` will start the firestore emulator only.

# Import Data to Emulators
- To import data to emulators there should be a pre-exisiting data file which contains data about respective Emulators.
- we can get the data file by exporting it from the database emualators(if your are using for first time the must be created).
- To import data we can use the command in terminal while starting the emulators `firebase emulators:start --import=file_name`, the file name can be any thing if the file exist in the project folder then the data from it is imported to the firebase local emulators.

![image](![image](https://user-images.githubusercontent.com/80961448/183344475-bd45326a-3cac-4057-a33e-97218b64c875.png)

# Export Data From Emulators
- To export data from Local Emulators use the command `firebase emulators:export file_name`
- if the path is specified for the file the data is stored at the particular location else it will be in the stored in the project file itself
- if the file_name is already exisiting the data in the file is overidded else the new file will be created if the file isn't exist already.

![image](https://user-images.githubusercontent.com/80961448/176616740-d31e4572-25be-4249-b598-96cf87d04b59.png)

