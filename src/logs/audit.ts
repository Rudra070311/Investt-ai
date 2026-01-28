export type AuditSource = "CHATBOT_AI" | "MODERATION_AI" | "FEED_AI";

export type AuditAction = "ALLOW" | "REMOVE" | "FLAG" | "REFUSE" | "RANK";

export interface AuditLogEntry {
    timestamp: string; // ISO string
    source: AuditSource;

    userId: string;

    action: AuditAction;
    reason: string;

    metadata?: Record<string, unknown>;
}

export async function logAuditEntry(entry: AuditLogEntry): Promise<void> {
    const safeEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    };

    console.info("[AI AUDIT]", safeEntry);
}