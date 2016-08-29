// Let's make a new object to handle class sections, which is what I should have done
// in the first place.

function Section(array) {
  // this.prototype = new;
  this._sourceArray = array;
}

Section.prototype = new String;

// Extending basic javascript objects to know some things about the subject/class
// names and date/time formatting used on the ccc class search site.

String.prototype.isClassName = function() {
  // console.log(this);
  return this.match(/[A-Z]*\s*[A-Z]+\d{0,3}\s+\d{2,4}[^\s]*\s\-\s[\w\d\s.]+/g) || false;
};

String.prototype.startsNewSection = function() {
  return this.match(/\d{2,4}-/g) || false;
};

String.prototype.extractTime = function() {
  var time = this.match(/\d{1,2}:\d{2}[am|pm]+/gi);
  if (time) return time[0];
  return "";
}

Array.prototype.findNextClassIndex = function(index) {
  var nci = this.slice(index + 1).findIndex(findNextClassName()) + 1 + index;
  if (nci === index) return undefined;
  return nci;
}


function findNextClassName(string) {
  return function(string) {
    return (string.isClassName()) ? true : false;
  };
};

// Some custom sorting functions, to be used by Array.sort()
// to put the classes in order

function sortByDay() {
  var dayMap = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ];

  return function(a, b) {
    try {
      var atext = a.getElementsByClassName('days')[0].textContent.trim();
    } catch(e) {
      var atext = '0';
    }

    try {
      var btext = b.getElementsByClassName('days')[0].textContent.trim();  
    } catch(e) {
      var btext = '0';      
    }

    for (var i = 0, l = dayMap.length; i < l; i++) {
      atext = atext.replace(dayMap[i], String(i+1));
      btext = btext.replace(dayMap[i], String(i+1));
    }

    for (var i = 0, l = dayMap.length; i < l; i++) {
      if (i >= atext.length) atext = atext.concat('0');
      if (i >= btext.length) btext = btext.concat('0');
    }

    if (atext < btext) return -1;
    if (atext > btext) return 1;
    return 0;
  };
};

function sortByTime() {
  return function(a, b) {
    var atime = convertTo24Hour(a.getElementsByClassName('datetime')[0].textContent.extractTime());
    var btime = convertTo24Hour(b.getElementsByClassName('datetime')[0].textContent.extractTime());
    return new Date('2016-1-1 ' + atime) - new Date('2016-1-1 ' + btime);
  };
};

// Javascript's Date() object expects times in 24 format
function convertTo24Hour(time) {
  var hours = parseInt(time.substr(0, 2));
  if(time.toLowerCase().indexOf('am') !== -1 && hours === 12) {
      time = time.replace('12', '0');
  }
  if(time.toLowerCase().indexOf('pm') !== -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
  }
  return time.replace(/(am|pm)/i, '');
}

function getSubjectNames(data) {
  var data = data.split(',');
  var subjects = [];

  for (var i = 0, l = data.length; i < l; i++) {
    if (data[i].isClassName()){
      var subject = data[i].match(/[A-Z]*\s?[A-Z]+\d{0,3}/)[0];
      // console.log(subjects.indexOf(subject));
      if (subjects.indexOf(subject) !== -1) continue;
      // ;
      // document.write('\n');
      subjects.push(subject);
    }
    // console.log(subjects);
  }
  return subjects;
  // classstring[i]
}

function createSubjectChecklist(subjects) {
  var htmlTarget = document.getElementById('subjectList');

  htmlTarget.innerHTML = '';

  for (var i = 0, l = subjects.length; i < l; i++) {
    var s = subjects[i].replace(/\s/g, '_');
    var e = document.createElement('div');

    e.classList.add('subject');
    e.innerHTML = '<input id="' + s + '" type="checkbox"><label for="' + s + '">' + subjects[i] + '</label>'

    htmlTarget.appendChild(e);
  }
}
