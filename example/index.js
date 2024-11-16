const CrossDB = require('../index');

const db = new CrossDB(':memory:');

try {
    console.log("Create");
    db.exec("CREATE TABLE users (id INT PRIMARY KEY, name CHAR(50), age INT)");
    db.begin();
    console.log("Insert");
    db.exec("INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30), (2, 'Bob', 25), (3, 'Charlie', 35)");
    console.log("Select");
    let res = db.exec("SELECT * FROM users");
    console.log("All users: ", res);
    console.log("Delete");
    db.exec("DELETE FROM users where id=1");
    res = db.exec("SELECT * FROM users");
    console.log("All users: ", res);
    db.commit();
} catch (err) {
    console.error(err);
    db.rollback();
} finally {
    console.log("Close");
    db.close();
}
