!function(){"use strict";angular.module("chatApp",["btford.socket-io","ui.bootstrap"])}(),!function(){"use strict";angular.module("chatApp").controller("chatController",["$scope","Socket",function(e,s){var n="";e.toUser="",e.users=[],e.messages=[],e.message={username:"",toUser:"",msg:""};var o=function(e){n=prompt(e),null!==n&&""!==n?s.emit("add-user",n):o("Voce precisa inserir um nome de usuario!")};e.sendMessage=function(){if(null!==e.message.msg||""!==e.message.msg){if(null===n&&""===n)return o("Voce precisa inserir seu nome para enviar mensagens.");s.emit("message",e.message),e.message.msg=""}},s.on("users",function(s){e.users=s}),s.on("message",function(s){console.log(s),e.messages.push(s)}),s.on("add-user",function(s){e.users.push(s),e.messages.push({username:s,msg:"Entrou no chat"})}),s.on("remove-user",function(s){s!==username&&(e.users.splice(e.users.indexOf(s),1),e.messages.push({username:s,msg:"Saiu do chat"}))}),s.on("prompt-username",function(e){o(e.message)}),e.$on("$locationChangeStart",function(e){s.disconnect(!0)}),s.emit("request-users",{}),o("Insira seu nome")}])}(),!function(){"use strict";angular.module("chatApp").factory("Socket",["socketFactory",function(e){return e()}])}();