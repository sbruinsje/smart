contactsApp.service('GroupsService', ['$http', function($http) {
	this.currentOffset = 0;
	this.limit = 2;
	this.totalNumberOfGroups = null;
	this.groups = [];
	this.groupsCurrentPage = [];

	this.retrieveGroups = function(){
		var url = "http://149.210.212.199:9000/groups/?offset="+this.currentOffset+"&limit="+this.limit;
		$http.get(url).then(function(response) {
			// check for error...
			var data = response.data;
			this.totalNumberOfGroups = data.count;

			this.groupsCurrentPage.length = 0; // empty the array

			for( var i=0; i<data.results.length; i++){
				this.groupsCurrentPage.push(data.results[i]);
				this.groups.push( data.results[i])
			}
    	}.bind(this)); 
	}



}]);