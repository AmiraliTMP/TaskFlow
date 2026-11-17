import AppError from "../../utils/AppError.js";

const validateDashboardQuery = (query) => {
  const allowedFields = ["upcomingLimit"];

  const invalidFields = Object.keys(query).filter(
    (field) => !allowedFields.includes(field),
  );

  if (invalidFields.length) {
    throw new AppError(
      `Invalid dashboard query parameters: ${invalidFields.join(", ")}`,
      400,
    );
  }

  const upcomingLimit = query.upcomingLimit ? Number(query.upcomingLimit) : 5;

  if (
    !Number.isInteger(upcomingLimit) ||
    upcomingLimit < 1 ||
    upcomingLimit > 10
  ) {
    throw new AppError(
      "Upcoming limit must be an integer between 1 and 10.",
      400,
    );
  }

  return { upcomingLimit };
};

export { validateDashboardQuery };
