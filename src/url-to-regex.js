function parse(url) {
  let str = "";

  for (var i =0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ":") {
      // eat all characters
      let param = "";
      for (var j = i + 1; j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      str += `(?<${param}>\\w+)`;
      i = j -1;
    } else {
      str += c;
    }
  }
  return str;
}

module.exports = parse;