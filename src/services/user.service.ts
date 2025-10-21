import getConnection from "config/database"

const handleCreateUser = async (username: string, email: string, address: string) => {
    try {
        //insert to database
        const connection = await getConnection()
        const sql = 'INSERT INTO `users`(`username`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [username, email, address];

        const [result, fields] = await connection.execute(sql, values);

        console.log(result);
    } catch (err) {
        console.log(err);
        return [];
    }
}



const getAllUsers = async () => {
    const connection = await getConnection();
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const handleDeleteUser = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getUserbyID = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}


const updateUserbyID = async (id: string, username: string, email: string, address: string) => {
    try {
        const connection = await getConnection();
        const sql = 'UPDATE `users` SET `username` = ?,`email` = ?, `address` = ? WHERE `id` = ?';
        const values = [username, email, address, id];

        const [result, fields] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserbyID, updateUserbyID }