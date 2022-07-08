function summarizeString(str: string, limit: number, appendText: string) {
  if (str.length <= 0) {
    return "";
  }
  if (!limit) {
    limit = 12;
  }
  if (str.length <= limit) {
    return str;
  }
  if (!appendText) {
    appendText = "...";
  }
  let str2 = str.substring(str.length - limit, str.length);
  str = str.substring(0, limit);

  str = str.replace(/\s+$/, ""); // right trim

  return str + appendText + str2;
}

export default summarizeString;
