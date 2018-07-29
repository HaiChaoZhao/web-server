const poorHouse = require('../models/poorHouse');

module.exports = {
    newPoorHouse: async (req,res,next) => {
        try {
            const newpoorHouse = new poorHouse(req.body);
            const result = await newpoorHouse.save();
            res.status(201).json(result);
        } catch (error) {
         next(error)   
        }
    },

    getPoorHouse: async (req,res,next) => {
        try {
            const allRows = await poorHouse.find().populate('responsible', 'username agency' );
            res.status(201).json({ allRows })
        } catch (error) {
            next(error)   
        }
    }
}