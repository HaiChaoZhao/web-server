const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poorRelationSchema = new Schema({
    number: String,
    name: String,
    relationship: String,
    nationality: String,
    censusCategory: String,
    IDNumber:String,
    censusAddr:String,
    phone:String,
    Address:String,
    belong:{
            type: Schema.Types.ObjectId,
            ref: 'poorHouse'
        },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const poorRelation = mongoose.model('poorHouse', poorRelationSchema);

module.exports = poorRelation ;