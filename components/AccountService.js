class AccountService {
    constructor() {
        this.apiDomain = "https://yachmanservice.azurewebsites.net";
        this.endpoint = {
            externalLoginProviders : "api/Account/ExternalLogins?returnUrl=%2F&generateState=true"
        };
      }
      get externalLoginProviders(){
        return `${this.apiDomain}/${this.endpoint.externalLoginProviders}`
      }
}
export default AccountService;