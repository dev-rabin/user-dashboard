const {User} = require("../model/user_dashboard");

const UserController = {
    createUser : (req,res) =>{
        const newUser = {
            name : req.body.name,
            phone_number : req.body.phone_number,
            address : req.body.address,
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
            name: req.body.name,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            dob: req.body.dob,
            city: req.body.city,
            about: req.body.about,
            address: req.body.address
        }
        const user_id = req.params.user_id;
        User.update(updateUser, user_id, (err, result) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).json({ message: 'User not found' });
                }
                console.error("Updating user error: ", err);
                return res.status(500).json({ message: "Updating user error" || err.message });
            } else {
                console.log("User updated successfully: ", result);
                return res.status(200).json({ message: "User updated successfully", data: result });
            }
        })
    },
    fetchUserData : (req,res) => {
        User.fetchData((err, result) => {
            if (err) {
                return res.status(500).json({ message: "Fetch user error" || err.message })
            } else {
                console.log("fetch task result : ", result);
                return res.status(200).json({ message: "User Fetched", data: result })
            }
        })
    },
    deleteUserAddress: (req, res) => {
        const { address } = req.body;
        const { user_id } = req.params;
    
        if (!user_id || !address) {
            return res.status(400).json({ message: "User ID and Address are required" });
        }
    
        User.deleteAddress(user_id, address, (err, result) => {
            if (err) {
                console.error("Delete user address error:", err);
                return res.status(500).json({ message: "Failed to delete user address", error: err.message });
            }
    
            console.log("Address deleted successfully:", result);
            return res.status(200).json({ message: "User address deleted successfully", data: result });
        });
    },
}

module.exports = UserController;