import db from "../config/database.js";

export function createUser(user) {

    const stmt = db.prepare(`
        INSERT INTO users(
            name,
            email,
            password_hash,
            role
        )
        VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
        user.name,
        user.email,
        user.password_hash,
        user.role
    );

    return result.lastInsertRowid;
}

export function getUserByEmail(email) {

    const stmt = db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
    `);

    return stmt.get(email);
}

export function getUserById(id) {

    const stmt = db.prepare(`
        SELECT *
        FROM users
        WHERE id = ?
    `);

    return stmt.get(id);
}