var elems = document.getElementsByTagName("*"), item;
var matches = ['classes for buddy\n'];
for (var i = 0, len = elems.length; i < len; i++) {
  item = elems[i];
  if ((item.tagName === "DIV") && (item.textContent.trim().indexOf("BIOLOGY") === 0)) {
    if (item.textContent.trim().match(/\n\n/g) || item.textContent.trim().match(/http/g)) {
      continue;
    } else {
      if (matches[matches.length - 1] && item.textContent.trim() !== matches[matches.length - 1]) {
        matches.push(item.textContent.match(/\d{3}/g)[0]);
      }
    }
  }
  if (item.id && item.id.indexOf("MTG_") === 0) {
    if (item.textContent.trim().match(/\n\n/g) || item.textContent.trim().match(/\d{5}/g) || item.textContent.trim().match(/2016/g)) {
      continue;
    } else {
      if (matches[matches.length - 1] && item.textContent.trim() !== matches[matches.length - 1]) {
        matches.push(item.textContent);
      }
    }
  }
};

var class_list = [];
var class_num = '';

for (var i = 0, l = matches.length; i < l; i++) {
  if (matches[i].match(/^\d{1,2}$/g)) {
    class_num = matches[i].match(/\d{3}/g)[0];
    console.log('class_num: ' + class_num);
  } else {
      if (matches[i].match(/\n/g)) {
        class_list.push(class_num + '-' + matches[i].slice(0, matches[i].indexOf('-')));
    } else {
      class_list.push(matches[i].replace("MXM - ", ""));
    }
  }
}

class_list.join(',');

