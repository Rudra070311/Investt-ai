export function normalizeText(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '');
}

export function normalizeForScan(input: string): string {
    return normalizeText(input);
}