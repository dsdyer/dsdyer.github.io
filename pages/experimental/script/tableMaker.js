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
    console.log('before: ', atext, btext);

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
    console.log('after: ', atext, btext);
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

  var data = data || 'ABE GED  811 - GED Reading Adv Level Sp,811-MXPS ,MoTuWeTh 9:00AM - 10:20AM ,Rm 4200 ,Juan Gutierrez ,ABE GED  830 - GED Math Advance Lvl Sp,830-MXAX ,MoTuWeTh 7:00PM - 8:20PM ,Rm 4200 ,Macario Valdovinos ,ABE GED  831 - GED Math Advance Lvl Sp,831-MXSP ,MoTuWeTh 10:30AM - 11:50AM ,Rm 4200 ,Juan Gutierrez ,ABE GED  850 - GED Writing Adv Level Sp,850-MXAW ,MoTuWeTh 5:30PM - 6:50PM ,Rm 4200 ,Macario Valdovinos ,ABE GED  890 - Basic Skill Gen Adv Level,890-MXLA ,TuTh 9:00AM - 12:50PM ,Rm 4305 ,Nikita Bryant ,ABE GED  891 - Basic Skill Gen Adv Level,891-MXMA ,MoWe 9:00AM - 12:50PM ,Rm 4305 ,Salvador Ramirez ,ABE GED 1220 - ABE Bas Skls Gen Beg Level,1220-MXAA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4201 ,Colleen Ogle ,ABE GED 1221 - ABE Bas Skls Gen Beg Level,1221-MX02 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4201 ,James McArthur ,ABE GED 1240 - ABE Basic Skl Gen Beg Level,1240-MXNB ,Sa 9:00AM - 12:50PM ,Rm 4305 ,Robert Wilson ,ABE GED 1420 - Basic Skills Gen Int Level,1420-MXAG ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4303 ,Mary Holmes ,1420-MXAI ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,1420-MXAJ ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4303 ,Barbara Moore ,1420-MXAK ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4303 ,Jeff Schecter ,ABE GED 1421 - Basic Skills Gen Int Level,1421-MX05 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4309 ,Linda Flannigan ,1421-MX07 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4309 ,Linda Flannigan ,1421-MX10 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4309 ,Darlene Boyd ,1421-MX11 ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4309 ,Darlene Boyd ,1421-MXC3 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4205 ,Brenda Amoakon ,ABE GED 1440 - Basic Skills Gen Int Level,1440-MXJS ,Sa 9:00AM - 12:50PM ,Rm 4300 ,Jeff Schecter ,ABE GED 1620 - ABE Bas Skl Gen Int Level,1620-MXBA ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4300 ,Trudy Moore ,1620-MXBB ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4300 ,Trudy Moore ,1620-MXBD ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4305 ,David Liddell ,1620-MXH2 ,TuTh 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,1620-MXST ,TuTh 9:00AM - 12:50PM ,Spencer Technology Academy ,Wayne Arnold ,ABE GED 1621 - ABE Basic Skl Gen Int Level,1621-MX14 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4204 ,Herman Buckner ,1621-MX15 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4204 ,Herman Buckner ,1621-MX18 ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4204 ,Ivy Ellis ,1621-MXH1 ,MoWe 9:00AM - 12:50PM ,Westside Health Authority ,Barbara Moore ,1621-MXTS ,MoWe 9:00AM - 12:50PM ,Spencer Technology Academy ,Francine Johnson ,ABE GED 1640 - ABE Basic Skl Gen Int Level,1640-MXEK ,Sa 9:00AM - 12:50PM ,Rm 4303 ,Mary Holmes ,ABE GED 1810 - Low Adv GED Gen Stu Sp,1810-MXJ1 ,MoTuWeTh 12:00PM - 12:50PM ,Rm 4200 ,Juan Gutierrez ,1810-MXSP ,MoTuWeTh 8:30PM - 9:20PM ,Rm 4200 ,Macario Valdovinos ,ABE GED 1820 - Basic Skills Gen Adv Level,1820-MXBF ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4207 ,Barbara Richey ,1820-MXBG ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4207 ,Barbara Richey ,1820-MXBH ,MoTuWeTh 5:30PM - 7:20PM ,Rm 4300 ,Nathaniel Phillips ,ABE GED 1821 - Basic Skills Gen Adv Level,1821-MX19 ,MoTuWeTh 9:00AM - 10:50AM ,Rm 4205 ,Alandria Jones ,1821-MX21 ,MoTuWeTh 3:30PM - 5:20PM ,Rm 4205 ,Alandria Jones ,ABE GED 1830 - Low Adv GED,1830-MXSP ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4200 ,Juan Gutierrez ,ABE GED 1840 - Basic Skills Gen Adv Level,1840-MXAT ,Sa 9:00AM - 12:50PM ,Rm 4306 ,Monica Murray ,ABE GED 1841 - Basic Skills Gen Adv Level,1841-MXDH ,Sa 9:00AM - 12:50PM ,Rm 4309 ,Darius Holmes ,ABE GED 1920 - GED Basic Skls High Adv Lev,1920-MXBJ ,MoTuWeTh 7:30PM - 9:20PM ,Rm 4300 ,Nathaniel Phillips ,1920-MXBK ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4207 ,Barbara Richey ,ABE GED 1921 - GED Basic Skls High Adv Lev,1921-MX20 ,MoTuWeTh 11:00AM - 12:50PM ,Rm 4205 ,Alandria Jones ,AFRO AM  101 - Introduction to African,101-MC1 ,TuWeTh 8:30AM - 1:30PM ,Malcolm X College ,TBA TBA ,ART  103 - Art Appreciation,103-INF1 ,TuWeTh 12:30PM - 4:00PM ,Malcolm X College ,Tonya Hart ,103-MC1 ,TuWeTh 8:30AM - 1:30PM ,Malcolm X College ,TBA TBA ,BIOLOGY  107 - Nutrition,107-EN ,MoWe 2:00PM - 4:40PM ,Rm 3414 ,Maxwell Sanei ,107-INF1 ,TuWeTh 12:30PM - 4:00PM ,Malcolm X College ,TBA TBA ,107-KTR ,TuTh 6:00PM - 8:40PM ,Rm 3414 ,Imran Khan ,BIOLOGY  114 - General Education Biology,114-AB ,TuWeTh 9:00AM - 10:50AM ,Rm 3408 ,Tracie Hudson ,BIOLOGY  116 - Anatomy And Physiology,116-EFH ,TuWeTh 12:50PM - 2:40PM ,Rm 3405 ,Jack Taha ,116-GHK ,TuWeTh 5:10PM - 7:00PM ,Rm 3405 ,Khaja Ahmad ,BIOLOGY  120 - Terminology For Medical Careers,120-AC ,MoWe 8:00AM - 10:40AM ,Rm 3414 ,Maxwell Sanei ,120-DF ,TuTh 11:00AM - 1:40PM ,Rm 3414 ,Mashouf Shaykh ,120-JMW ,MoWe 6:00PM - 8:40PM ,Rm 3414 ,Imran Khan ,BIOLOGY  121 - Biology I,121-AB ,TuWeTh 8:30AM - 10:50AM ,Rm 3403 ,Chiju Huang ,121-FH ,TuWeTh 1:00PM - 2:50PM ,Rm 3403 ,Peter Grudzien ,121-FH1 ,TuWeTh 1:00PM - 2:50PM ,Rm 3401 ,Fabio Pibiri ,121-JK ,TuWeTh 5:00PM - 6:20PM ,Rm 3403 ,Mirmonsef Paria ,BIOLOGY  130 - Human Cadaver Anatomy I,130-BR ,Th 1:00PM - 2:20PM ,Rm 3402 ,Avni Thaci ,BIOLOGY  131 - Human Cadaver Anatomy II,131-BT ,Tu 1:00PM - 2:20PM ,Rm 3402 ,Sheila Wicks ,BIOLOGY  226 - Human Structure and Function I,226-AB ,TuWeTh 8:30AM - 10:20AM ,Rm 3407 ,Avni Thaci ,226-CD ,TuWeTh 10:40AM - 12:30PM ,Rm 3405 ,Saleel Raut ,226-GH ,TuWeTh 3:00PM - 4:50PM ,Rm 3405 ,Ezimako Paul ,BIOLOGY  227 - Human Structure and Function II,227-AB ,TuWeTh 8:30AM - 10:20AM ,Rm 3411 ,Sheila Wicks ,227-CD ,TuWeTh 10:40AM - 12:30PM ,Rm 3416 ,Emilio Carrasco ,227-GH ,TuWeTh 4:20PM - 6:10PM ,Rm 3416 ,Tomer Kanan ,227-MXH2 ,TuTh 9:00AM - 12:50PM ,Rm 4305 ,Nikita Bryant ,227-MXH1 ,MoWe 9:00AM - 11:50AM ,Rm 4305 ,Salvador Ramirez ,227-MXH4 ,MoWe 12:00PM - 1:50PM ,Rm 4305 ,Salvador Ramirez ,BUSINES  111 - Introduction To Business,111-MC1 ,TuWeTh 8:30AM - 1:30PM ,Malcolm X College ,TBA TBA ,CHEM  121 - Basic Chemistry I,121-AB ,TuWeTh 8:00AM - 9:30AM ,Rm 4411 ,Talha Abubakr ,121-EF ,MoTuWe 1:00PM - 2:20PM ,Rm 4411 ,Halle Morrison ,CHEM  201 - General Chemistry I,201-AB ,MoTuWe 8:00AM - 10:20AM ,Rm 4407 ,Neil Miranda ,CHEM  203 - General Chemistry II,203-AB ,MoTuWe 8:00AM - 10:20AM ,Rm 4416 ,Gitendra Paul ,CHLD DV  101-1 - Human Growth ,101-DF ,TuTh 10:00AM - 1:20PM ,Rm 1314 ,Mary Lane ,CHLD DV  109 - Language ,109-CE ,MoWe 10:00AM - 12:40PM ,Rm 1314 ,Mary Lane ,CIS  120 - Intro to Microcomputers,120-AC ,MoWe 9:00AM - 11:40AM ,Rm 6001 ,Kayode Jowosimi ,120-KTR ,TuTh 6:00PM - 8:40PM ,Rm 6001 ,Kent Latimore ,DENTHYG  112 - Concepts of Preventive Therapy I,112-DH1 ,Tu 9:00AM - 12:50PM ,Rm 4112 ,Maria Prassas ,DENTHYG  200 - Summer Clinic,200-DH1 ,We 8:00AM - 9:50AM ,Rm 4112 ,Gerry Halligan ,DENTHYG  202 - Critique of Dental Literature,202-DH1 ,Mo 10:00AM - 12:00PM ,Rm 4112 ,Maria Prassas ,EMT  101 - Emergency Medical Technician,101-AE ,MoWeFr 9:00AM - 12:20PM ,Rm 7005 ,Robert Caron ,EMT  227-1 - Paramedic Medicine Field Internship,227-AE ,MoWeFr 9:30AM - 10:40AM ,Rm 6009 ,Patrick Mroczek ,227-E ,MoWeFr 11:30AM - 12:40PM ,Rm 6009 ,Margaret Murphy ,ENGLISH   98 - Composition,98-AC ,MoWe 8:00AM - 10:40AM ,Rm 3305 ,Sola Isabell-Lay ,98-DF ,TuTh 11:00AM - 1:40PM ,Rm 3305 ,Andrew Ball ,ENGLISH  100 - Basic Writing Skills,100-ALP ,TuTh 11:00AM - 1:40PM ,Rm 3301 ,Shannon Wood ,100-BD ,TuTh 8:00AM - 10:40AM ,Rm 3305 ,Carleta Alston ,100-CE ,MoWe 11:00AM - 1:40PM ,Rm 3305 ,Aletha Osborne ,ENGLISH  101 - Composition,101-ALP ,TuTh 8:00AM - 10:40AM ,Rm 3301 ,Shannon Wood ,101-CE ,MoWe 11:00AM - 1:40PM ,Rm 3203 ,Carleta Alston ,101-KTR ,TuTh 6:00PM - 8:40PM ,Rm 3305 ,Rachel Slotnick ,ENGLISH  102 - Composition,102-CE ,MoWe 11:00AM - 1:40PM ,Rm 3301 ,Gregory Nault ,ESL  360 - ESL Basic Skl Gen Int Lvl,360-MXAC ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4301 ,Antonio Cortes ,360-MXED ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4306 ,Alberto Avalos ,ESL  380 - ESL Accelerated Level 3,380-MXEC ,Sa 9:00AM - 12:50PM ,Rm 4302 ,Iwona Lippert-Szepan ,ESL  460 - ESL Basic Skl Gen Int Lvl,460-MX52 ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4306 ,Jeffrey Nofziger ,ESL  470 - ESL Basic Skl Gen Int Lvl,470-MXCP ,MoTuWeTh 1:30PM - 3:20PM ,Rm 4301 ,Trudy Moore ,ESL  560 - ESL Basic Skl Gen Int Lvl,560-MXE1 ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4302 ,Agustin Leal ,560-MXEJ ,MoTuWeTh 9:00AM - 12:50PM ,Rm 4302 ,Aleksandr Zvodinsky ,ESL  580 - ESL Accelerated Level 5,580-MXEL ,Sa 9:00AM - 12:50PM ,Rm 4203 ,Vasanta Doss ,ESL  760 - ESL Basic Skl Gen Adv Lvl,760-MXEM ,MoTuWeTh 5:30PM - 9:20PM ,Rm 4203 ,Nader Shalabi ,ESL  770 - ESL Basic Skl Gen Adv Level,770-MX33 ,MoWe 9:00AM - 12:50PM ,Rm 4203 ,Timothy McLaughlin ,ESL  771 - ESL Basic Skl Gen Adv Lvl,771-MX34 ,TuTh 9:00AM - 12:50PM ,Rm 4203 ,Angela Holman ,ESSS  102 - Personal Exercise Trainer Practicum,102-P ,Tu 10:00AM - 12:20PM ,Rm 2201 ,Robyn Becker ,FIN ART  104 - The World Of The Cinema,104-EG ,MoWe 12:00PM - 2:40PM ,Rm 3207 ,Khadi King ,FIREMGT  201 - Fire Service Hydraulics,201-HK ,TuTh 4:00PM - 6:50PM ,Rm 7005 ,GARY BROOKS ,HEAPRO  102 - Health Career Studies,102-BD ,TuTh 9:00AM - 11:40AM ,Rm 4105 ,Hang Jung Kim ,102-CPS ,MoWe 9:00AM - 11:40AM ,Rm 6002 ,Deonce Scott ,HIM  201 - Clinical Pathophysiology,201-FH ,TuTh 12:30PM - 3:10PM ,Rm 4103 ,Hanna Wierzchowski ,HIM  205 - Health Information Management Seminar I,205-H ,TuTh 3:40PM - 4:30PM ,Rm 4103 ,Hanna Wierzchowski ,HISTORY  111 - History of American People To 1865,111-KTR ,TuTh 6:00PM - 8:40PM ,Rm 4415 ,Curtis Keyes ,HUM  212 - Non,212-DF ,TuTh 12:00PM - 2:40PM ,Rm 3207 ,Khadi King ,INTDSP  101 - College Success Seminar,101-AC ,MoWe 8:00AM - 10:40AM ,Rm 3201 ,Adetokunbo Fatoke ,101-DF ,TuTh 11:00AM - 1:40PM ,Rm 3201 ,Lewis Rule ,101-GTWY ,Fr 9:00AM - 1:00PM ,Rm 4207 ,TBA TBA ,101-KTR ,TuTh 6:00PM - 8:40PM ,Rm 3201 ,Maria Muralles-Ball ,INTDSP  299-1 - Interdisciplinary Study and Service,299-EW ,We 12:30PM - 1:30PM ,Malcolm X College ,Chiju Huang ,LEVELUP 2803 - Level Up,2803-ENG1 ,MoTuWeTh 9:00AM - 12:00PM ,Rm 6005 ,Maria Palazzolo ,2803-ENG3 ,MoTuWeTh 1:00PM - 4:00PM ,Rm 6005 ,Kayley Steuber ,2803-ENL2 ,MoTuWeTh 9:00AM - 12:00PM ,Rm 6005 ,Staff ,2803-MAT1 ,MoTuWeTh 9:00AM - 12:00PM ,Rm 6014 ,William Dennis ,2803-MAT2 ,MoTuWeTh 9:00AM - 12:00PM ,Rm 6014 ,William Dennis ,2803-MAT3 ,MoTuWeTh 1:00PM - 4:00PM ,Rm 6014 ,Karla Jemison ,2803-SSB ,TuWeTh 9:00AM - 12:00PM\nMo 9:00AM - 12:00PM ,Rm 3402\nRm 3403 ,Reagan DeFlorio\nReagan DeFlorio ,2803-SSE ,MoTuWeTh 9:00AM - 12:00PM ,Rm 4402 ,Maria Palazzolo ,2803-SSM ,MoTuWeTh 9:00AM - 12:00PM ,Rm 3306 ,Codjo Padonou ,2803-SSS ,MoTuWeTh 9:00AM - 12:00PM ,Rm 4103 ,Staff ,MATH   98 - Beginning Algebra with Geometry,98-AC ,MoWe 9:00AM - 12:40PM ,Rm 3307 ,Mary Sheppard ,98-EG ,MoWe 2:00PM - 5:40PM ,Rm 3307 ,Mary Sheppard ,98-JMW ,MoWe 6:00PM - 9:40PM ,Rm 3307 ,Shahid Muhammad ,MATH   99 - Intermediate Algebra with Geometry,99-BD ,TuTh 8:00AM - 12:30PM ,Rm 3308 ,Brandie Windham ,99-DF ,TuTh 9:00AM - 1:30PM ,Rm 3311 ,Opal Jones ,99-EG ,MoWe 12:30PM - 5:00PM ,Rm 3308 ,Codjo Padonou ,MATH  118 - General Education Math,118-AC ,MoWe 9:00AM - 12:40PM ,Rm 3309 ,Hope Essien ,118-FH ,TuTh 2:00PM - 5:40PM ,Rm 3307 ,Nneka Anigbogu ,118-GJ ,MoWe 5:00PM - 8:40PM ,Rm 3311 ,Alison Mastny ,MATH  125-1 - Introductory Statistics,125-BF ,TuTh 9:00AM - 12:40PM ,Rm 3307 ,Nneka Anigbogu ,125-EG ,MoWe 2:00PM - 5:40PM ,Rm 3309 ,David St. John ,MATH  140 - College Algebra,140-AC ,MoWe 9:00AM - 12:40PM ,Rm 3310 ,Ruth Mortha ,MCROBIO  233 - General Microbiology,233-AB ,TuWeTh 8:30AM - 10:50AM ,Rm 3401 ,Feridoon Najmabadi ,233-GH ,TuWeTh 5:00PM - 7:10PM ,Rm 3401 ,Albert Reba ,PERDEV 3000 - Buying A Home,3000-BH ,Sa 9:00AM - 4:00PM ,Rm 3205 ,TBA TBA ,PERDEV 3001 - Saturday Academy Program,3001-COMP ,Sa 9:00AM - 12:00PM ,Malcolm X College ,Daniel Forbes ,3001-MATH ,Sa 9:00AM - 12:00PM ,Malcolm X College ,Karla Jemison ,3001-MATM ,Sa 1:00PM - 3:00PM ,Malcolm X College ,Karla Jemison ,PHAR TC  204 - Clinical Practicum I,204-AE ,Fr 8:00AM - 11:20AM ,Rm 6002 ,Douglas Taylor ,PHAR TC  205 - Clinical Practicum II,205-AE ,Fr 11:30AM - 2:50PM ,Rm 6002 ,Matilda Agyakye ,PHY SCI  101 - General Course Physical Science,101-DF ,TuTh 11:00AM - 1:40PM ,Rm 4401 ,Robert Wilson ,PHYSICS  131 - Mechanics And Power,131-EF ,TuWe 1:00PM - 3:00PM ,Rm 4403 ,Yangtae Kim ,PHYSICS  221 - Mechanics,221-AB ,MoTuWe 8:00AM - 10:20AM ,Rm 4403 ,Joshua Oladipo ,PPDMED 3205 - CPR Heartsaver AED,3205-AED1 ,Sa 9:00AM - 5:00PM ,Rm 7006 ,Staff ,PROFDEV 4003 - Pediatric First Aid,4003-PFA1 ,Sa 9:00AM - 5:00PM ,Rm 7005 ,Staff ,4003-PFA2 ,Sa 9:00AM - 5:00PM ,Rm 7005 ,Staff ,PROFDEV 4072 - CPR for Healthcare Providers,4072-CPR1 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR2 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR3 ,Sa 9:00AM - 2:30PM ,Rm 7005 ,Anthony Scipione ,4072-CPR4 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR5 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,4072-CPR6 ,Sa 9:00AM - 2:30PM ,Rm 7006 ,Anthony Scipione ,PROFDEV 4088 - Food Service Sanitation Manager Course ,4088-FSS1 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Calvin Muhammad ,4088-FSS2 ,FrSa 11:00AM - 5:00PM ,Rm 3200 ,Calvin Muhammad ,PROFDEV 4091 - CNA Refresher,4091-CR ,FrSa 10:00AM - 2:00PM ,Rm 4304 ,Staff ,PSYCH  201 - General Psychology,201-CE ,MoWe 11:00AM - 1:40PM ,Rm 4415 ,Charles Brown ,201-KTR ,TuTh 6:00PM - 8:40PM ,Rm 4414 ,Patrick Taitt ,RADIOGR  242 - Radiography Clinical Ed II,242-AN ,MoTuWeThFr 8:00AM - 8:20AM ,Rm 6011 ,Michael White ,READING   99-1 - Developmental Reading Skills I,99-BD ,TuTh 8:00AM - 10:40AM ,Rm 3203 ,Melloney Beck ,99-CE ,MoWe 11:00AM - 1:40PM ,Rm 3200 ,Victoria Nabors ,READING  125 - Developmental Reading Skills II,125-AC ,MoWe 8:00AM - 10:40AM ,Rm 3200 ,Carla Holston ,125-DF ,TuTh 11:00AM - 1:40PM ,Rm 3300 ,Melloney Beck ,RESP TC  146 - Ventilatory Mechanics II,146-AEF ,Tu 9:00AM - 12:50PM ,Rm 7011 ,Jane Reynolds ,146-EGH ,Tu 1:00PM - 4:50PM ,Rm 7011 ,Jane Reynolds ,SENIORS 5010 - Introduction to Microsoft Excel,5010-IME ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Dashaun Hits ,SENIORS 5011 - Introduction to Microsoft Word,5011-IMW ,Sa 9:00AM - 11:00AM ,Rm 6006 ,Dashaun Hits ,SOC  201 - Intro To the Study Of Society,201-CE ,MoWe 11:00AM - 1:40PM ,Rm 3201 ,Ray Muhammad ,SOC SCI  101 - General Course I Social Science,101-DF ,TuTh 11:00AM - 1:40PM ,Rm 3310 ,Michael Mathis ,SPANISH  101 - First Course Spanish,101-AC ,MoWe 9:00AM - 12:40PM ,Rm 3302 ,Todd Lakin ,SPEECH  101-1 - Fundamentals of Speech Communication,101-AC ,MoWe 8:00AM - 10:40AM ,Rm 3304 ,Victoria Nabors ,101-BD ,TuTh 8:00AM - 10:40AM ,Rm 3304 ,Maria Kossakowski ,101-CE ,MoWe 11:00AM - 1:40PM ,Rm 3304 ,Regina Walton ,101-DF ,TuTh 11:00AM - 1:40PM ,Rm 3304 ,Maria Kossakowski ,101-EG ,MoWe 2:00PM - 4:40PM ,Rm 3304 ,Linnea Forsberg ,STHLTH  624 - Fundamentals Nurse Asst Per,624-AB ,MoWeTh 8:00AM - 3:00PM ,Rm 4304 ,Shirley Butler ,624-AC ,MoTuTh 8:00AM - 3:00PM ,Rm 4106 ,Devoria Williams ,624-AD ,MoTuTh 8:00AM - 3:00PM ,Rm 7004 ,Linda McDowell ,624-AE ,MoTuWe 8:00AM - 3:00PM ,Rm 4310 ,Patricia Hines ,624-AF ,TuWeTh 3:30PM - 10:00PM ,Rm 7004 ,Felicia Newton ,624-AG ,MoWeTh 3:30PM - 10:00PM ,Rm 4310 ,Nancy Roddy ,SURG TC  117 - Surgical Pharmacology,117-ACM ,Mo 8:00AM - 11:50AM ,Rm 4105 ,Pierre Harges ,117-MXH4 ,TuTh 1:00PM - 1:50PM ,Rm 4305 ,Nikita Bryant ';

  var subjects = subjects || undefined;
  var classstring = data.split(',');

  var tablerow;
  var tableitem;
  var currentclass;

  for (var i = 0, l = classstring.length; i < l; i++) {
    if (classstring[i].isClassName()) {
      console.log(classstring[i]);
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
    console.log(e);
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
