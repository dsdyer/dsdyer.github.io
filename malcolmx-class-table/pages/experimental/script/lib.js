// Once tested, these will go into the ClassSection object

var _removeDuplicates = function(string) {
  if (string.indexOf('\n') !== -1) {
    var _arr = string.trim().split('\n');
    if (_arr[0] === _arr[1]) return _arr[0];
    return _arr;
  }
  return string;
};

var _resolveLocation = function(location) {
  var l = location.replace(/MXM\s\-\s/gi, '');
  l = _removeDuplicates(l);
  if (Array.isArray(l)) return l.join('<br>');
  return l;
};

var _resolveDateTime = function(datetime) {
  // Working:
  var dt = datetime.match(/(^(?:[A-Z][a-z])+\s.+[A|P]M.+?[A|P]M)?((?:[A-Z][a-z])+?.*$)/);
  
  // Better:
  // var dt = datetime.match(/(?:[A-Z][a-z])+\s.+?[A|P]M.+?[A|P]M/g);
  console.log('dt: ', dt);
  if (dt && dt.length === 1) return dt[0];

  var day0 = dt[0].match(/^[A-Z][a-z]+\s/i)[0].trim();
  var day1 = dt[1].match(/^[A-Z][a-z]+\s/i)[0].trim();
  var time0 = dt[0].replace(day0, '').trim();
  var time1 = dt[1].replace(day1, '').trim();

  if (day0 === day1) return day0 + ' ' + time0 + '<br>' + time1;
    // days are the same, return day0 plus the two times
    // console.log('day0: ', day0);
    // console.log('day1: ', day1);
    // console.log('times: ', times);


  if (time0 === time1) return day0 + day1 + ' ' + time0;

  // days are different, concat them and return that plus the times

  return day0 + day1 + ' ' + time0 + '<br>' + time1;
} 
/////////////////

function ClassSection(a, b, c, d, e) {
  this.course = a;
  this.section = b;
  this.datetime = c;
  this.location = d.replace(/MXM\s\-\s/gi, '');
  this.instructor = e;

  this._resolveDateTime = function(datetime) {
    var dt = datetime.split('\n');
  };

  this._resolveLocation = function(location) {
    return _removeDuplicates(location.replace(/MXM\s\-\s/gi, ''));
  };

  this._resolveInstructor = function(instructor) {
    return _removeDuplicates(instructor);
  };

  this._removeDuplicates = function(string) {
    if (string.indexOf('\n') !== -1) {
      var _arr = string.trim().split('\n');
      if (_arr[0] === _arr[1]) return _arr[0];
      return _arr.join('\n');
    }
    return string;
  };
}

// Extending basic javascript objects to know some things about the subject/class
// names and date/time formatting used on the ccc class search site.
// Holding off on fixing some of this until I update to ES6 because holy shit

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
