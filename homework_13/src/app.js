var app = angular.module('blogApp', []);
app.controller('blogItems', function ($scope) {
  console.log($scope)

  $scope.defaultPosts = defaultPosts;
  $scope.filtredItems = ['All'];
  $scope.propertyName = 'All';
  $scope.showAddForm = false;
  let addPostBtn = angular.element(document.querySelector('.add-post'));
  let formInputFields = angular.element(document.querySelectorAll('.new-post-info'));

  function addFilterCategories() {
    defaultPosts.forEach(e => {
      let element = e.categories;
      for (let i = 0; i < element.length; i++) {
        if (!$scope.filtredItems.includes(element[i])) {
          $scope.filtredItems.push(element[i])
        } else {
          continue;
        }
      }
    });
  }
  function splitCategString(categ) {
    let arr = [];
    let arrayOfStrings;
    categ.includes(' ') ?
      arrayOfStrings = categ.split(' ') :
      arrayOfStrings = categ.split(',');

    arrayOfStrings.forEach(e => {
      arr.push(e);
    });

    return arr;
  }

  this.filterBy = function (propertyName) {

    $scope.propertyName = propertyName;
    let tempArr = defaultPosts;
    console.log(tempArr)
    if (propertyName === 'All') {
      $scope.defaultPosts = defaultPosts;
    } else {
      $scope.defaultPosts = tempArr.filter(e => {
        let val = false;
        for (let i = 0; i < e.categories.length; i++) {
          if (e.categories[i] === propertyName) {
            val = true;
          }
        }
        return val;
      });
    }
  }
  
  this.getBlogItems = function () {
    return $scope.defaultPosts;
  }
  this.getFiltredItems = function () {
    addFilterCategories();
    return $scope.filtredItems;
  }
  this.addNewPostForm = function () {
    addPostBtn.addClass('active')
    $scope.showAddForm = !$scope.showAddForm;
  }  
  this.addBlogItem = function () {
    let filledFieldCounter = 0;

    angular.forEach(formInputFields, function (value, key) {
      let element = angular.element(value);
      
      let emptyField = angular.element("<span class='empty-field'></span>");
      emptyField.text("Field can't be blank");

      if (!element.hasClass('ng-empty')) {
        filledFieldCounter++;
        element.removeClass('not-filled');
        element.parent().find('span').remove();
      } else if (element.hasClass('ng-empty')) {
        element.addClass('not-filled');
        element.parent().prepend(emptyField);
      }

      if (formInputFields.length === filledFieldCounter) {
        if (!$scope.photo) {
          $scope.photo = 'default.jpg';
        }

        element.removeClass('not-filled');
        angular.element(addPostBtn).removeClass('active');
        $scope.showAddForm = !$scope.showAddForm;

        $scope.defaultPosts = defaultPosts;
        $scope.defaultPosts.push({
          title: $scope.title,
          categories: splitCategString($scope.categ),
          description: $scope.description,
          image: $scope.photo,
        });
        $scope.title = '';
        $scope.categ = '';
        $scope.description = '';
        $scope.photo = '';

        addFilterCategories();
      }
    });
  };
});

app.directive('blogPost', function () {
  return {
    restrict: 'E',
    templateUrl: 'blog.html',
    scope: {
      title: "=",
      categories: "=",
      description: "=",
      image: "=",
      sorttag: "=",      
    },
    link: function (scope) {
      
      scope.editorEnabled = false;
      scope.editableTitle = scope.title;
      scope.editableDescription = scope.description;
      
      scope.enableEditor = function (event) {
        let editBtn = angular.element(event.target);

        scope.editorEnabled = !scope.editorEnabled;
        scope.editorEnabled ? editBtn.text('save') : editBtn.text('edit')
        scope.title = scope.editableTitle;
        scope.description = scope.editableDescription;
      };
    }
  }
});