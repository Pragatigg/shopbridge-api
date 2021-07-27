const maintainence = (req, res, next) => {
  res.status(503).send("Site is under maintainence mode, Please try after sometime");
};

module.exports = maintainence;
