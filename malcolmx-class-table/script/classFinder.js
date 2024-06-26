var elems = document.getElementsByTagName("*"), item;
var matches = [];
var class_list = [];
var class_num = '';

String.prototype.isClassName = function() {
  return this.match(/[A-Z]*\s*[A-Z]+\d{0,3}\s+\d{2,4}[^\s]*\s\-\s[\w\d\s.]+/g) || false;
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

for (var i = 0, l = matches.length; i < l; i++) {
  if (matches[i].isClassName()) {
    class_num = matches[i].match(/\d{2,4}/g)[0];
    class_list.push(matches[i]);
  } else {
      if (matches[i].match(/\b-[A-Z]{2,}/g)) {

        class_list.push(class_num.trim() + '-' + matches[i].slice(0, matches[i].indexOf('-')) + " ");
    } else {
      class_list.push(matches[i].replace("MXM - ", ""));
    }
  }
}

var output = class_list.join(',');

var url = "https://dsdyer.github.io/malcolmx-class-table/class_table.html";
// var url = "http://127.0.0.1:8080/malcolmx-class-table/class_table.html";

var w = window.open(url, 'target=_blank');

var done = false;
var count = 0;

var sendMsg = function() {
  if (count > 5) window.clearInterval(sender);
    if (w && class_list) {
      w.postMessage(class_list.join(), '*');
    }
    count++;
};

var sender = window.setInterval(sendMsg, 1000);

window.addEventListener("message", function(e) {
  window.clearInterval(sender);
}, false);
