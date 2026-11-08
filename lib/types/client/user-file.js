/**
 * Resolve a user-fed file block, or null for every other `kind: 'other'` payload so callers
 * keep falling through to the raw-block notice.
 * @param block - one projected conversation block.
 * @returns the attachment record, or null when this is not a file block.
 */
export function fileAttachment(block) {
    if (block.kind !== 'other')
        return null;
    const raw = block.block;
    if (raw === null || raw === undefined || typeof raw !== 'object' || raw.type !== 'file')
        return null;
    const attachment = raw.attachment;
    if (attachment === null || attachment === undefined || typeof attachment !== 'object')
        return null;
    return attachment;
}
/**
 * Whether this block is a durable user file attachment.
 * @param block - one projected conversation block.
 */
export function isUserFileBlock(block) {
    return fileAttachment(block) !== null;
}
/** Display name for a file card, standing in when the record carries none. */
export function fileName(attachment) {
    return typeof attachment.name === 'string' && attachment.name !== '' ? attachment.name : '未命名文件';
}
/** Byte length when the record carries one, else undefined. */
export function fileBytes(attachment) {
    return typeof attachment.bytes === 'number' && Number.isFinite(attachment.bytes) && attachment.bytes >= 0
        ? attachment.bytes
        : undefined;
}
/**
 * Byte-size text used when the host's own `fileSizeText` primitive is unavailable, so a
 * bundle that outlives that export still labels fed files correctly.
 * @param bytes - exact byte length.
 */
export function fallbackFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0)
        return '';
    if (bytes < 1024)
        return `${bytes} B`;
    const units = ['KB', 'MB', 'GB', 'TB'];
    let value = bytes / 1024;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit += 1;
    }
    return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
}
//# sourceMappingURL=user-file.js.map