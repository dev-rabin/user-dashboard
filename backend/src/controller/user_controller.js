const {User} = require("../model/user_dashboard");

const TaskController = {
    createUser : (req,res) =>{
        const newUser = {
            name : req.body.name,
            phone_number : req.body.phone_number,
            gender : req.body.gender,
            dob : req.body.dob,
            city : req.body.city,
            about : req.body.about
        }
        User.create(newUser , (err, result) => {
            if (err) {
                console.error("Error creating User, ", err);
                return res.status(500).json({ message: "Error creating User" || err.messgae });
            } else {
                console.log("User created successfully", result);
                return res.status(200).json({ message: "User created successfully", data: result })
            }
        });
    },
    updateUserById : (req, res) => {
        const updateUser = {
            name : req.body.name,
            phone_number : req.body.phone_number,
            gender : req.body.gender,
            dob : req.body.dob,
            city : req.body.city,
            about : req.body.about
        }
        const user_id = req.params.user_id;
        User.update(updateUser,user_id , (err, result)=>{
            if (err) {
                if (err.item === "not_found") {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.error("Updating user error : ", err);
                return res.status(500).json({ message: "Updating user error" || err.message });
            } else {
                console.log("User updated successfully : ", result);
                return res.status(200).json({ message: "User updated successfully", data: result });
            }
        })
    }
}

module.exports = TaskController;