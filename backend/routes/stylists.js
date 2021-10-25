const express = require("express");
const router = express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressErrors");
const { createToken } = require("../helpers/tokenHelper");
const zipcodeRadius = require("../helpers/zipcodeHelper");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Stylist = require("../models/stylist");
const stylistRegisterSchema = require("../schemas/stylistRegister.json");
const userLoginSchema = require("../schemas/userLogin.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

router.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, stylistRegisterSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errors);
    }
    const stylist = await Stylist.register(req.body);

    const token = createToken(stylist);
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userLoginSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errors);
    }
    const { email, password } = req.body;
    const stylist = await Stylist.authenticate(email, password);
    const token = createToken(stylist);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const stylists = await Stylist.getAll();
    return res.json(stylists);
  } catch (e) {
    return next(e);
  }
});

router.get("/search", ensureLoggedIn, async (req, res, next) => {
  try {
    const { zipcode } = req.query;
    const radius = await zipcodeRadius(zipcode);
    const stylists = await Stylist.search(radius);
    return res.json(stylists);
  } catch (e) {
    return next(e);
  }
});

router.get("/:email", ensureLoggedIn, async (req, res, next) => {
  try {
    const { email } = req.params;
    const stylist = await Stylist.getByEmail(email);
    return res.json(stylist);
  } catch (e) {
    return next(e);
  }
});

router.get("/:email/profile", ensureCorrectUser, async (req, res, next) => {
  try {
    const { email } = req.params;
    const stylist = await Stylist.getByEmail(email);
    return res.json(stylist);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:email/profile", ensureCorrectUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { email } = req.params;
    const stylist = await Stylist.update(email, req.body);
    return res.json(stylist);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:email/profile", ensureCorrectUser, async (req, res, next) => {
  try {
    const { email } = req.params;
    const stylist = await Stylist.remove(email);
    return res.json({ msg: `deleted user ${email}` });
  } catch (e) {
    return next(e);
  }
});

router.post("/:email/review", ensureLoggedIn, async (req, res, next) => {
  try {
    const { review, client_id } = req.body;
    const stylist_id = req.params.email;

    const newReview = await Stylist.review(review, client_id, stylist_id);

    return res.json(newReview);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
