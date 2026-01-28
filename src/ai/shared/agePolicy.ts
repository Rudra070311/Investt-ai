import { AudienceType } from "./enums";

export function getAudiemceType(isMinor: boolean): AudienceType {
    return isMinor ? AudienceType.TEEN : AudienceType.GENERAL;
}

export function isAllowedFinancialAdvice(isMinor: boolean): boolean {
    if (isMinor) return false;
    return true;
}