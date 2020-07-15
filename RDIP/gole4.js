<script type='text/javascript'>

var sentences=["John ate an apple before afternoon.[before afternoon John ate an apple][John before afternoon ate an apple]",
	"some students like to study in the night.[at night some students like to study]",
	"John and Mary went to church.[Mary and John went to church]",
	"John went to church after eating.[after eating John went to church][John after eating went to church]",
	"did he go to market.[he did go to market]",
	"the woman who called my sister sells cosmetics.[the woman who sells cosmetics called my sister][my sister who sells cosmetics called the woman][my sister who called the woman sells cosmetics]",
	"John goes to the library and studies.[John studies and goes to the library]",
	"John ate an apple so did she.[she ate an apple so did John]",
	"the teacher returned the book after she noticed the error.[the teacher noticed the error after she returned the book][after the teacher returned the book she noticed the error][after the teacher noticed the error she returned the book][she returned the book after the teacher noticed the error][she noticed the error after the teacher returned the book][after she returned the book the teacher noticed the error][after she noticed the error the teacher returned the book]",
	"I told her that I bought a book yesterday.[I told her yesterday that I bought a book][yesterday I told her that I bought a book][I bought a book that I told her yesterday][I bought a book yesterday that I told her][yesterday I bought a book that I told her]",
];
var goes=0;
var selcnt=0;
var prefix='';
var usual=0;
var bits=[];
var mode='';
var wbits=[];
var wwbits=[];

function altscoreit(alttvo) {
  return alttvo.value;
}


function scoreit(tvo) {
  var tv=tvo.value, altis=false, wast, waso, one=usual, ione;
  if (prefix != '' && usual == 0) {
    for (ione=1; ione<bits.length; ione++) {
     if (bits[ione].trim() != '') {
      if ((bits[ione].toLowerCase().trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ')[eval(-1 + eval(tvo.options[tvo.selectedIndex].text))] == tvo.options[tvo.selectedIndex].title.toLowerCase()) {
       usual=ione;
       one=usual;
      } 
     }     
    }
  }
  if (prefix != '' && usual != 0) {
    wast=tvo.options[tvo.selectedIndex].title;
    waso='td' + tvo.options[tvo.selectedIndex].text;
      if ((bits[usual].toLowerCase().trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ')[eval(-1 + eval(tvo.options[tvo.selectedIndex].text))] == tvo.options[tvo.selectedIndex].title.toLowerCase()) {
    usual=one;
    altis=true;
    selcnt--;
    score++;
    
    if (eval(tvo.options[tvo.selectedIndex].text) == 1) {
    document.getElementById(waso).innerHTML=wast.substring(0,1).toUpperCase() + (wast + ' ').substring(1).trim();
    } else {
    document.getElementById(waso).innerHTML=wast;
    }
    tvo.value='';
      } else {
    score--;
    tvo.value='';
    
      }
  } else if (tv.replace(' ','') != '') {
    selcnt--;
    score++;
    
    document.getElementById('td' + tv).innerHTML=tvo.options[tvo.selectedIndex].title;
    tvo.value='';
  } else {
    wast=tvo.options[tvo.selectedIndex].title;
    waso='td' + tvo.options[tvo.selectedIndex].text;
    if (prefix != '') {
      if ((bits[usual].toLowerCase().trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ')[eval(-1 + eval(tvo.options[tvo.selectedIndex].text))] == tvo.options[tvo.selectedIndex].title.toLowerCase()) {
    usual=one;
    altis=true;
    selcnt--;
    score++;
   
    if (eval(tvo.options[tvo.selectedIndex].text) == 1) {
    document.getElementById(waso).innerHTML=wast.substring(0,1).toUpperCase() + (wast + ' ').substring(1).trim();
    } else {
    document.getElementById(waso).innerHTML=wast;
    }
    tvo.value='';
      }
    }
    if (!altis) {
    score--;
    tvo.value='';
    
    }
  }
  document.getElementById('score').innerHTML='Score: ' + score + ' from Sentences: ' + goes;
  if (selcnt <= 0) pickasentence();
}

function pickasentence() {
  var divih='', wordbits, wordbits2=[], selbit='', iid, ii, iiq, found=false, liststuff="", dl="", optstuff="";
  var choice = Math.floor(Math.random() * sentences.length), opts=[], thisopt="", done=[], ioffset=0, jiid;
  wordbitsiid='';
  bits=sentences[choice].replace(/]/g,'[').split('[');
  usual=0;
  prefix='';
  selcnt=0;
  goes++;
  ioffset=0;
  wbits=[];
  wwbits=[];
  liststuff='1';
  if (bits[0].trim() != (bits[0].trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','')) {
      ioffset=-1;
  }
  for (ii=0; ii<bits.length; ii++) {   //?
      tablebit='<br><table style=background-color:white;><tr></tr></table>';
      if (ii != 0) prefix='alt';
    if (ii == 0) {
  tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td1></td></tr>');
  for (iiq=2; iiq<=bits[0].trim().split(' ').length; iiq++) {
    liststuff+=',' + iiq;
    if (iiq == bits[0].trim().split(' ').length && ioffset != 0) {
     tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td' + iiq + '>' + (bits[0].trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ')[iiq] + '</td></tr>');
    } else {
     tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td' + iiq + '></td></tr>');
    }
  }
      if (prefix != '') {
        //opts=[];
        //done=[];
        bits[0]=bits[1];
        wordbits=(bits[ii].trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ');
      } else {
        wordbits=(bits[ii].trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ');
        if (bits.length >= 2) wordbits2=(bits[eval(1 + ii)].toLowerCase().trim() + '').replace('.',' .').replace('?',' ?').replace('!',' !').replace('~','').split(' ');
      }
      optstuff="";
      selbit="";
      for (iid=0; iid<eval(ioffset + wordbits.length); iid++) {
        if (ii == 0) selcnt++;
        wordbitsiid=wordbits[iid];
        if (mode != '') {
          wwbits.push(wordbits[iid]);
          wordbitsiid=jumbleword(wordbits[iid]);
          wbits.push(wordbitsiid);
        }
        if (bits.length >= 2) {

          thisopt='<option value="">' + ('' + wordbitsiid.toLowerCase() + '').replace('i',' I').replace('','').replace('','') + '</option>';
          for (jiid=1; jiid<=eval(ioffset + wordbits.length); jiid++) {
            if (eval(-1 + jiid) == iid) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else if (wordbits[eval(-1 + jiid)].toLowerCase() == wordbits[iid].toLowerCase()) {
             thisopt+='<option title="' + wordbits[eval(-1 + jiid)] + '" value="' + jiid + '">' + jiid + '</option>';
            } else {
             thisopt+='<option title="' + wordbits[iid] + '" value=" ">' + jiid + '</option>';
            }
          }


        } else {
          thisopt='<option value="">' + ('' + wordbitsiid.toLowerCase() + '').replace('i',' I').replace('','').replace('','') + '</option>';
          for (jiid=1; jiid<=eval(ioffset + wordbits.length); jiid++) {
            if (eval(-1 + jiid) == iid) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else if (wordbits[eval(-1 + jiid)].toLowerCase() == wordbits[iid].toLowerCase()) {
             thisopt+='<option title="' + wordbits[eval(-1 + jiid)] + '" value="' + jiid + '">' + jiid + '</option>';
            } else {
             thisopt+='<option title="' + wordbits[iid] + '" value=" ">' + jiid + '</option>';
            }
          }
        }
        opts.push(thisopt);
        //if (ii != 0) alert(opts.length + ' ... ' + thisopt);
      }
      done=[];
      for (iid=0; iid<eval(ioffset + wordbits.length); iid++) {
       optstuff='';
       if (iid == 0) {
        choice = Math.floor(Math.random() * eval(ioffset + wordbits.length));
       } else {
        while (done.indexOf('' + choice) != -1) {
         choice = Math.floor(Math.random() * eval(ioffset + wordbits.length));
        }
       }
       done.push('' + choice);
       //if (ii != 0) alert("opts[" + choice + "]='" + opts[eval(choice)] + "'");
       optstuff+=opts[eval(choice)];
       //if (ii != 0) alert(optstuff);
       if (prefix != '') {
       selbit='<select ' + modeonclick(mode, wordbits[iid]) + ' id=' + prefix + wordbitsiid.toLowerCase() + ' style="font-size:24px;background-color:white;" onchange="' + prefix + 'scoreit(this);">' + optstuff + '</select>';
       } else {
       selbit='<select ' + modeonclick(mode, wordbits[iid]) + ' id=' + prefix + 's' + eval(1 + iid) + ' style="font-size:24px;background-color:white;" onchange="' + prefix + 'scoreit(this);">' + optstuff + '</select>';
       }
       divih+=selbit;
      }
      if (ioffset != 0) divih+=wordbits[eval(-1 + wordbits.length)];
      //alert(tablebit);
      document.getElementById(prefix + 'askthis').innerHTML=divih + tablebit;
  }
  }
  
}

function depends(objsel) {
  var thisone=eval(objsel.id.replace('s',''));
  var thiszero=eval(-1 + thisone), newval=objsel.title, anotherzero=thiszero;
  var objselvalue=objsel.options[objsel.selectedIndex].text;
  for (var iy=0; iy<wbits.length; iy++) {
    if (objselvalue.toLowerCase() == wbits[iy].toLowerCase()) anotherzero=iy;
  }
  if (objselvalue.toLowerCase() != wwbits[anotherzero].toLowerCase()) { 
    newval=prompt('What is the unjumbled (anagram) word for ' + objselvalue.toLowerCase(), objsel.value.toLowerCase());
    if (newval != null) {
        while (newval != null && newval.toLowerCase() != wwbits[anotherzero].toLowerCase()) { 
         newval=prompt('What is the unjumbled (anagram) word for ' + objselvalue.toLowerCase(), newval);
        }
        if (newval != null) {
         while (objsel.innerHTML.indexOf('"' + wbits[anotherzero] + '"') != -1) {
          objsel.innerHTML=objsel.innerHTML.replace('"' + wbits[anotherzero] + '"','"' + wwbits[anotherzero] + '"');
         }
         objsel.innerHTML=objsel.innerHTML.replace('>' + objselvalue.toLowerCase() + '<','>' + wwbits[anotherzero].toLowerCase() + '<');
         wbits[anotherzero]=wwbits[anotherzero];
         return;
        }
    }
  } else {
    return;
  }
  pickasentence();
}

function jumbleword(whatword) {
      var done_list=';', nchoice, outs=''; 
      for (var niid=0; niid<whatword.length; niid++) {
        nchoice = Math.floor(Math.random() * whatword.length);
        while (done_list.indexOf(';' + nchoice + ';') != -1) {
          nchoice = Math.floor(Math.random() * whatword.length);
        }
        outs+=whatword.substring(nchoice, eval(1 + nchoice));
        done_list+='' + nchoice + ';';
      }
      return outs;
}

function modeonclick(im, wi) {
  if (im != '') {
    return ' onfocus="depends(this);" title="' + wi + '" ';
  }
  return ' title="' + wi + '" ';
}

function addthis() {
  var idea=prompt("Optionally, add you own sentence, into the mix, as exemplified by ...", "It was great to see them again after all those years. [After all those years it was great to see them again.]");
  if (idea != null) {
    if (idea != '') {
     sentences.push(idea);
    }
  }
}

function changemode(selmode) {
  mode=selmode;
  pickasentence();
}

</script>