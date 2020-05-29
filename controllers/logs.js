const path = require("path");
const Log = require(path.join("..", "models", "Log"));
const Tech = require(path.join("..", "models", "Tech"));

// @desc    Get all logs
// @route   GET /logs
// @access  Public
exports.getLogs = async (req, res, next) => {
  try {
    const logs = await Log.find();

    return res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

// @desc    Add a log
// @route   POST /logs
// @access  Public
exports.addLog = async (req, res, next) => {
  if (req.body.message) {
    const tech = await Tech.findOne({ fullName: req.body.tech });

    if (!tech) {
      return res.status(400).json({
        success: false,
        error: "Technician not found",
      });
    }

    req.body._tech = tech._id;

    try {
      const log = await Log.create(req.body);

      return res.status(201).json({
        success: true,
        data: log,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

// @desc    Update a log
// @route   PUT /logs/:id
// @access  Public
exports.updateLog = async (req, res, next) => {
  try {
    let log = Log.findById(req.params.id);

    if (!log) {
      return res.status(400).json({
        success: false,
        error: "Log not found",
      });
    }

    const tech = await Tech.findOne({ fullName: req.body.tech });

    if (!tech) {
      return res.status(400).json({
        success: false,
        error: "Technician not found",
      });
    }

    req.body._tech = tech._id;

    log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(201).json({
      success: true,
      data: log,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc    Delete a log
// @route   DELETE /logs/:id
// @access  Public
exports.deleteLog = async (req, res, next) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(400).json({
        success: false,
        error: "Technician not found",
      });
    }
    await log.remove();

    res.status(201).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
