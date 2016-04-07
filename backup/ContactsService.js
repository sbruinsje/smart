contactsApp.service('ContactsService', ['$http','$q', function($http, $q) {
	this.currentGroup = 0;
	this.currentOffset = 0;
	this.limit = 10;
	this.totalNumberOfContacts = null;
	this.membershipsCurrentPage = [];
	this.contactsCurrentPage = [];
	this.contacts = [];
	this.contactUrlsCurrentGroup = [];
	this.currentContacts = [];


	this.useGroup = function( groupId ){
		this.currentGroup = groupId;
		this.currentOffset = 0;
	}


	this.getContacts = function( groupId ){
		var promise = this.getContactsInGroup( groupId ).then( function(){
			return this.retrieveContacts( this.contactUrlsCurrentGroup );
		}.bind(this), function(){
			console.log("failed");
		}.bind(this));
	}

	this.retrieveContacts = function( contactUrls ){
		var promises = [];
		for( var i=0; i<contactUrls.length; i++ ){
			var contactUrl = contactUrls[i];
			var promise = $http.get(contactUrl).then(function(response) {
				var data = response.data;
				this.currentContacts.length = 0;
				this.currentContacts.push(data);
			}.bind(this));
			promises.push( promise );
		}

		return $q.all( promises );	 
	}

	this.getContactsInGroup = function( groupId ){
		var url = "http://149.210.212.199:9000/groups/"+groupId;
		console.log(url);
		return $http.get(url).then(function(response) {
			this.contactUrlsCurrentGroup = response.data.contacts;
    	}.bind(this)); 
	}



}]);