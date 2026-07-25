import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => {
        const source = error.param || error.location || "input";
        return `${source}: ${error.msg}`;
      })
      .join(". ");

    return res.status(400).json({
      message,
      errors: errors.array().map((error) => ({ field: error.param, message: error.msg })),
    });
  }

  next();
};

export default validateRequest;
