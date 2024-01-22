function appSetup(app) {
  try {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.info(`Server started on port ${PORT} 🚀🚀🚀`);
    });
  } catch (e) {
    console.error(`Unable to start the app!, caused by: `, e);
  }
}

module.exports = appSetup;
