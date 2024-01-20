module.export = ResponseHelper = {
  serverError: (res) => {
    return res.status(500).send({
      status: 0,
      message: "Server Processing Error",
      data: []
    });
  }
}
