const DataSchema = require('../schema/DataSchema');

class DataController {
    async SendData(req, res) {
        
        const { firstname, lastname, email,number } = req.body.data;
        if (!firstname || !lastname || !email || !number) {
            return res.status(400).json({ message: 'Send All Details' });
        }
        const employeeId = Math.floor((Math.random() * 99999) + 1);
        const data = await new DataSchema({ firstname, lastname, email, number, employeeId});
        await data.save();
        if (data !== null && data !== undefined) {
            return res.status(200).json({ message: data });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    async GetData(req, res) {
        try {
            const Datas = await DataSchema.find({});
            return res.status(200).json({ message: Datas });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server issue' });
        }
    } async EditData(req, res) {
        console.log(req.body);
        const { email, firstname, lastname,number } = req.body.updatedDatas;
        const id = req.body.idx._id;
        // console.log(email, firstname, lastname, id);
        try {
            await DataSchema.findByIdAndUpdate({ _id: id }, { email: email, firstname, lastname, number }).then((data) => {
                if (data) {
                    return res.status(200).json({ message: 'Updated' });
                }
            }).catch(err => {
                return res.status(500).json({ message: 'Internal Server Errors!!' });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Errors!!' });
        }
    }
    async DeleteData(req, res) {
        const id = req.body.datas._id;
        try {
            await DataSchema.findOneAndDelete({ _id: id }).then((data) => {
                return res.status(200).json({ message: "Deleted" });
            }).catch(err => {
                return res.status(500).json({ message: 'Internal Server Errors!!' });
            })
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Errors!!' });
        }
    }
    async DeleteData1(req,res){
        const {password} = req.body;
        console.log(password);
        if(password === 'admin'){
            try {
                await DataSchema.remove({}).then((data)=>{
                    console.log(data);
                    return res.status(200).json({ message: "Deleted" });
                }).catch(err=>{
                    console.log(err);
                    return res.status(500).json({ message: 'Internal Server Errors!!' });
                });            
            } catch (error) {
                return res.status(500).json({ message: 'Internal Server Errors!!' });
            }
        }else{
            return res.status(401).json({message:'Enter correct password'});
        }
    }
}

module.exports = new DataController();