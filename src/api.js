import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...


  /** Get all companies. */

  static async getAllCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }


  /** Get all jobs. */

  static async getAllJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Get all job postings for a company. */

  static async getCompanyJobs(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company.jobs;
  }

  /** Get Filtered Companies */

  static async getFilteredCompanies(searchTerm) {
    const filters = { name : searchTerm };
    const res = await this.request(`companies`, filters);
    return res.companies;
  }

  /** Get Filtered Jobs */

  static async getFilteredJobs(searchTerm) {
    const filters = { title : searchTerm };
    const res = await this.request(`jobs`, filters);
    return res.jobs;
  }

  /** Log out a user */

  static async logout() {
    this.token = null;
  }

  /** Log a user in */

  static async login(data){
    const res = await this.request('auth/token', data, "post");
    this.token = res.token;
    return res.token
  }

  /** Sign up a new user */

  static async signup(data){
    const res = await this.request('auth/register', data, "post");
    this.token = res.token;
    return res.token
  }

  /** Edit a user */

  static async editUser(data){
    // sends data to /users/:username
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let password = data.password;
    let update = { firstName, lastName, email, password };
    const res = await this.request(`users/${data.username}`, update, "patch");
    return res.user;
  }

  /** Get a user by username */

  static async getUser(username){
    const res = await this.request(`users/${username}`);
    console.log("GetUser, JOBLYAPI", res);
    return res.user;
  }

  /** Applies a user to a job */

  static async applyToJob(username, jobId){
    const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

  /** Gets a job based off a jobId */

  static async getJob(jobId){
    const res = await this.request(`jobs/${jobId}`);
    return res.job;
  }
}




export default JoblyApi;