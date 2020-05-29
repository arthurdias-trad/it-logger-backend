const path = require("path");
const Tech = require(path.join("..", "models", "Tech"));

// @desc    Get all techs
// @route   GET /techs
// @access  Public
exports.getTechs = async (req, res, next) => {
  try {
    const techs = await Tech.find();

    return res.status(200).json({
      success: true,
      data: techs,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

// @desc    Add a tech
// @route   POST /techs
// @access  Public
exports.addTech = async (req, res, next) => {
  if (req.body.firstName && req.body.lastName) {
    const newTech = req.body;

    try {
      const tech = await Tech.create(newTech);

      return res.status(201).json({
        success: true,
        data: tech,
      });
    } catch (err) {
      if (err.errmsg.includes("E11000")) {
        return res.status(400).json({
          success: false,
          errMsg: "Duplicate name",
        });
      } else {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }
    }
  }
};

// @desc    Delete a tech
// @route   DELETE /techs/:id
// @access  Public
exports.deleteTech = async (req, res, next) => {
  try {
    const tech = await Tech.findById(req.params.id);

    if (!tech) {
      return res.status(400).json({
        success: false,
        error: "Technician not found",
      });
    }
    await tech.delete();

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
