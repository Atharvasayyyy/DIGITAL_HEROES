export const statusFlow: Record<string, string[]> = {
  NEW: ["CONTACTED"],

  CONTACTED: ["QUALIFIED", "LOST"],

  QUALIFIED: ["PROPOSAL_SENT", "LOST"],

  PROPOSAL_SENT: ["WON", "LOST"],

  WON: [],

  LOST: [],
};

export const canMoveStatus = (
  current: string,
  next: string
) => {
  return statusFlow[current]?.includes(next);
};