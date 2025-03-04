async function executeQuery(query, params = []) {
    try {
        const promisePool = db_pool.promise();
        const [rows] = await promisePool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function AddUsers(req, res, next) {
    req.success = !!(req.insertId = (await executeQuery(
        "INSERT INTO users (full_name) VALUES (?)", [req.body.name]
    ))?.insertId);
    next();
}

async function GetUsers(req, res, next) {
    req.all_users = await executeQuery("SELECT * FROM users");
    req.success = !!req.all_users?.length;
    next();
}

async function UpdateUsers(req, res, next) {
    req.success = !!(await executeQuery(
        "UPDATE users SET full_name = ? WHERE id = ?",
        [req.body.user_name, req.body.idx]
    ));
    next();
}

async function DeleteUsers(req, res, next) {
    req.success = !!(await executeQuery("DELETE FROM users WHERE id = ?", [req.body.idx]));
    next();
}

async function GetUserById(req, res, next) {
    req.userById = await executeQuery("SELECT * FROM users WHERE id = ?", [req.body.idx]);
    req.success = !!req.userById?.length;
    next();
}

module.exports = { AddUsers, GetUsers, UpdateUsers, DeleteUsers, GetUserById };
פת