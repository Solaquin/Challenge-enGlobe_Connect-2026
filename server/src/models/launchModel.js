import db from "../config/database.js";

export function getLaunchById(id) {
    const stmt = db.prepare(`
        SELECT *
        FROM launches
        WHERE id = ?
    `);

    return stmt.get(id);
}

export function getLaunches(filters = {}) {

    let query = `
        SELECT *
        FROM launches
        WHERE 1 = 1
    `;

    const params = [];

    const filterMap = {
        market: "market",
        status: "status",
        release_date: "release_date"
    };

    for (const [key, column] of Object.entries(filterMap)) {

        if (filters[key]) {

            query += ` AND ${column} = ?`;
            params.push(filters[key]);
        }
    }

    if (filters.search) {

        query += " AND title LIKE ?";
        params.push(`%${filters.search}%`);

    }

    query += " ORDER BY release_date ASC";

    const stmt = db.prepare(query);

    return stmt.all(...params);

}

export function createLaunch(launch) {

    const stmt = db.prepare(`
        INSERT INTO launches (
            title,
            description,
            market,
            release_date,
            status,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        launch.title,
        launch.description,
        launch.market,
        launch.release_date,
        launch.status,
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
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    return stmt.run(
        launch.title,
        launch.description,
        launch.market,
        launch.release_date,
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

export function updateLaunchStatus(id, status) {

    const stmt = db.prepare(`
        UPDATE launches
        SET
            status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    return stmt.run(status, id);

}

export function updateLaunchStatusWithHistory({launchId, previousStatus, newStatus, changedBy})
{

    const updateStmt = db.prepare(`
        UPDATE launches
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    const historyStmt = db.prepare(`
        INSERT INTO launch_status_history
        (
            launch_id,
            previous_status,
            new_status,
            changed_by
        )
        VALUES (?, ?, ?, ?)
    `);

    const transaction = db.transaction((data) => {

        updateStmt.run(
            data.newStatus,
            data.launchId
        );

        historyStmt.run(
            data.launchId,
            data.previousStatus,
            data.newStatus,
            data.changedBy
        );
    });

    transaction({
        launchId,
        previousStatus,
        newStatus,
        changedBy
    });

    return true;
}
