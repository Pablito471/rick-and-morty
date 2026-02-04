const { User } = require("../DB_connection");
const postReg = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Faltan datos");
    }
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: { password: password },
    });
    if (!created) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }
    return res.json({ user, access: true });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = postReg;
