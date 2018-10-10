const bcrypt = require("bcryptjs");

const hashPasswordIfChanged = async (user, options) => {
  const SALT_FACTOR = 10;
  if (user.changed("password")) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_FACTOR);
    // eslint-disable-next-line
    user.password = hashedPassword;
    return hashedPassword;
  }
};

const UserModel = (sequelize, DataTypes) => {
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
            args: [4, 127],
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
            args: [4, 127],
            msg: "The password needs to be between 4 and 128 characteres long"
          }
        }
      },
      avatarurl: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          len: {
            args: [0, 1023],
            msg: "The length cannot be longer than 1024 characters"
          }
        }
      },
      online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      brief_description: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          len: {
            args: [0, 31],
            msg: "The length cannot be longer than 32 characters"
          }
        }
      },
      detail_description: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          len: {
            args: [0, 255],
            msg: "The length cannot be longer than 256 characters"
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: hashPasswordIfChanged,
        beforeUpdate: hashPasswordIfChanged
      }
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: models.TeamMember,
      foreignKey: { name: "user_id", field: "user_id" }
    });

    // N:M
    User.belongsToMany(models.Channel, {
      through: models.ChannelMember,
      foreignKey: {
        name: "user_id",
        field: "user_id"
      }
    });
  };

  return User;
};

module.exports = UserModel;
