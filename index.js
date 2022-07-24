function store () {
    var first = document.getElementById("question_amount").value;
    var second = document.getElementById("question_difficulty").value;
   
    sessionStorage.setItem("first", first);
    sessionStorage.setItem("second", second);
   
   
    // double bubble as in href for btn?
    location.href = "game.html";
  }