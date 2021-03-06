app.controller("SigninController", ["$scope", "$ionicLoading", "$window", "$state", "AlertService", "SigninService", "GetCurrentService", function($scope, $ionicLoading, $window, $state, AlertService, SigninService, GetCurrentService) {
	//$scope.signinData = {};
	$scope.alerts = [];


	$scope.submitSigninData = function(data)  {
		  $ionicLoading.show();
			$scope.signinData = data;
			SigninService.signin(data)
				.then(function(result) {
					$ionicLoading.hide();
					if(result.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.message};
						//three potential cases here: receiving volunteer, receiving admin, giving admin
						//Receiving volunteer redirects to the listing page, the other two go to their respective landing pages
						GetCurrentService.fetchVolCurrent()
							.then(function(result) {
								if(result.data.status === 200) {
									if(result.data.data.volIsAdmin === true) {
										GetCurrentService.fetchOrgCurrent()
											.then(function(result) {
												if(result.data.status === 200) {
													if(result.data.data.orgType === "G") {
														//giving admin
														$state.go('tab.dashboard');
													} else if(result.data.data.orgType === "R") {
														//receiving admin
														$state.go('tab.dashboard');
													}
												} else {
													$scope.alerts[0] = {type: "danger", msg: result.message};
												}
											});
									} else {
										//receiving volunteer
										$state.go('tab.dashboard');
									}
								} else {
									$scope.alerts[0] = {type: "danger", msg: result.message};
								}
							});

					} else {
						$scope.alerts[0] = {type: "danger", msg: result.message};
						console.log(result);

					}
				});
		}, function() {
			$scope.signinData = {};
		};

}]);