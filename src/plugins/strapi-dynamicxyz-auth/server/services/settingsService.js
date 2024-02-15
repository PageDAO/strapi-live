const utils = require("@strapi/utils");
const { Context, DefaultContext } = require("koa");
//import admin, { ServiceAccount, auth } from "firebase-admin";
//import checkValidJson from "../utils/check-valid-json";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const { ValidationError, ApplicationError } = utils.errors;
module.exports = ({ strapi }) => {

  return {

    /*
    const options = {
  method: 'PUT',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"alias":"<string>","btcWallet":"3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5","ckbWallet":"ckt1q9876543210abcdefghijklmnopqrstuvwxyz","country":"US","discordNotification":true,"dogeWallet":"DPcy35vmuk8GXcfu1vgFFEeij3BuYYJQKB","email":"hello-world@foobar.com","emailNotification":true,"firstName":"<string>","jobTitle":"<string>","kasWallet":"kaspa:qrelgny7sr3vahq69yykxx36m65gvmhryxrlwngfzgu8xkdslum2yxjp3ap8m","kdaWallet":"k:0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF","lastName":"<string>","ltcWallet":"LUttH43tQ4x4qniCKr1Rqo8ESeXFPdv9ax","metadata":{},"newsletterNotification":true,"phoneNumber":"<string>","policiesConsent":true,"tShirtSize":"<string>","team":"<string>","username":"johndoe"}'
};

fetch('https://app.dynamicauth.com/api/v0/users/{userId}', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
    */
    async init() {
      try {
        var admin;
        admin.dynamicAPIUrl = "https://app.dynamicauth.com/api/v0/";
        admin.environmentID = "74bd1bf3-bdd5-43ba-8ea3-e744ebfaaaf2";
        admin.apiKey = "dyn_ukSfC9LIi5wiBD6vg4A4kfx2qYUpBFBEYl024kIoCd4ROr9HME2OuXjp"; //teststrapiplugin key
        admin.auth = {
          getUser: async (userID)=>{
            const options = {
              method: 'GET',
              headers: {Authorization: `Bearer ${admin.apiKey}`, 'Content-Type': 'application/json'}
            };
            fetch(`https://app.dynamicauth.com/api/v0/users/${userID}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
            return false;
          },
          getUserByEmail: async (userEmail)=>{
            const options = {method: 'GET', headers: {Authorization: `Bearer ${admin.apiKey}`}};
            const filterString = encodeURIComponent(JSON.stringify(
              {filterColumn: "email", filterValue: userEmail}
            ));
            fetch(`https://app.dynamicauth.com/api/v0/environments/${admin.environmentId}/users?filters=${filterString}`, options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
            return false;
          },
          generatePasswordResetLink: (email, actionCode)=>{return false;},
          createUser: (payload)=>{
            const options = {
              method: 'POST',
              headers: {Authorization: `Bearer ${admin.apiKey}`, 'Content-Type': 'application/json'},
              body: payload
            };
            
            fetch(`https://app.dynamicauth.com/api/v0/environments/${admin.environmentId}/users`, options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
              
            return false;
          },
          listUsers: ()=>{return false},
          updateUser: async (entityId, Payload)=>{
            const options = {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${admin.apiKey}`,
                'Content-Type': 'application/json'
              },
              body: Payload
            };
            
            fetch(`https://app.dynamicauth.com/api/v0/users/${entityId}`, options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
            return false;
          },
          deleteUser: (entityId)=>{return false;},
          verifyIdToken: (idToken)=>{
            jwt.verify(idToken, firebaseConfigJson, function(err, decodedToken) {
              console.log(decodedToken)
            });
            return false;
          }
        }
        strapi.firebase = admin;
      } catch (error) {
        console.log("bootstrap error -->", error);
      }
    },
    async encryptJson(key, json) {
      const encrypted = CryptoJS.AES.encrypt(json, key).toString();
      return encrypted;
    },
    async decryptJson(key, hash) {
      const decrypted = CryptoJS.AES.decrypt(hash, key).toString(
        CryptoJS.enc.Utf8,
      );
      return decrypted;
    },
    async restart() {
      strapi.log.info("*".repeat(100));
      strapi.log.info("SERVER IS RESTARTING");
      setImmediate(() => strapi.reload());
      strapi.log.info("*".repeat(100));
    },
  };
};
