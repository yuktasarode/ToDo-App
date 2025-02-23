const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { jwtSecret, jwtExpirationInSeconds } = require("../../../config");

const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    jwtSecret,
    {
      expiresIn: jwtExpirationInSeconds,
    }
  );
};

const encryptPassword = (password) => {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
};

module.exports = {
  signup: async (req, res) => {
    try {
      const { email, password, username } = req.body; // Extract properties correctly

      let encryptedPassword = encryptPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          password: encryptedPassword, // Store in the correct field
          username,
        },
      });

      const accessToken = generateAccessToken(user.username, user.id);

      return res.status(200).json({
        status: true,
        data: {
          user,
          token: accessToken,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          error: {
            message: `Could not find any user with username: \`${username}\`.`,
          },
        });
      }

      const encryptedPassword = encryptPassword(password);
      if (user.password !== encryptedPassword) {
        return res.status(400).json({
          status: false,
          error: {
            message: `Provided username and password did not match.`,
          },
        });
      }

      const accessToken = generateAccessToken(user.username, user.id);
      res.cookie("token", accessToken, {
        httpOnly: true,  // Prevents access from JavaScript
        secure: true,    // Only send over HTTPS (enable this in production)
        sameSite: "Strict", // Helps prevent CSRF attacks
        maxAge: jwtExpirationInSeconds * 1000, // Expiry time in milliseconds
      });

      return res.status(200).json({
        status: true,
        data: {
          user,
          message: "Login successful",
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  },

  home: async (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            data: {
                message: "Welcome to the todo app"  
            }           

        });
    } catch (error) {
      return res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  },
};
