import db from "../config/database.js";

export function createHistory(history) {

    const stmt = db.prepare(`
        INSERT INTO launch_status_history
        (
            launch_id,
            previous_status,
            new_status,
            changed_by
        )
        VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(

        history.launch_id,
        history.previous_status,
        history.new_status,
        history.changed_by

    );

    return result.lastInsertRowid;

}

export function getHistoryByLaunchId(launchId) {

    const stmt = db.prepare(`

        SELECT

            h.id,

            h.previous_status,

            h.new_status,

            h.comment, 

            h.changed_at,

            u.id AS user_id,

            u.name AS changed_by

        FROM launch_status_history h

        INNER JOIN users u

            ON h.changed_by = u.id

        WHERE h.launch_id = ?

        ORDER BY h.changed_at DESC

    `);

    return stmt.all(launchId);

}

