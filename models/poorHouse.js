const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poorHouseSchema = new Schema({
    name: String,
    causeOfPoverty: String,
    helpMeasures: String,
    helpMeasuresAgency: String,
    helpMeasuresPlan:String,
    helpMeasuresPlanYear:String,
    responsible:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    progressInfo:String,
    outOfPoverty:String,
    outOfPovertyDate:String,
    returnToPoverty:String,
    returnToPovertyDate:String,
    relation:[
        {
            type: Schema.Types.ObjectId,
            ref:'poorRelation'
        }
    ]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const poorHouse = mongoose.model('poorHouse', poorHouseSchema);

module.exports = poorHouse ;