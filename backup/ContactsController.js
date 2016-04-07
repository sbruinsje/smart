contactsApp.controller('ContactsController', ['$scope', 'ContactsService', 'GroupsService', function($scope, ContactsService, GroupsService) {
	GroupsService.retrieveGroups();
	

	$scope.retrieveGroups = GroupsService.retrieveGroups.bind(GroupsService);
	$scope.groupsCurrentPage = GroupsService.groupsCurrentPage;
	$scope.currentContacts = ContactsService.currentContacts;


	$scope.handleGroupClick = function( groupId ){
		ContactsService.useGroup( groupId );
		ContactsService.getContacts( groupId );
	}
}]);