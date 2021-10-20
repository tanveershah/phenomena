const apiRouter = require("express").Router();

const {
  createReport,
  closeReport,
  getOpenReports,
  createReportComment,
} = require("../db");

apiRouter.get("/reports", async (req, res, next) => {
  try {
    const reports = await getOpenReports();
    res.send({ reports });
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/reports", async (req, res, next) => {
  try {
    const newReport = await createReport(req.body);

    res.send(newReport);
  } catch (error) {
    next(error);
  }
});

apiRouter.delete("/reports/:reportId", async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { password } = req.body;

    const result = await closeReport(reportId, password);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

apiRouter.post("/reports/:reportId/comments", async (req, res, next) => {
  try {
    const { reportId } = req.params;

    const newComment = await createReportComment(reportId, req.body);

    res.send(newComment);
  } catch (error) {
    next(error);
  }
});

module.exports = apiRouter;
