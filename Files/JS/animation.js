  var hours;
  var minutes;
  var seconds;
  var t;
  var ut;

  function startTime() {
    var time = new Date();
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById("standardtime").innerHTML = hours + ":" + minutes + ":" + seconds;
    var tc = setTimeout(startTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i
    };
    return i;
  }

  function currentTimeS() {
    var time = new Date();
    hours = time.getHours() * 60 * 60;
    minutes = time.getMinutes() * 60;
    seconds = time.getSeconds();
    var currentTimeSeconds = hours + minutes + seconds;
    return currentTimeSeconds;
  }

  document.getElementById("btn24").onclick = timeConvert;

  function timeConvert() {
    var currentTime = currentTimeS();
    var currentTimePc = currentTime / 86400 * 100;
    document.getElementById("pctime").innerHTML = Math.round((currentTimePc + Number.EPSILON)*100)/100 + "%";
    clearTimeout(ut);
    t = setTimeout(timeConvert, 1000);
    document.getElementById("btn24").disabled = true;
    document.getElementById("btn").disabled = false;
  }


  document.body.onload = function() {
    startTime();
    timeConvert();
  };

  function getUserTime() {
    var shour = document.getElementById("shour").value * 60 * 60;
    var sminute = document.getElementById("sminute").value * 60;
    var ehour = document.getElementById("ehour").value * 60 * 60;
    var eminute = document.getElementById("eminute").value * 60;
    sTime = shour + sminute;
    eTime = ehour + eminute;

    var userTime = [sTime, eTime];

    return userTime;
  }

  document.getElementById("btn").onclick = userPcStart;

  function userPcStart() {
    var start = getUserTime()[0];
    var end = getUserTime()[1];
    var currentTime = currentTimeS();
    var range = end - start;
    var startCount = currentTime - start;
    var dayPc = startCount / range * 100;
    var nightRange = (86400 - start) + end;
    var nightPc = startCount / nightRange * 100;
    if (start <= currentTime && end >= currentTime) {
      console.log(startCount);
      document.getElementById("pctime").innerHTML = Math.round((dayPc + Number.EPSILON)*100)/100 + "%";
    } else if (start <= currentTime && end <= currentTime) {
      document.getElementById("pctime").innerHTML = Math.round((nightPc + Number.EPSILON)*100)/100 + "%";

    } else {
      document.getElementById("pctime").innerHTML = Math.round((nightPc + Number.EPSILON)*100)/100 + "%";
    }
    
     if (start <= currentTime && end <= currentTime && start < end) {
      document.getElementById("pctime").innerHTML = "+" + Math.round((dayPc + Number.EPSILON)*100)/100 + "%";
    } else if (start === currentTime && end === currentTime) {
 document.getElementById("pctime").innerHTML = "100%";
    }
    document.getElementById("btn24").disabled = false;
    document.getElementById("btn").disabled = true;
    clearTimeout(t);
    ut = setTimeout(userPcStart, 1000);
    
  }