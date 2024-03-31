const tables = document.querySelectorAll("table");
const search = document.querySelector(".input-group input");

//search item
search.addEventListener("input", () => {
  tables.forEach((table) => searchTable(table));
});

function searchTable(table) {
  const table_rows = table.querySelectorAll("tbody tr");
  const input = table.closest(".table").querySelector('input[type="search"]');

  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = input.value.toLowerCase();

    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
    row.style.setProperty("--delay", i / 25 + "s");
  });

  document
    .querySelectorAll(`#${table.id} tr:not(.hide)`)
    .forEach((visible_row, i) => {
      visible_row.style.backgroundColor =
        i % 2 == 0 ? "transparent" : "#0000000b";
    });
}

//shorting table
const table_headings = document.querySelectorAll(".table thead th");
const table_rows = document.querySelectorAll(".table tbody tr");

table_headings.forEach((head, i) => {
  let sort_asc = true;

  head.onclick = () => {
    table_headings.forEach((head) => head.classList.remove("active"));
    head.classList.add("active");

    document
      .querySelectorAll(".table td")
      .forEach((td) => td.classList.remove("active"));

    table_rows.forEach((row) => {
      row.querySelectorAll("td")[i].classList.add("active");
    });

    head.classList.toggle("asc", sort_asc);
    sort_asc = head.classList.contains("asc") ? false : true;

    sortTable(i, sort_asc);
  };
});

function sortTable(column, sort_asc) {
  [...table_rows]
    .sort((a, b) => {
      let first_row = a
          .querySelectorAll("td")
          [column].textContent.toLowerCase(),
        second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();

      return sort_asc
        ? first_row.localeCompare(second_row)
        : second_row.localeCompare(first_row);
    })
    .forEach((sorted_row) =>
      document.querySelector(".table tbody").appendChild(sorted_row)
    );
}
