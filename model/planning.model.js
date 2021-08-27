const mongoose = require('mongoose');

const PlanningSchema = new mongoose.Schema(
    {
        pseudo:{
            type:String,
            required: true,
            minLength: 3,
            maxLength: 60,
            unique: true,
            trim: true
        },
        planning:{
            type:[
                {
                    name: String,
                    model: String,
                    repar: String,
                    num : Number,
                    details: String,
                    start: Date,
                    end: Date,
                    color: String,
                }
            ]
        }
    }
);
const PlanningModel = mongoose.model('userplanning', PlanningSchema);
module.exports = PlanningModel;

