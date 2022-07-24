function store (a) {
    // (A) VARIABLES TO PASS
    var first = a;
   
    // (B) SAVE TO SESSION STORAGE
    // (B1) FLAT STRING OR NUMBER
    // SESSIONSTORAGE.SETITEM("KEY", "VALUE");
    sessionStorage.setItem("first", first);
   
   
    // (C) REDIRECT
    location.href = "game.html";
    // window.open("1b-session.html");
  }