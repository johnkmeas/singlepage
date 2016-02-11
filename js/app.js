var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(function ($routeProvider) {

	$routeProvider
	.when('', {
		templateUrl: 'page/main.html',
		controller: 'MainCtrl'
	})
	.when('/', {
		templateUrl: 'page/main.html',
		controller: 'MainCtrl'
	})
	.when('/second', {
		templateUrl: 'page/second.html',
		controller: 'secondController'
	})
	.when('/about', {
		templateUrl: 'page/about.html',
		controller: 'aboutController'
	})
	.when('/contact', {
		templateUrl: 'page/contact.html',
		controller: 'contactController'
	})

});

myApp.controller('MainCtrl', ['$scope', function($scope) {
  $scope.categories = [
		{"id": 0, "name": "Development"},
		{"id": 1, "name": "Design"},
		{"id": 2, "name": "Exercise"},
		{"id": 3, "name": "Humour"},
	];
	$scope.bookmarks = [
		{"id": 0, "title": "Angular", "url": "http://angularjs.org", "category": "Development"},
		{"id": 1, "title": "Egg", "url": "http://google.ca", "category": "Design"},
		{"id": 2, "title": "Somehting", "url": "http://gmail.com", "category": "Exercise"},
		{"id": 3, "title": "fourhtkind", "url": "http://youtube.com", "category": "Humour"}
	];

	$scope.currentCategory = null;

	function setCurrentCategory(category) {
		$scope.currentCategory = category;
		cancelCreating();
		cancelEditing();
		console.log($scope.currentCategory);
	}

	function isCurrentCategory(category) {
		return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;

	}

	$scope.setCurrentCategory = setCurrentCategory;
	$scope.isCurrentCategory = isCurrentCategory;

	console.log($scope.currentCategory);
	
	// ---------------
	// CRUD
	function resetCreateForm() {
		$scope.newBookmark = {
			title: '',
			url: '',
			category: $scope.currentCategory.name
		}
	}

	function createBookmark(bookmark) {
		bookmark.id = $scope.bookmarks.length;

		$scope.bookmarks.push(bookmark);
		
		console.log('should be creating')
		resetCreateForm();
		$scope.isCreating = false;
	}

	$scope.createBookmark = createBookmark;

	$scope.editedBookmark = null;

	function setEditedBookmark(bookmark) {
		$scope.editedBookmark = angular.copy(bookmark);
	}

	function updateBookmark(bookmark) {
		var index = _.findIndex($scope.bookmarks, function(b){
			return b.id == bookmark.id;
		});
		$scope.bookmarks[index] = bookmark;

		$scope.editedBookmark = null;
		$scope.isEditing = false;
	}

	function isSelectedBookmark(bookmarkId) {
		return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkid;
	}
	$scope.setEditedBookmark = setEditedBookmark;
	$scope.updateBookmark = updateBookmark;
	$scope.isSelectedBookmark = isSelectedBookmark;

	function deleteBookmark(bookmark){
		_.remove($scope.bookmarks, function(b){
			return b.id == bookmark.id;
		});
	}

	$scope.deleteBookmark = deleteBookmark;
	//-------------------------------------------------
// Creating and editing states

	$scope.isCreating = false;
	$scope.isEditing = false;

	function startCreating() {
		$scope.isCreating = true;
		$scope.isEditing = false;

		resetCreateForm();
	}
	function cancelCreating() {
		$scope.isCreating = false;
	}	
	function startEditing() {
		$scope.isCreating = false;
		$scope.isEditing = true;
		resetCreateForm();
	}


	function cancelEditing() {
		$scope.isEditing = false;
	}	

	function shouldShowCreating(){
		return $scope.currentCategory && !$scope.isEditing;
	}	

	function shouldShowEditing(){
		return $scope.isEditing && !$scope.isCreating;
	}
	$scope.startCreating = startCreating;
	$scope.cancelCreating = cancelCreating;
	$scope.startEditing = startEditing;
	$scope.cancelEditing = cancelEditing;
	$scope.shouldShowCreating = shouldShowCreating;
	$scope.shouldShowEditing = shouldShowEditing;
}]);

myApp.controller('navapp', ['$scope', function($scope){
	$scope.company = {"name": "oneline",
		"business": "tshirt design and print"
		}

}]);

myApp.controller('aboutController', ['$scope', function($scope) {
	$scope.hello = 'justonelined';
}]);

myApp.controller('contactController', ['$scope', function($scope) {
	$scope.IsVisible = false;
    $scope.ShowHide = function () {
      	//If DIV is visible it will be hidden and vice versa.
         $scope.IsVisible = $scope.IsVisible ? false : true;
    }
}]);

myApp.controller('LoginController', ['$scope', function($scope) {

}]);

myApp.animation('.reveal-animation', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      element.fadeIn(300, done);
      return function() {
        element.stop();
      }
    },
    leave: function(element, done) {
      element.fadeOut(300, done)
      return function() {
        element.stop();
      }
    }
  }
})


//	$scope.name = nameService.name;
//	$scope.$watch('name', function() {
//		nameService.name = $scope.name;
//	})
//	$log.log(nameService.name);
//	$log.log(nameService.namelength());


/*
myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function($scope, $log, $routeParams, nameService){

	$scope.num = $routeParams.num || 1;

	$scope.name = nameService.name;

	$scope.$watch('name', function() {
		nameService.name = $scope.name;
	})

}]);

myApp.directive('someList', function(){
	return {
		restrict
	}
})

myApp.directive('searchResult', function() {
	return {
		restrict:'AECM',
		templateUrl: 'directive/searchresult.html',
		replace: true,

		scope: { //restricting the scope to following attributes
			personObject: "=",
			formattedAddressFunction: "&"
			// isolates the scope, can't directly affect the parent pages
		},
		transclude: true
	}
});
*/
// grab <input id="range-example" type="range" min="0" max="5" step="1"> from the page
//var rangeInput = document.querySelector('input#range');

// grab <p id="output"></p> to display the output
//var output = document.querySelector('p#output');

// update the display when the range changes
//rangeInput.onchange = function() {
//		output.innerHTML = this.value;
//};

	