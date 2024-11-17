const CrossDB = require('../index');

const db = new CrossDB(':memory:');

try {
    db.exec("CREATE TABLE users (id INT PRIMARY KEY, name CHAR(50), age INT)");
    console.log("Table 'users' created.");
    db.begin();
    console.log("Begin transaction");
    db.exec("INSERT INTO users (id, name, age) VALUES (1, 'Alice', 30), (2, 'Bob', 25), (3, 'Charlie', 35)");
    console.log("Data inserted.");
    let res = db.exec("SELECT * FROM users");
    console.log("Select all users: ", res);
    db.exec("UPDATE users SET age = 31 WHERE id = 2");
    console.log("User with ID 2 updated.");
    res = db.exec("SELECT * FROM users");
    console.log("Select all users: ", res);
    db.exec("DELETE FROM users where id=1");
    console.log("User with ID 1 deleted.");
    res = db.exec("SELECT * FROM users");
    console.log("Select all users: ", res);
    db.commit();
    console.log("Commit transaction");
} catch (err) {
    console.error("Error during operation:", err);
    db.rollback();
    console.log("Rollback transaction");
} finally {
    console.log("\nCrossDB Simulation Complete.");
    db.close();
    console.log("Database connection closed.");
}
