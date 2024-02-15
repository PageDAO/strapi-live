const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const paginate = (users,
    length,
    pagination)=>{return null};

const formatUserData=(response, strapiUsers)=>{return false;};

module.exports = ({ strapi }) => ({
  get: async (entityId) => {
    try {
      const user = await strapi.dynamicxyz.auth().getUser(entityId);
      const dynamicxyzUser = user.toJSON();

      return dynamicxyzUser;
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },

  create: async (payload) => {
    try {
      const userRecord = await strapi.dynamicxyz
        .auth()
        .getUserByEmail(payload.email)
        .catch(async (e) => {
          if (e.code === "auth/user-not-found") {
            const response = await strapi.dynamicxyz.auth().createUser(payload);

            return response.toJSON();
          }
        });

      if (userRecord) {
        return userRecord;
      }
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },

  register: async (userID, payload) => {
    try {
      const res = await strapi
        .plugin("dynamicxyz-auth")
        .service("userService")
        .create(payload);
      const actionCodeSettings = {
        url: process.env.BASE_URL,
      };
      const link = await strapi.dynamicxyz
        .auth()
        .generatePasswordResetLink(payload.email, actionCodeSettings);
      await strapi.plugin("users-permissions").service("user").edit(userID, {
        dynamicxyzUserID: res.uid,
        passwordResetLink: link,
      });
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },

  list: async (pagination, nextPageToken) => {
    const response = await strapi.dynamicxyz
      .auth()
      .listUsers(parseInt(pagination.pageSize), nextPageToken);
    const totalUserscount = await strapi.dynamicxyz.auth().listUsers();
    const strapiUsers = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany();

    const allUsers = formatUserData(response, strapiUsers);

    const { meta } = paginate(
      response.users,
      totalUserscount.users.length,
      pagination,
    );
    return { data: allUsers.users, pageToken: response.pageToken, meta };
  },

  updateDynamicxyzUser: async (entityId, payload) => {
    try {
      return await strapi.dynamicxyz.auth().updateUser(entityId, payload);
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  update: async (entityId, payload) => {
    try {
      const dynamicxyzPromise = strapi.dynamicxyz
        .auth()
        .updateUser(entityId, payload);

      return Promise.allSettled([dynamicxyzPromise]);
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  resetPasswordDynamicxyzUser: async (entityId, payload) => {
    try {
      return await strapi.dynamicxyz.auth().updateUser(entityId, payload);
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  resetPasswordStrapiUser: async (entityId, payload) => {
    try {
      return strapi
        .query("plugin::users-permissions.user")
        .update({ where: { dynamicxyzUserID: entityId }, data: payload });
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  resetPassword: async (entityId, payload) => {
    try {
      const dynamicxyzPromise = strapi.dynamicxyz
        .auth()
        .updateUser(entityId, payload);
      const strapiPromise = strapi
        .query("plugin::users-permissions.user")
        .update({ where: { dynamicxyzUserID: entityId }, data: payload });

      return Promise.allSettled([dynamicxyzPromise, strapiPromise]);
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  delete: async (entityId) => {
    try {
      const dynamicxyzPromise = strapi.dynamicxyz.auth().deleteUser(entityId);
      const strapiPromise = strapi
        .query("plugin::users-permissions.user")
        .delete({ where: { dynamicxyzUserID: entityId } });
      return Promise.allSettled([dynamicxyzPromise, strapiPromise]);
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  deleteDynamicxyzUser: async (entityId) => {
    try {
      const response = await strapi.dynamicxyz.auth().deleteUser(entityId);
      return response;
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  deleteStrapiUser: async (entityId) => {
    try {
      const response = await strapi
        .query("plugin::users-permissions.user")
        .delete({ where: { dynamicxyzUserID: entityId } });
      return response;
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  deleteMany: async (entityIDs) => {
    try {
      const response = await strapi.dynamicxyz
        .auth()
        .deleteUsers(JSON.parse(entityIDs));
      return response;
    } catch (e) {
      throw new ApplicationError(e.message.toString());
    }
  },
  async setSocialMetaData() {},
});
