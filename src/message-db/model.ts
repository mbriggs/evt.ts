export class ExpectedVersionError extends Error {}

export interface Settings {
  batchSize: number;
  correlation: string;
  groupMember: string;
  groupSize: number;
  condition: string;
}
