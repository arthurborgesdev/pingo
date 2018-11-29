const userService = require('../services/userService')

exports.handleInput = function(inputObject) {
  userService.saveInput(inputObject);
}