(function(){
  function normalize(s){ return (s || "").toString().toLowerCase(); }

  function setupSearch(){
    const input = document.querySelector("[data-search]");
    const cards = Array.from(document.querySelectorAll("[data-card]"));
    const empty = document.querySelector("[data-empty]");
    if(!input || !cards.length) return;

    function apply(){
      const q = normalize(input.value).trim();
      let visible = 0;
      cards.forEach(card => {
        const haystack = normalize(card.innerText + " " + (card.dataset.tags || "") + " " + (card.dataset.type || ""));
        const ok = !q || haystack.includes(q);
        card.style.display = ok ? "" : "none";
        if(ok) visible++;
      });
      if(empty) empty.style.display = visible ? "none" : "block";
    }

    input.addEventListener("input", apply);
    apply();
  }

  function setupFilters(){
    const buttons = Array.from(document.querySelectorAll("[data-filter]"));
    const cards = Array.from(document.querySelectorAll("[data-card]"));
    const empty = document.querySelector("[data-empty]");
    if(!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        let visible = 0;
        cards.forEach(card => {
          const ok = filter === "all" || card.dataset.type === filter;
          card.style.display = ok ? "" : "none";
          if(ok) visible++;
        });
        if(empty) empty.style.display = visible ? "none" : "block";
      });
    });
  }

  setupSearch();
  setupFilters();
})();