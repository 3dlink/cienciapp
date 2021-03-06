// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ionic.service.core', 'ionic.service.push', 'jrCrop', 'ngDialog'])

.run(function($rootScope, $ionicPlatform, $ionicPopup, $state, $location, ngDialog) {
  // $rootScope.AssignedDate = Date;
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function (event) {

    if ($state.current.name == "home") { // In this condition user is prompted to exit app
        $ionicPopup.confirm({
            title: 'Cerrar Sesión',
            template: 'Está seguro de cerrar su sesión?',
            buttons: [
              {
                text: 'Cancelar',
                type: 'button-dark',
              },
              {
                text: '<b>Aceptar</b>',
                type: 'button-positive',
                onTap: function(e) {
                  // add your action
                  // ionic.Platform.exitApp();

                  localStorage.removeItem('current_user');
                  sessionStorage.removeItem('current_user');
                  $location.path('/login');
                }
              }
            ]
        });

  // ngDialog.open({
  //   template: 'templates/modal-default.html',
  //   controller: 'GruposCtrl',
  //   closeByEscape: true,
  //   data: {
  //     id_grupo: id
  //   }
  // });        
    } else {
      if ($state.current.name == "login") { // In this condition user is prompted to exit app
          $ionicPopup.confirm({
              title: 'Salir de CienciApp',
              template: 'Está seguro de salir de la aplicación?',
              buttons: [
                {
                  text: 'Cancelar',
                  type: 'button-dark',
                },
                {
                  text: '<b>Salir</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    // add your action
                    ionic.Platform.exitApp();
                  }
                }
              ]
          });
      } else {
          history.back(); //this will force to continue to previous page
      }
    }
    event.preventDefault();
  }, 100);
})

.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $ionicAppProvider){

  $stateProvider
  // .state('welcome',{
  //   cache: 'false',
  //   url: '/welcome',
  //   templateUrl: 'templates/welcome.html',
  //   controller: 'WelcomeCtrl'
  // })
  .state('login',{
    cache: 'false',
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/app.html",
    controller: 'AppCtrl'
  })
  .state('home', {
    cache: 'false',
    url: "/home",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })
  .state('perfil', {
    cache: 'false',
    url: "/perfil",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/perfil.html",
        controller: 'PerfilCtrl'
      }
    }
  })
  .state('aulas', {
    cache: 'false',
    url: "/aulas",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/aulas.html",
        controller: 'AulasCtrl'
      }
    }
  })
  .state('aula', {
    cache: 'false',
    url: "/aulas/:aulasID",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/aula.html",
        controller: 'AulaCtrl'
      }
    }
  })
  .state('grupos', {
    cache: 'false',
    url: "/grupos/:aulaID",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/grupos.html",
        controller: 'GruposCtrl'
      }
    }
  })
  .state('grupos.add', {
    cache: 'false',
    url: "/add",
    //parent: 'grupos',
    views: {
      'menuContent' :{
        templateUrl: "templates/grupos.add.html",
        controller: 'GruposCtrl'
      }
    }
  })
  .state('grupos.edit', {
    cache: 'false',
    url: "/edit/:grupoID",
    //parent: 'grupos',
    views: {
      'menuContent' :{
        templateUrl: "templates/grupos.edit.html",
        controller: 'GruposCtrl'
      }
    }
  })
  .state('general', {
    cache: 'false',
    url: "/general/:aulaID",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/general.html",
        controller: 'GeneralCtrl'
      }
    }
  })
  .state('general.add', {
    cache: 'false',
    url: "/add",
    //parent: 'general',
    views: {
      'menuContent' :{
        templateUrl: "templates/general.add.html",
        controller: 'GeneralCtrl'
      }
    }
  })
  .state('general.edit', {
    cache: 'false',
    url: "/edit/:temaID",
    //parent: 'grupos',
    views: {
      'menuContent' :{
        templateUrl: "templates/general.edit.html",
        controller: 'GeneralCtrl'
      }
    }
  })
  .state('general.view', {
    cache: 'false',
    url: "/view",
    //parent: 'temas',
    views: {
      'menuContent' :{
        templateUrl: "templates/general.theme.view.html",
        controller: 'GeneralCtrl'
      }
    }
  })
  .state('temas', {
    cache: 'false',
    url: "/temas/:grupoID",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/temas.html",
        controller: 'TemasCtrl'
      }
    }
  })
  .state('temas.add', {
    cache: 'false',
    url: "/add",
    //parent: 'temas',
    views: {
      'menuContent' :{
        templateUrl: "templates/temas.add.html",
        controller: 'TemasCtrl'
      }
    }
  })
  .state('temas.edit', {
    cache: 'false',
    url: "/edit/:temaID",
    //parent: 'grupos',
    views: {
      'menuContent' :{
        templateUrl: "templates/temas.edit.html",
        controller: 'TemasCtrl'
      }
    }
  })
  .state('temas.view', {
    cache: 'false',
    url: "/view",
    //parent: 'temas',
    views: {
      'menuContent' :{
        templateUrl: "templates/temas.view.html",
        controller: 'TemasCtrl'
      }
    }
  })
  .state('estudiantes', {
    cache: 'false',
    url: "/estudiantes/:aulaID",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/estudiantes.html",
        controller: 'EstudiantesCtrl'
      }
    }
  })
  .state('buscar', {
    cache: 'false',
    url: "/buscar",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/buscar.html",
        controller: 'BuscarCtrl'
      }
    }
  })
  .state('buscar.view', {
    cache: 'false',
    url: "/view",
    //parent: 'temas',
    views: {
      'menuContent' :{
        templateUrl: "templates/buscar.view.html",
        controller: 'BuscarCtrl'
      }
    }
  })
  .state('test_responsive', {
    cache: 'false',
    url: "/test_responsive",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/test_responsive.html",
        controller: 'TestResponsiveCtrl'
      }
    }
  })
  .state('mensajes', {
    cache: 'false',
    url: "/mensajes",
    parent: 'app',
    views: {
      'menuContent' :{
        templateUrl: "templates/mensajes.html",
        controller: 'MensajeCtrl'
      }
    }
  })
  .state('mensajes.add', {
    cache: 'false',
    url: "/add",
    // parent: 'mensajess',
    views: {
      'menuContent' :{
        templateUrl: "templates/mensajes.add.html",
        controller: 'MensajeCtrl'
      }
    }
  })
  .state('mensajes.view', {
    cache: 'false',
    url: "/view",
    // parent: 'mensajess',
    views: {
      'menuContent' :{
        templateUrl: "templates/mensajes.view.html",
        controller: 'MensajeCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

  $ionicAppProvider.identify({
    app_id: '05e0651e',
    api_key: 'a26f4944834ddb65e4a459f19ac4b8578c11d904a2f235a8',
    dev_push: true
  });
})


.directive('loader', function () {
  return {
    restrict: 'A',
    scope: {cond: '=loader'},
    template: '<button ng-if="isLoading()" class="button loading button-block"><img src="img/ajax-loader.gif" width="20" height="20" /><b>CARGANDO</b></button>',
    link: function (scope) {
      scope.isLoading = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('students', function () {
  return {
    restrict: 'A',
    scope: {cond: '=students'},
    template: '<p ng-if="isLoadingStudents()" style="margin-top: 0%; color: #322e69;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO ESTUDIANTES...</b></p>',
    link: function (scope) {
      scope.isLoadingStudents = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('classrooms', function () {
  return {
    restrict: 'A',
    scope: {cond: '=classrooms'},
    template: '<p ng-if="isLoadingClassrooms()" style="margin-top: 0%; color: #ffffff;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO AULAS...</b></p>',
    link: function (scope) {
      scope.isLoadingClassrooms = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('groups', function () {
  return {
    restrict: 'A',
    scope: {cond: '=groups'},
    template: '<p ng-if="isLoadingGroups()" style="margin-top: 0%; color: #ffffff;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO GRUPOS...</b></p>',
    link: function (scope) {
      scope.isLoadingGroups = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('group', function () {
  return {
    restrict: 'A',
    scope: {cond: '=group'},
    template: '<p ng-if="isLoadingGroup()" style="margin-top: 0%; color: #ffffff;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO GRUPO...</b></p>',
    link: function (scope) {
      scope.isLoadingGroup = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('themes', function () {
  return {
    restrict: 'A',
    scope: {cond: '=themes'},
    template: '<p ng-if="isLoadingThemes()" style="margin-top: 0%; color: black;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO TEMAS...</b></p>',
    link: function (scope) {
      scope.isLoadingThemes = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('theme', function () {
  return {
    restrict: 'A',
    scope: {cond: '=theme'},
    template: '<p ng-if="isLoadingTheme()" style="margin-top: 0%; color: black;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO TEMA...</b></p>',
    link: function (scope) {
      scope.isLoadingTheme = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('themeEdit', function () {
  return {
    restrict: 'A',
    scope: {cond: '=themeEdit'},
    template: '<p ng-if="isLoadingThemeEdit()" style="margin-top: 0%; color: #ffffff;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO TEMA...</b></p>',
    link: function (scope) {
      scope.isLoadingThemeEdit = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('answer', function () {
  return {
    restrict: 'A',
    scope: {cond: '=answer'},
    template: '<p ng-if="isLoadingAnswer()" style="margin-top: 0%; color: #000000;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO RESPUESTAS...</b></p>',
    link: function (scope) {
      scope.isLoadingAnswer = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('conversation', function () {
  return {
    restrict: 'A',
    scope: {cond: '=conversation'},
    template: '<p ng-if="isLoadingConversation()" style="margin-top: 0%; color: white;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO CONVERSACIONES...</b></p>',
    link: function (scope) {
      scope.isLoadingConversation = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('mensajestodos', function () {
  return {
    restrict: 'A',
    scope: {cond: '=mensajestodos'},
    template: '<p ng-if="isLoadingMessages()" style="margin-top: 0%; color: black;"><img src="img/ajax-loader.gif" width="20" height="20" /><b> CARGANDO MENSAJES...</b></p>',
    link: function (scope) {
      scope.isLoadingMessages = function() {
        var ret = scope.cond === true || (
            scope.cond &&
            scope.cond.$$state &&
            angular.isDefined(scope.cond.$$state.status) &&
            scope.cond.$$state.status === 0
        );
        return ret;
      };
    }
  };
})

.directive('onDeleteGroup', function($timeout) {
  return {
    restrict: 'A',
    replace: true,
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart', function(evt) {
        // Locally scoped variable that will keep track of the long press
        $scope.longPress = true;

        // We'll set a timeout for 600 ms for a long press
        $timeout(function() {
          if ($scope.longPress) {
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            $scope.$apply(function() {
              $scope.$eval($attrs.onDeleteGroup);
            });
          }
        }, 500);
      });

      // $elm.bind('touchend', function(evt) {
      //   // Prevent the onLongPress event from firing
      //   $scope.longPress = false;
      //   // If there is an on-touch-end function attached to this element, apply it
      //   if ($attrs.onTouchEnd) {
      //     $scope.$apply(function() {
      //       $scope.$eval($attrs.onTouchEnd);
      //     });
      //   }
      // });
    }
  };
})

.directive('onDeleteTheme', function($timeout) {
  return {
    restrict: 'A',
    replace: true,
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart', function(evt) {
        // Locally scoped variable that will keep track of the long press
        $scope.longPress = true;

        // We'll set a timeout for 600 ms for a long press
        $timeout(function() {
          if ($scope.longPress) {
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            $scope.$apply(function() {
              $scope.$eval($attrs.onDeleteTheme);
            });
          }
        }, 500);
      });
    }
  };
})

.factory('Comunicator',function(){
  var datos_user = "";

  return{
    setData:function(obj_json){
      datos_user = obj_json;
    },

    getData:function(){
      return datos_user;
    }
  };
})

.controller('WelcomeCtrl', function($scope){

})

.controller('LoginCtrl',function($window, $rootScope, $scope, $http, $location, Comunicator){

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoading = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.enviar = function () {
    var data_user = {
      username: $scope.cedula,
      password: $scope.password
    };

    // $rootScope.password_user = $scope.password;

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/login_api",
      data : data_user
    });

    request.success(function(data){

      if(data.id === undefined){
        alert(data.error);
        $scope.cedula = '';
        $scope.password = '';
      }else{

        $scope.Save = angular.toJson(data); //Save to storage
        sessionStorage.setItem('current_user',$scope.Save);
        localStorage.setItem('current_user',$scope.Save);
        sessionStorage.setItem('current_password_user',$scope.password);
        localStorage.setItem('current_password_user',$scope.password);
        //$scope.datos = JSON.parse(sessionStorage["current_user"]);
        $location.path('/app/home');
      }
    });
  };

  $scope.logout = function () {

    localStorage.removeItem('current_user');
    sessionStorage.removeItem('current_user');
    $location.path('/login');
  };

})

.controller('AppCtrl', function($scope){
  
})
.controller('HomeCtrl', function($scope, $http, $rootScope, Comunicator, $state){
  
  $scope.resultado = JSON.parse(sessionStorage["current_user"]); //Get from storage
  $scope.resultado = JSON.parse(localStorage["current_user"]);
  $scope.estado = $state.current.name;

})
.controller('PerfilCtrl', function($scope, $cordovaCamera, $rootScope, $cordovaFileTransfer, $ionicModal, $jrCrop){


    $scope.consultarPerfil = function () {
      $rootScope.resultado = JSON.parse(sessionStorage["current_user"]); //Get from storage
      $rootScope.resultado = JSON.parse(localStorage["current_user"]);
      $rootScope.downloadProgress = -1;
      if($rootScope.user_photo_change!=1){
        $rootScope.user_photo = $rootScope.resultado.photo;
      }
    };


    $scope.choosePhotoFirst = function () {

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        var id_user = $rootScope.resultado.id;
        var url_server = "http://www.3dlinkweb.com/cienciapp/start/upload_profile/"+id_user;

        var options2 = {
            fileKey: "file",
            chunkedMode: false,
            mimeType: "image/JPEG"
        };

        if(imageData){

          $cordovaFileTransfer.upload(url_server, imageData, options2).then(function (data) {
            alert("La imagen ha sido cargada correctamente!");
            $('#progress').css('display', 'none');
            $rootScope.user_photo_change = 1;
            $rootScope.user_photo = data['response'].substr(1,data['response'].length-2);;
          }, function (err) {
            console.log("ERROR: " + JSON.stringify(err));
          }, function (progress) {
            $rootScope.downloadProgress = (progress.loaded / progress.total) * 100;
          });

        }else{
          alert("Disculpe, ocurrió un error al cargar la imagen 1");
        }
      }, function (err) {
          alert("Disculpe, ocurrió un error al cargar la imagen");
      });
    };

  /*=========================================================================*/

})
.controller('AulasCtrl', function($scope, $http, $rootScope, $ionicPopup, $location, Comunicator){

  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]); //Get from storage
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

    // $scope.pruebas = [
    //   {name: "NUEVO", active: 0},
    //   {name: "aaaaaaaa", active: 1},
    //   {name: "bbbbbbbbbb", active: 1},
    //   {name: "otroooo", active: 1},
    // ];

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingClassrooms = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.consultarAulas = function () {
    var datos = {
      user_id: $rootScope.datos_session.id
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_subjects",
      data : datos
    });

    request.success(function(data){

      if(data[0].id === undefined){
        alert("ERROR: " + data);
        //$rootScope.resultado = data;
      }else{

        $rootScope.aulas = data;
        //alert($rootScope.aulas[0]);
      }
    });
  };

  $scope.activarSubject = function(idAula, idApiAula, nameAula) {
    var datos2 = {
      classroom: idApiAula,
      classroom_id: idAula,
      token: $rootScope.datos_session.token
    };

    // alert($rootScope.aulas[0].id_api);
    // alert($rootScope.aulas[0].id);
    // alert($rootScope.datos_session.token);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/classrooms/make_active",
      data : datos2
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
        //$rootScope.aulas = data;
      }else{

        //$rootScope.aulas = data[0];
        //alert("La materia "+ $rootScope.aulas[0].name +", fué activada con éxito!");

        $ionicPopup.confirm({
            title: 'Activación lista!',
            template: 'La materia '+ nameAula +', fué activada con éxito!',
            buttons: [
              {
                text: '<b>Aceptar</b>',
                type: 'button-positive'
              }
            ]
        });

        // alert("La materia "+ nameAula +", fué activada con éxito!");
        $rootScope.aulas = '';
        $scope.consultarAulas();

      }
    });
  };

})

.controller('AulaCtrl', function($scope, $http, $rootScope, $stateParams, $location){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

  // get the aula_id
  $rootScope.aula_id = $stateParams.aulasID;
  $scope.user_group = $rootScope.datos_session.user_group_id;

  $scope.listadoEstudiantes = function () {

    var datos3 = {
      classroom_id: $scope.aula_id,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students",
      data : datos3
    });

    request.success(function(data){

      if(data[0].id === undefined){
        alert("ERROR: " + data);
      }else{

        var output = [];
        angular.forEach(data, function(value, key) {
          output.push(value);
        });
        // console.log(output);
        $rootScope.estudiantesArray = output;
        $rootScope.estudiantes = data;
      }
    });
  };

  $scope.verForoGeneral = function () {

    // CONSULTO LOS TEMAS POR PRIMERA VEZ
    var datos_theme_general = {
      classroom_id: $stateParams.aulasID,
      group_id: -1
    };

    // console.log(datos5);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/all",
      data : datos_theme_general
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
        //$rootScope.resultado = data;
      }else{
        // console.log(data);

        // var output = [];
        // angular.forEach(data, function(value, key) {
        //   // console.log(value['Theme']);
        //   output.push(value['Theme']);
        // });

        // $rootScope.lista_general2 = data;
        // console.log(data);
        $rootScope.lista_temas_general = data;
        // $rootScope.listado_grupos = data;
      }
    });
  };

  $scope.verForoGrupal = function () {

    // CONSULTO LOS GRUPOS POR PRIMERA VEZ
    var datos5 = {
      user_id: $rootScope.datos_session.id,
      classroom_id: $stateParams.aulasID
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/group_list",
      data : datos5
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
        //$rootScope.resultado = data;
      }else{

        $rootScope.listado_grupos = data;
        // console.log($rootScope.listado_grupos.length);
        // console.log(typeof $rootScope.listado_grupos.length);
      }
    });
  };
})

.controller('GruposCtrl', function($window, $scope, $ionicPopup, $http, $location, $rootScope, $stateParams, ngDialog){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);
  $scope.iframeHeight = window.innerHeight-300;

  // get the aula_id and user_group_id
  $rootScope.aula_id = $stateParams.aulaID;
  $rootScope.grupo_id = $stateParams.grupoID;
  $scope.user_group = $rootScope.datos_session.user_group_id;

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingGroups = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingGroup = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingStudents = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.listadoEstudiantes = function () {

    var datos3 = {
      classroom_id: $rootScope.aula_id,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students",
      data : datos3
    });

    request.success(function(data){

      if(data[0].id === undefined){
        console.log("ERROR: " + data);
        //$rootScope.resultado = data;
      }else{

        var output = [];
        angular.forEach(data, function(value, key) {
          output.push(value);
        });
        // console.log(output);
        $rootScope.estudiantesArray = output;
        //$rootScope.estudiantes = data;
      }
    });
  };

  $scope.listarGrupos = function () {

    var datos5 = {
      user_id: $rootScope.datos_session.id,
      classroom_id: $rootScope.aula_id
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/group_list",
      data : datos5
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
        //$rootScope.resultado = data;
      }else{

        $rootScope.listado_grupos = data;
        // console.log($rootScope.listado_grupos);
      }
    });
  };

  $scope.itemOnDeleteGroup = function(idGroup) {

    $ionicPopup.confirm({
        title: 'Confirmar Eliminación',
        template: '¿Está seguro que desea eliminar este grupo?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Eliminar</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
              $scope.eliminarGrupo(idGroup);
            }
          }
        ]
    });
  };

  $scope.closeModalDelete = function () {
    //console.log("INTO closeSecond() !!!");
    ngDialog.close();
  };

  $scope.eliminarGrupo = function (grupoID) {

    var datos6 = {
      id: grupoID
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/delete",
      data : datos6
    });

    request.success(function(data){
      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{

        $scope.listarGrupos();
        $scope.closeModalDelete();
        $location.path('/app/grupos/'+$stateParams.aulaID);
      }
    });
  };

  $scope.crearGrupo = function() {
    var studentsToAdd = [];

    angular.forEach($scope.estudiantesArray, function(estudiante) {
      if (estudiante.checked) {
        studentsToAdd.push(parseInt(estudiante.id, 10));
      }
    });

    var datos4 = {
      classroom_id: $stateParams.aulaID,
      name: $scope.nombre,
      description: $scope.descripcion,
      students: studentsToAdd
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/create",
      data : datos4
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
        //$rootScope.resultado = data;
      }else{

        $scope.listarGrupos();
        $location.path('/app/grupos/'+$stateParams.aulaID);
      }
    });
  };

  $scope.consultarGrupo = function(idGrupo){

    var datos6 = {
      id: idGrupo,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/view",
      data : datos6
    });

    request.success(function(data){

      if(data['Group'].id === undefined){
        console.log("ERROR GRUPO: " + data);
        //$rootScope.resultado = data;
      }else{
        
        var checkbox_estudiantes = $rootScope.estudiantesArray;

        angular.forEach(checkbox_estudiantes, function(estudiante) {
          angular.forEach(data['User'], function(value2, key2) {
            if (value2.id === estudiante.id) {
              estudiante.checked = true;
            }
          });
        });

        $scope.estudiantes = checkbox_estudiantes;
        $rootScope.grupo = data['Group'];
        $rootScope.estudiantes_grupo = data['User'];
      }
    });
  };

  $scope.editarGrupo = function() {

    var studentsToEdit = [];

    angular.forEach($scope.estudiantesArray, function(estudiante) {
      if (estudiante.checked) {
        studentsToEdit.push(parseInt(estudiante.id, 10));
      }
    });

    var datos4 = {
      id: $scope.grupo_id,
      classroom_id: $scope.aula_id,
      name: $scope.grupo.name,
      description: $scope.grupo.description,
      students: studentsToEdit
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/groups/create",
      data : datos4
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{

        $rootScope.result = data[0];
        $scope.nombre = '';

        // alert("RETURN FROM http://www.3dlinkweb.com/cienciapp/groups/create: "+data[0]);
        $scope.listarGrupos();
        $location.path('/app/grupos/'+$stateParams.aulaID);
      }
    });
  };

  $scope.detalleGrupo = function(idGrupo, nombreGrupo, idAula) {

    $rootScope.nombre_grupo = nombreGrupo;
    // CONSULTO LOS TEMAS POR PRIMERA VEZ
    var datos5 = {
      classroom_id: idAula,
      group_id: idGrupo
    };

    // console.log(datos5);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/all",
      data : datos5
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
        //$rootScope.resultado = data;
      }else{
        // console.log(data);

        // var output = [];
        // angular.forEach(data, function(value, key) {
        //   // console.log(value['Theme']);
        //   output.push(value['Theme']);
        // });
        // console.log(data);
        // console.log(output);
        $rootScope.lista_temas_grupo = data;
        // $rootScope.listado_grupos = data;
      }
    });
  };
})

.controller('GeneralCtrl', function($window, $scope, $ionicPopup, $http, $ionicPlatform, $location, $rootScope, $stateParams, $cordovaFileTransfer, ngDialog, $cordovaInAppBrowser){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

  $rootScope.aula_id = $stateParams.aulaID;
  $rootScope.grupo_id = -1;
  $scope.user_group = $rootScope.datos_session.user_group_id;
  $scope.iframeHeight = window.innerHeight;
  $rootScope.subio = 0;

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingThemes = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingTheme = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingThemeEdit = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.viewPdf = function(link) {
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };
    $cordovaInAppBrowser.open(link, '_system', options);

  };


  $scope.uploadFile = function(files) {
    var fd = new FormData();
    fd.append("file", files[0]);

    $http.post('http://www.3dlinkweb.com/cienciapp/start/upload_file', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success(function(data){
      $rootScope.file_name = data.name;
      $rootScope.subio = 1;
      alert('El archivo se ha adjuntado correctamente.');
    }).error(function(data){
      alert('error subiendo archivo '+data);
      $rootScope.file_name = data.name;
      $rootScope.subio = 1;
    });
  }

  $scope.listarTemasGeneral = function () {

    var datos_theme_general = {
      classroom_id: $rootScope.aula_id,
      group_id: -1
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/all",
      data : datos_theme_general
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
        //$rootScope.resultado = data;
      }else{
        // var output = [];
        // angular.forEach(data, function(value, key) {
        //   // console.log(value['Theme']);
        //   output.push(value['Theme']);
        // });

        // $rootScope.lista_general2 = data;
        $rootScope.lista_temas_general = data;
        // console.log(lista_temas_general);
        // $rootScope.listado_grupos = data;
      }
    });
  };

  $scope.crearTemaGeneral = function(nombre,contenido,file_name) {

    var datos_theme_general = {
      tittle: nombre,
      theme: contenido,
      file: file_name,
      classroom_id: $rootScope.aula_id,
      group_id: -1,
      user_id: $rootScope.datos_session.id
    };



    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/add",
      data : datos_theme_general
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{
        $scope.listarTemasGeneral();
        $location.path('/app/general/'+$stateParams.aulaID);
      }
    });

  };

  $scope.consultarTemaGeneral = function(idTema){
    var datos_theme2 = {
      id: idTema,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/view",
      data : datos_theme2
    });

    request.success(function(data){

      if(data['Theme'].id === undefined){
        console.log("ERROR TEMA: " + data);
        //$rootScope.resultado = data;
      }else{
        $('#file_input_id_gral').val('');
        $rootScope.count_answers_theme_general = {
          id_theme: data['Theme'].id,
          total: data['Answer'].length
        };
        $rootScope.tema_info_general = data;
        $rootScope.name_file = data['Theme'].file;
      }
    });
  };

  $scope.editarTemaGeneral = function(nombre,contenido,file) {

    if(file=='' || file==null){
      var datos_theme_general = {
        id: $stateParams.temaID,
        group_id: -1,
        classroom_id: $scope.aula_id,
        user_id: $rootScope.datos_session.id,
        tittle: nombre,
        theme: contenido
      };
    }else{
      var datos_theme_general = {
        id: $stateParams.temaID,
        group_id: -1,
        classroom_id: $scope.aula_id,
        file: file,
        user_id: $rootScope.datos_session.id,
        tittle: nombre,
        theme: contenido
      };
    }

    
    // console.log(datos4);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/edit",
      data : datos_theme_general
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{
        $scope.listarTemasGeneral();
        $location.path('/app/general/'+$stateParams.aulaID);
      }
    });
  };

  $scope.itemOnDeleteThemeGeneral = function(idTema) {

    $ionicPopup.confirm({
        title: 'Confirmar Eliminación',
        template: '¿Está seguro que desea eliminar este tema del foro general?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Eliminar</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
              $scope.eliminarTemaGeneral(idTema);
            }
          }
        ]
    });
  };

  $scope.closeModalDelete = function () {
    //console.log("INTO closeSecond() !!!");
    ngDialog.close();
  };

  $scope.eliminarTemaGeneral = function (temaID) {

    var datos_theme = {
      id: temaID
    };

    // console.log(datos_theme);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/delete",
      data : datos_theme
    });

    request.success(function(data){
      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{

        $scope.listarTemasGeneral();
        $scope.closeModalDelete();
        $location.path('/app/general/'+$stateParams.aulaID);
      }
    });
  };

    $scope.crearRespuestaGeneral = function(tema_answer) {

    if(tema_answer != undefined){
      var datos_answer_group = {
        theme_id: $scope.tema_info_general['Theme'].id,
        file: $scope.file_name,
        user_id: $rootScope.datos_session.id,
        answer: tema_answer
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/answers/add",
        data : datos_answer_group
      });

      request.success(function(data){

        if(data[0] === undefined){
          alert("ERROR: " + data);
        }else{
          $('#file_input_id_gral').val('');
          $('#answer_input_id_gral').val('');
          // $scope.tema_answer = '';
          $scope.tema_answer = '';
          $scope.file_name = '';
          $scope.consultarTemaGeneral(datos_answer_group.theme_id);
        }
      });
    }
  };

  $scope.respuestaCorrectaGeneral = function(idRespuesta, idTema) {

    var datos_answer_correct = {
      id: idRespuesta,
    };

    $ionicPopup.confirm({
        title: 'Respuesta Correcta',
        template: '¿Está seguro que esta es la respuesta correcta?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Confirmar</b>',
            type: 'button-positive',
            onTap: function(e) {
              var request = $http({
                method : "post",
                url : "http://www.3dlinkweb.com/cienciapp/answers/makeCorrect",
                data : datos_answer_correct
              });

              request.success(function(data){

                if(data[0] === undefined){
                  alert("ERROR: " + data);
                }else{
                  $rootScope.make_theme_general_solved = {
                    id_theme: idTema
                  };
                  $scope.consultarTemaGeneral(idTema);
                }
              });
            }
          }
        ]
    });

  };
})

.controller('TemasCtrl', function($window, $scope, $filter, $ionicPopup, $http, $location, $rootScope, $stateParams, ngDialog){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

  $rootScope.grupo_id = $stateParams.grupoID;
  $scope.user_group = $rootScope.datos_session.user_group_id;
  $scope.iframeHeight = window.innerHeight;
  $rootScope.subio = 0;
  $rootScope.file_name = '';

  $rootScope.answers_output = [];

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingThemes = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingTheme = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingAnswer = function() {
    return $http.pendingRequests.length > 0;
  };


  $scope.OpenLink = function(link) {
    $window.open( link, '_system');
  };

  $scope.uploadFile = function(files) {
    var fd = new FormData();
    fd.append("file", files[0]);

    $http.post('http://www.3dlinkweb.com/cienciapp/start/upload_file', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success(function(data){
      $rootScope.file_name = data.name;
      $scope.file_name = data.name;
      $rootScope.subio = 1;
      alert('El archivo se ha adjuntado correctamente.');
    }).error(function(data){
      alert('error subiendo archivo '+data);
      $rootScope.file_name = data.name;
      $scope.file_name = data.name;
      $rootScope.subio = 1;
    });
  }

  $scope.listarTemas = function () {

    var datos5 = {
      classroom_id: $rootScope.aula_id,
      group_id: $stateParams.grupoID
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/all",
      data : datos5
    });

    request.success(function(data){

      if(data === undefined){
        console.log("ERROR GRUPOS: " + data);
      }else{

        $rootScope.lista_temas_grupo = data;
      }
    });
  };

  $scope.itemOnDeleteTheme = function(idTema) {

    $ionicPopup.confirm({
        title: 'Confirmar Eliminación',
        template: '¿Está seguro que desea eliminar este tema?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Eliminar</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
              $scope.eliminarTema(idTema);
            }
          }
        ]
    });
  };

  $scope.closeModalDelete = function () {
    //console.log("INTO closeSecond() !!!");
    ngDialog.close();
  };

  $scope.eliminarTema = function (temaID) {

    var datos_theme = {
      id: temaID
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/delete",
      data : datos_theme
    });

    request.success(function(data){
      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{

        $scope.listarTemas();
        $scope.closeModalDelete();
        $location.path('/app/temas/'+$stateParams.grupoID);
      }
    });
  };

  $scope.crearTema = function() {

    var datos_theme = {
      tittle: $scope.nombre,
      theme: $scope.contenido,
      file: $scope.file_name,
      classroom_id: $rootScope.aula_id,
      group_id: $stateParams.grupoID,
      user_id: $rootScope.datos_session.id
    };
    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/add",
      data : datos_theme
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{
        $scope.listarTemas();
        $location.path('/app/temas/'+$stateParams.grupoID);
      }
    });
  };

  $scope.consultarTema = function(idTema){

    var datos_theme2 = {
      id: idTema,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/view",
      data : datos_theme2
    });

    request.success(function(data){

      if(data['Theme'].id === undefined){
        console.log("ERROR TEMA: " + data);
      }else{
        $rootScope.count_answers_theme = {
          id_theme: data['Theme'].id,
          total: data['Answer'].length
        };
        $rootScope.tema_info = data;
        $rootScope.name_file = data['Theme'].file;
      }
    });
  };

  $scope.editarTema = function(nombre,contenido,file) {

    if(file=='' || file==null){
      var datos4 = {
        id: $stateParams.temaID,
        group_id: $scope.grupo_id,
        classroom_id: $scope.aula_id,
        user_id: $rootScope.datos_session.id,
        tittle: nombre,
        theme: contenido
      };
    }else{
      var datos4 = {
        id: $stateParams.temaID,
        group_id: $scope.grupo_id,
        classroom_id: $scope.aula_id,
        file: file,
        user_id: $rootScope.datos_session.id,
        tittle: nombre,
        theme: contenido
      };
    }

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/edit",
      data : datos4
    });

    request.success(function(data){

      if(data[0] === undefined){
        alert("ERROR: " + data);
      }else{
        $scope.listarTemas();
        $location.path('/app/temas/'+$stateParams.grupoID);
      }
    });
  };

  $scope.crearRespuesta = function(tema_answer) {

    if(tema_answer != undefined){
      var datos_answer_group = {
        theme_id: $scope.tema_info['Theme'].id,
        file: $scope.file_name,
        user_id: $rootScope.datos_session.id,
        answer: tema_answer
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/answers/add",
        data : datos_answer_group
      });

      request.success(function(data){

        if(data[0] === undefined){
          alert("ERROR: " + data);
        }else{
          $('#file_input_id').val('');
          $('#answer_input_id').val('');
          // $scope.tema_answer = '';
          $scope.consultarTema(datos_answer_group.theme_id);
          // $scope.file_name = '';
        }
      });
    }
  };

  $scope.respuestaCorrecta = function(idRespuesta, idTema) {

    var datos_answer_correct = {
      id: idRespuesta,
    };


    $ionicPopup.confirm({
        title: 'Respuesta Correcta',
        template: '¿Está seguro que esta es la respuesta correcta?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Confirmar</b>',
            type: 'button-positive',
            onTap: function(e) {
              
              var request = $http({
                method : "post",
                url : "http://www.3dlinkweb.com/cienciapp/answers/makeCorrect",
                data : datos_answer_correct
              });

              request.success(function(data){

                if(data[0] === undefined){
                  alert("ERROR: " + data);
                }else{
                  $rootScope.make_theme_solved = {
                    id_theme: idTema
                  };
                  $scope.consultarTema(idTema);
                }
              });
            }
          }
        ]
    });

  };

})

.controller('EstudiantesCtrl', function($scope, $http, $rootScope, $stateParams){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

  // get the aula_id
  $scope.user_group = $rootScope.datos_session.user_group_id;

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingStudents = function() {
    return $http.pendingRequests.length > 0;
  };
})

.controller('MensajesCtrl', function($scope, $http, $rootScope, $cordovaSms){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);
  $scope.user_group = $rootScope.datos_session.user_group_id;

  $rootScope.password_user = sessionStorage["current_password_user"]; //Get from storage
  $rootScope.password_user = localStorage["current_password_user"];

    $scope.consultarAulas = function () {

      var datos_user2 = {
        user_id: $rootScope.datos_session.id
      };

      // console.log(datos_user2);

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_subjects",
        data : datos_user2
      });

      request.success(function(data){
        //alert("PASO EL REQUEST");

        if(data[0].id === undefined){
          alert("ERROR: " + data);
          //$rootScope.resultado = data;
        }else{

          $rootScope.aulas2 = data;
          // console.log($rootScope.aulas2);
          //alert($rootScope.aulas[0]);
        }
      });
    };

    $scope.$watch('aula', function(newVal) {
      if (newVal){
        // console.log("EL ID DE AULA SELECCIONADO: "+newVal.id);
        console.log("User group: "+$rootScope.datos_session.user_group_id);
        if ($rootScope.datos_session.user_group_id == 2) {
          $scope.consultarEstudiantes(newVal.id);
        } else {
          $scope.consultarDestinatarios(newVal.id);
        }
      }
    });

    $scope.consultarEstudiantes = function (aulaID) {
      // alert("AULA SELECCIONADA: "+aulaID);
      var datos3 = {
        classroom_id: aulaID,
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students",
        data : datos3
      });

      request.success(function(data){

        if(data[0].id === undefined){
          alert("ERROR: " + data);
        }else{

          var output = [];
          angular.forEach(data, function(value, key) {
            output.push(value);
          });
          // console.log(output);
          $rootScope.destinatariosArray = output;
          // console.log(data);
          $rootScope.destinatarios = data;
        }
      });
    };

    $scope.consultarDestinatarios = function (aulaID) {
      // alert("AULA SELECCIONADA: "+aulaID);
      var datos3 = {
        classroom_id: aulaID,
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students_professor",
        data : datos3
      });

      request.success(function(data){

        if(data[0].id === undefined){
          alert("ERROR: " + data);
        }else{

          var output = [];
          angular.forEach(data, function(value, key) {
            output.push(value);
          });
          // console.log(output);
          $rootScope.destinatariosArray = output;
          // console.log(data[0].first);
          data[0].first += " (PROFESOR)";
          $rootScope.destinatarios = data;
        }
      });
    };

    $scope.ver = function(idChat){
      console.log(idChat);
    };

    $scope.sendChat = function(chat, aula){

      // if ($scope.user_group == 2) {
        console.log("aula: "+aula.id);
        console.log("tipo de dato: " + typeof aula.id);
        console.log("CHAT ID DESTINY: "+chat.id);
        console.log("MSG CHAT: "+chat.message);
        $scope.chats.$add({
          "user_name": $rootScope.datos_session.first_name,
          "message": chat.message,
          "source_id": $rootScope.datos_session.id,
          "destiny_id": chat.id
        });
      // } else {
      //   console.log("aula: "+aula.id);
      //   console.log("tipo de dato: " + typeof aula.id);
      //   console.log("CHAT ID DESTINY: "+chat.id_prof);
      //   console.log("MSG CHAT: "+chat.message);
      //   $scope.chats.$add({
      //     "user_name": $rootScope.datos_session.first_name,
      //     "message": chat.message,
      //     "source_id": $rootScope.datos_session.id,
      //     "destiny_id": chat.id_prof
      //   });
      // }

      chat.message = "";
      aula.id = "";
      // $rootScope.destinatarios = "";
      
    };
  // ------------------------------------------------------------------
})

.controller('BuscarCtrl', function($scope, $rootScope, $http, $stateParams, ngDialog){
  //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);

  // get the aula_id
  $scope.user_group = $rootScope.datos_session.user_group_id;

  // Return TRUE if some request is LOADING, else return FALSE
  $scope.isLoadingThemes = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingTheme = function() {
    return $http.pendingRequests.length > 0;
  };

  $scope.isLoadingAnswer = function() {
    return $http.pendingRequests.length > 0;
  };
  // // get the id
  // $scope.param = $stateParams.buscarID;

  // $rootScope.jsonData = '{"foo": "bar"}';
  // $rootScope.theme = 'ngdialog-theme-default';

  // $scope.list = [
  //   {id: 1000, active: 0},
  //   {id: 2000, active: 10},
  //   {id: 3000, active: 01},
  //   {id: 4000, active: 11},
  // ];


  $scope.consultarTema = function(idTema){
    var datos_theme2 = {
      id: idTema,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/view",
      data : datos_theme2
    });

    request.success(function(data){

      if(data['Theme'].id === undefined){
        console.log("ERROR TEMA: " + data);
        //$rootScope.resultado = data;
      }else{
        // console.log(data);
        $rootScope.count_answers_theme_general = {
          id_theme: data['Theme'].id,
          total: data['Answer'].length
        };
        $rootScope.tema_info_general = data;
        $rootScope.name_file = data['Theme'].file;
      }
    });
  };


  $scope.buscarTemas = function(){
    var datos = {
      user_id: $rootScope.datos_session.id
    };

    // console.log(datos);

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/search",
      data : datos
    });

    request.success(function(data){

      if(data === undefined){
        alert("ERROR: " + data);
      }else{
        $rootScope.temas = data;
      }
    });
  };

  $scope.detalleTema = function(idTema){

    var datos_theme2 = {
      id: idTema,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/themes/view",
      data : datos_theme2
    });

    request.success(function(data){

      if(data['Theme'].id === undefined){
        console.log("ERROR TEMA: " + data);
        //$rootScope.resultado = data;
      }else{
        // console.log(data);
        $rootScope.count_answers_theme2 = {
          id_theme: data['Theme'].id,
          total: data['Answer'].length
        };
        // console.log($rootScope.count_answers_theme2);
        $rootScope.tema_detalle = data;
        // $rootScope.estudiantes_grupo = data['User'];
      }
    });
  };

  // // Example functions
  // $scope.itemOnLongPress = function(id) {
  //   // alert('Long press');

  //   ngDialog.open({
  //     template: 'templates/modal-default.html',
  //     // controller: 'InsideCtrl',
  //     data: {
  //       id_grupo: id,
  //       json_data: $rootScope.jsonData
  //     }
  //   });
  // };

  // // $scope.itemOnTouchEnd = function(id) {
  // //   alert('Touch end');
  // // };


  // $scope.open = function () {
  //   ngDialog.open({ template: 'templates/modal-default.html', controller: 'InsideCtrl' });
  // };

  // $scope.openDefault = function () {
  //   ngDialog.open({
  //     template: 'templates/modal-default.html',
  //     controller: 'InsideCtrl',
  //     className: 'ngdialog-theme-default'
  //   });
  // };

  // $scope.openPlain = function () {
  //   $rootScope.theme = 'ngdialog-theme-plain';

  //   ngDialog.open({
  //     template: 'templates/modal-default.html',
  //     controller: 'InsideCtrl',
  //     className: 'ngdialog-theme-plain'
  //   });
  // };

  // $scope.openTemplate = function () {
  //   $scope.value = true;

  //   ngDialog.open({
  //     template: 'externalTemplate.html',
  //     className: 'ngdialog-theme-plain',
  //     scope: $scope
  //   });
  // };

})

.controller('InsideCtrl', function ($scope, ngDialog) {
  $scope.openSecond = function () {
    ngDialog.open({
      template: '<h3><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
      plain: true,
      closeByEscape: false,
      controller: 'SecondModalCtrl'
    });
  };
})

.controller('SecondModalCtrl', function ($scope, ngDialog) {
  $scope.closeSecond = function () {
    ngDialog.close();
  };
})

.controller('TabsViewCtrl', function($scope){
  
})

.controller('TestResponsiveCtrl', function($scope){
  
})

.controller('MensajeCtrl', function($scope, $http, $rootScope,$location,$ionicPopup,$timeout){
    //Get from storage
  $rootScope.datos_session = JSON.parse(sessionStorage["current_user"]);
  $rootScope.datos_session = JSON.parse(localStorage["current_user"]);
  $scope.user_group = $rootScope.datos_session.user_group_id;

  $rootScope.password_user = sessionStorage["current_password_user"]; //Get from storage
  $rootScope.password_user = localStorage["current_password_user"];
  $scope.iframeHeight = window.innerHeight;

  $scope.isLoadingConversation = function() {
    return $http.pendingRequests.length > 0;
  };
  $scope.isLoadingMessages = function() {
    return $http.pendingRequests.length > 0;
  };


    $scope.consultarAulas = function () {

      var datos_user2 = {
        user_id: $rootScope.datos_session.id
      };

      // console.log(datos_user2);

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_subjects",
        data : datos_user2
      });

      request.success(function(data){
        //alert("PASO EL REQUEST");

        if(data[0].id === undefined){
          alert("ERROR: " + data);
          //$rootScope.resultado = data;
        }else{

          $rootScope.aulas2 = data;
          // console.log($rootScope.aulas2);
          //alert($rootScope.aulas[0]);
        }
      });
    };


    $scope.consultarEstudiantes = function (aulaID) { //no trae al profesor

      var datos3 = {
        classroom_id: aulaID,
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students",
        data : datos3
      });

      request.success(function(data){

        if(data[0].id === undefined){
          alert("ERROR: " + data);
        }else{

          var output = [];
          angular.forEach(data, function(value, key) {
            output.push(value);
          });
          // console.log(output);
          $rootScope.destinatariosArray = output;
          // console.log(data);
          $rootScope.destinatarios = data;
        }
      });
    };

  $scope.consultarDestinatarios = function (aulaID) { //trae al profesor

      var datos3 = {
        classroom_id: aulaID,
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/classrooms/get_students_professor",
        data : datos3
      });

      request.success(function(data){

        if(data[0].id === undefined){
          alert("ERROR: " + data);
        }else{

          var output = [];
          angular.forEach(data, function(value, key) {
            output.push(value);
          });
          // console.log(output);
          $rootScope.destinatariosArray = output;
          data[0].first += " (PROFESOR)";
          $rootScope.destinatarios = data;
        }
      });
    };




  $scope.crearMensaje = function(reciver,message) {

    if((reciver != undefined) && (message != undefined)){

      var datos_mensaje = {
        sender_id: $rootScope.datos_session.id,
        reciver_id: reciver,
        message: message,
      };

      var request = $http({
          method : "post",
          url : "http://www.3dlinkweb.com/cienciapp/messages/new_message",
          data : datos_mensaje
        });

        request.success(function(data){
          $scope.allConversations();
          // $scope.closeModalDelete();
          $location.path('/app/mensajes');
        });
      }
  };

  $scope.allConversations = function () {
    var datos = {
      user_id: $rootScope.datos_session.id
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/messages/all_conversations",
      data : datos
    });

    request.success(function(data){
      $rootScope.conversations = data;
    });
  };

  $scope.deleteConversation = function (conversation) {
    var datos = {
      user_id: $rootScope.datos_session.id,
      conversation_id: conversation
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/messages/delete_conversation",
      data : datos
    });

    request.success(function(data){

      if(!data){
        alert("ERROR: " + data);
      }else{
        $scope.allConversations();
        $location.path('/app/mensajes');
      }
    });
  };

  $scope.viewConversation = function(idConversation){

    var data = {
      user_id: $rootScope.datos_session.id,
      conversation_id: idConversation,
    };

    var request = $http({
      method : "post",
      url : "http://www.3dlinkweb.com/cienciapp/messages/viewConversation",
      data : data
    });

    request.success(function(data){
      $rootScope.conversacion = data;
      $timeout(function() {
        $("#autoscroll").scrollTo('#down');
      }, 0, false);
    });
  };

  $scope.responderMensaje = function(other, idConversation){

    if($scope.message_response != undefined){

      var datam = {
        sender_id: $rootScope.datos_session.id,
        reciver_id: other,
        message:  $scope.message_response,
      };

      var request = $http({
        method : "post",
        url : "http://www.3dlinkweb.com/cienciapp/messages/new_message",
        data : datam
      });

      request.success(function(data){
        $rootScope.conversacion = data;

         if(!data){
          alert("ERROR: " + data);
          }else{
            $scope.message_response = '';
            $scope.viewConversation(idConversation);
          }
      });
    }
  };



  $scope.itemOnDeleteMessage = function(idConversation) {

    $ionicPopup.confirm({
        title: 'Confirmar Eliminación',
        template: '¿Está seguro que desea eliminar esta conversación?',
        buttons: [
          {
            text: 'Cancelar',
            type: 'button-dark',
          },
          {
            text: '<b>Eliminar</b>',
            type: 'button-positive',
            onTap: function(e) {
              // add your action
              $scope.deleteConversation(idConversation);
            }
          }
        ]
    });
  };


});