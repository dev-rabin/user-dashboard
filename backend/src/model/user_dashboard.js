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
    update: ( updateUser,user_id,result) => {
        const query = "update user set ? where user_id = ?";
        database.query(query, [updateUser, user_id], (err, res) => {
            if (err) {
                console.error("Error updating user: ", err);
                result(err, null);
                return;
            } else if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            } else {
                console.log("User updated", { id: res.user_id, ...updateUser });
                result(null, { id: res.user_id, ...updateUser });
            }
        });
    }
}

module.exports = {database,User};