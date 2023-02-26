include .env

emulator:
	@echo "Starting Firebase Emulator"
	firebase emulators:start

emulator-import:
	@echo "Importing Firebase Emulator"
	firebase emulators:start --import=testdata --project $(FIREBASE_PROJECT_ID)

emulator-export:
	@echo "Exporting Firebase Emulator"
	firebase emulators:export testdata --project $(FIREBASE_PROJECT_ID)
