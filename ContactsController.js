contactsApp.controller('ContactsController', ['$scope', 'ContactsService', 'GroupsService', function($scope, ContactsService, GroupsService) {
	GroupsService.retrieveGroups();
	$scope.selectedContact = null;
	$scope.getContactDetails = ContactsService.getContactDetails.bind(ContactsService);
	$scope.retrieveGroups = GroupsService.retrieveGroups.bind(GroupsService);
	$scope.groupsCurrentPage = GroupsService.groupsCurrentPage;
	$scope.currentContactIds = ContactsService.currentContactIds;


	$scope.handleGroupClick = function( groupId ){
		ContactsService.useGroup( groupId );
		ContactsService.getContacts( groupId );
	}

	$scope.handleContactClick = function( contactId ){
		$scope.selectedContact = ContactsService.getContactDetails( contactId );
	}
}]);