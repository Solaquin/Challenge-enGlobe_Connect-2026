import db from "../config/database.js";

export function getAllLaunches() {
    const stmt = db.prepare(`
        SELECT *
        FROM launches
        ORDER BY release_date ASC
    `);

    return stmt.all();
}

export function getLaunchById(id) {
    const stmt = db.prepare(`
        SELECT *
        FROM launches
        WHERE id = ?
    `);

    return stmt.get(id);
}

export function createLaunch(launch) {

    const stmt = db.prepare(`
        INSERT INTO launches (
            title,
            description,
            market,
            release_date,
            status,
            assets,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        launch.title,
        launch.description,
        launch.market,
        launch.release_date,
        launch.status,
        JSON.stringify(launch.assets),
        launch.created_by
    );

    return result.lastInsertRowid;
}

export function updateLaunch(id, launch) {

    const stmt = db.prepare(`
        UPDATE launches
        SET
            title = ?,
            description = ?,
            market = ?,
            release_date = ?,
            assets = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    return stmt.run(
        launch.title,
        launch.description,
        launch.market,
        launch.release_date,
        JSON.stringify(launch.assets),
        id
    );
}

export function deleteLaunch(id) {

    const stmt = db.prepare(`
        DELETE FROM launches
        WHERE id = ?
    `);

    return stmt.run(id);
}
