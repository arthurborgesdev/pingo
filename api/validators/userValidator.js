const Joi = require('joi')

exports.validateInput = function(inputObject, next) {
   
  const inputSchema = Joi.object().keys({
  	name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });

  Joi.validate({
  	name: inputObject.name,
  	email: inputObject.email,
  	password: inputObject.password
    }, inputSchema,
    function(err, value) {
  	  if (err) {
  	  	console.log(err.details[0].message)
  		  return err;
  	  }
  	  next();
    }
  )

}