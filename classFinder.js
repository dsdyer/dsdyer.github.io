var elems = document.getElementsByTagName("*"), item;
var matches = [];

String.prototype.isClassName = function() {
  return this.match(/[A-Z]+\s+\d{2,3}/g) || false;
};

for (var i = 0, len = elems.length; i < len; i++) {
  item = elems[i];
  if ((item.tagName === "DIV") && (item.textContent.trim().isClassName())) {
    if (item.textContent.trim().match(/\n\n/g) || item.textContent.trim().match(/http/g)) {
      continue;
    } else {
      if (item.textContent.trim() !== matches[matches.length - 1]) {
        matches.push(item.textContent.trim().isClassName()[0]);
      }
    }
  }
  if (item.id && item.id.indexOf("MTG_") === 0) {
    if (item.textContent.trim().match(/\n\n/g) || item.textContent.trim().match(/\d{5}/g) || item.textContent.trim().match(/2016/g)) {
      continue;
    } else {
      if (item.textContent.trim() !== matches[matches.length - 1].trim()) {
        matches.push(item.textContent.split(",")[0] + " ");
      }
    }
  }
};

var class_list = [];
var class_num = '';

for (var i = 0, l = matches.length; i < l; i++) {
  if (matches[i].isClassName()) {
    class_num = matches[i].match(/\d{2,3}/g)[0];
    class_list.push(matches[i]);
  } else {
      if (matches[i].match(/[\n\r]/g)) {
        class_list.push(class_num.trim() + '-' + matches[i].slice(0, matches[i].indexOf('-')) + " ");
    } else {
      class_list.push(matches[i].replace("MXM - ", ""));
    }
  }
}

class_list.join(',');

