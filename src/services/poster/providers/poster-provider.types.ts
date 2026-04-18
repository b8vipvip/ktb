import { PosterCandidate, PosterGenerateInput } from "@/types/poster";

export interface PosterProvider {
  key: string;
  displayName: string;
  generatePoster(input: PosterGenerateInput): Promise<PosterCandidate[]>;
}
