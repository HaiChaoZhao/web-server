const poorRelation = require('../models/poorRelation');
const poorHouse = require('../models/poorHouse');

module.exports = {
    getIndexDoc: (req,res,next) => {

    },

    pagination: async (req,res,next) => {
        try {
            const reqPage = req.params.reqpage  ;
            const reqPageSize = req.params.reqsize ;
            const curItem = (reqPage-1)*reqPageSize ;
            const allRows = await poorRelation.find();
            const allCount = allRows.length;
            const returnRows = allRows.slice(curItem,curItem+reqPageSize);
            const curPageCount = returnRows.length;
            res.status(200).json({ RetCode:1, RetVal:'获取贫困户户口分页信息', curPage: reqPage, curPageCount, allCount,DataRows:returnRows });
        } catch (error) {
            next(error)
        }
    },

    newDoc: async (req,res,next) => {
        try {
            const newRelationDoc = new poorRelation(req.body) ;
            const poorHouseDoc = await poorHouse.findById(req.body.belong);
            poorHouseDoc.relation.push(newRelationDoc._id);
            await newRelationDoc.save();
            await poorHouseDoc.save();
            res.status(201).json({ RetCode:'1',RetVal:'新建文档成功' })
        } catch (error) {
            next(error);
        }
        
    },

    updateDoc: async (req,res,next) => {
        try {
            const updatedDoc = await poorRelation.findByIdAndUpdate(req.params.phrId,req.body);
            await updatedDoc.save();
            res.status(201).json({ RetCode:'1',RetVal:'修改文档成功' });
        } catch (error) {
            next(error)
        }
    }
}