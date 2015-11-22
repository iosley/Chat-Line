! function() {
  'use strict';
  angular.module('chatApp').controller('chatController', ['$scope', 'Socket', function($scope, Socket) {
    var name        = '';
    $scope.toUser   = '';
    $scope.users    = [];
    $scope.messages = [];
    $scope.message  = {
      username: '',
      toUser: '',
      msg: ''
    };

    var promptUsername = function(message) {
        name = prompt(message);
        if (name !== null && name !== '') {
            Socket.emit('add-user', name);
        } else {
            promptUsername('Voce precisa inserir um nome de usuario!');
        }
    };

    $scope.sendMessage = function() {
      if ($scope.message.msg === null && $scope.message.msg === '') return;
      if (name === null && name === '') {
        return promptUsername('Voce precisa inserir seu nome para enviar mensagens.');
      }
      Socket.emit('message', $scope.message);
      $scope.message.msg = '';
    };

    Socket.on('users', function(users) {
      // if (name !== '') {
      //   users.splice(users.indexOf(name), 1);
      // }
      $scope.users = users;
    });

    Socket.on('message', function(msg) {
      console.log(msg);
      $scope.messages.push(msg);
    });

    Socket.on('add-user', function(user) {
      $scope.users.push(user);
      $scope.messages.push({username: user, msg: 'Entrou no chat'});
    });

    Socket.on('remove-user', function(user) {
      if (user === username) return;
      $scope.users.splice($scope.users.indexOf(user), 1);
      $scope.messages.push({username: user, msg: 'Saiu do chat'});
    });

    Socket.on('prompt-username', function(data) {
      promptUsername(data.message);
    });

    $scope.$on('$locationChangeStart', function(event) {
      Socket.disconnect(true);
    });

    Socket.emit('request-users', {});

    promptUsername('Insira seu nome');
  }]);
}();
