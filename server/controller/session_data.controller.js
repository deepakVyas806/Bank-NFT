const sessionData = (req, res) => {
  res.status(200).json({
    success: true,
    message: "session data",
    sessionDetails: req.session,
  });
};

export { sessionData };
