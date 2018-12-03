const Joi = require('joi')

exports.validateInput = function(input, next) {
   
  const inputSchema = Joi.object().keys({
  	name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  });

  Joi.validate({
  	name: input.name,
  	email: input.email,
  	password: input.password
    }, inputSchema,
    function(err, value) {
  	  if (err) {
  	    return next(err);
      } else {
        return next();
      }
  	  
    }
  )

}