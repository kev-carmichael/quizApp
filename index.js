function store () {
    // (A) VARIABLES TO PASS
    var first = document.getElementById("question_amount").value;
   
    // (B) SAVE TO SESSION STORAGE
    // (B1) FLAT STRING OR NUMBER
    // SESSIONSTORAGE.SETITEM("KEY", "VALUE");
    sessionStorage.setItem("first", first);
   
   
    // (C) REDIRECT
    location.href = "game.html";
    // window.open("1b-session.html");
  }