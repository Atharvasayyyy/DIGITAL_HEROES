import Activity from "../models/Activity";

export const logActivity = async (
  lead: string,
  user: string,
  action: string,
  details = ""
) => {
  await Activity.create({
    lead,
    user,
    action,
    details,
  });
};