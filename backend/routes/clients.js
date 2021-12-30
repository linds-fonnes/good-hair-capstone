const express = require("express");
const router = express.Router();
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressErrors");
const { ensureCorrectUser } = require("../middleware/auth");
const { createToken } = require("../helpers/tokenHelper");
const Client = require("../models/client");
const userLoginSchema = require("../schemas/userLogin.json");
const clientRegisterSchema = require("../schemas/clientRegister.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

router.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, clientRegisterSchema);
    if (!validator.valid) {
      const errors = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errors);
    }
    const client = await Client.register(req.body);
    console.log("CLIENT", client);
    const token = createToken(client);
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
    const client = await Client.authenticate(email, password);
    const token = createToken(client);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

router.get("/:email/profile", ensureCorrectUser, async (req, res, next) => {
  try {
    const { email } = req.params;
    const client = await Client.getByEmail(email);
    return res.json(client);
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
    const { first_name, last_name, zipcode } = req.body;
    const client = await Client.update(email, first_name, last_name, zipcode);
    return res.json(client);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:email/profile", ensureCorrectUser, async (req, res, next) => {
  try {
    const { email } = req.params;
    const client = await Client.remove(email);
    return res.json({ msg: `deleted user ${email}` });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
