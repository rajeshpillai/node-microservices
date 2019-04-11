const axios = require("axios");
const {
  serviceDatabase: { port }
} = require("../config");

const hostname = "http://localhost";
const databaseURL = `${hostname}:${port}`;

const get = async path =>
  (await axios.get(`${databaseURL}/${path}`)).data.payload;

const post = async (path, body) =>
  (await axios.post(`${databaseURL}/${path}`, {
    ...body
  })).data.payload;

// const getMails = async () => {
//   const mails = (await axios.get(`${databaseURL}/mails`)).data.payload;
//   return mails;
// };

// const getSingleMail = async id => {
//   const mail = (await axios.get(`${databaseURL}/mails/${id}`)).data.payload;
//   return mail;
// };

const postSingleMail = async body => {
  const postedMail = (await axios.post(`${databaseURL}/mails`, {
    ...body
  })).data.payload;

  return postedMail;
};

module.exports = {
  Query: {
    mails: () => get("mails"),
    mail: (_, args) => {
      return get(`mails/${args.id}`);
    }
  },
  Mutation: {
    mail: (_, args) => post("mails", args)
  }
};
