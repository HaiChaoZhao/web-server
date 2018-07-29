const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poorHouseSchema = new Schema({
    number: String,
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
    outOfPoverty:Boolean,
    outOfPovertyDate:String,
    returnToPoverty:Boolean,
    returnToPovertyDate:String
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const poorHouse = mongoose.model('poorHouse', poorHouseSchema);

module.exports = poorHouse ;