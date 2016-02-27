window.onload = function() {
  console.log('Gonna find some classes');


  var http = new XMLHttpRequest();
  var url = "https://ccccsprd.ccc.edu/psc/ccccsprd/EMPLOYEE/CS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL";
  var params = "ICAJAX=1&ICNAVTYPEDROPDOWN=0&ICType=Panel&ICElementNum=0&ICStateNum=3&ICAction=DERIVED_CLSRCH_SSR_EXPAND_COLLAPS%24149%24%241&ICXPos=0&ICYPos=0&ResponsetoDiffFrame=-1&TargetFrameName=None&FacetPath=None&ICFocus=&ICSaveWarningFilter=0&ICChanged=-1&ICResubmit=0&ICSID=hxiHK4hn5aGrsAgdWeGj8tpJyeoJsRbE8rLSF0AubN0%3D&ICActionPrompt=false&ICFind=&ICAddCount=&ICAPPCLSDATA=&SSR_CLSRCH_WRK_CAMPUS$0=MX&SSR_CLSRCH_WRK_LOCATION$1=&SSR_CLSRCH_WRK_INSTRUCTION_MODE$2=P&SSR_CLSRCH_WRK_SUBJECT_SRCH$3=&SSR_CLSRCH_WRK_CRSE_ATTR$6=&SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$9=N";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Accept", "*/*");
  http.setRequestHeader("Accept-Encoding", "gzip, deflate");
  http.setRequestHeader("Accept-Language", "en-US,en;q=0.8");

  http.setRequestHeader("Cache-Control", "no-cache");
  http.setRequestHeader("Connection", "keep-alive");

  http.setRequestHeader("Content-Length", "553");
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Cookie", "__utma=168675507.729707858.1456520805.1456520805.1456520805.1; __utmc=168675507; __utmz=168675507.1456520805.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga=GA1.2.729707858.1456520805; BIGipServerCCCCSPRD_Pool=955409418.36895.0000; ExpirePage=https://ccccsprd.ccc.edu/psc/ccccsprd/; PS_LOGINLIST=https://ccccsprd.ccc.edu/ccccsprd; PS_TOKEN=pgAAAAQDAgEBAAAAvAIAAAAAAAAsAAAABABTaGRyAk4Aewg4AC4AMQAwABRXuuogXu/ukb8hlxnHLy+ZjEc7tmYAAAAFAFNkYXRhWnicLYdLDkBAFATLJ5YO4A7ETHxi7RcbJtg7iKs5nCbzKl3d7wbiKAwC9RPyX9rzsbAysZGMGjOZ49B/ctF7Dhw7A5WlxNCQq61s/e4o5Ea21HIrjA8vRzgNbw==; cccp853-cs-8080-PORTAL-PSJSESSIONID=AtIf_VNUz_MTbMLAHoJbXuFqFYGQB7tU!-2013239698; SignOnDefault=CCCINFO; PS_TOKENEXPIRE=26_Feb_2018_23:51:38_GMT");
  http.setRequestHeader("Host", "ccccsprd.ccc.edu");
  http.setRequestHeader("Origin", "https://ccccsprd.ccc.edu");
  http.setRequestHeader("Pragma", "no-cache");
  http.setRequestHeader("Referer", "https://ccccsprd.ccc.edu/psc/ccccsprd/EMPLOYEE/CS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL");
  http.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
      }
  }

  http.send(params);
}