include .env

emulator:
	@echo "Starting Firebase Emulator"
	firebase emulators:start

emulator-import:
	@echo "Importing Firebase Emulator"
	firebase emulators:start --import=testdata --project $(VITE_APP_FIREBASE_PROJECT_ID)

emulator-export:
	@echo "Exporting Firebase Emulator"
	firebase emulators:export testdata --project $(VITE_APP_FIREBASE_PROJECT_ID)

install:
	npm install
	cd ./functions && npm install