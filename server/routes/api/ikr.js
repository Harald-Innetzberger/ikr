const { Router } = require('express');
const Ikr = require('../../models/Ikr');

// Create router working object to use
const router = Router();

// Get single Ikr, by accountNumber as search param!
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ikr = await Ikr.find({ accountNumber: id });
    if (!ikr) {
      throw new Error(`Ikr with ${id} not found`);
    }
    res.status(200).json(ikr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get Ikr
router.get("/", async (req, res) => {
  try {
    const ikrList = await Ikr.find();
    if (!ikrList) {
      throw new Error("No Ikrs found.");
    }
    res.status(200).json(ikrList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create Ikr
router.post("/", async (req, res) => {
  const newIkr = new Ikr(req.body);
  // Proof if entry with account number already exists...
  const isInDB = await Ikr.countDocuments({
    accountNumber: req.body.accountNumber,
  });
  if (isInDB === 0) {
    try {
      const ikr = await newIkr.save();
      if (!ikr) {
        throw new Error("Something was going wrong on creating a new Ikr");
      }
      res.status(200).json(ikr);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: 'Entry already exists in DB' })
  }
});
// Delete Todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Ikr.findByIdAndDelete(id);
    if (!removed) {
      throw new Error("Ikr can't removed");
    }
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
