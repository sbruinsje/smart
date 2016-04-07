contactsApp.service('ContactsService', ['$http','$q', function($http, $q) {
	this.currentGroup = 0;
	this.currentOffset = 0;
	this.limit = 10;
	this.totalNumberOfContacts = null;
	this.membershipsCurrentPage = [];
	this.contactsCurrentPage = [];
	
	this.contactUrlsCurrentGroup = [];
	this.contactInfo = {};
	this.currentContactIds = [];


	this.useGroup = function( groupId ){
		this.currentGroup = groupId;
		this.currentOffset = 0;
	}


	this.getContacts = function( groupId ){
		var promise = this.getContactsInGroup( groupId ).then( function(){
			return this.retrieveContacts( this.contactUrlsCurrentGroup ).then( function(){
				//console.log( "currentContactIds="+this.currentContactIds, this.contactInfo);
			}.bind(this));
		}.bind(this), function(){
			console.log("failed to retrieve the contacts for given group. ");
		}.bind(this));
	}

	this.getContactsInGroup = function( groupId ){
		var url = "http://149.210.212.199:9000/groups/"+groupId;
		return $http.get(url).then(function(response) {
			this.contactUrlsCurrentGroup = response.data.contacts;
    	}.bind(this), function(){
    		console.log("failed to retrieve list of contacts for given group.");
    	}); 
	}

	this.retrieveContacts = function( contactUrls ){
		var promises = [];
		for( var i=0; i<contactUrls.length; i++ ){
			var contactUrl = contactUrls[i];
			var promise = $http.get(contactUrl).then(function(response) {
				var contact = response.data;
				this.currentContactIds.length = 0;
				this.currentContactIds.push(contact.id);
				this.contactInfo[contact.id] = contact;
			}.bind(this));
			promises.push( promise );
		}

		return $q.all( promises );	 
	}

	this.getContactDetails = function( contactId ){
		console.log( contactId );
		return this.contactInfo[contactId];
	}
	



}]);