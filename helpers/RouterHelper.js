const Joi = require('joi');

module.exports = {
    validateParam: (schema, name, options) => {
        return (req, res, next) => {
            const result = Joi.validate({ param:req['params'][name] },schema,options);
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

    validateMultiParam: (schema, options) => {
        return (req,res,next) => {
            const result = Joi.validate(req.params,schema,options);
            if(result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {
                if(!req.value) req.value = {};
                if(!req.value['params']) req.value['params'] = {};
                req.value['params'] = result.value;
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

        userUpdateSchema:Joi.object().keys({
            email: Joi.string().email(),
            username: Joi.string(),
            agency: Joi.string(),
            role: Joi.string()
        }),

        
        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        
        paginationSchema:Joi.object().keys({
            reqpage:Joi.number().min(1).required(),
            reqsize:Joi.number().min(1).required(),
        }),
        poorHouseUpdateSchema:Joi.object().keys({
            name: Joi.string(),
            causeOfPoverty: Joi.string(),
            helpMeasures: Joi.string(),
            helpMeasuresAgency: Joi.string(),
            helpMeasuresPlan:Joi.string(),
            helpMeasuresPlanYear:Joi.string(),
            responsible:Joi.string(),
            progressInfo:Joi.string(),
            outOfPoverty:Joi.string(),
            outOfPovertyDate:Joi.string(),
            returnToPoverty:Joi.string(),
            returnToPovertyDate:Joi.string()
        })
    }

    
}