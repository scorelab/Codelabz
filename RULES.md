````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	//functions
    function getReportData(reportID){
    	return get(/databases/$(database)/documents/bz_reports/$(reportID)).data
    }

    function getAfterReportData(reportID){
    	return getAfter(/databases/$(database)/documents/bz_reports/$(reportID)).data
    }

  	function existingData() {
      return resource.data
    }

    function incomingData() {
      return request.resource.data
    }

    function isAUserOfOrganization(org_handle){
    	return get(/databases/$(database)/documents/bz_org_user_permissions/$(org_handle))
      .data
      .keys()
      .hasAny([request.auth.uid])
    }

    function checkUserExistInPermissionsArray(reportID){
    	return get(/databases/$(database)/documents/bz_org_user_permissions/$(getReportData(reportID).org_handle)).data.keys().hasAny([request.auth.uid])
    }

    function getPermissionsArray(reportID){
    	return get(/databases/$(database)/documents/bz_org_user_permissions/$(getReportData(reportID).org_handle)).data[request.auth.uid]
    }

    function checkUserTypeIsHacker(){
    	return exists(/databases/$(database)/documents/bz_hacker_orgs/$(request.auth.uid)) &&
      get(/databases/$(database)/documents/bz_hacker_orgs/$(request.auth.uid)).data.org.size() == 0
    }

    function checkUserTypeIsOrg(){
    	return exists(/databases/$(database)/documents/bz_hacker_orgs/$(request.auth.uid)) &&
      get(/databases/$(database)/documents/bz_hacker_orgs/$(request.auth.uid)).data.org.size() > 0
    }

    function isRequesterHasPermission(reportID){
    	return (request.auth.uid != null &&
      (checkUserExistInPermissionsArray(reportID) && 1 in getPermissionsArray(reportID))
      ) ||
      (request.auth.uid != null &&
      (checkUserExistInPermissionsArray(reportID) && 2 in getPermissionsArray(reportID))
      )
    }

    function getUserPermissionsArray(org_handle){
    	return get(/databases/$(database)/documents/bz_org_user_permissions/$(org_handle)).data[request.auth.uid]
    }

    function allowManageProgram(org_handle){
    	return isAUserOfOrganization(org_handle) && 3 in getUserPermissionsArray(org_handle)
    }

    function allowUserManagement(org_handle){
    	return isAUserOfOrganization(org_handle) && 3 in getUserPermissionsArray(org_handle)
    }

    function isUserAuthedAndVerified(){
    	return request.auth.uid != null &&
      request.auth.token.email_verified == true
    }

    function getHackerData(){
    	return get(/databases/$(database)/documents/bz_hacker/$(request.auth.uid))
      .data
    }

    function getAfterHackerData(){
    	return getAfter(/databases/$(database)/documents/bz_hacker/$(request.auth.uid))
      .data
    }

    function getOrgGeneralData(org_handle){
    	return get(/databases/$(database)/documents/bz_org_general/$(org_handle))
      .data
    }

    function getAfterOrgGeneralData(org_handle){
    	return getAfter(/databases/$(database)/documents/bz_org_general/$(org_handle))
      .data
    }
    //functions


    //allow only owners can create,update their profile data
  	match /bz_hacker/{hk_handle} {
  		allow read: if isUserAuthedAndVerified();

      allow create: if request.auth.uid == hk_handle &&
      (
      incomingData().get('email',null) != null &&
      incomingData().email
      .matches('\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}\\b')
      ) &&
      (
      incomingData().get('createdAt',null) != null &&
      incomingData().createdAt is timestamp
      ) &&
      (
      incomingData().get('handle',null) != null &&
      incomingData().get('handle',null) == hk_handle &&
      incomingData().handle.matches('^[a-zA-Z0-9]+$')
      )&&
      (
      incomingData().get('uuid',null) != null &&
      incomingData().get('uuid',null) == hk_handle &&
      incomingData().uuid.matches('^[a-zA-Z0-9]+$')
      )&&
      (
      incomingData().get('location',null) != null
      )

      allow update: if request.auth.uid == hk_handle &&
      (
      getAfterHackerData().handle ==
      hk_handle &&
      getAfterHackerData().createdAt ==
      getHackerData().createdAt &&
      getAfterHackerData().email ==
      getHackerData().email &&
      getAfterHackerData().uuid ==
      hk_handle
      )
  	}


    match /bz_hacker_orgs/{hk_handle} {
  		allow read: if isUserAuthedAndVerified();
  		allow write: if isUserAuthedAndVerified();
  	}

     match /bz_hacker_zero_points/{hk_handle} {
  		allow read: if true;
  	}


    match /bz_hacker_rewards/{hk_handle}{

      allow read: if request.auth.uid == hk_handle;

      match /Bounty/{reportID}{
      	allow read: if request.auth.uid == hk_handle ||
        isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);

      	allow update: if request.auth.uid == hk_handle;

      }

      match /Swag/{reportID}{
      	allow read: if request.auth.uid == hk_handle ||
        isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);

      	allow update: if request.auth.uid == hk_handle;

      }

  	}


    //disallow write
  	match /bz_org_permissions/{permissions}{
  		allow read,write: if false;
  	}

    //disallow write
  	match /bz_org_setup/{setup}{
  		allow read: if isUserAuthedAndVerified();
  		allow write: if false;
  	}

    //disallow write
    match /bz_org_setup/BugTypes/BugTypesCollection/{CWE_Code}{
    	allow read: if isUserAuthedAndVerified();
      allow write: if false;
    }

    //disallow write
    match /bz_org_setup/Countries/Countries/{country}{
    	allow read: if true;
      allow write: if false;
    }

    //disallow write
  	match /bz_organization/{organization}{
  		allow read: if isUserAuthedAndVerified();
  		allow write: if false;
  	}

    //allow read if authenticated
    //allow write if the requester has Manage Program Permissions
    match /bz_org_general/{org_handle}{
  		allow read: if isUserAuthedAndVerified();

      allow create: if false;

      allow update: if allowManageProgram(org_handle) &&
      (
      getOrgGeneralData(org_handle).org_email ==
      getAfterOrgGeneralData(org_handle).org_email &&
      getOrgGeneralData(org_handle).org_created_date ==
      getAfterOrgGeneralData(org_handle).org_created_date &&
      getOrgGeneralData(org_handle).org_handle ==
      getAfterOrgGeneralData(org_handle).org_handle &&
      getOrgGeneralData(org_handle).org_name ==
      getAfterOrgGeneralData(org_handle).org_name
      )
  	}

    //allow read if the requester is a organization user
    //allow write if the requester has User Management Permissions
    match /bz_org_group/{org_handle}{
  		allow read: if isAUserOfOrganization(org_handle)
  		allow write: if allowUserManagement(org_handle) &&
      (
      getAfter(/databases/$(database)/documents/bz_org_group/$(org_handle))
      .data.keys().hasAll(['Admin','Standard'])
      )
  	}

    //allow read if authenticated
    //allow write if the requester has Manage Program Permissions
    match /bz_org_metrics/{org_handle}{
  		allow read: if isUserAuthedAndVerified();
  		allow write: if allowManageProgram(org_handle)
  	}

    //allow read if authenticated
    //allow write if the requester has Manage Program Permissions
    match /bz_org_program/{org_handle}{
  		allow read: if isUserAuthedAndVerified();
  		allow write: if allowManageProgram(org_handle)
  	}


    match /bz_org_rewards/{org_handle}{

    	allow read: if isUserAuthedAndVerified() &&
      allowManageProgram(org_handle);

      match /Bounty/{reportID}{
      	allow read: if isUserAuthedAndVerified() &&
      allowManageProgram(org_handle);
      }

      match /Swag/{reportID}{
      	allow read: if isUserAuthedAndVerified() &&
      allowManageProgram(org_handle);
      }

  	}


    //allow read if authenticated
    //write if the requester has User Management Permissions
    match /bz_org_users/{org_handle}{
  		allow read: if isUserAuthedAndVerified();
      allow write: if allowUserManagement(org_handle)
  	}

    //allow read if the requester is in the organization
    //disallow write
    match /bz_org_user_permissions/{org_handle}{
    	allow read: if isAUserOfOrganization(org_handle);
  		allow write: if false;
  	}

    //allow read, write of the requester has Manage Program Permissions
    match /bz_app_reqs/{org_handle} {
   		allow read,write: if allowManageProgram(org_handle)
		}

    //allow read only if the requesting user is authenticated
    //report is disclosed or the requesting user is a participant
    //or requester has permission to view the report
    //allow anyone who is authenticated to create a report
    //allow users who have permissions to update the reports
    //disallow anyone to delete the report
    //queries must match the security rules
  	match /bz_reports/{reportID}{

  		allow get,list: if
      (request.auth.uid == existingData().hk_handle) || //check if the requester is the reporter
      (isUserAuthedAndVerified() &&
      (existingData().visibility == "Disclosed" ||
      existingData().visibility == "Public")) || //check if the report is disclosed
      checkUserExistInPermissionsArray(reportID) //check if the requester has permission

      allow create: if isUserAuthedAndVerified();
      allow update: if isRequesterHasPermission(reportID) &&
      getReportData(reportID).org_handle ==
      getAfterReportData(reportID).org_handle &&
      getReportData(reportID).hk_handle ==
      getAfterReportData(reportID).hk_handle &&
      getReportData(reportID).created_time ==
      getAfterReportData(reportID).created_time &&
      getReportData(reportID).description ==
      getAfterReportData(reportID).description &&
      getReportData(reportID).impact ==
      getAfterReportData(reportID).impact &&
      getReportData(reportID).title ==
      getAfterReportData(reportID).title
      allow delete: if false;

      match /Private/References{
      	allow read: if false;
        allow write: if isRequesterHasPermission(reportID);
      }

      match /Files/Files{
      	allow read: if (isUserAuthedAndVerified() &&
        getReportData(reportID).visibility == "Public") ||
        checkUserExistInPermissionsArray(reportID) ||
        (request.auth.uid == getReportData(reportID).hk_handle);

        allow create,update: if request.auth.uid == getReportData(reportID).hk_handle;
      }
  	}



    match /bz_reports_archive/{reportID}{

  		allow get,list: if
      isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID); //check if the requester has permission


      match /Files/Files{
      	allow read: if isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);

      }
  	}



    //allow read if the requester has permissions
    //disallow write
  	match /bz_org_reports/{org_handle}{

  		allow read: if isAUserOfOrganization(org_handle);

      allow write: if false;
  	}


    //allow get,list if the requester has permission or the report is disclosed
    //or the requester is in a report participant
    //allow create if the requester is a hacker and a report participant
    //disallow org users to create documents in the collection
    //disallow delete
    match /bz_reports_hk_comments/{reportID}{
    	allow get,list: if (isUserAuthedAndVerified() &&
      (
      getReportData(reportID).visibility == "Public" ||
      request.auth.uid in getReportData(reportID).participants
      )) ||
      isRequesterHasPermission(reportID)

      allow create, update: if (isUserAuthedAndVerified() &&
      request.auth.uid == getReportData(reportID).hk_handle
      )

      allow delete: if false;

      match /{handle}/{timeStamp}{
        allow get,list: if (isUserAuthedAndVerified() &&
        (
        getReportData(reportID).visibility == "Public" ||
        request.auth.uid in getReportData(reportID).participants
        )) ||
        isRequesterHasPermission(reportID)

        allow create: if (isUserAuthedAndVerified() &&
        request.auth.uid == getReportData(reportID).hk_handle
        )

        allow update: if request.auth.uid == handle;
        allow delete: if false;
    	}
    }


    match /bz_reports_hk_comments_archive/{reportID}{
    	allow get,list: if isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);


      match /{handle}/{timeStamp}{
        allow get,list: if isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);
    	}
    }



    //allow get,list if the requester has permission or the report is disclosed
    //or the requester is in a report participant
    //allow create if the requester is a org user and a report participant
    //allow create if the requester has permission
    //disallow hackers to create documents in the collection
    //disallow delete
    match /bz_reports_org_comments/{reportID}{
    	allow get,list: if (isUserAuthedAndVerified() &&
      (
      getReportData(reportID).visibility == "Public" ||
      request.auth.uid in getReportData(reportID).participants
      )) ||
      isRequesterHasPermission(reportID)

      allow create, update: if isUserAuthedAndVerified() &&
      isRequesterHasPermission(reportID)

      allow delete: if false;

      match /{handle}/{timeStamp}{
        allow get,list: if (isUserAuthedAndVerified() &&
        (
        getReportData(reportID).visibility == "Public" ||
        request.auth.uid in getReportData(reportID).participants
        )) ||
        isRequesterHasPermission(reportID)

        allow create: if isUserAuthedAndVerified() &&
        request.auth.uid == handle &&
        isRequesterHasPermission(reportID)

        allow update: if request.auth.uid == handle;
        allow delete: if false;
    	}
    }


    match /bz_reports_org_comments_archive/{reportID}{
    	allow get,list: if isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);

      match /{handle}/{timeStamp}{
        allow get,list: if isUserAuthedAndVerified() &&
      checkUserExistInPermissionsArray(reportID);
    	}
    }


    match /bz_reports_notifications/{hk_handle}{
    	allow read,write: if false;

      match /notifications/{timeStamp}{
        allow read,write: if request.auth.uid == hk_handle;
    	}
    }


    match /bz_reports_votes/{reportID}{
    	allow read: if true;
      allow create,update: if isUserAuthedAndVerified();
    }


  	match /users/{userId} {
   		allow read: if request.auth.uid == userId;
   		allow write: if request.auth.uid == userId;
		}


    //allow read, write if the requester is the document holder
    match /bz_favourites/{hk_handle} {
   		allow read,write: if request.auth.uid == hk_handle;
		}


    //disallow read and write for the SessionData Document
    match /bz_session_data/SessionData {
   		allow read,write: if false;

      //allow read and create the requesters collection/documents
      //disallow update, delete
      match /{hk_handle}/{timeStamp}{
      	allow read,create: if request.auth.uid == hk_handle;
      }
		}


    //disallow read,write for the SessionRevokeData Document
    match /bz_session_revoke_data/SessionRevokeData {
   		allow read,write: if false;

      //allow only read the requesters collection/documents
      //disallow create, update, delete
      match /{hk_handle}/{Timestamp}{
      	allow read: if request.auth.uid == hk_handle;
      }
		}

    //disallow read
    //allow write if the requester is the document holder
    match /bz_payment_methods/{hk_handle} {
   		allow read: if false;
   		allow write: if request.auth.uid == hk_handle;
		}

    //allow read, write if the requester is the document holder
    match /bz_payment_methods_view/{hk_handle} {
   		allow read,write: if request.auth.uid == hk_handle;
		}
  }
}```
````
