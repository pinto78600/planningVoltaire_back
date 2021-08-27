const PlanningModel = require('../model/planning.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await PlanningModel.find();
    res.status(200).json(users);
}

module.exports.getUser = (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`Id unknow : ${req.params.id}`)
    };
    PlanningModel.findById(req.params.id, 
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log(`Id unkwonw: ${err}`);
    })
}

module.exports.postEvent = (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`Id unknow : ${req.params.id}`)
    };
    try{
        return PlanningModel.findByIdAndUpdate(
            req.params.id,
            {
                $push:{
                    planning : {
                        name : req.body.data.name,
                        model : req.body.data.model,
                        repar : req.body.data.repar,
                        num : req.body.data.num,
                        details: req.body.data.details,
                        start : req.body.data.start,
                        end : req.body.data.end,
                        color: req.body.data.color
                    }
                }
            },
            {new : true, upsart : true},
            (err, docs) => {
                if(!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports.deleteEvent = (req, res) => {
    if(!ObjectID.isValid(req.params.userId)){
        return res.status(400).send(`Id unknow : ${req.params.userId}`)
    };

    try{
        return PlanningModel.findByIdAndUpdate(
            req.params.userId,
            {
                $pull :{
                    planning: {
                        _id : req.body.eventId
                    }
                }
            },
            {new : true},
            (err, docs) => {
                if(!err) return res.send(docs);
                else return res.status(400).send(err)
            }
        )
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`Id unknow : ${req.params.id}`)
    };

    try{
        await PlanningModel.remove({ _id : req.params.id }).exec();
        res.status(200).json({ message : "Succesfully deleted"})
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports.createUser = async (req, res) => {
        const { pseudo } = req.body;
    try{
        const user = await PlanningModel.create({pseudo });
        return res.status(201).json({ user : user._id})
    }catch(err){
        return res.status(400).send(err);
    }
}

module.exports.editEvent = (req, res) => {
    if(!ObjectID.isValid(req.params.userId)){
        return res.status(400).send(`Id unknow : ${req.params.userId}`)
    };
    try{
        return PlanningModel.findById(
            req.params.userId,
            (err, docs) => {
                
                const theEvent = docs.planning.find(plan => 
                    plan._id.equals(req.body.data.eventId)
                )
                if(!theEvent) return res.status(400).send('Event not found')
                theEvent.name = req.body.data.name
                theEvent.model = req.body.data.model
                theEvent.num = req.body.data.num
                theEvent.repar = req.body.data.repar
                theEvent.details = req.body.data.details
                theEvent.color = req.body.data.color
                theEvent.start = req.body.data.start
                theEvent.end = req.body.data.end

                return docs.save(err => {
                    if(!err) return res.status(200).send(docs);
                    return res.status(500).send(err);
                })
            }
        )
    }catch(err){
        return res.status(400).send(err);
    }
}