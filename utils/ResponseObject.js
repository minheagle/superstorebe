export default class ResponseObject {
  constructor(status, message, results) {
    this.status = status;
    this.message = message;
    this.results = results;
  }
}
