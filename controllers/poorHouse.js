const poorHouse = require('../models/poorHouse');

module.exports = {
    userAccess:(userole) => {
        return (req,res,next) => {
            next();
        }
    },

    newPoorHouse: async (req,res,next) => {
        try {
            const newpoorHouse = new poorHouse(req.body);
            const result = await newpoorHouse.save();
            res.status(201).json({ RetCode:1, RetVal:1, DataRows:[result] });
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
    },

    getPoorHouseByName: async(req,res,next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    },

    pagination: async (req,res,next) => {
        try {
            const reqPage = req.value.params.reqpage  ;
            const reqPageSize = req.value.params.reqsize ;
            const curItem = (reqPage-1)*reqPageSize ;
            const allRows = await poorHouse.find().populate('responsible').populate('relation') ;
            const allCount = allRows.length;
            const returnRows = allRows.slice(curItem,curItem+reqPageSize);
            const curPageCount = returnRows.length;
            res.status(200).json({ RetCode:1, RetVal:'获取贫困户分页信息', curPage: reqPage, curPageCount, allCount,DataRows:returnRows });
        } catch (error) {
            next(error)
        }
    },

    updatePoorHouse:async (req,res,next) => {
        try {
            const { phId } = req.value.params;
            const newPoorHouse = req.value.body;
            const result = await poorHouse.findByIdAndUpdate(phId, newPoorHouse);
            const resultPoorHouse = await result.save();
            res.status(200).json({RetCode:1, RetVal:"操作成功"});
        } catch (error) {
            next(error)
        }
    }
}