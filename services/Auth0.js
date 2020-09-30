import Auth0 from 'react-native-auth0';

const credentialsModule = require("../services/AuthCredentials")

export default new Auth0({
    domain:       credentialsModule.domain,
    clientId:     credentialsModule.auth0ClientId
  })