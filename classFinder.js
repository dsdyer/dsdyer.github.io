var elems = document.getElementsByTagName("*"), item;
var matches = ['Classes for Buddy:\n'];
for (var i = 0, len = elems.length; i < len; i++) {
    item = elems[i];
    if ((item.tagName === "DIV") && (item.textContent.trim().indexOf("BIOLOGY") === 0)) {
      if (item.textContent.trim().match(/\n/g) || item.textContent.trim().match(/http/g)) {
        continue;
      } else {
        if (matches[matches.length - 1] && item.textContent.trim() !== matches[matches.length - 1]) {
          matches.push('\n', '\n', item.textContent);
        }
      }
    }
    if (item.id && item.id.indexOf("MTG_") === 0) {
      if (item.textContent.trim().match(/\n/g) || item.textContent.trim().match(/http/g)) {
        continue;
      } else {
        if (matches[matches.length - 1] && item.textContent.trim() !== matches[matches.length - 1]) {
          matches.push(item.textContent);
        }
      }
    }
};

matches.join('\n');