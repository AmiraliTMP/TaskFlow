import * as dashboardService from "./dashboard.service.js";

const getDashboard = async (req, res) => {
  const dashboard = await dashboardService.getDashboard(req.query);

  res.status(200).json({
    success: true,
    message: "Dashboard data retrieved successfully.",
    data: dashboard,
  });
};

export { getDashboard };
