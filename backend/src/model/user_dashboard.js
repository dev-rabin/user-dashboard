const mysql = require("mysql2");

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Robin@123",
    database : "user_dashboard"
});

database.connect((err)=>{
    if (err) {
        console.error("Database connection failed! ",err);
    } else {
        console.log("Connected to database successfully.");
    }
});

const User = {
    create : (newUser, result) => {
        const query = "insert into user set ?";
        database.query(query,newUser, (err, res) => {
            if (err) {
                console.error("Error creating user : ",err);
                return;
            }else{
                console.log("User created" , {id : res.insertId,...newUser});
                result(null,{ id: res.insertId, ...newUser });
            }
        })
    },
     update : (updateUser, user_id, result) => {
        const query = "UPDATE user SET ? WHERE user_id = ?";
        const values = [updateUser, user_id];
        database.query(query, values, (err, res) => {
            if (err) {
                console.error("Error updating user: ", err);
                result(err, null);
                return;
            } else if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            } else {
                console.log("User updated", { id: user_id, ...updateUser });
                result(null, { id: user_id, ...updateUser });
            }
        });
    }
    ,
    
    fetchData: (result) => {
        const query = "select * from user where user_id = 4";
        database.query(query, (err, res) => {
            if (err) {
                console.error("Error while getting user data :", err);
                result(err, null);
            } else {
                console.log("Fetch user successfully", res);
                result(null, res);
            }
        });
    },
    deleteAddress: (user_id, address, result) => {
        const query = "UPDATE user SET address = '' WHERE user_id = ? AND address = ?";
        database.query(query, [user_id, address], (err, res) => {
            if (err) {
                console.error("Error while deleting address:", err);
                result(err, null);
            } else {
                console.log("Deleted address successfully", res);
                result(null, res);
            }
        });
    }
}

module.exports = {database,User};