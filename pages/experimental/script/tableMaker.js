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
    // console.log('before: ', atext, btext);

    for (var i = 0, l = dayMap.length; i < l; i++) {
      atext = atext.replace(dayMap[i], String(i+1));
      btext = btext.replace(dayMap[i], String(i+1));
    }

    for (var i = 0, l = dayMap.length; i < l; i++) {
      if (i >= atext.length) atext = atext.concat('0');
      if (i >= btext.length) btext = btext.concat('0');
    }

    // try {
    //   var atext = a.getElementsByClassName('days')[0].textContent.replace('Mo', '1')
    //                                                              .replace('Tu', '2')
    //                                                              .replace('We', '3')
    //                                                              .replace('Th', '4')
    //                                                              .replace('Fr', '5')
    //                                                              .replace('Sa', '6');
    // } catch(e) {
    //   var atext = '0';
    // }
    // try {
    //   var btext = b.getElementsByClassName('days')[0].textContent.replace('Mo', '1')
    //                                                              .replace('Tu', '2')
    //                                                              .replace('We', '3')
    //                                                              .replace('Th', '4')
    //                                                              .replace('Fr', '5')
    //                                                              .replace('Sa', '6');
    // } catch(e) {
    //   var btext = '0';
    // }
    // console.log('after: ', atext, btext);
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
  if(time.toLowerCase().indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
  }
  if(time.toLowerCase().indexOf('pm')  != -1 && hours < 12) {
      time = time.replace(hours, (hours + 12));
  }
  return time.replace(/(am|pm)/i, '');
}


function tableForBuddies(data, subjects) {
  table.innerHTML = '';
  
  console.log('data in tableForBuddies: ', data);

  var data = data || 'ABE GED  103 - ABE Reading Beg. Level,103-MWAB ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 115 ,Nashid Baaith ,103-MXAI ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,ABE GED  123 - ABE Math Beginning Level,123-MX01 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4402 ,James McArthur ,123-MX02 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4402 ,James McArthur ,ABE GED  124 - ABE Math Beginning Level,124-MW25 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 115 ,Nashid Baaith ,ABE GED  192 - Beginning Supplemental Reading I,192-MXNB ,Sa 9:00AM - 12:50PM ,Rm 4305 ,Robert Wilson ,ABE GED  234-2 - ABE Career Assessment ,234-MCF3 ,MoTuWeTh 1:00PM - 1:50PM ,MX Bldg 2 - Rm 119 ,Darius Holmes ,ABE GED  400 - ABE Rdng Intermediate Level,400-MLC3 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Marilyn Derr ,400-MWCD ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 122 ,Edward Boyd ,400-MXAG ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4303 ,Mary Holmes ,400-MXAJ ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4300 ,Nathaniel Phillips ,400-MXAK ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4303 ,Jeff Schecter ,ABE GED  403 - ABE Rdng Intermediate Level,403-MLC6 ,MoWe 9:00AM - 12:50PM ,Blessed Sacrament ,Brenda Amoakon ,403-MWOP ,MoTuWeTh 5:30PM - 7:20PM ,MX Bldg 2 - Rm 118 ,Vasanta Doss ,ABE GED  420 - ABE Math Intermediate Level,420-MLC5 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Marilyn Derr ,420-MW29 ,MoTuWeTh 1:30PM - 3:20PM ,MX Bldg 2 - Rm 123 ,James Butler ,420-MX03 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4309 ,Darlene Boyd ,420-MX04 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4309 ,Linda Flannigan ,420-MX05 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4309 ,Linda Flannigan ,420-MX10 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4309 ,Darlene Boyd ,ABE GED  421 - ABE Math Intermediate Level,421-MW26 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 122 ,Edward Boyd ,ABE GED  423 - ABE Math Intermediate Level,423-MLC4 ,TuTh 9:00AM - 12:50PM ,Blessed Sacrament ,Brenda Amoakon ,423-MX14 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4204 ,Herman Buckner ,423-MX15 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4204 ,Herman Buckner ,423-MX18 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4204 ,Ivy Ellis ,ABE GED  424 - ABE Math Intermediate Level,424-MW27 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 119 ,Darius Holmes ,424-MW31 ,MoTuWeTh 7:30PM - 9:20PM ,MX Bldg 2 - Rm 120 ,Katrina Cunningham ,424-MWNO ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 119 ,Darius Holmes ,424-MXH5 ,MoWe 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,424-MXS9 ,MoWe 9:00AM - 12:50PM ,Spencer Technology Academy ,Wayne Arnold ,ABE GED  443 - ABE Wrtg Intermediate Level,443-MXBA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4300 ,Trudy Moore ,443-MXBB ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4300 ,Trudy Moore ,443-MXBD ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4300 ,Nathaniel Phillips ,ABE GED  444 - ABE Wrtg Intermediate Level,444-MWEF ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 120 ,James Butler ,444-MXHR ,TuTh 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,444-MXIJ ,MoTuWeTh 3:30PM - 5:20PM ,MX Bldg 2 - Rm 120 ,Robert Wilson ,444-MXSA ,TuTh 9:00AM - 12:50PM ,Spencer Technology Academy ,Jeff Schecter ,ABE GED  463 - ABE Basic Skl Gen Int Level,463-MWHS ,MoTuWeTh 1:30PM - 3:20PM ,Westside Health Authority ,Barbara Moore ,ABE GED  464 - ABE Basic Skl Gen Int Level,464-MXMC ,MoTuWeTh 7:30AM - 9:20AM ,Metro Correctional Ctr ,Mark Horn ,ABE GED  480 - ABE Constitution Course,480-MXMH ,Sa 11:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,ABE GED  490 - Basic Skills Gen Int Level,490-MXHM ,Sa 9:00AM - 12:50PM ,HAYMARKET CENTER ,Andrew Hines ,490-MXJS ,Sa 9:00AM - 12:50PM ,Rm 4300 ,Jeff Schecter ,ABE GED  491 - Basic Skls Gen Int Level,491-MWS1 ,Sa 9:00AM - 1:00PM ,MX Bldg 2 - Rm 123 ,Ivy Ellis ,ABE GED  499 - Intermediate Supplemental Reading I,499-MXHI ,MoWe 1:00PM - 1:50PM ,Blessed Sacrament ,Brenda Amoakon ,499-MXMH ,Sa 9:00AM - 10:50AM ,Rm 4303 ,Mary Holmes ,ABE GED  820 - GED Math Advance Level,820-MX19 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 3204 ,Alandria Jones ,820-MX21 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 3204 ,Alandria Jones ,ABE GED  821 - GED Math Advance Level,821-MW28 ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 123 ,James Butler ,ABE GED  830 - GED Math Advance Lvl Sp,830-MXPS ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4200 ,Juan Gutierrez ,830-MXVM ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4200 ,Macario Valdovinos ,ABE GED  840 - GED Writing Adv Level,840-MXBF ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4207 ,Barbara Richey ,840-MXBG ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4207 ,Barbara Richey ,840-MXBH ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4305 ,David Liddell ,ABE GED  850 - GED Writing Adv Level Sp,850-MXMV ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4200 ,Macario Valdovinos ,850-MXSC ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4200 ,Juan Gutierrez ,850-MXSP ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4200 ,Juan Gutierrez ,ABE GED  861 - GED Basic Skill Gen Adv Lvl,861-SEI1 ,MoWe 5:30PM - 9:30PM ,SEIU ,Marcus Wolfe ,ABE GED  890 - Basic Skill Gen Adv Level,890-MXDH ,Sa 9:00AM - 12:05PM ,Rm 4309 ,Darius Holmes ,ABE GED  891 - Basic Skill Gen Adv Level,891-MWSA ,Sa 9:00AM - 1:00PM ,MX Bldg 2 - Rm 118 ,Francine Johnson ,891-MXAT ,Sa 9:00AM - 12:50PM ,Rm 4207 ,Monica Murray ,ABE GED  920 - GED Math Advanced Level,920-MX20 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 3204 ,Alandria Jones ,ABE GED  940 - GED Writing Adv Level,940-MWGH ,MoTuWeTh 9:00AM - 10:50AM ,MX Bldg 2 - Rm 118 ,Holly Parker ,940-MWLM ,MoTuWeTh 11:00AM - 12:50PM ,MX Bldg 2 - Rm 118 ,Holly Parker ,940-MXBK ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4207 ,Barbara Richey ,ADLTLANG 1410 - Sign Language I and II Combined,1410-SL ,We 6:00PM - 8:00PM ,TBA ,Peter Wujcik ,AFRO AM  101 - Introduction to African,101-D ,TuTh 10:00AM - 11:15AM ,Rm 4414 ,Regina Walton ,101-FH ,TuTh 2:00PM - 3:15PM ,Rm 4414 ,Wylie Rogers ,101-HK ,TuTh 4:00PM - 5:40PM ,Rm 4414 ,Regina Walton ,101-HNR ,MoWe 12:30PM - 1:45PM ,Rm 3402 ,Regina Walton ,101-KT ,Tu 6:00PM - 8:30PM ,Rm 4414 ,Wylie Rogers ,ANTHRO  201 - Intro to Biological and Cultural Evolutions of Humans,201-JW ,We 6:00PM - 8:30PM ,Rm 4414 ,Arturo Marquez Jr ,ANTHRO  202 - Cultural Anthropology,202-EG ,MoWe 2:00PM - 3:15PM ,Rm 4414 ,Arturo Marquez Jr ,202-F ,TuTh 12:30PM - 1:45PM ,Rm 4414 ,Arturo Marquez Jr ,ART  103 - Art Appreciation,103-B ,TuTh 8:00AM - 9:40AM ,Rm 3302 ,Rachel Slotnick ,103-D ,TuTh 9:50AM - 11:05AM ,Rm 6002 ,Ben Rubin ,103-E ,MoWe 12:30PM - 1:45PM ,Rm 3302 ,Ben Rubin ,103-KTR ,TuTh 6:00PM - 7:15PM ,Rm 3302 ,Michelle Perkins ,ASTROMY  201 - Descriptive Astronomy,201-P ,Sa 9:00AM - 11:30AM ,Rm 4401 ,Robert Wilson ,BIOLOGY  107 - Nutrition,107-AW ,We 9:00AM - 11:30AM ,Rm 3416 ,Tracie Hudson ,107-CE ,MoWe 12:00PM - 1:40PM ,Rm 3416 ,Maxwell Sanei ,107-KT ,Tu 6:00PM - 8:30PM ,Rm 3207 ,Ian Moncrief ,107-N ,Fr 3:15PM - 5:45PM ,Rm 3416 ,Maxwell Sanei ,107-Q ,Sa 2:00PM - 4:30PM ,Rm 3416 ,Maria Marelli ,BIOLOGY  114 - General Education Biology,114-BD ,TuTh 8:00AM - 9:15AM ,Rm 3401 ,Dmitriy Brener ,114-JMW ,Mo 5:30PM - 7:10PM\nMo 7:20PM - 8:40PM ,Rm 3405\nMXM - Rm 3405 ,Dmitriy Brener\nDmitriy Brener ,114-P ,Sa 8:00AM - 10:30AM ,Rm 3408 ,Khaja Basheeruddin ,BIOLOGY  115 - Human Biology,115-KTR ,Tu 5:30PM - 7:10PM\nTu 7:20PM - 8:40PM ,Rm 3416\nMXM - Rm 3416 ,Hassan Killidar\nHassan Killidar ,115-M ,Fr 11:45AM - 2:15PM ,Rm 3416 ,Joshua Francis ,BIOLOGY  116 - Anatomy And Physiology,116-A ,Mo 8:00AM - 8:50AM\nMo 9:00AM - 10:40AM ,Rm 3408\nMXM - Rm 3408 ,Ramakrishna Siripuram\nRamakrishna Siripuram ,116-C ,Mo 11:00AM - 11:57AM\nWe 11:00AM - 11:57AM ,Rm 3411\nMXM - Rm 3414 ,Mashouf Shaykh\nMashouf Shaykh ,116-D ,Tu 11:00AM - 11:50AM\nTu 12:00PM - 1:40PM ,Rm 3407\nMXM - Rm 3407 ,Abelardo Escriba Omar\nAbelardo Escriba Omar ,116-E ,Mo 2:30PM - 3:20PM\nMo 3:30PM - 5:10PM ,Rm 3411\nMXM - Rm 3411 ,Mashouf Shaykh\nMashouf Shaykh ,116-F ,Tu 11:00AM - 11:57AM\nTu 12:07PM - 2:05PM ,Rm 3411\nMXM - Rm 3411 ,Saleel Raut\nSaleel Raut ,116-HK ,Tu 5:30PM - 6:35PM\nTh 5:30PM - 6:35PM ,Rm 3411\nMXM - Rm 3405 ,Khaja Ahmad\nKhaja Ahmad ,116-N ,Fr 2:30PM - 4:10PM ,Rm 3411 ,Sreedharan Kartha ,116-NQ ,FrSa 2:30PM - 4:10PM ,Rm 3403 ,Khaja Ahmad ,116-P ,Sa 11:45AM - 1:25PM ,Rm 3416 ,Maxwell Sanei ,BIOLOGY  120 - Terminology For Medical Careers,120-EG ,MoWe 2:00PM - 3:40PM ,Rm 3416 ,Sharon Cisneros ,120-GJ ,MoWe 4:00PM - 5:15PM ,Rm 3416 ,Sharon Cisneros ,120-HR ,Th 3:00PM - 5:30PM ,Rm 3416 ,Avni Thaci ,120-KR ,Th 6:00PM - 8:30PM ,Rm 4112 ,Jerry Jackson ,120-M ,Fr 8:30AM - 11:00AM ,Rm 3416 ,Abelardo Escriba Omar ,120-P ,Sa 9:00AM - 11:30AM ,Rm 3416 ,Abelardo Escriba Omar ,BIOLOGY  121 - Biology I,121-AC ,MoWe 8:00AM - 9:40AM ,Rm 3403 ,Fabio Pibiri ,121-BD ,TuTh 8:00AM - 8:50AM ,Rm 3403 ,Erin McMurray ,121-BD2 ,TuTh 8:00AM - 8:50AM ,Rm 3408 ,Michael Hughes ,121-C ,MoWe 11:00AM - 12:40PM ,Rm 3403 ,Peter Grudzien ,121-C2 ,MoWe 11:00AM - 12:40PM ,Rm 3408 ,Mijung Kim ,121-CRN ,MoWe 8:00AM - 9:40AM ,Malcolm X College ,TBA TBA ,121-EG ,MoWe 2:00PM - 3:40PM ,Rm 3403 ,Reagan DeFlorio ,121-EG1 ,MoWe 2:00PM - 4:15PM ,Rm 3401 ,Fabio Pibiri ,121-EG2 ,MoWe 2:00PM - 3:40PM ,Rm 3408 ,Chafika Boudiaf ,121-FH ,TuTh 2:00PM - 3:40PM ,Rm 3408 ,Chiju Huang ,121-FH1 ,Tu 2:00PM - 3:55PM\nTu 4:05PM - 5:05PM ,Rm 3403\nMXM - Rm 3403 ,Reagan DeFlorio\nReagan DeFlorio ,121-FTR ,Tu 2:00PM - 3:40PM\nTu 3:50PM - 4:40PM ,Rm 3405\nMXM - Rm 3405 ,Peter Grudzien\nPeter Grudzien ,121-HNR ,TuTh 11:00AM - 12:40PM ,Rm 3408 ,Chiju Huang ,121-JMW ,MoWe 6:00PM - 7:40PM ,Rm 3403 ,Arthur Reliford ,121-M ,Fr 9:00AM - 11:20AM ,Rm 3403 ,Erin McMurray ,121-MN ,Fr 11:00AM - 2:20PM ,Rm 3414 ,Sundeep Talwar ,121-N ,Fr 3:45PM - 7:05PM ,Rm 3405 ,Sharon Cisneros ,121-P ,Sa 8:00AM - 11:20AM ,Rm 3403 ,Mirmonsef Paria ,BIOLOGY  122 - Biology II,122-AC ,Mo 8:00AM - 9:40AM\nWe 8:00AM - 9:40AM ,Rm 3405\nMXM - Rm 3408 ,Marcela Bernal-Munera\nMarcela Bernal-Munera ,122-MN ,Fr 9:00AM - 11:20AM ,Rm 3408 ,TBA TBA ,BIOLOGY  130 - Human Cadaver Anatomy I,130-BT ,Tu 8:30AM - 8:55AM ,Rm 3416 ,Sheila Wicks ,BIOLOGY  131 - Human Cadaver Anatomy II,131-BR ,Th 8:30AM - 8:55AM ,Rm 3416 ,Sheila Wicks ,BIOLOGY  209 - Biochemistry,209-KTR ,Tu 6:00PM - 7:40PM\nTh 6:00PM - 7:40PM ,Rm 3408\nMXM - Rm 3416 ,Peter Grudzien\nPeter Grudzien ,BIOLOGY  226 - Human Structure and Function I,226-A ,MoWe 8:00AM - 8:50AM ,Rm 3407 ,Avni Thaci ,226-CE ,MoWe 11:00AM - 11:57AM ,Rm 3407 ,Ramakrishna Siripuram ,226-DTR ,Tu 11:00AM - 11:50AM\nTu 12:00PM - 1:40PM ,Rm 3414\nMXM - Rm 3414 ,Avni Thaci\nAvni Thaci ,226-EG ,Mo 2:30PM - 3:20PM\nMo 3:30PM - 5:10PM ,Rm 3407\nMXM - Rm 3407 ,Sheila Wicks\nSheila Wicks ,226-FH ,TuTh 2:00PM - 2:50PM ,Rm 3407 ,Azmia Javed ,226-HK ,Tu 5:10PM - 6:15PM\nTu 6:25PM - 8:40PM ,Rm 3407\nMXM - Rm 3407 ,Imran Khan\nImran Khan ,226-HNR ,TuTh 8:00AM - 8:50AM ,Rm 3407 ,Avni Thaci ,226-JMW ,MoWe 6:00PM - 6:50PM ,Rm 3407 ,Zahid Arfeen ,226-KTR ,Tu 6:00PM - 6:57PM\nTu 7:07PM - 9:05PM ,Rm 3414\nMXM - Rm 3414 ,Saleel Raut\nSaleel Raut ,226-MN ,Fr 9:00AM - 10:40AM ,Rm 3407 ,Jack Taha ,226-N ,Fr 2:30PM - 4:10PM ,Rm 3407 ,Jack Taha ,226-PQ ,Sa 8:00AM - 9:40AM ,Rm 3407 ,Imran Khan ,226-Q ,Sa 11:45AM - 1:25PM ,Rm 3414 ,Ezimako Paul ,BIOLOGY  227 - Human Structure and Function II,227-A ,MoWe 8:00AM - 8:50AM ,Rm 3411 ,Sheila Wicks ,227-CMW ,Mo 11:00AM - 11:57AM\nWe 11:00AM - 11:57AM ,Rm 3414\nMXM - Rm 3411 ,Emilio Carrasco\nEmilio Carrasco ,227-EG ,Mo 2:30PM - 3:20PM\nMo 3:30PM - 5:10PM ,Rm 3405\nMXM - Rm 3405 ,Emilio Carrasco\nEmilio Carrasco ,227-FTR ,Tu 11:00AM - 11:57AM\nTu 12:07PM - 2:05PM ,Rm 3416\nMXM - Rm 3416 ,Tomer Kanan\nTomer Kanan ,227-HK ,TuTh 2:30PM - 3:20PM ,Rm 3411 ,Sheila Wicks ,227-HNR ,TuTh 8:00AM - 8:50AM ,Rm 3411 ,Emilio Carrasco ,227-JMW ,MoWe 6:00PM - 6:50PM ,Rm 3411 ,Tomer Kanan ,227-KTR ,Tu 6:00PM - 6:50PM\nTu 7:00PM - 8:40PM ,Rm 3405\nMXM - Rm 3405 ,Tomer Kanan\nTomer Kanan ,227-MN ,Fr 9:00AM - 10:40AM ,Rm 3411 ,Ezimako Paul ,227-PQ ,Sa 8:00AM - 9:40AM ,Rm 3411 ,Zahid Arfeen ,227-MWH1 ,TuTh 9:00AM - 11:50AM ,Westside Learning Center ,Salvador Ramirez ,227-MXH1 ,MoWe 9:00AM - 11:50AM ,Rm 4305 ,Salvador Ramirez ,227-MWH4 ,MoWe 11:50AM - 1:30PM ,MX Bldg 2 - Rm 131 ,Faylinda Walton ,227-MXH4 ,TuTh 11:50AM - 1:30PM ,Rm 4305 ,Jeanette Stroud ,227-MWH3 ,MoWe 9:00AM - 11:30AM ,MX Bldg 2 - Rm 117 ,Faylinda Walton ,227-MXH3 ,TuTh 9:00AM - 11:30AM ,Rm 4305 ,Jeanette Stroud ,BUSINES  111 - Introduction To Business,111-BANN ,TuTh 10:00AM - 11:15AM ,Malcolm X College ,TBA TBA ,111-C ,MoWe 10:00AM - 11:15AM ,Rm 4103 ,David Daniels ,111-M ,Fr 9:00AM - 11:30AM ,Rm 6001 ,David Daniels ,111-MLA ,MoWe 12:00PM - 1:15PM ,Malcolm X College ,TBA TBA ,BUSINES  181 - Financial Accounting,181-F ,TuTh 12:30PM - 2:10PM ,Rm 6007 ,Clifford Ovunwo ,BUSINES  244 - Personal Finance,244-E ,MoWe 12:30PM - 1:45PM ,Rm 6001 ,Karen Scott ,BUSINES  284 - Business Communications,284-H ,TuTh 3:00PM - 4:15PM ,Rm 6007 ,Alta Williams ,CHEM  121 - Basic Chemistry I,121-AC ,MoWe 9:00AM - 9:50AM ,Rm 4411 ,Sa Woon Kim ,121-BD ,TuTh 9:00AM - 9:50AM ,Rm 4411 ,Merhatibeb Woldeyohannes ,121-DF ,TuTh 12:00PM - 12:50PM ,Rm 4411 ,Merhatibeb Woldeyohannes ,121-EG ,MoWe 12:30PM - 1:20PM ,Rm 4411 ,Joshua Oladipo ,121-FH ,TuTh 2:00PM - 2:50PM ,Rm 4408 ,Talha Abubakr ,121-GJ ,MoWe 3:30PM - 4:20PM ,Rm 4411 ,Halle Morrison ,121-HK ,TuTh 5:30PM - 6:20PM ,Rm 4411 ,Halle Morrison ,121-JMW ,MoWe 5:00PM - 5:50PM ,Rm 4408 ,Sa Woon Kim ,121-MN ,Fr 8:30AM - 10:10AM ,Rm 4411 ,Yoriel Marcano ,121-PQ ,Sa 8:30AM - 10:10AM ,Rm 4411 ,Yoriel Marcano ,CHEM  201 - General Chemistry I,201-BD ,TuTh 8:00AM - 9:40AM ,Rm 4407 ,Neil Miranda ,201-EG ,MoWe 12:30PM - 2:10PM ,Rm 4407 ,TBA TBA ,201-GJM ,MoWe 5:30PM - 7:10PM ,Rm 4407 ,TBA TBA ,201-HKT ,TuTh 5:30PM - 7:10PM ,Rm 4407 ,Noel Vargas ,201-HNR ,MoWe 9:00AM - 10:40AM ,Rm 4407 ,Merhatibeb Woldeyohannes ,CHEM  203 - General Chemistry II,203-BD ,TuTh 8:00AM - 9:40AM ,Rm 4416 ,Gitendra Paul ,203-GJM ,MoWe 5:00PM - 6:40PM ,Rm 4416 ,Mohsen Ebrahimi ,CHEM  205-1 - Organic Chemistry I,205-AC ,MoWe 8:00AM - 9:40AM ,Rm 4408 ,Neil Miranda ,CHLD DV  101-1 - Human Growth ,101-AC ,MoWe 9:00AM - 10:40AM ,Rm 1314 ,William O'Donnell ,101-M ,Fr 8:00AM - 12:30PM ,Rm 1314 ,William O'Donnell ,CHLD DV  107 - Health Safety And Nutrition,107-CME ,Mo 11:30AM - 2:00PM ,Rm 1314 ,Mary Lane ,CHLD DV  109 - Language ,109-KT ,Tu 6:00PM - 8:30PM ,Rm 1314 ,Sharon Taylor ,CHLD DV  120 - Intro To Early Childhood Education Group Care,120-CWE ,We 11:30AM - 2:00PM ,Rm 1314 ,William O'Donnell ,CHLD DV  143 - Science ,143-JW ,We 6:00PM - 8:30PM ,Rm 1314 ,Jurellene Rigsby ,CHLD DV  149 - Creative Activities For Young Children,149-DFT ,Tu 10:00AM - 12:40PM ,Rm 1314 ,Mary Lane ,CHLD DV  201 - Observation,201-DFR ,Th 10:00AM - 12:30PM ,Rm 1314 ,Mary Lane ,CHLD DV  258 - Principles ,258-KR ,Th 6:00PM - 9:20PM ,Rm 1314 ,William O'Donnell ,CHLD DV  259-1 - Practicum In Pre,259-GW ,We 3:00PM - 4:50PM ,Rm 1314 ,Bernice Shelton ,CHLD DV  262-1 - Child,262-FHR ,Th 1:00PM - 3:30PM ,Rm 1314 ,Mary Lane ,CIS  101 - Computer Science 101,101-MC1 ,TuTh 10:00AM - 10:50AM ,Malcolm X College ,TBA TBA ,CIS  120 - Intro to Microcomputers,120-A ,MoWe 8:00AM - 9:15AM ,Rm 6007 ,Billy Cunningham ,120-C ,MoWe 10:00AM - 11:15AM ,Rm 6007 ,Billy Cunningham ,120-C2 ,MoWe 10:00AM - 11:40AM ,Rm 6001 ,Kayode Jowosimi ,120-E ,MoWe 12:30PM - 1:45PM ,Rm 6007 ,Billy Cunningham ,120-EG ,MoWe 2:00PM - 3:15PM ,Rm 6007 ,Billy Cunningham ,120-F ,TuTh 12:30PM - 1:45PM ,Rm 6001 ,Billy Cunningham ,120-FH ,TuTh 2:00PM - 3:15PM ,Rm 6001 ,Kayode Jowosimi ,120-H ,TuTh 3:30PM - 4:45PM ,Rm 6001 ,Kayode Jowosimi ,120-JM ,Mo 6:00PM - 9:20PM ,Rm 6006 ,Kent Latimore ,120-JMW ,MoWe 6:00PM - 7:15PM ,Rm 6001 ,Shallie Griffin ,120-MN ,Fr 9:30AM - 12:50PM ,Rm 6006 ,TBA TBA ,120-P ,Sa 9:00AM - 11:30AM ,Rm 6001 ,Kent Latimore ,120-PQ ,Sa 9:30AM - 12:50PM ,Rm 6006 ,TBA TBA ,CIS  145 - Database Management,145-KR ,Th 6:00PM - 8:30PM ,Rm 6001 ,Kayode Jowosimi ,DENTHYG  121 - Principles of Dental Hygiene I Lecture,121-DH2 ,Tu 10:00AM - 11:50AM ,Rm 4112 ,Maria Prassas ,DENTHYG  125 - Nutrition And Biochemistry,125-DH2 ,Mo 1:00PM - 2:50PM ,Rm 4112 ,Sherece Thompson ,DENTHYG  131 - Oral Structures ,131-DH2 ,Mo 9:00AM - 11:50AM ,Rm 4105 ,Megan Craig ,DENTHYG  133 - Head And Neck Anatomy,133-DH2 ,We 9:00AM - 10:50AM ,Rm 4105 ,Mark Chicoine ,DENTHYG  135 - Concepts of Preventive Therapy II,135-DH2 ,Tu 12:00PM - 12:50PM ,Rm 4112 ,Maria Prassas ,DENTHYG  233 - Expanded Functions,233-DH2 ,Mo 8:00AM - 8:50AM ,Rm 4105 ,Gerry Halligan ,DENTHYG  235 - Community Dental Health I,235-DH2 ,Th 10:00AM - 11:50AM ,Rm 4112 ,Mark Chicoine ,DENTHYG  241 - Dental Pharmacology,241-DH2 ,Th 8:00AM - 9:50AM ,Rm 4112 ,Megan Craig ,DENTHYG  243 - Periodontics,243-DH2 ,We 8:00AM - 9:50AM ,Rm 6005 ,Maureen Fannon ,DENTHYG  251 - Clinical Dental Hygiene I,251-DH2 ,Mo 1:00PM - 1:50PM ,Rm 4105 ,Gerry Halligan ,EMT  100 - Emergency Medical Technician ,100-CEW ,We 10:00AM - 1:20PM ,Rm 7006 ,Christopher Easley ,EMT  101 - Emergency Medical Technician,101-BD ,TuTh 9:30AM - 12:20PM ,Rm 7005 ,Michael Flaherty ,101-EGJ ,MoWe 2:00PM - 4:50PM ,Rm 7005 ,William Passmore ,101-HK ,TuTh 3:00PM - 5:50PM ,Rm 7005 ,Robert Caron ,EMT  221 - Essentials of Paramedic Medicine I,221-ACE ,MoWe 9:30AM - 1:20PM ,Rm 7005 ,Patrick Mroczek ,EMT  222 - Paramedic Medicine Practicum I,222-MN ,Fr 9:30AM - 11:10AM ,Rm 7005 ,James Thorpe ,ENGLISH   98 - Composition,98-A ,MoWe 8:00AM - 9:15AM ,Rm 3305 ,Ivor Irwin ,98-B ,TuTh 8:00AM - 9:15AM ,Rm 3305 ,Loretta Ragsdell ,98-D ,TuTh 10:00AM - 11:15AM ,Rm 3200 ,Adrienne Watson ,98-E ,MoWe 12:30PM - 1:45PM ,Rm 3305 ,Marlene Chamberlain ,98-G ,MoWe 3:30PM - 4:45PM ,Rm 3305 ,Alicia Smith ,98-H ,TuTh 2:30PM - 3:45PM ,Rm 3305 ,Adrienne Watson ,98-JMW ,MoWe 6:00PM - 7:15PM ,Rm 3305 ,Alicia Smith ,98-JMW2 ,MoWe 6:00PM - 7:40PM ,Rm 3203 ,TBA TBA ,98-KTR ,TuTh 6:00PM - 7:15PM ,Rm 3203 ,Shannon Wood ,98-LC3 ,MoWe 11:00AM - 12:15PM ,Rm 3402 ,Andrew Ball ,ENGLISH  100 - Basic Writing Skills,100-A ,MoWe 8:00AM - 9:15AM ,Rm 3302 ,Nneka Alexander ,100-ALP1 ,TuTh 12:30PM - 1:45PM ,Rm 3301 ,Aletha Osborne ,100-ALP3 ,MoWe 10:25AM - 11:40AM ,Rm 3301 ,Rachel Slotnick ,100-ALP4 ,TuTh 10:25AM - 11:40AM ,Rm 3301 ,Timothy Chapman ,100-ALP6 ,TuTh 4:30PM - 5:45PM ,Rm 3200 ,Marlene Chamberlain ,100-ALP8 ,TuTh 4:30PM - 5:45PM ,Rm 3203 ,Rachel Slotnick ,100-B ,TuTh 8:00AM - 9:15AM ,Rm 3309 ,Sola Isabell-Lay ,100-B2 ,TuTh 8:00AM - 9:40AM ,Rm 6001 ,TBA TBA ,100-C ,MoWe 10:00AM - 11:15AM ,Rm 3302 ,Aletha Osborne ,100-D ,TuTh 10:00AM - 11:40AM ,Rm 3203 ,Aletha Osborne ,100-E ,MoWe 12:30PM - 1:45PM ,Rm 3206 ,Barbara Goncalves ,100-F ,TuTh 12:30PM - 1:45PM ,Rm 3206 ,Adrienne Watson ,100-G ,MoWe 3:30PM - 4:45PM ,Rm 3302 ,Janet Henderson ,100-JMW ,MoWe 6:00PM - 7:40PM ,Rm 3200 ,LaKeisha Young ,100-KTR ,TuTh 6:00PM - 7:15PM ,Rm 3305 ,Roxanne Brown ,100-P ,Sa 9:00AM - 11:30AM ,Rm 3206 ,Ivor Irwin ,ENGLISH  101 - Composition,101-A ,MoWe 8:00AM - 9:40AM ,Rm 3200 ,TBA TBA ,101-ALP ,MoWe 10:00AM - 11:40AM ,Rm 3205 ,Maria Palazzolo ,101-ALP1 ,MoWe 12:30PM - 1:45PM ,Rm 3301 ,Aletha Osborne ,101-ALP2 ,MoWe 6:00PM - 7:15PM ,Rm 3301 ,Janet Henderson ,101-ALP3 ,MoWe 9:00AM - 10:15AM ,Rm 3301 ,Rachel Slotnick ,101-ALP4 ,TuTh 9:00AM - 10:15AM ,Rm 3301 ,Timothy Chapman ,101-ALP5 ,MoWe 8:00AM - 9:15AM ,Rm 3203 ,Sola Isabell-Lay ,101-ALP6 ,MoWe 4:30PM - 5:45PM ,Rm 3205 ,Marlene Chamberlain ,101-ALP7 ,TuTh 3:00PM - 4:15PM ,Rm 3301 ,Shannon Wood ,101-ALP8 ,MoWe 4:30PM - 5:45PM ,Rm 3203 ,Rachel Slotnick ,101-B ,TuTh 8:00AM - 9:15AM ,Rm 3200 ,Carleta Alston ,101-C ,MoWe 10:00AM - 11:15AM ,Rm 3306 ,Carleta Alston ,101-CRNE ,TuTh 10:00AM - 11:15AM ,Malcolm X College ,TBA TBA ,101-D ,TuTh 10:00AM - 11:15AM ,Rm 3405 ,Carleta Alston ,101-F ,TuTh 12:30PM - 1:45PM ,Rm 3203 ,Crystal Thomas ,101-G ,MoWe 3:30PM - 4:45PM ,Rm 3200 ,Gregory Nault ,101-H ,TuTh 3:30PM - 4:45PM ,Rm 3402 ,Parsa Choudhury ,101-HNR ,TuTh 12:30PM - 1:45PM ,Rm 3302 ,Gregory Nault ,101-IHSA ,TuTh 10:00AM - 11:15AM ,Malcolm X College ,TBA TBA ,101-JM ,Mo 6:00PM - 8:30PM ,Rm 3402 ,Timothy Sharkey ,101-JW ,We 6:00PM - 8:30PM ,Rm 3405 ,Vanessa Ruiz ,101-KTR ,TuTh 6:00PM - 7:40PM ,Rm 3402 ,Ivor Irwin ,101-MC1 ,MoWe 10:00AM - 11:15AM ,Malcolm X College ,TBA TBA ,101-MLA ,TuTh 10:00AM - 11:15AM ,Malcolm X College ,TBA TBA ,101-P ,Sa 9:00AM - 11:30AM ,Rm 3200 ,Vanessa Ruiz ,101-P1 ,Sa 9:00AM - 12:20PM ,Rm 3203 ,Raymond Berry ,ENGLISH  102 - Composition,102-E ,MoWe 12:30PM - 1:45PM ,Rm 3203 ,Carleta Alston ,102-H ,TuTh 3:30PM - 4:45PM ,Rm 3300 ,Gregory Nault ,102-HNR ,TuTh 10:00AM - 11:15AM ,Rm 3302 ,Andrew Ball ,102-JW ,We 6:00PM - 8:30PM ,Rm 3402 ,Crystal Thomas ,102-KR ,Th 6:00PM - 8:30PM ,Rm 3206 ,TBA TBA ,102-LC1 ,TuTh 12:30PM - 1:45PM ,Rm 3305 ,Lisa Owens ,ENGLISH  197 - Communications Skills,197-ALP ,TuTh 10:00AM - 11:40AM ,Rm 3206 ,Maria Palazzolo ,197-ALP2 ,TuTh 6:00PM - 7:15PM ,Rm 3301 ,Janet Henderson ,197-ALP5 ,MoWe 9:25AM - 10:40AM ,Rm 3203 ,Sola Isabell-Lay ,197-ALP7 ,TuTh 4:25PM - 5:40PM ,Rm 3301 ,Shannon Wood ,ENGLISH  241 - Creative Writing,241-MLA ,TuTh 8:00AM - 9:15AM ,Malcolm X College ,TBA TBA ,ENTRE  201 - Introduction to Entrepreneurship,201-P ,Sa 9:30AM - 12:00PM ,Rm 6007 ,Wayne Arnold ,ESL  300 - ESL Intermediate Level,300-MXAC ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4301 ,Antonio Cortes ,300-MXED ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4402 ,Alberto Avalos ,ESL  310 - ESL Intermediate Level,310-MXMC ,MoTuWeTh 9:30AM - 11:20AM ,Metro Correctional Ctr ,Mark Horn ,ESL  311 - ESL Intermediate Level,311-MLC7 ,MoTuWeTh 9:00AM - 12:50PM ,Blessed Sacrament ,Iwona Lippert-Szepan ,ESL  330 - ESL Supplemental Gen Lvl 3,330-MXEC ,Sa 9:00AM - 12:50PM ,Rm 4302 ,Iwona Lippert-Szepan ,ESL  400 - ESL Intermediate Level,400-MX52 ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4306 ,Jeffrey Nofziger ,ESL  410 - ESL Intermediate Level,410-MXCP ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4301 ,Carmen Perez-Stoppert ,ESL  430 - ESL Suppl. Gen. .3 Level,430-MXLS ,Sa 9:00AM - 12:50PM ,Rm 4402 ,TBA TBA ,ESL  500 - ESL Advanced Level V,500-MXE1 ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4302 ,Agustin Leal ,500-MXEJ ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4302 ,Aleksandr Zvodinsky ,ESL  530 - ESL Supp Gen Lev 5,530-MXEL ,Sa 9:00AM - 12:50PM ,Rm 4203 ,Vasanta Doss ,ESL  700 - ESL Advanced Level 7,700-MXEM ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4306 ,Nader Shalabi ,700-MXEO ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4203 ,Carmen Perez-Stoppert ,ESSS  101 - Personal Trainer Preparation,101-EG ,MoWe 12:00PM - 1:15PM ,Rm 2201 ,Maria Armstead ,101-K ,TuTh 5:30PM - 6:45PM ,Rm 2201 ,Robyn Becker ,ESSS  102 - Personal Trainer Practicum,102-EG ,Mo 2:30PM - 3:20PM ,Rm 1204 ,Maria Armstead ,102-FH ,Tu 8:00PM - 8:50PM ,Rm 1204 ,Robyn Becker ,ESSS  103 - Allied Health Clinical Skills,103-BDT ,Tu 9:00AM - 9:50AM ,Rm 2208 ,Elizabeth Arena ,ESSS  112 - Functional Anatomy ,112-AC ,MoWe 8:00AM - 8:50AM ,Rm 2208 ,Elizabeth Arena ,112-EG ,MoWe 1:00PM - 1:50PM ,MX Bldg 1 - Rm 2208 ,Elizabeth Arena ,112-GJ ,MoWe 5:30PM - 6:20PM ,Rm 2208 ,Elizabeth Arena ,FIN ART  104 - The World Of The Cinema,104-CW ,We 9:50AM - 12:20PM ,Rm 4104 ,Harry Faur ,104-KR ,Th 6:00PM - 8:30PM ,Rm 3310 ,Ben Rubin ,104-KT ,Tu 6:00PM - 8:30PM ,Rm 3310 ,Arnell Harris ,FIREMGT  101 - Principles of Emergency Services,101-GJW ,We 4:00PM - 7:20PM ,Rm 6009 ,Jason Satriano ,FIREMGT  102 - Strategies and Tactics I,102-HKR ,Th 4:00PM - 7:20PM ,Rm 6009 ,Jeffery Kraft ,FIREMGT  200 - Management and Leadership I,200-HKT ,Tu 4:00PM - 7:20PM ,Rm 3201 ,Derrick Jackson ,FIREMGT  201 - Fire Service Hydraulics,201-DFT ,Tu 10:00AM - 1:20PM ,Rm 6014 ,GARY BROOKS ,FIREMGT  221 - Fire Instructor II,221-GJM ,Mo 4:00PM - 7:20PM ,Rm 6011 ,Shun Haynes ,GEOLOGY  201 - Physical Geology,201-CE2 ,MoWe 10:30AM - 12:10PM ,Rm 4401 ,Halle Morrison ,HEALTH  102 - Medical Law ,102-F ,TuTh 1:00PM - 2:15PM ,Rm 4103 ,Hang Jung Kim ,102-JM ,Mo 7:00PM - 9:30PM ,Rm 6005 ,Peter Asemota ,HEALTH  105 - Medical Careers Professional Development,105-GJM ,Mo 5:00PM - 6:50PM ,Rm 6005 ,Christine Dzoga ,HEALTH  107 - Pharmacology,107-N ,Fr 1:00PM - 2:40PM ,Rm 4103 ,Douglas Taylor ,HEALTH  250 - Health Education,250-AC ,MoWe 9:30AM - 10:45AM ,Rm 6002 ,David Baker ,HEAPRO  101 - Patient Care Technician Training,101-CEG ,MoWe 11:30AM - 1:10PM ,Rm 6005 ,Peter Asemota ,HEAPRO  102 - Health Career Studies,102-BDT ,Tu 9:00AM - 11:30AM ,Rm 4105 ,Hang Jung Kim ,102-C ,MoWe 11:00AM - 12:15PM ,Rm 6002 ,Hang Jung Kim ,102-E ,MoWe 12:30PM - 1:45PM ,Rm 6002 ,TBA TBA ,102-EGM ,Mo 1:40PM - 5:00PM ,Rm 6009 ,Hang Jung Kim ,102-F ,TuTh 12:30PM - 1:45PM ,Rm 4105 ,TBA TBA ,102-JW ,We 6:00PM - 8:30PM ,Rm 4112 ,Helen Williams-Patton ,102-KT ,Tu 6:00PM - 8:30PM ,Rm 6009 ,Geraldine Pate ,102-M ,Fr 8:20AM - 10:50AM ,Rm 4105 ,Deonce Scott ,102-N ,Fr 6:00PM - 8:30PM ,Rm 4105 ,Helen Williams-Patton ,102-P ,Sa 9:00AM - 12:20PM ,Rm 4105 ,Kenneth Campbell ,HIM  201 - Clinical Pathophysiology,201-EG ,MoWe 2:30PM - 3:45PM ,Rm 4104 ,Hanna Wierzchowski ,HIM  202 - Advanced Coding ICD9,202-CE ,MoWe 11:40AM - 12:55PM ,Rm 4103 ,Hanna Wierzchowski ,HIM  203 - Reimbursement Methodologies,203-K ,Tu 6:30PM - 9:30PM ,Rm 4104 ,Angelia Hamilton ,HIM  204 - Health Care Statistics,204-GJ ,MoWe 5:00PM - 6:15PM ,Rm 4104 ,Hanna Wierzchowski ,HIM  205 - Health Information Management Seminar I,205-FHT ,Tu 2:30PM - 3:20PM ,Rm 4104 ,Hanna Wierzchowski ,HIM  206 - HIM Seminar II,206-HKT ,Tu 5:20PM - 6:10PM ,Rm 4103 ,TBA TBA ,HIM  207 - Health Information Management Clinical Practicum,207-HT ,Tu 3:40PM - 4:30PM ,Rm 4104 ,Hanna Wierzchowski ,HISTORY  111 - History of American People To 1865,111-B ,TuTh 8:00AM - 9:15AM ,Rm 3405 ,Misbahudeen Ahmed-Rufai ,111-C ,MoWe 10:00AM - 11:15AM ,Rm 4414 ,Misbahudeen Ahmed-Rufai ,111-FH ,TuTh 2:00PM - 3:15PM ,Rm 4112 ,Misbahudeen Ahmed-Rufai ,HISTORY  114 - The Afro,114-D ,TuTh 10:00AM - 11:15AM ,Rm 3207 ,Misbahudeen Ahmed-Rufai ,HISTORY  247 - African History to Colonial Period,247-E ,MoWe 12:30PM - 1:45PM ,Rm 4414 ,Misbahudeen Ahmed-Rufai ,HUM  201 - General Course I Humanities,201-E ,MoWe 12:30PM - 1:45PM ,Rm 3200 ,Khadi King ,HUM  202 - General Course II Humanities,202-F ,TuTh 12:30PM - 1:45PM ,Rm 3405 ,Khadi King ,HUM  210 - Comparative Mythology,210-H ,TuTh 3:30PM - 4:45PM ,Rm 3205 ,Khadi King ,HUM  212 - Non,212-HNR ,MoWe 3:30PM - 4:45PM ,Rm 3307 ,Khadi King ,212-KT ,Tu 6:00PM - 8:30PM ,Rm 3205 ,Khadi King ,INTDSP  101 - College Success Seminar,101-A ,MoWe 8:00AM - 9:15AM ,Rm 4201 ,Adetokunbo Fatoke ,101-B ,TuTh 8:00AM - 9:15AM ,Rm 4201 ,Adetokunbo Fatoke ,101-B2 ,TuTh 8:00AM - 9:40AM ,Rm 4414 ,Juandalyn Holland ,101-C ,MoWe 10:00AM - 11:15AM ,Rm 4201 ,Adetokunbo Fatoke ,101-D ,TuTh 10:00AM - 11:15AM ,Rm 4201 ,Adetokunbo Fatoke ,101-E ,MoWe 12:30PM - 1:45PM ,Rm 4201 ,Adetokunbo Fatoke ,101-E2 ,MoWe 12:30PM - 1:45PM ,Rm 3207 ,Marlon Haywood ,101-F ,TuTh 12:30PM - 1:45PM ,Rm 4201 ,Adetokunbo Fatoke ,101-G ,MoWe 3:30PM - 4:45PM ,Rm 4201 ,Lewis Rule ,101-H ,TuTh 3:30PM - 4:45PM ,Rm 4201 ,Lewis Rule ,101-JMW ,MoWe 6:00PM - 7:15PM ,Rm 4201 ,Lewis Rule ,101-JW2 ,We 5:00PM - 8:20PM ,Rm 4415 ,Adetokunbo Fatoke ,101-KTR ,TuTh 6:00PM - 7:40PM ,Rm 4201 ,Lewis Rule ,101-M ,Fr 9:00AM - 12:20PM ,Rm 4201 ,Alandria Jones ,101-P ,Sa 9:30AM - 12:00PM ,Rm 4201 ,Robert Thompson ,LEVELUP 2803 - Level Up,2803-ENGA ,MoTuWeTh 9:00AM - 12:00PM ,Rm 2311A ,Staff ,2803-ENGP ,MoTuWeTh 1:00PM - 4:00PM ,Rm 2311A ,Kayley Steuber ,2803-MATA ,MoTuWeTh 9:00AM - 12:00PM ,Rm 2319 ,William Dennis ,2803-MATP ,MoTuWeTh 1:00PM - 4:00PM ,Rm 2319 ,Karla Jemison ,LIT  110 - Introduction To Literature,110-C ,MoWe 10:00AM - 11:15AM ,Rm 3305 ,Gregory Nault ,LIT  122 - Perspectives in Black Literature,122-E ,MoWe 12:30PM - 1:45PM ,Rm 3205 ,Crystal Thomas ,LIT  126 - Contemporary American Literature,126-HNR ,TuTh 11:00AM - 12:15PM ,Rm 2201 ,Morgan Halstead ,MAS  110 - Massage Therapy Practice I,110-BGM ,MoWe 8:00AM - 12:15PM ,Rm 2207 ,TBA TBA ,MAS  111 - Integration of Massage Therapy I,111-BGW ,TuTh 9:00AM - 12:00PM ,Rm 4103 ,TBA TBA ,MATH   90 - Mathematical Literacy,90-AC ,MoWe 9:00AM - 11:30AM ,Rm 3307 ,Mary Sheppard ,90-FH ,TuTh 12:00PM - 2:30PM ,Rm 3307 ,Mary Sheppard ,MATH   98 - Beginning Algebra with Geometry,98-AC ,MoWe 7:50AM - 9:30AM ,Rm 3311 ,Hope Essien ,98-BD ,TuTh 9:40AM - 11:55AM ,Rm 3205 ,Codjo Padonou ,98-BD ,TuTh 7:50AM - 9:30AM ,Rm 3311 ,Hope Essien ,98-CE ,MoWe 10:00AM - 12:15PM ,Rm 3308 ,LaTonya Hester ,98-CE ,MoWe 10:00AM - 11:40AM ,Rm 3309 ,Richard Williams ,98-DF ,TuTh 10:00AM - 11:40AM ,Rm 3309 ,Richard Williams ,98-FH ,TuTh 12:30PM - 2:10PM ,Rm 3309 ,LaTonya Hester ,98-FH2 ,TuTh 12:30PM - 2:45PM ,Rm 3308 ,Codjo Padonou ,98-G2 ,MoWe 3:30PM - 5:45PM ,Rm 3308 ,Codjo Padonou ,98-GJ ,MoWe 3:50PM - 5:30PM ,Rm 3311 ,LaTonya Hester ,98-HK ,TuTh 3:50PM - 5:30PM ,Rm 3311 ,Isiaka Oduola ,98-JMW ,MoWe 6:00PM - 7:40PM ,Rm 3311 ,Rokhak Keshavarzi ,98-JMW2 ,MoWe 6:00PM - 8:15PM ,Rm 3205 ,TBA TBA ,98-KTR ,TuTh 6:00PM - 7:40PM ,Rm 3311 ,Isiaka Oduola ,98-M ,Fr 9:00AM - 12:20PM ,Rm 3307 ,Vica Alexandru ,98-P ,Sa 9:00AM - 12:20PM ,Rm 3307 ,Renad Alrousan ,MATH   99 - Intermediate Algebra with Geometry,99-AC ,MoWe 7:25AM - 9:30AM ,Rm 3205 ,Opal Jones ,99-ACM ,MoWeFr 9:45AM - 11:10AM ,Rm 4416 ,Marvin Johnson ,99-BD ,TuTh 7:25AM - 9:30AM ,Rm 3308 ,Codjo Padonou ,99-BD2 ,TuTh 11:00AM - 1:50PM ,Rm 3310 ,Mohammed Yunusa ,99-BDD1 ,TuTh 9:45AM - 11:50AM ,Rm 3307 ,David St. John ,99-BDD2 ,TuTh 9:45AM - 11:50AM ,Rm 3308 ,LaTonya Hester ,99-EFN ,MoWeFr 12:30PM - 2:25PM ,Rm 3311 ,Marvin Johnson ,99-EG ,MoWe 12:30PM - 2:35PM ,Rm 3309 ,Mohammed Yunusa ,99-FH ,TuTh 12:30PM - 2:35PM ,Rm 4205 ,Richard Williams ,99-GJ ,MoWe 3:45PM - 5:50PM ,Rm 3309 ,Rokhak Keshavarzi ,99-HK ,TuTh 3:45PM - 5:50PM ,Rm 3309 ,Shahid Muhammad ,99-JMW ,MoWe 6:00PM - 8:05PM ,Rm 3309 ,Shahid Muhammad ,99-JMW2 ,MoWe 6:00PM - 8:50PM ,Rm 3310 ,Moinuddin Shaikh ,99-KTR ,TuTh 6:00PM - 8:05PM ,Rm 3309 ,Shahid Muhammad ,99-KTR2 ,TuTh 6:00PM - 8:50PM ,Rm 6002 ,Moinuddin Shaikh ,99-M ,Fr 9:00AM - 1:10PM ,Rm 3308 ,Gauri Chakravorty ,99-P ,Sa 9:00AM - 1:10PM ,Rm 3308 ,Gauri Chakravorty ,MATH  118 - General Education Math,118-AC ,MoWe 9:00AM - 10:40AM ,Rm 3310 ,Nneka Anigbogu ,118-ALP ,TuTh 10:00AM - 11:40AM ,Rm 6006 ,Hope Essien ,118-ALP2 ,MoWe 10:00AM - 11:40AM ,Rm 6006 ,Hope Essien ,118-ALP3 ,TuTh 6:00PM - 7:40PM ,Rm 4416 ,Mohammed Yunusa ,118-ALP4 ,MoWe 12:30PM - 2:10PM ,Rm 4416 ,David St. John ,118-EG2 ,MoWe 12:30PM - 2:45PM ,Rm 3308 ,TBA TBA ,118-FH ,TuTh 12:00PM - 1:40PM ,Rm 3205 ,Opal Jones ,118-HK ,TuTh 4:00PM - 6:15PM ,Rm 3308 ,Karla Jemison ,118-JMW ,MoWe 6:00PM - 8:15PM ,Rm 3308 ,Renad Alrousan ,118-LC2 ,TuTh 12:30PM - 2:10PM ,Rm 4416 ,Alison Mastny ,118-MLA ,MoWe 10:00AM - 11:40AM ,Malcolm X College ,TBA TBA ,118-P ,Sa 9:00AM - 12:20PM ,Rm 3311 ,Daniel Pellegrini ,MATH  121 - Math For Elementary Teachers I,121-KTR2 ,TuTh 6:00PM - 8:10PM ,Rm 6011 ,Vica Alexandru ,MATH  125-1 - Introductory Statistics,125-CE ,MoWe 11:00AM - 12:40PM ,Rm 4205 ,Opal Jones ,125-EG ,MoWe 2:00PM - 4:15PM ,Rm 3205 ,Karla Jemison ,125-HNR ,MoWe 12:30PM - 2:10PM ,Rm 4104 ,Alison Mastny ,125-KT ,Tu 6:00PM - 9:20PM ,Rm 3307 ,Renad Alrousan ,MATH  140 - College Algebra,140-BD ,TuTh 9:00AM - 10:40AM ,Rm 3310 ,Opal Jones ,140-JMW ,MoWe 6:00PM - 7:40PM ,Rm 3302 ,Isiaka Oduola ,MATH  143 - Pre Calculus,143-AC ,MoWe 9:50AM - 12:20PM ,Rm 3311 ,Ruth Mortha ,143-FH ,TuTh 12:30PM - 3:00PM ,Rm 3311 ,Ruth Mortha ,MATH  207 - Calculus ,207-BD ,TuTh 9:00AM - 11:05AM ,Rm 6007 ,Ruth Mortha ,207-HK ,TuTh 3:30PM - 5:35PM ,Rm 3307 ,Alison Mastny ,MATH  208 - Calculus ,208-JMW ,MoWe 6:00PM - 8:10PM ,Rm 3307 ,Alison Mastny ,MATH  299-1 - Special Topics Mathematics,299-ALP ,TuTh 11:50AM - 12:40PM ,Rm 6006 ,Hope Essien ,299-ALP2 ,MoWe 11:50AM - 12:40PM ,Rm 6006 ,Hope Essien ,299-ALP3 ,TuTh 7:50PM - 8:40PM ,Rm 4416 ,Mohammed Yunusa ,299-ALP4 ,MoWe 2:20PM - 3:10PM ,Rm 4416 ,David St. John ,MCROBIO  233 - General Microbiology,233-AC ,MoWe 8:00AM - 8:50AM ,Rm 3401 ,Albert Reba ,233-DF ,TuTh 11:00AM - 11:50AM ,Rm 3401 ,TBA TBA ,233-FH ,TuTh 2:00PM - 2:50PM ,Rm 3401 ,TBA TBA ,233-HNR ,MoWe 11:00AM - 11:50AM ,Rm 3401 ,Albert Reba ,233-JMW ,MoWe 6:00PM - 6:50PM ,Rm 3401 ,TBA TBA ,233-KTR ,TuTh 6:00PM - 6:50PM ,Rm 3401 ,Albert Reba ,233-MN ,Fr 9:00AM - 10:40AM ,Rm 3401 ,Chafika Boudiaf ,MEDASST  103 - Medical Assisting Clinical Procedures I,103-HK ,Th 5:00PM - 6:50PM ,Rm 4205 ,TBA TBA ,MEDASST  106 - Administrative Procedures,106-GJW ,We 5:00PM - 6:50PM ,Rm 6006 ,Ishak Roaf ,MOR SCI  102 - Microbiology For Embalmers,102-A ,MoWe 8:00AM - 9:15AM ,Rm 4100 ,Deonce Scott ,MOR SCI  103 - Chemistry For Embalmers,103-AC ,MoWe 9:30AM - 10:45AM ,Rm 4100 ,Deonce Scott ,MOR SCI  104 - Pathology For Embalmers,104-B ,TuTh 8:00AM - 9:15AM ,Rm 4100 ,Karen Scott ,MOR SCI  111 - History Of Funeral Service,111-BD ,TuTh 9:30AM - 10:45AM ,Rm 4100 ,Deonce Scott ,MOR SCI  203 - Funeral Directing,203-EG ,MoWe 2:00PM - 3:15PM ,Rm 4100 ,Karen Scott ,MOR SCI  204 - Mortuary And Business Law,204-E ,MoWe 12:30PM - 1:45PM ,Rm 4100 ,Deonce Scott ,MOR SCI  215 - Restorative Art Laboratory,215-DFT ,Tu 11:00AM - 11:50AM ,Rm 4100 ,Lolita Travis ,MOR SCI  216 - Embalming Theory II,216-C ,MoWe 11:00AM - 12:15PM ,Rm 4100 ,Deonce Scott ,MUSIC  101 - Fundamentals of Music Theory,101-D ,TuTh 10:00AM - 11:40AM ,Rm 3201 ,Pok-Hon Yu ,MUSIC  121 - Introduction To Music,121-E ,MoWe 10:00AM - 11:15AM ,Rm 3201 ,Pok-Hon Yu ,121-F ,TuTh 12:30PM - 1:45PM ,Rm 3201 ,Pok-Hon Yu ,121-FH ,TuTh 2:00PM - 3:40PM ,Rm 3201 ,Joy-Denise Moore ,121-JMW2 ,MoWe 6:00PM - 7:40PM ,Rm 3201 ,Cornelius Johnson ,NURSING  101 - Fundamentals Of Nursing,101-FB ,MoWe 9:00AM - 10:50AM ,Rm 6010 ,Nancy Kipnis ,101-FC ,MoWe 11:00AM - 12:50PM ,Rm 5015 ,Maria Preston ,101-FE ,MoWe 12:00PM - 1:50PM ,Rm 6010 ,Imelda Duyungan ,101-FF ,MoWe 5:00PM - 6:50PM ,Rm 6014 ,Roy Carrarini ,101-FG ,MoWe 5:00PM - 6:50PM ,Rm 6010 ,Susan Neal ,NURSING  150 - Nursing Fundamentals I,150-PD ,Tu 9:30AM - 2:30PM ,Rm 5009 ,Jean Burt ,150-PE ,Tu 4:00PM - 8:00PM ,Rm 5009 ,Dawn Wilson ,NURSING  151 - Nursing Fundamentals II,151-PD ,Tu 9:30AM - 2:30PM ,Rm 5009 ,Jean Burt ,151-PE ,Tu 4:00PM - 8:00PM ,Rm 5009 ,Virginia Peer ,NURSING  152 - Nursing Perspectives,152-PD ,Fr 9:30AM - 11:30AM ,Rm 5007 ,Mary Rose Soberano ,152-PE ,We 4:00PM - 6:00PM ,Rm 5007 ,Mary Rose Soberano ,NURSING  210 - Nursing Process in Alterations in Homeostasis I,210-SA ,MoWe 8:00AM - 10:50AM ,Rm 5009 ,Linda Brown-Aldridge ,210-SB ,MoWe 8:00AM - 10:50AM ,Rm 5012 ,Yolanda Harper-Morris ,210-SC ,MoWe 11:00AM - 1:50PM ,Rm 5009 ,Donna Allen ,210-SD ,MoWe 11:00AM - 1:50PM ,Rm 5012 ,Carla Thomas-Russell ,210-SE ,MoWe 5:00PM - 7:50PM ,Rm 5009 ,Loretta Harmon ,210-SF ,MoWe 2:00PM - 4:50PM ,Rm 5012 ,Loretta Harmon ,210-SG ,MoTu 10:00AM - 12:50PM ,Rm 5007 ,Brenda Davis ,210-SH ,MoTu 5:00PM - 7:50PM ,Rm 5007 ,Tammy Scott-Brand ,NURSING  211 - Nursing Process in Alterations in Homeostasis II,211-SA ,MoWe 8:00AM - 10:50AM ,Rm 5009 ,Jennifer Piltawer ,211-SB ,MoWe 8:00AM - 10:50AM ,Rm 5012 ,TBA TBA ,211-SC ,MoWe 11:00AM - 1:50PM ,Rm 5009 ,Debra Wyatt ,211-SD ,MoWe 11:00AM - 1:50PM ,Rm 5012 ,Debra Wyatt ,211-SE ,MoWe 5:00PM - 7:50PM ,Rm 5009 ,Kathy Mensah ,211-SF ,MoWe 2:00PM - 4:50PM ,Rm 5012 ,Jennifer Piltawer ,211-SG ,MoTu 10:00AM - 12:50PM ,Rm 5007 ,Brenda Jones ,211-SH ,MoTu 5:00PM - 7:50PM ,Rm 5007 ,Brenda Jones ,PERDEV 3000 - Buying A Home,3000-BH ,Sa 9:00AM - 4:00PM ,Rm 3205 ,TBA TBA ,PERDEV 3003 - TOEFL Preparation,3003-TEST ,Mo 6:00PM - 8:30PM ,TBA ,Martin Gleason ,PERDEV 3014 - TEAS Prep. Workshop,3014-MAT1 ,Fr 2:00PM - 4:00PM ,TBA ,Karla Jemison ,3014-MATH ,Fr 2:00PM - 4:00PM ,TBA ,Karla Jemison ,3014-SCI ,Sa 10:00AM - 12:00PM ,TBA ,Staff ,3014-SCI1 ,Sa 10:00AM - 12:00PM ,TBA ,Staff ,PHAR TC  102 - Basic Science for Allied Health Personnel,102-BF ,TuTh 8:00AM - 8:50AM ,Rm 6002 ,Frederick Carter ,PHAR TC  103 - Intro To Pharmacy Technology,103-AE ,MoWe 8:00AM - 8:50AM ,Rm 6002 ,Douglas Taylor ,PHAR TC  104 - Pharmaceutical Calculations,104-M ,Fr 9:00AM - 11:30AM ,Rm 6002 ,Frederick Carter ,PHAR TC  201 - Intro To Pharmacy Law,201-M ,Fr 8:00AM - 8:50AM ,Rm 6002 ,Douglas Taylor ,PHIL  105 - Logic,105-LC2 ,MoWe 11:00AM - 12:15PM ,Rm 3310 ,Carole Heath ,PHIL  106 - Introduction To Philosophy,106-KR ,Th 6:00PM - 8:30PM ,Rm 3207 ,William Schmidt ,PHIL  107 - Ethics,107-LC1 ,TuTh 10:00AM - 11:15AM ,Rm 3305 ,Carole Heath ,PHLEB  109 - Phlebotomy Practicum and Seminar I,109-DWL ,MoTuWeTh 3:00PM - 3:50PM ,Rm 4110 ,Cynthia Doby ,109-MDW ,MoTuWeTh 10:00AM - 10:50AM ,Rm 4110 ,Cynthia Doby ,PHLEB  209 - Phlebotomy Practicum and Seminar II,209-GJM ,Mo 5:00PM - 10:00PM ,Rm 4112 ,Susan Rohde ,209-HKT ,Tu 5:10PM - 10:10PM ,Rm 4112 ,Indrajeet Mody ,PHY SCI  101 - General Course Physical Science,101-AC ,MoWe 9:00AM - 10:15AM ,Rm 4401 ,Tomekia Simeon ,101-F ,TuTh 12:30PM - 1:45PM ,Rm 4401 ,Halle Morrison ,PHY SCI  107 - Current Public Issues in Physical Science,107-IHSA ,TuTh 8:00AM - 9:15AM ,Malcolm X College ,TBA TBA ,PHY SCI  111 - General Course I Physical Science,111-EG ,MoWe 1:00PM - 1:50PM ,Rm 4408 ,Robert Wilson ,PHYS ED  110-1 - Fitness,110-D ,TuTh 11:00AM - 11:25AM ,Rm 1204 ,Michael Galvan ,PHYS ED  118-1 - Weight Training,118-AC ,MoWe 9:30AM - 9:55AM ,Rm 1204 ,Michael Galvan ,118-C ,MoWe 11:00AM - 11:25AM ,Rm 1204 ,Michael Galvan ,PHYSICS  131 - Mechanics And Power,131-EG ,MoWe 1:00PM - 1:50PM ,Rm 4403 ,Yangtae Kim ,131-HK ,TuTh 4:30PM - 5:20PM ,Rm 4403 ,Joshua Oladipo ,PHYSICS  221 - Mechanics,221-ACE ,MoWe 8:50AM - 9:40AM ,Rm 4403 ,Joshua Oladipo ,PHYSICS  222 - Electricity,222-DFH ,TuTh 11:40AM - 12:30PM ,Rm 4403 ,Yangtae Kim ,POL SCI  201 - The National Government,201-E ,MoWe 12:30PM - 1:45PM ,Rm 3307 ,Claire Stuart-Quintanilla ,201-F ,TuTh 12:30PM - 1:45PM ,Rm 6002 ,Claire Stuart-Quintanilla ,PPDMED 3205 - CPR Heartsaver AED,3205-AED ,Sa 9:00AM - 5:00PM ,Rm 6014 ,Staff ,3205-AED1 ,Sa 9:00AM - 5:00PM ,TBA ,Staff ,PROFDEV 4003 - Pediatric First Aid,4003-PFA ,Sa 9:00AM - 5:00PM ,Rm 7005 ,Staff ,4003-PFA1 ,Sa 9:00AM - 5:00PM ,TBA ,Staff ,PROFDEV 4037 - CPR Instructor Course,4037-CIC ,Sa 9:00AM - 5:00PM ,Rm 7006 ,Anthony Scipione ,PROFDEV 4039 - CPR Instructor Recertification,4039-CIR ,Sa 9:00AM - 5:00PM ,Rm 7005 ,Brian Berkowitz ,PROFDEV 4041 - Substance Abuse Counseling,4041-SA ,Sa 9:00AM - 12:30PM ,Rm 3204 ,Staff ,PROFDEV 4072 - CPR for Healthcare Providers,4072-CPR1 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR2 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR3 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR4 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR5 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR6 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR8 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR9 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,PROFDEV 4088 - Food Service Sanitation Manager Course ,4088-FSS1 ,FrSa 10:00AM - 4:00PM ,Rm 3200 ,Lee Jamison ,4088-FSS2 ,FrSa 10:00AM - 4:00PM ,TBA ,Calvin Muhammad ,4088-FSS3 ,FrSa 11:00AM - 4:00PM ,TBA ,Calvin Muhammad ,4088-FSS4 ,FrSa 11:00AM - 4:00PM ,TBA ,Calvin Muhammad ,PROFDEV 4091 - CNA Refresher,4091-CNAR ,FrSa 10:00AM - 2:00PM ,Rm 4304 ,Staff ,PROFDEV 4092 - Business Plan,4092-BP ,We 6:00PM - 8:00PM ,TBA ,Staff ,PROFDEV 4118 - Surgical Pharmacology Review,4118-SP ,Mo 9:00AM - 11:40AM ,Rm 7010 ,Staff ,PSYCH  201 - General Psychology,201-C ,MoWe 10:00AM - 11:15AM ,Rm 4415 ,Ovidiu Dobria ,201-D ,TuTh 10:00AM - 11:15AM ,Rm 4415 ,Ovidiu Dobria ,201-G ,MoWe 3:30PM - 4:45PM ,Rm 4415 ,Patrick Taitt ,201-HNR ,TuTh 12:30PM - 1:45PM ,Rm 3402 ,Ovidiu Dobria ,201-JM ,Mo 6:00PM - 9:20PM ,Rm 4415 ,Athena Porter ,201-KT ,Tu 6:00PM - 8:30PM ,Rm 4415 ,Charles Brown ,201-Q ,Sa 9:00AM - 12:20PM ,Rm 4415 ,Courtney Bell ,PSYCH  207 - Child Psychology,207-KR ,Th 6:00PM - 8:30PM ,Rm 4415 ,Shawnte Jenkins ,PSYCH  213 - Abnormal Psychology,213-E ,MoWe 12:30PM - 1:45PM ,Rm 4415 ,Ovidiu Dobria ,RADIOGR  101 - Intro To Radiation Sciences,101-AC ,Mo 9:00AM - 9:50AM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  102 - Attitudes In Patient Care,102-EM ,Mo 1:00PM - 2:40PM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  115 - Basic Prins Of Image Produc,115-ACM ,We 8:00AM - 9:40AM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  124 - Intro To Patient Care,124-EG ,We 1:00PM - 1:50PM ,Rm 6011 ,Michael White ,RADIOGR  205 - Applied Radiographic Techniques,205-BDR ,Tu 8:00AM - 9:40AM ,Rm 6011 ,Michael White ,205-DF ,TuTh 10:00AM - 10:50AM ,Rm 6005 ,Dandcee Saengchanh ,RADIOGR  208 - Radiobiology,208-B ,TuTh 8:00AM - 8:50AM ,Rm 6005 ,TBA TBA ,RADIOGR  232 - Radiographic Procedures II,232-FH ,TuTh 1:00PM - 2:20PM ,Rm 6005 ,Dandcee Saengchanh ,RADIOGR  233 - Radiographic Procedures III,233-EG ,Th 8:00AM - 10:50AM ,Rm 6011 ,Stephanie Tarr ,RADIOGR  234 - Special Radiographic Procedure,234-FHT ,Tu 1:00PM - 1:50PM ,Rm 6011 ,Michael White ,RADIOGR  242 - Radiography Clinical Ed II,242-AG ,MoWeFr 8:00AM - 8:17AM ,Malcolm X College ,TBA TBA ,RADIOGR  243 - Radiography Clinical Education III,243-AG ,MoWeFr 8:00AM - 8:17AM ,Malcolm X College ,TBA TBA ,READING   99-1 - Developmental Reading Skills I,99-A ,MoWe 8:00AM - 9:40AM ,Rm 3300 ,Eric Brown ,99-B ,TuTh 8:00AM - 9:15AM ,Rm 3203 ,Eric Brown ,99-C ,MoWe 10:00AM - 11:15AM ,Rm 3300 ,Sakeena Khan ,99-D ,TuTh 10:00AM - 11:15AM ,Rm 3300 ,Melloney Beck ,99-F ,TuTh 12:30PM - 1:45PM ,Rm 3300 ,Melloney Beck ,99-H ,TuTh 3:30PM - 4:45PM ,Rm 3206 ,Sakeena Khan ,99-JMW ,MoWe 6:00PM - 7:40PM ,Rm 3300 ,Cheryl White ,99-KTR ,TuTh 6:00PM - 7:15PM ,Rm 3300 ,Carla Holston ,READING  125 - Developmental Reading Skills II,125-A ,MoWe 8:00AM - 9:15AM ,Rm 3206 ,Janet Henderson ,125-B ,TuTh 8:00AM - 9:15AM ,Rm 3300 ,Melloney Beck ,125-C ,MoWe 10:00AM - 11:15AM ,Rm 3200 ,Eric Brown ,125-D ,TuTh 10:00AM - 11:15AM ,Rm 3311 ,Sakeena Khan ,125-E ,MoWe 12:30PM - 1:45PM ,Rm 3300 ,Sakeena Khan ,125-F ,TuTh 12:30PM - 1:45PM ,Rm 3200 ,Sakeena Khan ,125-G ,MoWe 3:30PM - 4:45PM ,Rm 3300 ,Melloney Beck ,125-HK ,TuTh 3:30PM - 5:10PM ,Rm 3302 ,Carla Holston ,125-JMW ,MoWe 6:00PM - 7:15PM ,Rm 3206 ,Melloney Beck ,125-KTR ,TuTh 6:00PM - 7:40PM ,Rm 3200 ,Tonia Humphrey ,RESP TC  114 - Basic Respiratory Care,114-AD ,Mo 9:00AM - 11:30AM ,Rm 6009 ,Pamela Nugent ,RESP TC  115 - Cardiopulmonary,115-AC ,We 9:30AM - 12:00PM ,Rm 6009 ,Jane Reynolds ,RESP TC  116 - Patient Assessment,116-FR ,Th 1:00PM - 2:40PM ,Rm 6009 ,George West ,RESP TC  117 - Respiratory Pharmacology,117-AW ,We 8:30AM - 9:20AM ,Rm 6009 ,Jane Reynolds ,RESP TC  118 - Respiratory,118-BDR ,Th 9:00AM - 9:50AM ,Rm 6009 ,Pamela Nugent ,RESP TC  225 - Age Specific Care,225-ACW ,We 8:00AM - 9:40AM ,Rm 4112 ,Pamela Nugent ,RESP TC  227 - Critical Care Services,227-ACM ,Mo 8:00AM - 10:30AM ,Rm 4112 ,Jane Reynolds ,SENIORS 5010 - Introduction to Microsoft Excel,5010-EX ,Sa 9:00AM - 11:00AM ,TBA ,TBA TBA ,5010-EX1 ,Sa 9:00AM - 11:00AM ,TBA ,TBA TBA ,SENIORS 5011 - Introduction to Microsoft Word,5011-WOR ,Sa 9:00AM - 11:00AM ,TBA ,TBA TBA ,5011-WOR1 ,Sa 9:00AM - 11:00AM ,TBA ,TBA TBA ,SOC  201 - Intro To the Study Of Society,201-B ,TuTh 8:00AM - 9:15AM ,Rm 3207 ,Gail Grabczynski ,201-C ,MoWe 10:00AM - 11:15AM ,Rm 1103 ,Michael Mathis ,201-FH ,TuTh 2:00PM - 3:15PM ,Rm 3207 ,Gail Grabczynski ,201-GJ ,MoWe 4:00PM - 5:40PM ,Rm 3207 ,Michael Mathis ,201-HNR ,TuTh 2:00PM - 3:15PM ,Rm 3402 ,Abra Johnson ,SOC  203 - Marriage And The Family,203-EG ,MoWe 2:00PM - 3:15PM ,Rm 3207 ,Abra Johnson ,SOC  205 - Social Problems,205-KR ,Th 6:00PM - 8:30PM ,Rm 4414 ,Abra Johnson ,SOC SCI  101 - General Course I Social Science,101-FH ,TuTh 2:00PM - 3:15PM ,Rm 3205 ,Claire Stuart-Quintanilla ,101-JW2 ,We 6:00PM - 9:00PM ,Rm 3207 ,Gail Grabczynski ,101-M ,Fr 9:30AM - 12:00PM ,Rm 3207 ,Claire Stuart-Quintanilla ,101-P ,Sa 9:00AM - 12:20PM ,Rm 3207 ,Shanita Straw ,SOC SCI  102 - General Course II Social Science,102-AC ,MoWe 10:00AM - 11:15AM ,Rm 3207 ,Claire Stuart-Quintanilla ,SPANISH  101 - First Course Spanish,101-CRNE ,MoWe 11:00AM - 12:40PM ,Malcolm X College ,TBA TBA ,101-F ,TuTh 12:30PM - 2:10PM ,Rm 2201 ,Maria Muralles-Ball ,101-HNR ,TuTh 9:00AM - 10:40AM ,Rm 3402 ,Maria Muralles-Ball ,101-IHSA ,MoWe 10:00AM - 11:40AM ,Malcolm X College ,TBA TBA ,101-KTR ,TuTh 6:00PM - 7:40PM ,Rm 6005 ,Jorge Garcia ,101-LC3 ,MoWe 9:00AM - 10:40AM ,Rm 3402 ,Maria Muralles-Ball ,101-MC1 ,MoWe 12:00PM - 1:40PM ,Malcolm X College ,TBA TBA ,SPANISH  102 - Second Course Spanish,102-C2 ,MoWe 11:00AM - 1:10PM ,Rm 3405 ,Maria Muralles-Ball ,SPEECH  101-1 - Fundamentals of Speech Communication,101-B ,TuTh 8:00AM - 9:15AM ,Rm 3206 ,Regina Walton ,101-C ,MoWe 10:00AM - 11:15AM ,Rm 3304 ,Victoria Nabors ,101-D ,TuTh 10:00AM - 11:15AM ,Rm 3304 ,Victoria Nabors ,101-E ,MoWe 12:30PM - 1:45PM ,Rm 3304 ,Victoria Nabors ,101-F ,TuTh 12:30PM - 1:45PM ,Rm 3304 ,Victoria Nabors ,101-G ,MoWe 2:00PM - 3:15PM ,Rm 3304 ,Linnea Forsberg ,101-GJ ,MoWe 4:00PM - 5:15PM ,Rm 3304 ,Victoria Nabors ,101-H ,TuTh 2:00PM - 3:15PM ,Rm 3304 ,Victoria Nabors ,101-HK ,TuTh 4:00PM - 5:15PM ,Rm 3304 ,Linnea Forsberg ,101-HNR ,MoWe 8:00AM - 9:15AM ,Rm 3304 ,Maria Kossakowski ,101-JW ,We 6:00PM - 8:30PM ,Rm 3304 ,Carla Roberson ,101-KTR ,TuTh 6:00PM - 7:15PM ,Rm 3304 ,Carla Roberson ,101-P ,Sa 9:00AM - 11:30AM ,Rm 3304 ,Carla Roberson ,STHLTH  158 - EKG Technician,158-H ,MoWe 3:15PM - 4:55PM ,Rm 6005 ,Ishak Roaf ,STHLTH  624 - Fundamentals Nurse Asst Per,624-BA ,MoWeTh 8:00AM - 3:00PM ,Rm 4304 ,Denise Hong ,624-BC ,MoTuTh 8:00AM - 3:00PM ,Rm 7004 ,Devoria Williams ,624-BD ,MoTuWe 8:00AM - 3:00PM ,Rm 4310 ,Carolyn Alford ,624-BE ,TuWeTh 3:30PM - 10:00PM ,Rm 4304 ,Defrances Higgs ,624-CA ,MoWeTh 8:00AM - 3:00PM ,Rm 4304 ,Denise Hong ,624-CB ,MoTuTh 8:00AM - 3:00PM ,Rm 4106 ,TBA TBA ,624-CC ,MoTuTh 8:00AM - 3:00PM ,Rm 7004 ,Eve Packer ,624-CD ,TuWeTh 8:00AM - 3:00PM ,Rm 4310 ,Carolyn Alford ,624-CE ,TuWeTh 3:30PM - 10:00PM ,Rm 4304 ,Defrances Higgs ,624-WA ,TuWeTh 3:30PM - 10:00PM ,MX Bldg 2 - Rm 102 ,Felicia Newton ,624-WB ,MoWeTh 8:00AM - 3:00PM ,MX Bldg 2 - Rm 102 ,Lorita Collins ,624-WC ,TuWeTh 3:30PM - 10:00PM ,MX Bldg 2 - Rm 102 ,Felicia Newton ,624-WD ,MoWeTh 8:00AM - 3:00PM ,MX Bldg 2 - Rm 102 ,Lorita Collins ,SURG TC  111 - Intro To Surgical Technology,111-AE ,Mo 8:00AM - 10:30AM ,Rm 4104 ,Dora Wood ,SURG TC  112 - Preparation For Surgery,112-AF ,Tu 8:00AM - 10:30AM ,Rm 4104 ,TBA TBA ,SURG TC  113 - Special Patient Care,113-AD ,Th 8:00AM - 10:30AM ,Rm 4104 ,TBA TBA ,THR ART  131 - Intro To Theater,131-C ,MoWe 10:00AM - 11:15AM ,Rm 6005 ,Linnea Forsberg ,131-FH ,TuTh 2:00PM - 3:40PM ,Rm 3203 ,Regina Walton ,THR ART  133 - Acting I,133-F ,TuTh 12:30PM - 1:45PM ,Rm 1104 ,Linnea Forsberg ,133-MXBC ,Sa 9:00AM - 10:50AM ,Rm 4206 ,Brenda Amoakon ,133-MXCS ,Sa 1:00PM - 2:50PM ,Rm 4206 ,Brenda Amoakon ,133-MXIC ,Sa 11:00AM - 12:50PM ,Rm 4206 ,Brenda Amoakon ,133-MWH2 ,TuTh 12:00PM - 1:30PM ,MX Bldg 2 - Rm 131 ,Salvador Ramirez ,133-MXH2 ,MoWe 12:00PM - 1:30PM ,Rm 4206 ,Salvador Ramirez';

  var subjects = subjects || undefined;
  // console.log('subjects: ', subjects);
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
      } else {
        // console.log('class subject found in subjects: ', classstring[i]);
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
      var dayText = row.getElementsByClassName('days')[0].textContent;
  } catch(e) {
    console.log(row);
  }

    if ((prevDay && prevDay !== dayText)) {
      // oneDay.sort(sortByDays());
      oneDay.sort(sortByTime());
      // console.log('prevDay: ', prevDay);
      // console.log('dayText: ', dayText);
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

  // console.log('all done! Also, ultimateSorted: ', ultimateSorted);
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
        subjects.push(form.elements[i].id.replace('_', ' '));
      }
    }
    rows = tableForBuddies(undefined, subjects);
    dayChooser.style.display = 'block';
  });

  window.addEventListener("message", function(e) {
    window.opener.postMessage(true, '*');
    console.log('e: ', e);
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
