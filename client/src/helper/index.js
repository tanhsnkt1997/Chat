import moment from "moment";
import _ from "lodash";

export const coverTimeStampToDMY = (timeStamp) => {
  let jsDate = new Date(timeStamp);
  let day = jsDate.getDate();
  let month = jsDate.getMonth() + 1;
  let year = jsDate.getFullYear();
  return { day, month, year };
};

export const renderDay = (engagementDate) => {
  let today = moment();
  let yesterday = moment().subtract(1, "day");

  if (moment(engagementDate).isSame(today, "day")) return "Today";
  else if (moment(engagementDate).isSame(yesterday, "day")) return "Yesterday";
  else {
    return moment(engagementDate).format("DD/MM/YYYY");
  }
};

const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export function niceBytes(x) {
  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

//check link => [link,..]
export const expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
export const checklink2 = new RegExp(
  "(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
  "i"
);

function isValidURL(str) {
  var pattern = new RegExp(
    "^((https?:)?\\/\\/)?" + // protocol
      "(?:\\S+(?::\\S*)?@)?" + // authentication
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locater
  if (!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isValidURL1(input) {
  let pattern =
    "^(https?:\\/\\/)?" + // protocol
    "((([a-zA-Z\\d]([a-zA-Z\\d-]{0,61}[a-zA-Z\\d])*\\.)+" + // sub-domain + domain name
    "[a-zA-Z]{2,13})" + // extension
    "|((\\d{1,3}\\.){3}\\d{1,3})" + // OR ip (v4) address
    "|localhost)" + // OR localhost
    "(\\:\\d{1,5})?" + // port
    "(\\/[a-zA-Z\\&\\d%_.~+-:@]*)*" + // path
    "(\\?[a-zA-Z\\&\\d%_.,~+-:@=;&]*)?" + // query string
    "(\\#[-a-zA-Z&\\d_]*)?$"; // fragment locator
  let regex = new RegExp(pattern);
  return regex.test(input);
}

const sortByKeys = (object) => {
  const keys = Object.keys(object);
  const sortedKeys = _.sortBy(keys);

  return _.fromPairs(_.map(sortedKeys, (key) => [key, object[key]]));
};
