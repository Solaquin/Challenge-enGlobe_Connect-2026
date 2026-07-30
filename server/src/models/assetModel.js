import db from "../config/database.js";

export function createAsset(asset) {

    const stmt = db.prepare(`
        INSERT INTO launch_assets
        (
            launch_id,
            original_name,
            file_name,
            mime_type,
            file_type,
            file_size,
            file_path,
            uploaded_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        asset.launch_id,
        asset.original_name,
        asset.file_name,
        asset.mime_type,
        asset.file_type,
        asset.file_size,
        asset.file_path,
        asset.uploaded_by
    );

    return result.lastInsertRowid;
}

export function getAssetsByLaunchId(launchId) {

    const stmt = db.prepare(`
        SELECT *
        FROM launch_assets
        WHERE launch_id = ?
        ORDER BY created_at DESC
    `);

    return stmt.all(launchId);

}

export function getAssetById(assetId) {

    const stmt = db.prepare(`
        SELECT *
        FROM launch_assets
        WHERE id = ?
    `);

    return stmt.get(assetId);

}

export function deleteAsset(assetId) {

    const stmt = db.prepare(`
        DELETE
        FROM launch_assets
        WHERE id = ?
    `);

    return stmt.run(assetId);

}