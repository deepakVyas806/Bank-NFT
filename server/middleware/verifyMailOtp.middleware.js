const verify_mail_otp = (req, res, next) => {
  const { email } = req.body;

  try {
    const registerSession = req.session.registerSession;

    if (!registerSession) {
      res.status(500).json({ successs: false, message: "send otp first" });
    }

    if (registerSession[email]) {
      req.verifyregisterSession = registerSession;
      return next();
    } else {
      res.status(500).json({
        success: false,
        message: "otp is expired try to generate new api and use",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in verify otp middleware",
      error: error.message,
    });
  }
};

export { verify_mail_otp };
