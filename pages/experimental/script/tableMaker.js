var safety = 0;

String.prototype.isClassName = function() {
  return this.match(/[A-Z]*\s*[A-Z]+\s+\d{2,4}[^\s]*\s\-\s[\w\d\s.]+/g) || false;
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

function sortByDay() {
  //   var dayMap = {
  //     'Mo': 1,
  //     'Tu': 2,
  //     'We': 3,
  //     'Th': 4,
  //     'Fr': 5,
  //     'Sa': 6
  // }

  return function(a, b) {

    try {
      var atext = a.getElementsByClassName('days')[0].textContent.replace('Mo', '1')
                                                                 .replace('Tu', '2')
                                                                 .replace('We', '3')
                                                                 .replace('Th', '4')
                                                                 .replace('Fr', '5')
                                                                 .replace('Sa', '6');
    } catch(e) {
      var atext = '0';
    }
    try {
      var btext = b.getElementsByClassName('days')[0].textContent.replace('Mo', '1')
                                                                 .replace('Tu', '2')
                                                                 .replace('We', '3')
                                                                 .replace('Th', '4')
                                                                 .replace('Fr', '5')
                                                                 .replace('Sa', '6');
    } catch(e) {
      var btext = '0';
    }
    if (atext < btext) return -1;
    if (atext > btext) return 1;
    return 0;
  };
};

// function sortByDays() {
//   return function(a, b) {
//     var atext = a.getElementsByClassName('days')[0].textContent.toLowerCase();
//     var btext = b.getElementsByClassName('days')[0].textContent.toLowerCase();

//     console.log('sorting by DAYS');
//     console.log('atext: ', atext);
//     console.log('btext: ', btext);

//     if (atext < btext) return -1;
//     if (atext > btext) return 1;
//     return 0;
//   }
// }

function sortByTime() {
  return function(a, b) {
    var atime = convertTo24Hour(a.getElementsByClassName('datetime')[0].textContent.extractTime());
    var btime = convertTo24Hour(b.getElementsByClassName('datetime')[0].textContent.extractTime());
    return new Date('2016-1-1 ' + atime) - new Date('2016-1-1 ' + btime);
  };
};

function convertTo24Hour(time) {
  var hours = parseInt(time.substr(0, 2));
  if(time.indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
  }
  if(time.toLowerCase().indexOf('pm')  != -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
  }
  return time.replace(/(am|pm)/i, '');
}


function tableForBuddies(data, subjects) {
  table.innerHTML = '';

  var data = data || 'ABE GED  103 - ABE Reading Beg. Level,103-MWAA ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 115 ,Nashid Baaith ,103-MWAB ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 115 ,Nashid Baaith ,103-MXAA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4305 ,Colleen Ogle ,ABE GED  104 - ABE Reading Beg. Level,104-MWAB ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 118 ,TBA TBA ,104-MXAA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4305 ,TBA TBA ,ABE GED  123 - ABE Math Beginning Level,123-MW01 ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 122 ,Edward Boyd ,123-MW02 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 122 ,Edward Boyd ,123-MX02 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4201 ,James McArthur ,ABE GED  124 - ABE Math Beginning Level,124-MW25 ,MoTuWeTh 11:00AM - 12:50PM ,TBA ,TBA TBA ,124-MX02 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4201 ,TBA TBA ,ABE GED  192 - Beginning Supplemental Reading I,192-MXNB ,Sa 9:00AM - 12:50PM ,Rm 4305 ,Robert Wilson ,ABE GED  234-2 - ABE Career Assessment ,234-MCF3 ,MoTuWeTh 1:00PM - 1:50PM ,MX Bldg 2 - Rm 118 ,Holly Parker ,ABE GED  400 - ABE Rdng Intermediate Level,400-MLC3 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Marilyn Derr ,400-MWAC ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 121 ,Robert Wilson ,400-MWAD ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 121 ,Robert Wilson ,400-MWAH ,MoTuWeTh 3:30PM - 5:20PM ,MX Bldg 2 - Rm 115 ,Nashid Baaith ,400-MXAG ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4303 ,Mary Holmes ,400-MXAJ ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4303 ,Barbara Moore ,400-MXAK ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4303 ,Jeff Schecter ,400-MXAL ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,ABE GED  401 - ABE Rdng Intermediate Level,401-MWCD ,MoTuWeTh 9:00AM - 10:50AM ,TBA ,TBA TBA ,401-MWKL ,MoTuWeTh 5:30PM - 7:20PM ,TBA ,TBA TBA ,401-MXAG ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4303 ,TBA TBA ,401-MXAJ ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4303 ,TBA TBA ,401-MXAK ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4303 ,TBA TBA ,ABE GED  420 - ABE Math Intermediate Level,420-MLC4 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Marilyn Derr ,420-MW03 ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 119 ,Darius Holmes ,420-MW04 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 119 ,Darius Holmes ,420-MW07 ,MoTuWeTh 1:30PM - 3:20PM ,MX Bldg 2 - Rm 123 ,James Butler ,420-MW09 ,MoTuWeTh 7:30PM - 9:20PM ,MX Bldg 2 - Rm 122 ,Edward Boyd ,420-MX05 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4309 ,Diana Jackson ,420-MX06 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4309 ,Diana Jackson ,420-MX10 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4309 ,Darlene Boyd ,420-MX11 ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4309 ,Darlene Boyd ,420-MXC3 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4205 ,Brenda Amoakon ,ABE GED  421 - ABE Math Intermediate Level,421-MLC5 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Staff ,421-MW26 ,MoTuWeTh 11:00AM - 12:50PM ,TBA ,TBA TBA ,421-MW29 ,MoTuWeTh 1:30PM - 3:20PM ,TBA ,TBA TBA ,421-MX05 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4309 ,TBA TBA ,421-MX10 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4309 ,TBA TBA ,421-MXC3 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4205 ,TBA TBA ,ABE GED  423 - ABE Math Intermediate Level,423-MLC6 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Brenda Amoakon ,423-MX14 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4204 ,Salvador Ramirez ,423-MX15 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4204 ,Salvador Ramirez ,423-MX16 ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4204 ,Herman Buckner ,423-MX18 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4204 ,Ivy Ellis ,423-MXH1 ,MoWe 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,423-MXTS ,MoWe 9:00AM - 12:50PM ,Spencer Technology Academy ,Herman Buckner ,ABE GED  424 - ABE Math Intermediate Level,424-MLC4 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Staff ,424-MW27 ,MoTuWeTh 11:00AM - 12:50PM ,TBA ,TBA TBA ,424-MX14 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4204 ,TBA TBA ,424-MX15 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4204 ,TBA TBA ,424-MX18 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4204 ,TBA TBA ,424-MXH1 ,MoWe 9:00AM - 12:50PM ,Westside Health Authority ,Staff ,424-MXST ,MoWe 9:00AM - 12:50PM ,Spencer Technology Academy ,Staff ,ABE GED  440 - ABE Wrtg Intermediate Level,440-MLC3 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Staff ,ABE GED  443 - ABE Wrtg Intermediate Level,443-MLC5 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Brenda Amoakon ,443-MWAK ,MoTuWeTh 5:30PM - 7:20PM ,MX Bldg 2 - Rm 120 ,Katrina Cunningham ,443-MXBA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4300 ,Trudy Moore ,443-MXBB ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4300 ,Trudy Moore ,443-MXBC ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4300 ,Nathaniel Phillips ,443-MXBD ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4301 ,David Liddell ,443-MXH2 ,TuTh 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,443-MXMC ,MoWe 7:30AM - 11:30AM ,Metro Correctional Ctr ,Staff ,443-MXST ,TuTh 9:00AM - 12:50PM ,Spencer Technology Academy ,Herman Buckner ,ABE GED  444 - ABE Wrtg Intermediate Level,444-MLC6 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Staff ,444-MWEF ,MoTuWeTh 9:00AM - 10:50AM ,TBA ,TBA TBA ,444-MWIJ ,MoTuWeTh 3:30PM - 5:20PM ,TBA ,TBA TBA ,444-MXBA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4300 ,TBA TBA ,444-MXBD ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4305 ,TBA TBA ,444-MXH2 ,TuTh 9:00AM - 12:50PM ,Westside Health Authority ,Staff ,444-MXST ,TuTh 9:00AM - 12:50PM ,Spencer Technology Academy ,Staff ,ABE GED  463 - ABE Basic Skl Gen Int Level,463-MXCC ,MoTuWeTh 7:30AM - 9:20AM ,Metro Correctional Ctr ,Mark Horn ,ABE GED  480 - ABE Constitution Course,480-MXEK ,Sa 11:00AM - 12:50PM ,Rm 4303 ,TBA TBA ,ABE GED  490 - Basic Skills Gen Int Level,490-MWBF ,Sa 9:00AM - 12:50PM ,MX Bldg 2 - Rm 123 ,Ivy Ellis ,490-MXHM ,Sa 9:00AM - 12:50PM ,HAYMARKET CENTER ,Andrew Hines ,490-MXJS ,Sa 9:00AM - 12:50PM ,Rm 4300 ,Jeff Schecter ,ABE GED  491 - Basic Skls Gen Int Level,491-MWS1 ,Sa 9:00AM - 12:50PM ,TBA ,TBA TBA ,491-MXHM ,Sa 9:00AM - 12:50PM ,HAYMARKET CENTER ,Staff ,491-MXJS ,Sa 9:00AM - 12:50PM ,Rm 4300 ,TBA TBA ,ABE GED  499 - Intermediate Supplemental Reading I,499-MXEX ,Sa 9:00AM - 10:50AM ,Rm 4303 ,Mary Holmes ,ABE GED  504 - Intermediate Supplemental Reading II,504-MXEX ,Sa 9:00AM - 10:50AM ,Rm 4303 ,TBA TBA ,ABE GED  580 - ABE Constitution Course,580-MXEK ,Sa 11:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,ABE GED  801 - GED Reading Advance Level,801-MWGH ,MoTuWeTh 9:00AM - 10:50AM ,TBA ,TBA TBA ,ABE GED  810 - GED Reading Adv Level Sp,810-MXAW ,MoWe 5:30PM - 9:20PM ,Rm 4200 ,Macario Valdovinos ,ABE GED  820 - GED Math Advance Level,820-MW05 ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 123 ,James Butler ,820-MW06 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 123 ,James Butler ,820-MW10 ,MoTuWeTh 7:30PM - 9:20PM ,MX Bldg 2 - Rm 120 ,Katrina Cunningham ,820-MX19 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4205 ,Alandria Jones ,820-MX20 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4309 ,Darlene Boyd ,820-MX21 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4205 ,Alandria Jones ,ABE GED  821 - GED Math Advance Level,821-MW28 ,MoTuWeTh 11:00AM - 12:50PM ,TBA ,TBA TBA ,821-MX19 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4205 ,TBA TBA ,ABE GED  830 - GED Math Advance Lvl Sp,830-MXAW ,TuTh 5:30PM - 9:20PM ,Rm 4200 ,Macario Valdovinos ,830-MXPS ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4200 ,Juan Gutierrez ,ABE GED  831 - GED Math Advance Lvl Sp,831-MXPS ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4200 ,TBA TBA ,ABE GED  840 - GED Writing Adv Level,840-MFBG ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4207 ,Barbara Richey ,840-MWAE ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 118 ,Holly Parker ,840-MWAF ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 118 ,Holly Parker ,840-MWAJ ,MoTuWeTh 5:30PM - 7:20PM ,MX Bldg 2 - Rm 118 ,Vasanta Doss ,840-MXBF ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4207 ,Barbara Richey ,840-MXBH ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4300 ,Nathaniel Phillips ,840-MXCO ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4305 ,Colleen Ogle ,ABE GED  841 - GED Writing Adv Level,841-MXBF ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4207 ,TBA TBA ,ABE GED  850 - GED Writing Adv Level Sp,850-MXSC ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4200 ,Juan Gutierrez ,ABE GED  860 - GED Basic Skill Gen Adv Lvl,860-MXGE ,MoWe 9:00AM - 12:50PM ,GEO Reentry Services ,Staff ,860-SEI1 ,MoWe 5:30PM - 9:30PM ,SEIU ,Staff ,ABE GED  861 - GED Basic Skill Gen Adv Lvl,861-MXGE ,MoWe 9:00AM - 1:00PM ,GEO Reentry Services ,Jeff Schecter ,861-SEI1 ,MoWe 5:30PM - 9:30PM ,SEIU ,Marcus Wolfe ,ABE GED  870 - GED Bsc Skll Gen Adv Lvl Sp,870-MXSP ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4200 ,Juan Gutierrez ,ABE GED  871 - GED Bsc Gen Adv Lvl Sp,871-MXSP ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4200 ,TBA TBA ,ABE GED  890 - Basic Skill Gen Adv Level,890-MW66 ,Sa 9:00AM - 12:50PM ,MX Bldg 2 - Rm 120 ,Francine Johnson ,890-MXAT ,Sa 9:00AM - 12:50PM ,Rm 4207 ,Monica Murray ,890-MXDH ,Sa 9:00AM - 12:50PM ,Rm 4309 ,Darius Holmes ,ABE GED  891 - Basic Skill Gen Adv Level,891-MWSA ,Sa 9:00AM - 12:50PM ,TBA ,TBA TBA ,891-MXAT ,Sa 9:00AM - 12:50PM ,Rm 4306 ,TBA TBA ,ABE GED  920 - GED Math Advanced Level,920-MX20 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4205 ,TBA TBA ,ABE GED  921 - GED Math Advanced Level,921-MX20 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4205 ,Alandria Jones ,ABE GED  940 - GED Writing Adv Level,940-MXBJ ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4300 ,Nathaniel Phillips ,940-MXBK ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4207 ,Barbara Richey ,940-MXC1 ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4207 ,Sherry Franklin ,ABE GED  941 - GED Writing Adv Level,941-MWMN ,MoTuWeTh 5:30PM - 7:20PM ,TBA ,TBA TBA ,941-MXBK ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4207 ,TBA TBA ,ABE GED 1420 - Basic Skills Gen Int Level,142-MXT1 ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4204 ,Ivy Ellis ,ABE GED 1620 - ABE Bas Skl Gen Int Level,162-MXTW ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4207 ,Monica Murray ,ADLTFIT 1304 - ZUMBA,130-ZUM ,Th 5:30PM - 6:30PM ,Malcolm X College ,Staff ,ADLTFIT 1309 - Beginning Yoga,130-YOG ,We 5:30PM - 7:00PM ,Malcolm X College ,Staff ,ADLTFIT 1312 - Pilates,131-PILA ,Sa 9:00AM - 10:30AM ,Malcolm X College ,Staff ,AFRO AM  101 - Introduction to African,101-B ,TuTh 8:00AM - 9:15AM ,Rm 4415 ,Edward Davis ,101-D ,TuTh 10:00AM - 11:15AM ,Rm 3207 ,Regina Walton ,101-E ,MoWe 2:00PM - 3:15PM ,Rm 4414 ,Regina Walton ,101-G ,MoWe 4:00PM - 5:40PM ,Rm 4415 ,Edward Davis ,101-HNR ,TuTh 12:30PM - 1:45PM ,Rm 4414 ,Edward Davis ,101-KT ,Tu 6:00PM - 8:30PM ,Rm 3416 ,Regina Walton ,101-MC1 ,TuTh 4:00PM - 5:40PM ,Rm 4415 ,Edward Davis ,ANTHRO  201 - Intro to Biological and Cultural Evolutions of Humans,201-JW ,We 6:00PM - 8:30PM ,Rm 4415 ,Arturo Marquez Jr ,ANTHRO  202 - Cultural Anthropology,202-C ,MoWe 10:00AM - 11:15AM ,Rm 3416 ,Edward Davis ,202-D ,TuTh 10:00AM - 11:15AM ,Rm 3402 ,Edward Davis ,ART  103 - Art Appreciation,103-D ,TuTh 10:00AM - 11:15AM ,Rm 4112 ,Ben Rubin ,103-E ,MoWe 12:30PM - 1:45PM ,Rm 3405 ,Ben Rubin ,103-E2 ,MoWe 12:30PM - 2:10PM ,Rm 6014 ,Tonya Hart ,103-H ,TuTh 4:00PM - 5:15PM ,Rm 3305 ,Rachel Slotnick ,ART  130 - African,130-K ,TuTh 6:00PM - 7:15PM ,Rm 3302 ,Michelle Perkins ,ASTROMY  201 - Descriptive Astronomy,201-P ,Sa 9:00AM - 11:30AM ,Rm 4416 ,Robert Wilson ,BIOLOGY  107 - Nutrition,107-D ,TuTh 11:00AM - 12:40PM ,Rm 3414 ,Tracie Hudson ,107-KT ,Tu 6:00PM - 8:30PM ,Rm 3414 ,Ramakrishna Siripuram ,107-Q ,Sa 2:00PM - 4:30PM ,Rm 3414 ,Maria Marelli ,BIOLOGY  114 - General Education Biology,114-CCA ,TuTh 12:00PM - 1:15PM ,Malcolm X College ,TBA TBA ,114-J ,MoWe 6:00PM - 7:15PM ,Rm 3414 ,Som Ale ,114-M ,Fr 9:30AM - 12:00PM ,Rm 3405 ,Reagan DeFlorio ,114-P ,Sa 9:30AM - 12:00PM ,Rm 3405 ,Khaja Basheeruddin ,BIOLOGY  115 - Human Biology,115-B ,TuTh 8:00AM - 9:15AM ,Rm 3408 ,Mashouf Shaykh ,115-C ,MoWe 11:00AM - 12:15PM ,Rm 3405 ,Mashouf Shaykh ,BIOLOGY  116 - Anatomy And Physiology,116-AC ,MoWe 8:00AM - 8:50AM ,Rm 3407 ,Tomer Kanan ,116-BK ,Fr 4:00PM - 5:40PM ,Rm 3411 ,Khaja Ahmad ,116-F ,TuTh 1:00PM - 1:50PM ,Rm 3408 ,Tomer Kanan ,116-N ,Fr 1:30PM - 4:50PM ,Rm 3414 ,Maxwell Sanei ,BIOLOGY  120 - Terminology For Medical Careers,120-D ,TuTh 9:30AM - 10:45AM ,Rm 3414 ,Khaja Ahmad ,120-D2 ,TuTh 10:00AM - 11:40AM ,Rm 3416 ,Tomer Kanan ,120-E ,MoWe 2:00PM - 3:40PM ,Rm 3414 ,Maxwell Sanei ,120-EW ,We 2:00PM - 4:30PM ,Rm 3405 ,Ramakrishna Siripuram ,120-FR ,Th 2:00PM - 4:30PM ,Rm 3414 ,Avni Thaci ,120-KR ,Th 6:00PM - 8:30PM ,Rm 3414 ,Jerry Jackson ,BIOLOGY  121 - Biology I,121-BF1 ,MoWe 8:00AM - 9:40AM ,Rm 3403 ,Erin McMurray ,121-BF2 ,Sa 8:00AM - 11:20AM ,Rm 3403 ,Jinwen Ding ,121-C ,MoWe 11:00AM - 12:40PM ,Rm 3408 ,Peter Grudzien ,121-C2 ,MoWe 9:30AM - 11:50AM ,Rm 3414 ,Chafika Boudiaf ,121-D ,TuTh 11:00AM - 12:40PM ,Rm 3403 ,Chiju Huang ,121-F ,TuTh 2:00PM - 3:40PM ,Rm 3403 ,Peter Grudzien ,121-G ,MoWe 3:00PM - 4:40PM ,Rm 3408 ,Fabio Pibiri ,121-GJ ,MoWe 5:00PM - 6:00PM ,Rm 3403 ,Arthur Reliford ,121-HNR ,TuTh 8:00AM - 9:40AM ,Rm 3403 ,Chiju Huang ,121-HY1 ,MoWe 2:00PM - 3:40PM ,Rm 3403 ,Tracie Hudson ,121-HY2 ,MoWe 11:00AM - 12:40PM ,Rm 3403 ,Tracie Hudson ,121-HY3 ,FrSa 8:00AM - 9:40AM ,Rm 3414 ,Dilip Deb ,121-HYB ,TuTh 6:00PM - 7:40PM ,Rm 3408 ,Dilip Deb ,121-J ,MoWe 6:00PM - 7:40PM ,Rm 3408 ,Fabio Pibiri ,121-K ,TuTh 6:00PM - 8:20PM ,Rm 3403 ,Arthur Reliford ,121-M ,Fr 9:00AM - 12:20PM ,Rm 3403 ,Erin McMurray ,121-N ,Fr 4:00PM - 7:20PM ,Rm 3403 ,Kaneka Box ,BIOLOGY  122 - Biology II,122-A ,MoWe 8:00AM - 9:40AM ,Rm 3405 ,Dmitriy Brener ,122-M ,Fr 9:00AM - 12:20PM ,Rm 3408 ,Marcela Bernal-Munera ,BIOLOGY  130 - Human Cadaver Anatomy I,130-BT ,Tu 8:00AM - 8:25AM ,Rm 3416 ,Sheila Wicks ,BIOLOGY  131 - Human Cadaver Anatomy II,131-BR ,Th 8:00AM - 8:25AM ,Rm 3416 ,Sheila Wicks ,BIOLOGY  209 - Biochemistry,209-P ,Sa 8:00AM - 9:40AM ,Rm 3401 ,Peter Grudzien ,BIOLOGY  226 - Human Structure and Function I,226-C ,MoWe 11:00AM - 11:50AM ,Rm 3407 ,Azmia Javed ,226-D ,TuTh 11:00AM - 11:50AM ,Rm 3407 ,Avni Thaci ,226-E ,MoWe 2:00PM - 2:50PM ,Rm 3407 ,Tomer Kanan ,226-F ,TuTh 2:00PM - 2:50PM ,Rm 3407 ,Emilio Carrasco ,226-HNR ,TuTh 8:00AM - 8:50AM ,Rm 3407 ,Avni Thaci ,226-J ,MoWe 6:00PM - 6:50PM ,Rm 3407 ,Ramakrishna Siripuram ,226-K ,TuTh 5:00PM - 6:00PM ,Rm 3407 ,Avni Thaci ,226-M ,Fr 9:00AM - 12:20PM ,Rm 3407 ,Imran Khan ,226-N ,Fr 3:00PM - 4:40PM ,Rm 3407 ,Jack Taha ,226-P ,Sa 8:00AM - 9:40AM ,Rm 3407 ,Zahid Arfeen ,BIOLOGY  227 - Human Structure and Function II,227-A ,MoWe 8:00AM - 9:40AM ,Rm 3411 ,Sheila Wicks ,227-B ,TuTh 8:00AM - 9:10AM ,Rm 3411 ,Azmia Javed ,227-C ,MoWe 11:00AM - 11:50AM ,Rm 3411 ,Sheila Wicks ,227-F ,TuTh 2:00PM - 2:50PM ,Rm 3411 ,Sheila Wicks ,227-G ,MoWe 5:00PM - 6:00PM ,Rm 3411 ,Azmia Javed ,227-K ,TuTh 6:00PM - 6:50PM ,Rm 3411 ,Emilio Carrasco ,227-M ,Fr 9:00AM - 12:20PM ,Rm 3411 ,Emilio Carrasco ,227-P ,Sa 8:00AM - 9:40AM ,Rm 3411 ,Jack Taha ,227-MWH2 ,MoWe 9:00AM - 12:50PM ,MX Bldg 2 - Rm 116 ,Faylinda Walton ,227-MWH1 ,TuTh 9:00AM - 11:50AM ,MX Bldg 2 - Rm 116 ,Linda Flannigan ,227-MXH2 ,TuTh 9:00AM - 12:50PM ,Rm 4206 ,Francine Johnson ,227-MXH1 ,MoWe 9:00AM - 11:50AM ,Rm 4206 ,Linda Flannigan ,227-MWH4 ,TuTh 12:00PM - 1:50PM ,MX Bldg 2 - Rm 116 ,Linda Flannigan ,227-MXH4 ,MoWe 12:00PM - 1:50PM ,Rm 4206 ,Linda Flannigan ,BUSINES  111 - Introduction To Business,111-C ,MoWe 10:00AM - 11:15AM ,Rm 6001 ,David Daniels ,111-KR ,Th 6:00PM - 9:20PM ,Rm 6007 ,Kent Latimore ,111-M ,Fr 9:00AM - 11:30AM ,Rm 6001 ,Karen Scott ,BUSINES  216 - Entrepreneurship,216-BANN ,TuTh 4:00PM - 5:15PM ,Malcolm X College ,Dariusz Pilch ,BUSINES  231 - Marketing,231-JM ,Mo 6:00PM - 9:00PM ,Rm 6000 ,Reginald Lomax ,BUSINES  244 - Personal Finance,244-E ,MoWe 12:30PM - 1:45PM ,Rm 3201 ,David Daniels ,244-JW ,We 6:00PM - 9:00PM ,Rm 6000 ,Dache Mann ,BUSINES  284 - Business Communications,284-H ,TuTh 3:00PM - 4:15PM ,Rm 3201 ,Alta Williams ,CHEM  121 - Basic Chemistry I,121-A ,MoWe 9:00AM - 10:30AM ,Rm 4411 ,Talha Abubakr ,121-B ,TuTh 9:00AM - 10:30AM ,Rm 4411 ,Merhatibeb Woldeyohannes ,121-C ,MoWe 12:00PM - 1:30PM ,Rm 4411 ,Talha Abubakr ,121-D ,TuTh 12:00PM - 1:30PM ,Rm 4411 ,Merhatibeb Woldeyohannes ,121-D2 ,TuTh 12:00PM - 1:30PM ,Rm 4408 ,Sa Woon Kim ,121-E ,MoWe 12:00PM - 1:30PM ,Rm 4416 ,Halle Morrison ,121-G ,MoWe 3:00PM - 4:30PM ,Rm 4411 ,Sa Woon Kim ,121-K ,TuTh 5:30PM - 7:00PM ,Rm 4411 ,Mumtaz Hussain ,121-P ,Sa 8:30AM - 11:00AM ,Rm 4411 ,Mumtaz Hussain ,CHEM  201 - General Chemistry I,201-A ,MoWe 8:00AM - 9:30AM ,Rm 4407 ,Neil Miranda ,201-B ,TuTh 8:00AM - 9:30AM ,Rm 4407 ,James Smith ,201-E ,MoWe 12:30PM - 2:00PM ,Rm 4407 ,Gabriel Hose ,201-F ,TuTh 12:30PM - 2:00PM ,Rm 4407 ,Robert Wilson ,201-HK ,TuTh 5:30PM - 7:00PM ,Rm 4407 ,Gitendra Paul ,201-HNR ,MoWe 5:30PM - 7:00PM ,Rm 4407 ,Noel Vargas ,CHEM  203 - General Chemistry II,203-B ,TuTh 8:30AM - 10:10AM ,Rm 4401 ,Gitendra Paul ,203-J ,MoWe 5:00PM - 6:40PM ,Rm 4408 ,Mohsen Ebrahimi ,CHEM  205-1 - Organic Chemistry I,205-AC ,MoWe 8:00AM - 9:30AM ,Rm 4408 ,Merhatibeb Woldeyohannes ,CHEM  207-1 - Organic Chemistry II,207-B ,TuTh 8:00AM - 9:40AM ,Rm 4408 ,Neil Miranda ,CHINESE  101 - Introduction to Chinese,101-C1 ,MoWe 10:00AM - 12:00PM ,Rm 3200 ,Rong Lin ,CHLD DV  101-1 - Human Growth ,101-A ,MoWe 9:00AM - 10:40AM ,Rm 1314 ,Mary Lane ,101-M ,Fr 8:00AM - 12:00PM ,Rm 1314 ,Bernice Shelton ,CHLD DV  107 - Health Safety And Nutrition,107-EW ,We 12:30PM - 3:00PM ,Rm 1314 ,Mary Lane ,107-KR ,Th 6:00PM - 9:20PM ,Rm 1314 ,Tiffany Leshoure ,CHLD DV  109 - Language ,109-E ,Mo 12:00PM - 2:30PM ,Rm 1314 ,Mary Lane ,CHLD DV  120 - Intro To Early Childhood Education Group Care,120-DR ,Th 10:00AM - 12:30PM ,Rm 1314 ,Mary Lane ,120-JM ,Mo 6:00PM - 9:20PM ,Rm 1314 ,Tiffany Leshoure ,CHLD DV  143 - Science ,143-FK ,Th 12:45PM - 3:45PM ,Rm 1314 ,Jurellene Rigsby ,CHLD DV  149 - Creative Activities For Young Children,149-DT ,Tu 10:00AM - 12:40PM ,Rm 1314 ,Mary Lane ,149-N ,Fr 12:50PM - 3:00PM ,Rm 1314 ,Jurellene Rigsby ,CHLD DV  201 - Observation,201-JM ,Mo 6:00PM - 8:30PM ,Rm 4411 ,Sharon Taylor ,CHLD DV  258 - Principles ,258-KR ,Th 5:00PM - 8:50PM ,Rm 3311 ,Jurellene Rigsby ,CHLD DV  262-1 - Child,262-JW ,We 6:00PM - 8:50PM ,Rm 1314 ,Bernice Shelton ,CIS  101 - Computer Science 101,101-LY ,MoWe 11:00AM - 12:00PM ,Malcolm X College ,TBA TBA ,CIS  120 - Intro to Microcomputers,120-A ,MoWe 8:00AM - 9:15AM ,Rm 6000 ,Billy Cunningham ,120-C ,MoWe 10:00AM - 11:15AM ,Rm 6000 ,Billy Cunningham ,120-D ,TuTh 10:00AM - 11:15AM ,Rm 6000 ,Billy Cunningham ,120-E ,MoWe 12:30PM - 1:45PM ,Rm 6000 ,Billy Cunningham ,120-EG ,MoWe 2:00PM - 3:15PM ,Rm 6000 ,Kayode Jowosimi ,120-F ,TuTh 12:30PM - 1:45PM ,Rm 6000 ,Billy Cunningham ,120-FH ,TuTh 2:00PM - 3:15PM ,Rm 6000 ,Kayode Jowosimi ,120-H2 ,TuTh 3:50PM - 5:30PM ,Rm 6001 ,Hashim Weyesso ,120-HK ,TuTh 3:30PM - 5:10PM ,Rm 6000 ,Marla Johnson ,120-JM ,Mo 6:00PM - 9:20PM ,Rm 6001 ,Kayode Jowosimi ,120-KR ,Th 6:00PM - 8:30PM ,Rm 6001 ,Shallie Griffin ,120-M ,Fr 9:30AM - 12:50PM ,Rm 6000 ,Evelina Hristova ,120-P ,Sa 9:00AM - 11:30AM ,Rm 6000 ,Kent Latimore ,120-P2 ,Sa 9:30AM - 12:50PM ,Rm 6001 ,Evelina Hristova ,120-Q ,Sa 1:00PM - 4:20PM ,Rm 6000 ,Kent Latimore ,CIS  145 - Database Management,145-KR ,Th 6:00PM - 8:30PM ,Rm 6010 ,Kayode Jowosimi ,EMT  100 - Emergency Medical Technician ,100-CEG ,We 10:00AM - 12:40PM ,Rm 6005 ,Christopher Easley ,EMT  101 - Emergency Medical Technician,101-DFL ,TuTh 9:30AM - 12:20PM ,Rm 7005 ,William Passmore ,101-JRW ,MoWe 2:00PM - 4:50PM ,Rm 7005 ,Robert Caron ,101-LST ,TuTh 3:00PM - 5:50PM ,Rm 7005 ,Michael Flaherty ,EMT  223 - Essentials of  Paramedic Medicine II,223-CEG ,MoWe 9:30AM - 1:20PM ,Rm 7005 ,Patrick Mroczek ,EMT  224 - Paramedic Medicine Practicum II,224-CEG ,Fr 9:30AM - 11:10AM ,Rm 7005 ,James Thorpe ,ENGLISH   98 - Composition,98-A ,MoWe 8:00AM - 9:15AM ,Rm 3305 ,Sola Isabell-Lay ,98-AC ,TuTh 9:30AM - 10:45AM ,Rm 3305 ,Loretta Ragsdell ,98-C ,MoWe 11:00AM - 12:15PM ,Rm 3305 ,Andrew Ball ,98-D ,TuTh 11:00AM - 12:15PM ,Rm 3305 ,Andrew Ball ,98-D2 ,TuTh 10:00AM - 11:40AM ,Rm 2201 ,Maria Palazzolo ,98-F ,TuTh 12:30PM - 2:10PM ,Rm 3305 ,Deborah Wells ,98-G ,MoWe 3:50PM - 5:30PM ,Rm 3305 ,Alexandra Adams ,98-J ,MoWe 6:00PM - 7:15PM ,Rm 3305 ,Alexandra Adams ,98-K ,TuTh 6:00PM - 7:40PM ,Rm 3203 ,Shannon Wood ,ENGLISH  100 - Basic Writing Skills,100-A ,MoWe 8:00AM - 9:15AM ,Rm 3207 ,Nneka Alexander ,100-ALP ,TuTh 10:55AM - 12:10PM ,Rm 3301 ,Carleta Alston ,100-ALP3 ,MoWe 7:35PM - 9:00PM ,Rm 3203 ,Rachel Slotnick ,100-ALP5 ,MoWe 9:30AM - 10:45AM ,Rm 3306 ,Aletha Osborne ,100-ALP6 ,TuTh 12:30PM - 1:45PM ,Rm 3306 ,Adrienne Watson ,100-ALP7 ,MoWe 12:00PM - 1:40PM ,Rm 3301 ,Morgan Halstead ,100-B ,TuTh 8:00AM - 9:15AM ,Rm 3305 ,Loretta Ragsdell ,100-D2 ,TuTh 10:00AM - 11:40AM ,Rm 6005 ,Deborah Wells ,100-E ,MoWe 12:30PM - 1:45PM ,Rm 3206 ,Carleta Alston ,100-F ,TuTh 12:30PM - 1:45PM ,Rm 3206 ,Aletha Osborne ,100-F2 ,TuTh 12:30PM - 2:10PM ,Rm 2201 ,Rachel Slotnick ,100-G ,MoWe 3:30PM - 4:45PM ,Rm 3207 ,Marlene Chamberlain ,100-JM ,Mo 6:00PM - 8:30PM ,Rm 3200 ,Janet Henderson ,100-K1 ,TuTh 6:00PM - 7:40PM ,Rm 3305 ,Janet Henderson ,ENGLISH  101 - Composition,101-ALP ,TuTh 9:30AM - 10:45AM ,Rm 3301 ,Carleta Alston ,101-ALP2 ,TuTh 12:50PM - 2:05PM ,Rm 3301 ,Gregory Nault ,101-ALP3 ,MoWe 6:00PM - 7:25PM ,Rm 3203 ,Rachel Slotnick ,101-ALP4 ,MoWeFr 9:00AM - 10:10AM ,Rm 3203 ,Maria Palazzolo ,101-ALP5 ,MoWe 8:00AM - 9:15AM ,Rm 3309 ,Aletha Osborne ,101-ALP6 ,TuTh 11:00AM - 12:15PM ,Rm 3200 ,Adrienne Watson ,101-ALP7 ,MoWe 10:00AM - 11:40AM ,Rm 3301 ,Morgan Halstead ,101-B ,TuTh 8:00AM - 9:15AM ,Rm 3306 ,Sola Isabell-Lay ,101-BD ,TuTh 9:30AM - 11:10AM ,Rm 7010 ,Rong Lin ,101-BKD ,TuTh 10:00AM - 11:15AM ,Rm 3203 ,Aletha Osborne ,101-BKE ,TuTh 12:30PM - 1:45PM ,Rm 3203 ,Sola Isabell-Lay ,101-C ,MoWe 11:00AM - 12:15PM ,Rm 3306 ,Ivor Irwin ,101-CRNE ,TuTh 8:00AM - 10:00AM ,Malcolm X College ,LaKeisha Young ,101-E ,MoWe 12:30PM - 1:45PM ,Rm 3306 ,Crystal Thomas ,101-EG2 ,MoWe 12:30PM - 2:10PM ,Rm 3305 ,Shannon Wood ,101-H ,TuTh 3:30PM - 4:45PM ,Rm 3205 ,Marlene Chamberlain ,101-HYB ,TuTh 12:30PM - 2:10PM ,Rm 6005 ,Timothy Sharkey ,101-HYB2 ,MoWe 6:00PM - 7:15PM ,Rm 3206 ,Maria Montreal-Bermudez ,101-JM ,Mo 6:00PM - 8:30PM ,Rm 3306 ,Samuel Rush ,101-JW ,We 6:00PM - 8:30PM ,Rm 3306 ,Jill Wallace ,101-K ,TuTh 6:00PM - 7:15PM ,Rm 3306 ,Rong Lin ,101-LC2 ,TuTh 12:30PM - 1:45PM ,Rm 3207 ,Crystal Thomas ,101-P ,Sa 9:00AM - 11:30AM ,Rm 3306 ,Samuel Rush ,101-P2 ,Sa 9:00AM - 12:20PM ,Rm 3206 ,Vanessa Ruiz ,ENGLISH  102 - Composition,102-A ,MoWe 8:00AM - 9:15AM ,Rm 3302 ,Ivor Irwin ,102-C ,MoWe 10:00AM - 11:15AM ,Rm 3206 ,Crystal Thomas ,102-EG ,MoWe 2:00PM - 3:40PM ,Rm 3206 ,Timothy Chapman ,102-F ,TuTh 12:30PM - 1:45PM ,Rm 3200 ,Carleta Alston ,102-F2 ,TuTh 12:30PM - 1:45PM ,Rm 3402 ,Marlene Chamberlain ,102-HNR ,TuTh 9:30AM - 10:45AM ,Rm 3306 ,Andrew Ball ,102-HYB ,MoWe 7:40AM - 9:20AM ,Rm 3402 ,Joseph Suglia ,102-HYB2 ,TuTh 10:00AM - 11:15AM ,Rm 3206 ,Lisa Owens ,102-JM ,Mo 6:00PM - 8:30PM ,Rm 3301 ,Timothy Sharkey ,102-JW ,We 6:00PM - 8:30PM ,Rm 3301 ,Tarshel Beards ,102-LC1 ,MoWe 12:30PM - 1:45PM ,Rm 3203 ,Lisa Owens ,102-MMA ,TuTh 1:00PM - 2:40PM ,Malcolm X College ,Marianne McGeary ,ENGLISH  197 - Communications Skills,197-ALP2 ,TuTh 2:15PM - 3:30PM ,Rm 3301 ,Gregory Nault ,197-ALP4 ,MoWeFr 10:20AM - 11:30AM ,Rm 3203 ,Maria Palazzolo ,ENGLISH  241 - Creative Writing,241-FH ,TuTh 2:00PM - 3:40PM ,Rm 3206 ,Maria Montreal-Bermudez ,ENTRE  201 - Introduction to Entrepreneurship,201-BKJ ,TuTh 10:00AM - 11:15AM ,Rm 6010 ,Wayne Arnold ,201-HYB ,TuTh 12:30PM - 1:45PM ,Rm 3205 ,Wayne Arnold ,ESL  300 - ESL Intermediate Level,300-MLC7 ,MoTuWeTh 9:00AM - 12:50PM ,Blessed Sacrament ,Iwona Lippert-Szepan ,300-MX52 ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4306 ,Jeffrey Nofziger ,300-MXAC ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4301 ,Antonio Cortes ,300-MXED ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4306 ,Alberto Avalos ,ESL  301 - ESL Intermediate Level,301-MLC7 ,MoTuWeTh 9:00AM - 12:50PM ,Blessed Sacrament ,Staff ,301-MX52 ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4306 ,TBA TBA ,301-MXED ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4306 ,TBA TBA ,ESL  311 - ESL Intermediate Level,311-MXMC ,MoTuWeTh 9:30AM - 11:20AM ,Metro Correctional Ctr ,Mark Horn ,ESL  330 - ESL Supplemental Gen Lvl 3,330-MXEC ,Sa 9:00AM - 12:00PM ,Rm 4302 ,TBA TBA ,ESL  331 - ESL Suplementl Gen Lev 3,331-MXMC ,MoTuWeTh 9:30AM - 11:20AM ,Metro Correctional Ctr ,Staff ,ESL  332 - ESL Supplemental Gen 3 Lev,332-MXEC ,Sa 9:00AM - 12:50PM ,Rm 4302 ,Iwona Lippert-Szepan ,ESL  500 - ESL Advanced Level V,500-MXE1 ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4302 ,Agustin Leal ,500-MXEJ ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4302 ,Aleksandr Zvodinsky ,ESL  501 - ESL Advanced Level V,501-MXE1 ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4302 ,TBA TBA ,501-MXEJ ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4302 ,TBA TBA ,ESL  510 - ESL Advanced Level V,510-MXEP ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4203 ,Carmen Perez-Stoppert ,ESL  530 - ESL Supp Gen Lev 5,530-MXEL ,Sa 9:00AM - 12:50PM ,Rm 4203 ,Staff ,ESL  532 - ESL Low Advanced Level V,532-MXEL ,Sa 9:00AM - 12:50PM ,Rm 4203 ,Vasanta Doss ,ESL  700 - ESL Advanced Level 7,700-MXEM ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4203 ,Nader Shalabi ,700-MXEO ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4203 ,Carmen Perez-Stoppert ,ESL  701 - ESL Advanced Level 7,701-MXEM ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4203 ,TBA TBA ,701-MXEO ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4203 ,TBA TBA ,ESSS  101 - Certified Personal Trainer Prep,101-BKJ ,MoWe 11:00AM - 12:20PM ,Rm 2201 ,Maria Armstead ,101-T ,TuTh 6:00PM - 7:40PM ,Rm 2201 ,Robyn Becker ,ESSS  102 - Personal Exercise Trainer Practicum,102-GG ,Fr 1:00PM - 2:40PM ,Rm 2201 ,Maria Armstead ,FIN ART  104 - The World Of The Cinema,104-CW ,We 9:50AM - 12:20PM ,Rm 4105 ,Harry Faur ,104-KR ,Th 6:00PM - 8:30PM ,Rm 3310 ,Ben Rubin ,104-KT ,Tu 6:00PM - 8:30PM ,Rm 3204 ,Arnell Harris ,FIREMGT  198 - Strategies and Tactics II,198-HKTR ,Th 4:00PM - 7:20PM ,Rm 6011 ,Jeffery Kraft ,FIREMGT  210 - Principles of Fire Prevention,210-HKT ,Tu 4:00PM - 7:20PM ,Rm 6011 ,Edward Prendergast ,GEOLOGY  201 - Physical Geology,201-DF1 ,TuTh 11:00AM - 12:25PM ,Rm 4416 ,Halle Morrison ,HEALTH  102 - Medical Law ,102-MRW ,MoWe 5:30PM - 6:45PM ,Rm 4103 ,Hang Jung Kim ,HEALTH  107 - Pharmacology,107-XZ ,Fr 4:30PM - 6:10PM ,Rm 4103 ,Douglas Taylor ,HEALTH  250 - Health Education,250-A ,MoWe 8:00AM - 9:20AM ,Rm 6002 ,Michael Galvan ,250-B ,TuTh 8:00AM - 9:20AM ,Rm 6005 ,David Baker ,250-C ,MoWe 9:30AM - 10:50AM ,Rm 6002 ,Geraldine Pate ,HEAPRO  101 - Patient Care Technician Training,101-BKM ,TuTh 11:30AM - 1:10PM ,Rm 4104 ,Indrajeet Mody ,HEAPRO  102 - Health Career Studies,102-BDF ,Tu 9:00AM - 11:40AM ,Rm 6002 ,George West ,102-BF1 ,MoWe 11:00AM - 12:15PM ,Rm 6014 ,Hang Jung Kim ,102-BF2 ,Mo 6:00PM - 8:45PM ,Rm 6002 ,Pamela Nugent ,102-BKJ ,TuTh 12:30PM - 1:45PM ,Rm 6002 ,Hanna Wierzchowski ,102-GM ,Mo 1:40PM - 5:00PM ,Rm 6002 ,Hang Jung Kim ,102-SAA ,Sa 9:00AM - 12:20PM ,Rm 6002 ,Geraldine Pate ,102-ST ,Tu 6:00PM - 8:40PM ,Rm 6002 ,Helen Williams-Patton ,HIM  103 - Basic Coding ICD,103-K ,Th 6:00PM - 8:40PM ,Rm 4104 ,Sharvette Walker ,103-KL ,We 12:30PM - 3:10PM ,Rm 4103 ,Hanna Wierzchowski ,HIM  104 - Basic Coding CPT,104-K ,Mo 12:30PM - 3:10PM ,Rm 4103 ,Hanna Wierzchowski ,104-KL ,Tu 6:00PM - 8:40PM ,Rm 4104 ,Sharvette Walker ,HIM  201 - Clinical Pathophysiology,201-STR ,TuTh 7:20PM - 8:35PM ,Rm 4105 ,TBA TBA ,HIM  202 - Advanced Coding ICD9,202-NSR ,Th 4:30PM - 7:00PM ,Rm 4103 ,Letitia Patterson ,HIM  205 - Health Information Management Seminar I,205-N ,Tu 5:00PM - 5:50PM ,Rm 4103 ,Hanna Wierzchowski ,HIM  206 - HIM Seminar II,206-L ,Tu 2:30PM - 3:20PM ,Rm 4103 ,Letitia Patterson ,HIM  207 - Health Information Management Clinical Practicum,207-ST ,Th 7:10PM - 8:10PM ,Rm 4103 ,Letitia Patterson ,HISTORY  111 - History of American People To 1865,111-A ,MoWe 8:00AM - 9:15AM ,Rm 4415 ,Misbahudeen Ahmed-Rufai ,111-D ,TuTh 10:00AM - 11:15AM ,Rm 3405 ,Misbahudeen Ahmed-Rufai ,111-J ,MoWe 6:00PM - 7:40PM ,Rm 3402 ,Misbahudeen Ahmed-Rufai ,HISTORY  115 - Afro,115-F ,TuTh 12:30PM - 1:45PM ,Rm 3405 ,Misbahudeen Ahmed-Rufai ,HISTORY  248 - African History ,248-E ,MoWe 12:30PM - 1:45PM ,Rm 4104 ,Misbahudeen Ahmed-Rufai ,HUM  201 - General Course I Humanities,201-E ,MoWe 12:30PM - 1:45PM ,Rm 3205 ,Khadi King ,HUM  202 - General Course II Humanities,202-F ,TuTh 12:30PM - 1:45PM ,Rm 6014 ,Khadi King ,HUM  210 - Comparative Mythology,210-KT ,Tu 6:00PM - 8:30PM ,Rm 3200 ,Khadi King ,HUM  212 - Non,212-C ,MoWe 10:00AM - 11:40AM ,Rm 3207 ,Arnell Harris ,212-H ,TuTh 3:30PM - 4:45PM ,Rm 3302 ,Khadi King ,212-HNR ,MoWe 3:30PM - 4:45PM ,Rm 3302 ,Khadi King ,INTDSP  101 - College Success Seminar,101-B ,TuTh 8:00AM - 9:15AM ,Rm 3201 ,Adetokunbo Fatoke ,101-BD ,TuTh 9:30AM - 10:45AM ,Rm 3201 ,Juandalyn Holland ,101-C ,MoWe 10:00AM - 11:15AM ,Rm 3201 ,Adetokunbo Fatoke ,101-C2 ,MoWe 10:00AM - 11:40AM ,Rm 3205 ,Karen Mc Kindra ,101-D ,TuTh 10:00AM - 11:15AM ,Rm 6001 ,Adetokunbo Fatoke ,101-E ,MoWe 2:00PM - 3:15PM ,Rm 3201 ,Lewis Rule ,101-F ,TuTh 2:00PM - 3:15PM ,Rm 3205 ,Lewis Rule ,101-F2 ,TuTh 12:30PM - 2:10PM ,Rm 3201 ,Adetokunbo Fatoke ,101-G1 ,MoWe 4:00PM - 5:40PM ,Rm 3201 ,Lewis Rule ,101-G2 ,MoWe 4:00PM - 5:40PM ,Rm 3205 ,Adetokunbo Fatoke ,101-GTWY ,Fr 9:00AM - 12:00PM ,Rm 3205 ,Barabara Meschino ,101-J ,MoWe 6:00PM - 7:40PM ,Rm 3201 ,Adetokunbo Fatoke ,101-JM2 ,Mo 6:00PM - 9:00PM ,Rm 4415 ,Maria Muralles-Ball ,101-K ,TuTh 6:00PM - 7:40PM ,Rm 3205 ,Lewis Rule ,101-KT ,Tu 6:00PM - 9:00PM ,Rm 3201 ,Gail Grabczynski ,101-P2 ,Sa 9:00AM - 12:00PM ,Rm 3201 ,Tanya Cox ,101-Q ,Sa 1:00PM - 4:00PM ,Rm 3201 ,Lee Jones ,INTDSP  299-1 - Interdisciplinary Study and Service,299-STEM ,Tu 2:35PM - 3:25PM ,Rm 3200 ,Joshua Oladipo ,LEVELUP 2803 - Level Up,280-ENG ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Maria Palazzolo ,280-ENG2 ,MoTuWeTh 1:00PM - 4:00PM ,Malcolm X College ,Maria Palazzolo ,280-ENG5 ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Kayley Steuber ,280-MAT2 ,MoTuWeTh 1:00PM - 4:00PM ,Malcolm X College ,Babatunde Ishmael ,280-MAT3 ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Karla Jemison ,280-MAT5 ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Staff ,280-MAT6 ,MoTuWeTh 1:00PM - 2:00PM ,Malcolm X College ,Staff ,280-MATH ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Babatunde Ishmael ,280-REA2 ,MoTuWeTh 9:00AM - 12:00PM ,Malcolm X College ,Staff ,280-REA3 ,MoTuWeTh 1:00PM - 4:00PM ,Malcolm X College ,Staff ,280-READ ,MoTuWeTh 9:00AM - 1:00PM ,Malcolm X College ,Matthew DeLaCroix ,LIT  110 - Introduction To Literature,110-C ,MoWe 9:30AM - 10:45AM ,Rm 3305 ,Carleta Alston ,110-H ,TuTh 3:30PM - 4:45PM ,Rm 3203 ,Adrienne Watson ,110-IHSA ,TuTh 4:00PM - 5:15PM ,Malcolm X College ,James Brooks ,LIT  122 - Perspectives in Black Literature,122-D ,TuTh 10:00AM - 11:40AM ,Rm 4103 ,Gregory Nault ,MAS  220 - Massage Therapy Practice IV,220-BKH ,MoWe 6:00PM - 6:50PM ,Rm 2207 ,Sharon Wong ,MAS  221 - Integration of Massage Therapy IV,221-BKH ,TuTh 6:00PM - 6:50PM ,Rm 2207 ,William Hernandez ,MATH   90 - Mathematical Literacy,90-AC ,MoWe 9:00AM - 11:30AM ,Rm 6007 ,Mary Sheppard ,90-BD ,TuTh 9:00AM - 11:30AM ,Rm 6006 ,Mary Sheppard ,MATH   98 - Beginning Algebra with Geometry,98-A ,MoWe 7:40AM - 9:20AM ,Rm 3308 ,Hope Essien ,98-C ,MoWe 10:00AM - 11:40AM ,Rm 3309 ,Richard Williams ,98-D ,TuTh 10:00AM - 11:40AM ,Rm 3307 ,Richard Williams ,98-DF ,MoWe 12:30PM - 3:50PM ,Rm 6001 ,David St. John ,98-E ,MoWe 12:30PM - 2:10PM ,Rm 3309 ,Richard Williams ,98-F ,TuTh 12:30PM - 2:10PM ,Rm 3309 ,Hope Essien ,98-G ,MoWe 4:00PM - 5:40PM ,Rm 3309 ,Shahid Muhammad ,98-G1 ,MoWe 3:30PM - 5:45PM ,Rm 3310 ,Moinuddin Shaikh ,98-H ,TuTh 4:00PM - 5:40PM ,Rm 3310 ,Moinuddin Shaikh ,98-M2 ,Fr 9:00AM - 1:30PM ,Rm 3311 ,Yangtae Kim ,MATH   99 - Intermediate Algebra with Geometry,99-AC ,TuTh 9:00AM - 11:50AM ,Rm 3308 ,Codjo Padonou ,99-AM ,MoWeFr 8:00AM - 9:25AM ,Rm 3307 ,Marvin Johnson ,99-C ,MoWe 9:45AM - 11:50AM ,Rm 3308 ,David St. John ,99-CM ,MoWeFr 10:00AM - 11:25AM ,Rm 3307 ,Marvin Johnson ,99-D ,TuTh 9:45AM - 11:50AM ,Rm 3309 ,David St. John ,99-DF ,MoWe 12:30PM - 4:40PM ,Rm 6001 ,David St. John ,99-F ,TuTh 12:30PM - 2:35PM ,Rm 3308 ,Richard Williams ,99-FH1 ,TuTh 12:30PM - 3:20PM ,Rm 3311 ,Codjo Padonou ,99-G ,TuTh 3:40PM - 5:45PM ,Rm 3309 ,Codjo Padonou ,99-J ,MoWe 6:00PM - 8:05PM ,Rm 3308 ,Codjo Padonou ,99-K ,TuTh 6:00PM - 8:05PM ,Rm 3309 ,Shahid Muhammad ,99-K2 ,TuTh 6:00PM - 8:50PM ,Rm 3307 ,Isiaka Oduola ,99-MOD ,TuTh 12:30PM - 2:35PM ,Rm 6007 ,Opal Jones ,99-MOD1 ,TuTh 9:00AM - 11:50AM ,Rm 6007 ,Brandie Windham ,99-P ,Sa 9:00AM - 2:35PM ,Rm 3309 ,Gauri Chakravorty ,MATH  118 - General Education Math,118-ALP ,TuTh 9:30AM - 11:10AM ,Rm 3311 ,Hope Essien ,118-ALP2 ,TuTh 12:30PM - 2:10PM ,Rm 6006 ,Brandie Windham ,118-ALP3 ,MoWe 6:00PM - 7:40PM ,Rm 3311 ,Mohammed Yunusa ,118-ALP4 ,MoWe 9:00AM - 10:40AM ,Rm 3311 ,Mohammed Yunusa ,118-D ,MoWe 10:00AM - 11:40AM ,Rm 3310 ,Hope Essien ,118-E ,MoWe 12:30PM - 2:10PM ,Rm 3308 ,Opal Jones ,118-F2 ,MoWe 12:30PM - 2:45PM ,Rm 3307 ,Nneka Anigbogu ,118-H ,TuTh 4:00PM - 5:40PM ,Rm 3308 ,Alison Mastny ,118-H2 ,TuTh 3:30PM - 5:45PM ,Rm 3307 ,Shahid Muhammad ,118-HYB ,TuTh 10:00AM - 11:40AM ,Rm 4414 ,Nneka Anigbogu ,118-HYB2 ,TuTh 12:30PM - 2:10PM ,Rm 3310 ,Nneka Anigbogu ,118-J ,MoWe 6:00PM - 7:40PM ,Rm 3307 ,Shahid Muhammad ,118-M ,Fr 9:00AM - 1:30PM ,Rm 3308 ,Karla Jemison ,MATH  125-1 - Introductory Statistics,125-C ,MoWe 10:00AM - 11:40AM ,Rm 4414 ,Opal Jones ,125-D ,TuTh 10:00AM - 12:15PM ,Rm 6009 ,Opal Jones ,125-HNR ,MoWe 1:00PM - 2:40PM ,Rm 6007 ,Alison Mastny ,125-KT ,Tu 6:00PM - 9:20PM ,Rm 3310 ,Renad Alrousan ,MATH  140 - College Algebra,140-E ,MoWe 12:30PM - 2:45PM ,Rm 3310 ,Brandie Windham ,140-H ,TuTh 4:00PM - 5:40PM ,Rm 3207 ,Renad Alrousan ,MATH  143 - Pre Calculus,143-D ,TuTh 9:00AM - 11:30AM ,Rm 3310 ,Ruth Mortha ,143-J ,MoWe 6:00PM - 8:30PM ,Rm 3310 ,Isiaka Oduola ,143-MMA ,TuTh 3:00PM - 6:00PM ,Malcolm X College ,Imad Tawil ,MATH  207 - Calculus ,207-AC ,MoWe 9:00AM - 11:05AM ,Rm 4104 ,Ruth Mortha ,207-F ,TuTh 12:30PM - 2:35PM ,Rm 3307 ,Ruth Mortha ,MATH  208 - Calculus ,208-K ,TuTh 6:00PM - 8:05PM ,Rm 3308 ,Alison Mastny ,MATH  299-1 - Special Topics Mathematics,299-ALP ,TuTh 11:20AM - 12:10PM ,Rm 3311 ,Hope Essien ,299-ALP2 ,TuTh 2:20PM - 3:10PM ,Rm 6006 ,Brandie Windham ,299-ALP3 ,MoWe 7:50PM - 8:40PM ,Rm 3311 ,Mohammed Yunusa ,299-ALP4 ,MoWe 10:50AM - 11:40AM ,Rm 3311 ,Mohammed Yunusa ,MCROBIO  233 - General Microbiology,233-A ,MoWe 8:00AM - 8:50AM ,Rm 3401 ,Albert Reba ,233-B ,TuTh 8:00AM - 8:50AM ,Rm 3401 ,Minxiu Wang ,233-C ,MoWe 11:00AM - 11:50AM ,Rm 3401 ,Albert Reba ,233-F ,TuTh 2:00PM - 2:50PM ,Rm 3401 ,Chafika Boudiaf ,233-HNR ,TuTh 11:00AM - 11:50AM ,Rm 3401 ,Minxiu Wang ,233-J ,MoWe 6:00PM - 6:50PM ,Rm 3401 ,Albert Reba ,233-K ,TuTh 6:00PM - 6:50PM ,Rm 3401 ,Albert Reba ,233-M ,Fr 9:00AM - 10:40AM ,Rm 3401 ,Minxiu Wang ,MOR SCI  108 - Accounting In Funeral Service,108-B ,TuTh 8:00AM - 9:20AM ,Rm 4100 ,Deonce Scott ,MOR SCI  109 - Sociology For Funeral Service,109-D ,TuTh 9:30AM - 10:50AM ,Rm 4100 ,Karen Scott ,MOR SCI  207 - Restorative Art,207-A ,MoWe 8:00AM - 9:20AM ,Rm 4100 ,Deonce Scott ,MOR SCI  209 - Funeral Management ,209-K ,TuTh 12:30PM - 1:50PM ,Rm 4100 ,Deonce Scott ,MOR SCI  210 - Advance Mortuary Science Practice,210-EG ,We 11:00AM - 12:40PM ,Rm 4100 ,Karen Scott ,MOR SCI  211 - Psychology Of Funeral Service,211-L ,TuTh 2:00PM - 3:20PM ,Rm 4100 ,Lolita Travis ,MOR SCI  213 - Embalming Theory I,213-C ,MoWe 9:30AM - 10:50AM ,Rm 4100 ,Deonce Scott ,MOR SCI  214 - Embalming Laboratory,214-GJM ,We 1:30PM - 2:20PM ,Rm 4100 ,Deonce Scott ,MUSIC  101 - Fundamentals of Music Theory,101-D1 ,TuTh 10:00AM - 11:40AM ,Rm 3204 ,Pok-Hon Yu ,MUSIC  105 - Group Piano I,105-E ,MoWe 12:30PM - 12:55PM ,Rm 3204 ,Joy-Denise Moore ,MUSIC  121 - Introduction To Music,121-C ,MoWe 10:00AM - 11:15AM ,Rm 3204 ,Pok-Hon Yu ,121-F ,TuTh 12:30PM - 1:45PM ,Rm 3204 ,Pok-Hon Yu ,121-FH ,TuTh 2:00PM - 3:40PM ,Rm 3204 ,Joy-Denise Moore ,NURSING  102 - Fundamentals Of Nursing II,102-FA ,MoWe 9:00AM - 10:50AM ,Rm 5007 ,Patricia Murphy ,102-FB ,MoWe 9:00AM - 10:50AM ,Rm 5009 ,Nancy Kipnis ,102-FC ,MoWe 12:00PM - 1:50PM ,Rm 5007 ,Susan Neal ,102-FD ,MoWe 11:00AM - 12:50PM ,Rm 5009 ,Maria Preston ,102-FE ,MoWe 12:00PM - 1:50PM ,Rm 5012 ,Shamim Huda ,102-FF ,MoWe 4:00PM - 5:50PM ,Rm 5007 ,Imelda Duyungan ,102-FG ,MoWe 5:00PM - 6:50PM ,Rm 5009 ,Roy Carrarini ,NURSING  203 - Nursing In Perspective,203-LA ,Mo 1:30PM - 4:30PM ,Rm 5015 ,Brenda Davis ,NURSING  212 - Nursing Process in Alterations in Homeostasis III,212-PA ,MoTu 10:00AM - 12:50PM ,Rm 5015 ,Rhonda Phillips ,212-PB ,MoTu 5:00PM - 7:50PM ,Rm 5015 ,Tammy Scott-Brand ,NURSING  213 - Nursing Process in Alterations in Homeostasis IV,213-MA ,MoTu 5:00PM - 7:50PM ,Rm 5015 ,Brenda Jones ,213-MB ,MoTu 10:00AM - 12:50PM ,Rm 5015 ,Debbie Bryant ,PERDEV 3000 - Buying A Home,300-BH ,Sa 9:00AM - 4:00PM ,Rm 3205 ,Staff ,PERDEV 3001 - Saturdy Academy Program,300-MAM2 ,Sa 1:00PM - 3:00PM ,Malcolm X College ,Karla Jemison ,300-MAT1 ,Sa 9:00AM - 12:00PM ,Rm 3310 ,Karla Jemison ,300-MAT2 ,Sa 9:00AM - 12:00PM ,Malcolm X College ,Karla Jemison ,300-MATM ,Sa 1:00PM - 3:00PM ,Malcolm X College ,Karla Jemison ,PHAR TC  101 - Pharmacology Allied Health,101-B ,TuTh 8:00AM - 8:50AM ,Rm 6002 ,Frederick Carter ,PHAR TC  113 - Prescription Processing,113-CCEE ,Fr 9:30AM - 11:10AM ,Rm 6005 ,Douglas Taylor ,PHAR TC  121 - Pharmacy Communication,121-E ,MoWe 11:00AM - 12:20PM ,Rm 6002 ,Frederick Carter ,PHAR TC  202 - Pharmacy Operations,202-AJ ,MoWe 8:00AM - 9:20AM ,Rm 6005 ,Douglas Taylor ,PHIL  105 - Logic,105-HNR1 ,TuTh 10:00AM - 11:40AM ,Rm 4402 ,Carole Heath ,PHIL  106 - Introduction To Philosophy,106-JM ,Mo 6:00PM - 8:30PM ,Rm 3302 ,William Schmidt ,PHIL  107 - Ethics,107-HYB ,MoWe 12:30PM - 1:45PM ,Rm 3207 ,Carole Heath ,107-LC1 ,MoWe 10:00AM - 11:15AM ,Rm 3402 ,Carole Heath ,PHLEB  109 - Phlebotomy Practicm and Seminar I,109-NST ,WeThFr 5:00PM - 5:50PM ,Rm 4112 ,Susan Rohde ,PHLEB  209 - Phlebotomy Practicum and Seminar II,209-MRM ,Mo 5:00PM - 7:30PM ,Rm 4112 ,Cynthia Doby ,209-MRW ,We 5:00PM - 10:00PM ,Rm 4105 ,Susan Rohde ,209-NST ,Tu 5:00PM - 7:30PM ,Rm 4112 ,Indrajeet Mody ,PHY SCI  101 - General Course Physical Science,101-E ,MoWe 12:00PM - 1:15PM ,Rm 3302 ,Tomekia Simeon ,101-F ,TuTh 1:00PM - 2:15PM ,Rm 4401 ,Hontas Farmer ,101-HYB ,MoWe 6:00PM - 7:15PM ,Rm 4401 ,Yoriel Marcano ,PHY SCI  107 - Current Public Issues in Physical Science,107-C ,MoWe 10:00AM - 11:15AM ,Rm 4401 ,Hontas Farmer ,PHY SCI  111 - General Course I Physical Science,111-E ,MoWe 1:00PM - 2:10PM ,Rm 4401 ,Hontas Farmer ,PHYS ED  110-1 - Fitness,110-D ,TuTh 9:30AM - 9:55AM ,Rm 1204 ,Michael Galvan ,110-F ,TuTh 11:00AM - 11:25AM ,Rm 1204 ,Michael Galvan ,PHYS ED  118-1 - Weight Training,118-C ,MoWe 9:30AM - 9:55AM ,Rm 1204 ,Robyn Becker ,118-E ,MoWe 11:00AM - 11:25AM ,Rm 1204 ,Robyn Becker ,PHYSICS  131 - Mechanics And Power,131-F ,TuTh 1:00PM - 1:50PM ,Rm 4403 ,Yangtae Kim ,131-G ,MoWe 4:00PM - 4:50PM ,Rm 4403 ,Yangtae Kim ,PHYSICS  221 - Mechanics,221-DF ,TuTh 9:00AM - 9:50AM ,Rm 4403 ,Joshua Oladipo ,PHYSICS  222 - Electricity,222-EG ,MoWe 9:00AM - 9:50AM ,Rm 4403 ,Joshua Oladipo ,POL SCI  201 - The National Government,201-C ,MoWe 10:00AM - 11:15AM ,Rm 4112 ,Claire Stuart-Quintanilla ,201-F ,TuTh 12:30PM - 1:45PM ,Rm 4415 ,Claire Stuart-Quintanilla ,PPDMED 3204 - Emergency Medical Technician B Refresher Training,320-EBRT ,Sa 9:00AM - 5:00PM ,Rm 7005 ,Staff ,PPDMED 3205 - CPR Heartsaver AED,320-AED ,Sa 9:00AM - 2:30PM ,Rm 6014 ,Staff ,PPDMED 3208 - EMS EKG,320-EKG ,Tu 9:00AM - 1:00PM ,Rm 7000 ,Staff ,PROFDEV 4003 - Pediatric First Aid,400-PFA ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,PROFDEV 4037 - CPR Instructor Course,403-CIC ,Sa 9:00AM - 5:00PM ,Rm 7006 ,Staff ,PROFDEV 4039 - CPR Instructor Recertification,403-CIR ,Sa 9:00AM - 5:00PM ,Rm 7006 ,Staff ,403-CIR2 ,Sa 9:00AM - 3:00PM ,Rm 7005 ,Staff ,PROFDEV 4041 - Substance Abuse,404-SA ,Sa 9:00AM - 12:30PM ,Rm 3310 ,Staff ,PROFDEV 4072 - CPR for Healthcare Providers,407-CPR1 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,407-CPR2 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Brian Berkowitz ,407-CPR3 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,407-CPR4 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,407-CPR5 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,407-CPR6 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,407-CPR7 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,407-CPR8 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Staff ,407-CPR9 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,407-CR10 ,Sa 9:00AM - 2:30PM ,Rm 7005 ,Staff ,PROFDEV 4088 - Food Service Sanitation Manager Course ,408-FSS1 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Calvin Muhammad ,408-FSS2 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Calvin Muhammad ,408-FSS3 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Staff ,408-FSS4 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Staff ,PROFDEV 4090 - EMS Responder,409-SHAN ,MoFr 9:00AM - 4:00PM ,Rm 1103 ,Staff ,PROFDEV 4091 - CNA Refresher,409-CNR1 ,FrSa 10:00AM - 2:00PM ,Rm 4304 ,Staff ,409-CNR2 ,FrSa 10:00AM - 2:00PM ,Rm 4304 ,Staff ,PROFDEV 4093 - Chicago Fire Department Training,409-F15A ,Tu 8:00AM - 4:00PM ,Chicago Fire Academy ,Eric Strong ,409-F15B ,Th 8:00AM - 4:00PM ,Chicago Fire Academy ,Eric Strong ,409-F15C ,Th 8:00AM - 4:00PM ,Chicago Fire Academy ,Staff ,409-FI15 ,Th 8:00AM - 4:00PM ,Chicago Fire Academy ,Eric Strong ,409-MOB2 ,Tu 8:00AM - 4:00PM ,Chicago Fire Academy ,Brenda Burke ,409-MOB3 ,MoWe 8:00AM - 4:00PM ,Chicago Fire Academy ,Brenda Burke ,409-MOB4 ,MoWe 8:00AM - 4:00PM ,Chicago Fire Academy ,Brenda Burke ,409-MOBI ,MoWe 8:00AM - 4:00PM ,Chicago Fire Academy ,Brenda Burke ,409-WOMD ,We 8:00AM - 4:00PM ,Chicago Fire Academy ,Staff ,PSYCH  201 - General Psychology,201-B ,TuTh 9:30AM - 10:45AM ,Rm 4415 ,Ovidiu Dobria ,201-BKE ,TuTh 10:00AM - 11:15AM ,Rm 4104 ,Charles Brown ,201-C ,MoWe 10:00AM - 11:15AM ,Rm 4415 ,Ovidiu Dobria ,201-E ,MoWe 2:00PM - 3:40PM ,Rm 4415 ,Patrick Taitt ,201-HNR ,TuTh 2:00PM - 3:15PM ,Rm 4415 ,Ovidiu Dobria ,201-KR ,Th 6:00PM - 9:20PM ,Rm 4415 ,Patrick Taitt ,201-KT ,Tu 6:00PM - 8:30PM ,Rm 4415 ,Ovidiu Dobria ,201-P ,Sa 9:30AM - 12:50PM ,Rm 4415 ,Patrick Taitt ,PSYCH  207 - Child Psychology,207-E ,MoWe 12:30PM - 1:45PM ,Rm 4415 ,Ovidiu Dobria ,RADIOGR  102 - Attitudes In Patient Care,102-GJ ,We 1:30PM - 3:20PM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  105 - Imaging Physics,105-ACE ,Mo 8:00AM - 9:50AM ,Rm 6011 ,Dandcee Saengchanh ,RADIOGR  128 - Image Evaluation,128-EG ,Mo 12:00PM - 12:50PM ,Rm 6011 ,Dandcee Saengchanh ,RADIOGR  141 - Radiography Clinical Education I,141-KST ,TuTh 1:00PM - 1:30PM ,Malcolm X College ,Stephanie Tarr ,RADIOGR  200 - Pathology,200-BDF ,Tu 8:00AM - 9:50AM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  202 - Radiology Management,202-FK ,Tu 12:00PM - 12:50PM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  206 - Imaging,206-BD ,Th 8:00AM - 8:50AM ,Rm 6011 ,Michael White ,RADIOGR  232 - Radiographic Procedures II,232-AG ,We 8:00AM - 10:50AM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  244 - Radiography Clinical Education IV,244-GRS ,MoWeThFr 1:00PM - 1:15PM ,Malcolm X College ,Michael White ,READING   99-1 - Developmental Reading Skills I,99-B ,TuTh 7:40AM - 9:20AM ,Rm 3203 ,Eric Brown ,99-E ,MoWe 12:30PM - 2:10PM ,Rm 3200 ,Sakeena Khan ,99-F ,TuTh 12:30PM - 1:45PM ,Rm 3300 ,Sakeena Khan ,99-F1 ,TuTh 12:30PM - 1:45PM ,Rm 3416 ,Patricia Williams ,99-H ,TuTh 3:50PM - 5:30PM ,Rm 3206 ,Tonia Humphrey ,99-J ,MoWe 6:00PM - 7:15PM ,Rm 3300 ,Cheryl White ,99-K1 ,TuTh 6:00PM - 7:40PM ,Rm 3206 ,Tonia Humphrey ,READING  125 - Developmental Reading Skills II,125-A ,MoWe 8:00AM - 9:15AM ,Rm 3200 ,Patricia Williams ,125-A2 ,MoWe 7:40AM - 9:20AM ,Rm 3300 ,Melloney Beck ,125-B ,TuTh 7:40AM - 9:20AM ,Rm 3300 ,Patricia Williams ,125-C ,MoWe 10:00AM - 11:15AM ,Rm 3300 ,Sakeena Khan ,125-D ,TuTh 10:00AM - 11:15AM ,Rm 3300 ,Sakeena Khan ,125-E ,MoWe 12:30PM - 1:45PM ,Rm 3300 ,Patricia Williams ,125-G ,MoWe 3:30PM - 4:45PM ,Rm 3300 ,Patricia Williams ,125-GJ ,MoWe 4:00PM - 5:40PM ,Rm 3206 ,Eric Brown ,125-H ,TuTh 3:30PM - 4:45PM ,Rm 3300 ,Carla Holston ,125-H2 ,TuTh 3:50PM - 5:30PM ,Rm 3200 ,Janet Henderson ,125-K ,TuTh 6:00PM - 7:15PM ,Rm 3300 ,Carla Holston ,RESP TC  137 - Advanced Pathology ,137-ACE ,We 8:00AM - 9:40AM ,Rm 6010 ,Jane Reynolds ,RESP TC  141 - Ventilatory,141-AJ ,Mo 8:00AM - 9:40AM ,Rm 7011 ,Jane Reynolds ,RESP TC  230 - Advanced Cardiopulmonary Monitoring,230-BFK ,Th 9:00AM - 10:40AM ,Rm 7011 ,Pamela Nugent ,RESP TC  250 - Cardiopulmonary Rehabilitation Home Care,250-K ,Tu 1:00PM - 1:50PM ,Rm 7011 ,Pamela Nugent ,RESP TC  260 - Advanced Specialty Topics,260-BDF ,Tu 8:30AM - 11:00AM ,Rm 7011 ,Jane Reynolds ,SENIORS 5010 - Introduction to Microsoft Excel,501-EX ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Staff ,501-EX1 ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Staff ,SENIORS 5011 - Introduction to Microsoft Word,501-WOR ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Staff ,501-WOR1 ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Staff ,SOC  201 - Intro To the Study Of Society,201-C ,MoWe 10:00AM - 11:15AM ,Rm 6006 ,Abra Johnson ,201-D ,TuTh 10:00AM - 11:15AM ,Rm 6014 ,Gail Grabczynski ,201-KT ,Tu 6:00PM - 9:20PM ,Rm 3207 ,Abra Johnson ,201-LC2 ,TuTh 2:00PM - 3:15PM ,Rm 4416 ,Abra Johnson ,SOC  203 - Marriage And The Family,203-E ,MoWe 12:30PM - 1:45PM ,Rm 4414 ,Abra Johnson ,SOC  205 - Social Problems,205-F ,MoWe 2:00PM - 3:15PM ,Rm 3207 ,Abra Johnson ,SOC SCI  101 - General Course I Social Science,101-D ,TuTh 10:00AM - 11:15AM ,Rm 3205 ,Claire Stuart-Quintanilla ,101-HYB ,TuTh 12:30PM - 1:45PM ,Rm 4112 ,Gail Grabczynski ,101-J ,MoWe 6:00PM - 7:40PM ,Rm 3207 ,Patrick Taitt ,101-JM ,Mo 6:00PM - 8:30PM ,Rm 3309 ,Gail Grabczynski ,101-M ,Fr 9:30AM - 12:00PM ,Rm 4415 ,Claire Stuart-Quintanilla ,101-P ,Sa 9:00AM - 12:20PM ,Rm 3207 ,Arturo Marquez Jr ,SOC SCI  102 - General Course II Social Science,102-E ,MoWe 12:30PM - 1:45PM ,Rm 4112 ,Claire Stuart-Quintanilla ,SPANISH  101 - First Course Spanish,101-BD ,TuTh 9:00AM - 10:40AM ,Rm 3302 ,Maria Muralles-Ball ,101-CCA ,MoWe 4:00PM - 6:00PM ,Malcolm X College ,TBA TBA ,101-HNR ,MoWe 10:00AM - 11:40AM ,Rm 3302 ,Maria Muralles-Ball ,SPANISH  102 - Second Course Spanish,102-DF ,TuTh 11:00AM - 12:40PM ,Rm 3302 ,Maria Muralles-Ball ,SPEECH  101-1 - Fundamentals of Speech Communication,101-A ,MoWe 8:00AM - 9:15AM ,Rm 3304 ,Victoria Nabors ,101-B ,TuTh 8:00AM - 9:15AM ,Rm 3304 ,Victoria Nabors ,101-B2 ,TuTh 9:00AM - 10:40AM ,Rm 3200 ,Lydia Brown ,101-BKD ,MoWe 10:00AM - 11:15AM ,Rm 3304 ,Victoria Nabors ,101-D ,TuTh 9:50AM - 11:05AM ,Rm 3304 ,Victoria Nabors ,101-E ,MoWe 12:30PM - 1:45PM ,Rm 3304 ,Victoria Nabors ,101-E2 ,MoWe 12:30PM - 1:45PM ,Rm 3416 ,Regina Walton ,101-EG ,MoWe 2:00PM - 3:15PM ,Rm 3304 ,Linnea Forsberg ,101-F ,TuTh 12:30PM - 1:45PM ,Rm 3304 ,Maria Kossakowski ,101-H ,TuTh 4:00PM - 5:15PM ,Rm 3304 ,Linnea Forsberg ,101-HYB ,TuTh 8:00AM - 9:15AM ,Rm 3206 ,Regina Walton ,101-JW ,We 6:00PM - 8:30PM ,Rm 3302 ,Carla Roberson ,101-KT ,Tu 6:00PM - 8:30PM ,Rm 3304 ,Carla Roberson ,101-MC1 ,TuTh 4:00PM - 5:30PM ,Rm 3301 ,TBA TBA ,101-P ,Sa 9:00AM - 11:30AM ,Rm 3304 ,Carla Roberson ,STHLTH  624 - Fundamentals Nurse Asst Per,624-BK ,TuWeTh 8:00AM - 3:00PM ,Rm 4106 ,Carolyn Alford ,624-BL ,MoTuTh 8:00AM - 3:00PM ,Rm 7004 ,Linda McDowell ,624-CP ,MoTuWeTh 8:30AM - 10:30AM ,Rm 4308 ,TBA TBA ,624-MA ,TuWeTh 8:00AM - 3:00PM ,Rm 7004 ,Shirley Butler ,624-MB ,MoTuTh 8:00AM - 3:00PM ,Rm 4304 ,Devoria Williams ,624-MC ,MoWeTh 3:30PM - 9:00PM ,Rm 4304 ,Nancy Roddy ,624-MF ,MoTuTh 8:00AM - 3:00PM ,Rm 4106 ,Alvan Demaree ,624-MJ ,MoTuTh 8:00AM - 3:00PM ,Rm 4304 ,Shirley Butler ,624-MN ,TuWeTh 3:30PM - 9:00PM ,Rm 4304 ,Alvan Demaree ,624-MP ,TuWeTh 3:30PM - 9:00PM ,Rm 4310 ,Nancy Roddy ,624-WA ,MoWeTh 8:00AM - 3:00PM ,MX Bldg 2 - Rm 102 ,TBA TBA ,624-WB ,MoWeTh 3:30PM - 9:00PM ,MX Bldg 2 - Rm 104 ,Defrances Higgs ,624-WC ,MoWeTh 8:00AM - 3:00PM ,MX Bldg 2 - Rm 104 ,TBA TBA ,624-WD ,MoTuTh 3:30PM - 9:00PM ,MX Bldg 2 - Rm 102 ,TBA TBA ,SURG TC  114 - Surgical Interventions I,114-CE ,Mo 11:00AM - 1:30PM ,Rm 4105 ,Dora Wood ,SURG TC  115 - Surgical Intervention II,115-CE ,Tu 8:00AM - 10:30AM ,Rm 4105 ,Dora Wood ,SURG TC  116 - Surgical Intervention III,116-K ,Th 8:00AM - 10:30AM ,Rm 4105 ,Dora Wood ,SURG TC  218 - Sterile Processing Clinical Practicum II,218-BGGX ,MoTuWeThFr 7:00AM - 4:50PM ,Malcolm X College ,Taron Walker ,THR ART  131 - Intro To Theater,131-E ,MoWe 12:30PM - 1:45PM ,Rm 6009 ,Linnea Forsberg ,THR ART  133 - Acting I,133-C ,MoWe 10:00AM - 11:15AM ,Rm 6009 ,Regina Walton ,133-F ,TuTh 12:30PM - 2:10PM ,Rm 6009 ,Linnea Forsberg ,133-MWH3 ,MoWe 1:00PM - 1:50PM ,MX Bldg 2 - Rm 116 ,Faylinda Walton ,WFA 8005 - Heartsaver CPR AED,800-CPS1 ,Fr 8:00AM - 11:00AM ,TBA ,Staff ,800-CPS2 ,Fr 11:01AM - 3:00PM ,TBA ,Staff';
  var subjects = subjects || undefined;
  var classstring = data.split(',');

  var tablerow;
  var tableitem;
  var currentclass;

  for (var i = 0, l = classstring.length; i < l; i++) {
    if (classstring[i].isClassName()) {
      if (subjects && subjects.indexOf(classstring[i].match(/[A-Z]*\s?[A-Z]+/)[0]) === -1) {
        var nextClassIndex = classstring.findNextClassIndex(i) || i + 1;
        i = nextClassIndex - 1;
        continue;
      }

      tablerow = document.createElement('tr');
      tableitem = tablerow.appendChild(document.createElement('th'));
      tableitem.textContent = classstring[i];
      tableitem.colSpan = 5;
      tablerow.className = 'class-name';
      tablerows.push(tablerow);

      currentclass = classstring[i].match(/[A-Z]*\s?[A-Z]+\s+\d{2,4}[^\s]*/)[0];
      continue;
    }

    if (classstring[i].startsNewSection()) {
      tablerow = document.createElement('tr');
      tablerows.push(tablerow);

      tableitem = tablerow.appendChild(document.createElement('td'));
      tableitem.textContent = currentclass;

      tableitem = tablerow.appendChild(document.createElement('td'));
      tableitem.textContent = classstring[i];
      continue
    }

    tableitem = tablerow.appendChild(document.createElement('td'));

    if (tablerow.childElementCount === 3) {
      tableitem.className = 'datetime';
    }
    tableitem.textContent = classstring[i];
  }

  for (var i = 0, l = tablerows.length; i < l; i++) {
    var datebox = tablerows[i].getElementsByClassName("datetime") || undefined;
    if (datebox.length) {
      datebox = datebox[0];
      var day = document.createElement("td");
      day.textContent = datebox.textContent.match(/^[a-z]+\s/gi);
      day.className = "days";
      day.style["text-align"] = "center";
      datebox.textContent = datebox.textContent.match(/\s.*$/gi);
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
      var dayText = row.getElementsByClassName('days')[0].textContent.slice(0, 2);
  } catch(e) {
    console.log(row);
  }

    if ((prevDay && prevDay !== dayText)) {
      // oneDay.sort(sortByDays());
      // oneDay.sort(sortByTime());
      ultimateSorted = ultimateSorted.concat(oneDay);
      oneDay = [];
    }
    oneDay.push(row)
    if (i === l - 1) {
      // oneDay.sort(sortByDays());
      // oneDay.sort(sortByTime());
      ultimateSorted = ultimateSorted.concat(oneDay);
    }
    prevDay = dayText;
  }

  console.log('all done! Also, ultimateSorted: ', ultimateSorted);
  for (var i = 0, l = ultimateSorted.length; i < l; i++) {
    table.appendChild(ultimateSorted[i]);
  }
}

var table = document.getElementById('buddytable');
var tablerows = [];

var model = {
  "active_days": ["mo","tu","we","th","fr","sa"],
  "addDay": function(day) {
    day = day.toLowerCase();
    if (this.active_days.indexOf(day) === -1) {
      this.active_days.push(day);
    }
  },
  "removeDay": function(day) {
    day = day.toLowerCase();
    if (this.active_days.indexOf(day) !== -1) {
      this.active_days.splice(this.active_days.indexOf(day), 1);
    }
  },
  showClassNames : true
};

var view = {
  updateDays: function() {
    for (var i = 0, l = tablerows.length; i < l; i++) {
      try {
        var classDays = tablerows[i].getElementsByClassName('days')[0].textContent.toLowerCase();
        var display = 'none';
      } catch(e) {
        continue;
      }
      for (var j = 0, jl = model.active_days.length; j < jl; j++) {
        if (classDays.indexOf(model.active_days[j]) !== -1) {
          display = 'table-row';
        }
      }
      tablerows[i].style.display = display;
    }
  },
  updateClassNames: function() {
    var classNames = document.getElementsByClassName('class-name');
    for (var i = 0, l = classNames.length; i < l; i++) {
      model.showClassNames ? classNames[i].style.display = 'table-row' : classNames[i].style.display = 'none';
    }
  }
};

document.body.onload = function() {
  var form = document.getElementById('form');

  var dayChooser = document.getElementById('day-chooser');
  var days = dayChooser.getElementsByTagName('input');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var subjects = [];
    tablerows = [];
    for (var i = 0, l = form.elements.length; i < l; i++) {
      if (form.elements[i].checked) {
        subjects.push(form.elements[i].id);
      }
    }
    rows = tableForBuddies(undefined, subjects);
    dayChooser.style.display = 'block';
  });

  window.addEventListener("message", function(e) {
    window.opener.postMessage(true, '*');
    tableForBuddies(e.data, undefined);
    dayChooser.style.display = 'block';
  }, false);


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
};
