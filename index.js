function store () {
    var first = document.getElementById("question_amount").value;
    var second = document.getElementById("question_difficulty").value;
    var third = document.getElementById("category").value;
   
    sessionStorage.setItem("first", first);
    sessionStorage.setItem("second", second);
    sessionStorage.setItem("third", third);
   
   
    // double bubble as in href for btn?
    location.href = "game.html";
  }