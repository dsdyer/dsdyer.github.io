function makeTable(data, subjects) {
  table.innerHTML = ''; // Delete the previous table if there is one
  
  console.log('data in makeTable: ', data); // the data we receive from the search page

  // If data is null we'll use this string I got from doing a search and 
  // running classFinder in the console. This is how the checkbox thing works.
  var data = data || '';

  // data = data.replace(...)


  var subjects = subjects || undefined; // If subjects is defined, we're using the checkbox
                                        // thing. We'll only create table rows for the
                                        // subjects they checked.

  var classstring = data.split(',');    // Funny story: classstring is an array, not a string!
                                        // I probably meant to change that eventually.
                                        // .split() is a method that runs on a string (of text). It takes a single 
                                        // typewriter character and splits the string into an array (list of items),
                                        // starting a new item every time that character appears.

  // So the string: 'ABE GED  103 - ABE Reading Beg. Level,103-MWAB ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 115 ,Nashid Baaith'

  // Becomes the array:  [ 'ABE GED  103 - ABE Reading Beg. Level',
  //                       '103-MWAB ',
  //                       'MoTuWeTh 9:00AM - 10:50AM ',
  //                       'MX Bldg 2 - Rm 115 ',
  //                       'Nashid Baaith' ]
  // 
  // And so on for a million classes...

  var tablerow;
  var tableitem;
  var currentclass;

  console.log('classstring: ', classstring);
  // console.log('classstring[2819]: ', classstring[2819]);
  // console.log('classstring[2820]: ', classstring[2820]);
  // console.log('classstring[2821]: ', classstring[2821]);

  for (var i = 0, l = classstring.length; i < l; i++) {

    // if (classstring[i].indexOf('\n') !== -1) {

      classstring[i] = _removeDuplicates(_resolveLocation(classstring[i]));

      // if (arr[0] !== arr[1]) {
      //   console.log(arr);
      //   // console.log(arr[1]);
      // }
    // }


  // A "for" loop has three statements, separated by semicolons:
    // var i = 0, l = classstring.length;
      // Creates two variables: i is the number of thec urrent item in the 
      // classstring array, starting at 0. l is the length of the array

    // i < l;
      // "i is less than l" is an assertion made every time the loop runs. As long as it remains
      // true, the code between the { } will run again. After the last item i will equal l, so
      // the statement is false and the loop's code is skipped. We jump from the { on line 128
      // to the } on line 205.

    // i++; Is shorthand for "i = i + 1". The third statement runs at the end of the loop's code,
      // every time. So the first time, i is 0, and references to classstring[i] point to the first
      // item in classstring (we ALWAYS count from 0 in programming, if you start at 1 people will ask
      // if you have a fever). The third statement increments i, so the second time references to
      // classstring[i] point to the second item, classstring[1].
    // console.log('classstring[' + i + ']: ', classstring[i]);
    if (classstring[i].isClassName()) {
      // console.log('isClassName ' + i + ': ', classstring[i]);
      // If we're dealing with the start of a new class...                  
      var subjectName = classstring[i].match(/[A-Z]*\s?[A-Z]+\d{0,3}/)[0];
      if (subjects && subjects.indexOf(subjectName) === -1) {
        // If subjects is defined, we're using the checkboxes. If the name of the class'
        // subject doesn't match one of the checked boxes, we use that .findNextClassIndex()
        // method we added to Arrays to find which element of classstring starts the next new
        // class. && means "and"

        var nextClassIndex = classstring.findNextClassIndex(i) || l; // || means "or"
          // If there is no next class index, i.e. we're on the last one, we set i equal to l, which teleports
          // us to the end of the loop. This was part of the bug with the extra classes showing up: the last 
          // class' name would be skipped, but everything else would render because there was no check to stop the
          // loop after we found all the subjects.

        i = nextClassIndex - 1; // we set i to the index before the next class string because 
                                // the third loop statement will i by 1
        continue; // the "continue" statement skips the rest of the code in its loop, but doesn't break
                  // out of the loop. Effectively it jumps us to the } that matches the { on line 127
      } else {
        // Do nothing!

        // The "if" on line 145 has two statements joined by an "and". That means BOTH must be true for
        // code between the if's { } brackets to run. the first statements asserts that "subjects" exist,
        // the second that the letters part of classstring[i] doesn't match any item in subjects. If either
        // assertion fails, we run code in the else{} block instead
      }

      // This was used to separate the rows by class name, before we started mixing classes together
      // and sorting them by date. Not deleting it for now cause maybe we'll want to do that again someday.

      currentclass = classstring[i].match(/[A-Z]*\s?[A-Z]+\d{0,3}\s+\d{2,4}[^\s]*/)[0];
      continue;
    }

    if (classstring[i].startsNewSection()) {
      tablerow = document.createElement('tr');
      tablerows.push(tablerow);

      tableitem = tablerow.appendChild(document.createElement('td'));
      tableitem.innerHTML = currentclass;

      tableitem = tablerow.appendChild(document.createElement('td'));
      tableitem.innerHTML = classstring[i];
      continue;
    }

    tableitem = tablerow.appendChild(document.createElement('td'));

    if (tablerow.childElementCount === 3) {
      tableitem.className = 'datetime';
    }

    tableitem.innerHTML = classstring[i];
  } // end classstring.length for loop

  for (var i = 0, l = tablerows.length; i < l; i++) {
    var datebox = tablerows[i].getElementsByClassName("datetime") || undefined;
    if (datebox.length) {
      datebox = datebox[0];
      var day = document.createElement("td");
      var datetime = _resolveDateTime(datebox.textContent) || '';

      datebox.textContent = _resolveDateTime(datebox.textContent);
      day.innerHTML = datebox.textContent.match(/^[a-z]+\s/gi);
      day.className = "days";
      day.style["text-align"] = "center";
      datebox.innerHTML = datebox.textContent.match(/\s.*\n?.*$/gi);
      tablerows[i].insertBefore(day, datebox);
    }
  }
// sort by day here

  tablerows.sort(sortByDay());

  var oneDay = [];
  var ultimateSorted = [];
  var prevDay;

  for (var i = 0, l = tablerows.length; i < l; i++) {
    if (tablerows[i].className === 'class-name') {
      continue;
    }
    var row = tablerows[i];
    try {
      var dayText = row.getElementsByClassName('days')[0].textContent;
  } catch(e) {
    console.log(row);
  }

    if ((prevDay && prevDay !== dayText)) {
      oneDay.sort(sortByTime());
      ultimateSorted = ultimateSorted.concat(oneDay);
      oneDay = [];
    }
    oneDay.push(row)
    if (i === l - 1) {
      // oneDay.sort(sortByDays());
      oneDay.sort(sortByTime());
      ultimateSorted = ultimateSorted.concat(oneDay);
    }
    prevDay = dayText;
  }

  // All done and sorted! Let's attach the rows to the table and get a beer.
  for (var i = 0, l = ultimateSorted.length; i < l; i++) {
    table.appendChild(ultimateSorted[i]);
  }
}

var table = document.getElementById('mx_table');
var tablerows = [];


document.body.onload = function() {

  // More duct tape.
  var form = document.getElementById('form');
  var dayChooser = document.getElementById('day-chooser');
  var days = dayChooser.getElementsByTagName('input');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var subjects = [];
    tablerows = [];
    for (var i = 0, l = form.elements.length; i < l; i++) {
      if (form.elements[i].checked) {
        subjects.push(form.elements[i].id.replace('_', ' '));
      }
    }
    rows = makeTable(undefined, subjects);
    dayChooser.style.display = 'block';
  });


  window.addEventListener("message", function(e) {           // This is neat! When the page gets an HTTP-POST message (which comes from
    window.opener.postMessage(true, window.location.origin); // the search page if the bookmarklet was used), we assume the message
    makeTable(e.data, undefined);                            // event contains the data from a valid class search, and post a reply.
    dayChooser.style.display = 'block';                      // The classFinder script is listening for the reply to know when to stop
  }, false);                                                 // sending data from the search

  for (var i = 0, l = days.length; i < l; i++) {
    days[i].addEventListener('change', function(elem) {
        if (this.checked) {
          model.addDay(this.id);
        } else {
          model.removeDay(this.id);
        }
        view.updateDays();
      }
    );
  };

  createSubjectChecklist(getSubjectNames(s_data));
};
