import bcrypt from "bcryptjs";

const hashPassword = async (user, options) => {
  const SALT_FACTOR = 10;
  if (!user.changed("password")) {
    return;
  }
  const hashedPassword = await bcrypt.hash(user.password, SALT_FACTOR);
  // eslint-disable-next-line
    user.password = hashedPassword;
  return hashedPassword;
};

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username can only contain letters and numbers"
          },
          len: {
            args: [4, 128],
            msg: "The username needs to be between 3 and 25 characteres long"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [4, 128],
            msg: "The password needs to be between 4 and 128 characteres long"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: { name: "userId", field: "user_id" }
    });
    // N:M
    User.belongsToMany(models.Channel, {
      through: "channel_member",
      foreignKey: { name: "userId", field: "user_id" }
    });
  };

  // eslint-disable-next-line func-names
  User.prototype.comparePassword = async function(password) {
    try {
      const isPasswordMatch = await bcrypt.compare(password, this.password);
      return isPasswordMatch;
    } catch (err) {
      console.log(err);
    }
  };

  User.prototype.userSummary = user => {
    const summary = {
      username: user.username,
      email: user.email,
      timestamp: user.timestamp
    };
    return summary;
  };
  return User;
};
