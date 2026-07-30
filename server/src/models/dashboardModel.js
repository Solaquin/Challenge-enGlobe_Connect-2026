import db from "../config/database.js";

function getStats() {

    const total = db.prepare(`
        SELECT COUNT(*) AS total
        FROM launches
    `).get();

    const approved = db.prepare(`
        SELECT COUNT(*) AS total
        FROM launches
        WHERE status = 'approved'
    `).get();

    const review = db.prepare(`
        SELECT COUNT(*) AS total
        FROM launches
        WHERE status = 'review'
    `).get();

    const nextLaunch = db.prepare(`
        SELECT
            title,
            release_date
        FROM launches
        WHERE release_date >= DATE('now')
        ORDER BY release_date ASC
        LIMIT 1
    `).get();

    return {

        active: total.total,

        approved: approved.total,

        review: review.total,

        nextLaunch

    };

}

export default {

    getStats

};