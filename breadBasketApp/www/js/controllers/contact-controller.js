app.controller("ContactController", ["$scope", "ContactService", function($scope, ContactService) {
	$scope.contactData = {};

	//$scope.openContactModal = function() {
	//	var ContactModalInstance = $uibModal.open({
	//		templateUrl: "../../js/views/contact-modal.php",
	//		controller: "ContactModal",
	//		resolve: {
	//			contactData: function() {
	//				return ($scope.contactData);
	//			}
	//		}
	//	});
	//	ContactModalInstance.result.then(function(contactData) {
	//		$scope.contactData = contactData;
	//		ContactService.contact(contactData);
    //
    //
	//	});
	//};
}]);