import type { AssistantBlock } from '@deepseek-ai/dsh-client-ui-conversation/client';
/**
 * User-fed files. A fed file never reaches the model as bytes — request assembly projects
 * every occurrence to handle text (name, byte size, read-only saved path) — but it does
 * arrive in user content as a durable `{ type: 'file', attachment }` block, which the
 * host's `AssistantBlock` union has no arm for. The reader therefore sees it as
 * `kind: 'other'` and has to recognise it by shape.
 *
 * Ported from the 0.1.5-era local fork on 2026-09-27, after upstream 0.3.3 turned out to
 * still fold fed files into the "此内容类型尚未接入阅读页" notice.
 */
export interface UserFileAttachment {
    name?: unknown;
    bytes?: unknown;
}
/**
 * Resolve a user-fed file block, or null for every other `kind: 'other'` payload so callers
 * keep falling through to the raw-block notice.
 * @param block - one projected conversation block.
 * @returns the attachment record, or null when this is not a file block.
 */
export declare function fileAttachment(block: AssistantBlock): UserFileAttachment | null;
/**
 * Whether this block is a durable user file attachment.
 * @param block - one projected conversation block.
 */
export declare function isUserFileBlock(block: AssistantBlock): boolean;
/** Display name for a file card, standing in when the record carries none. */
export declare function fileName(attachment: UserFileAttachment): string;
/** Byte length when the record carries one, else undefined. */
export declare function fileBytes(attachment: UserFileAttachment): number | undefined;
/**
 * Byte-size text used when the host's own `fileSizeText` primitive is unavailable, so a
 * bundle that outlives that export still labels fed files correctly.
 * @param bytes - exact byte length.
 */
export declare function fallbackFileSize(bytes: number): string;
//# sourceMappingURL=user-file.d.ts.map