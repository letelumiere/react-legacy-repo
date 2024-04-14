const instance = require("../models/instance");
const instanceController = {};

instanceController.findInstance();
instanceController.create();
instanceController.join();
instanceController.leave();
instanceController.remove();



module.exports = instanceController;