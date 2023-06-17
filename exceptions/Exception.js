import { OutputType, printLog } from "../helpers/log.js";

export default class Exception extends Error {
  constructor(message) {
    super(message);
    printLog(`[ERROR] ==> ${message}`, OutputType.ERROR);
  }
}
