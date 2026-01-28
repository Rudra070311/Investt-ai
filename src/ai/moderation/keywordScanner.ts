import { KEYWORDS } from "./keywords";
import { KeywordHit } from "./types";

export function scanKeywords(text: string): KeywordHit[] {
  const hits: KeywordHit[] = [];

  for (const [category, words] of Object.entries(KEYWORDS)) {
    for (const word of words) {
      if (text.includes(word)) {
        hits.push({
          keyword: word,
          category: category as KeywordHit["category"],
        });
      }
    }
  }

  return hits;
}