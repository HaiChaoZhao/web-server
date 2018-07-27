const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param:req['params'][name] },schema);
            if(result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {
                if(!req.value) req.value = {};
                if(!req.value['params']) req.value['params'] = {};
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req,res,next) => {
            const result = Joi.validate(req.body,schema);
            if(result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {
                if(!req.value) req.value = {};
                if(!req.value['body']) req.value['body'] = {};
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas:{
        userSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            agency: Joi.string().required(),
            role: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }

    
}