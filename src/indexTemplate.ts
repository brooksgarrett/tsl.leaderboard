export const indexTemplate = `<html>
  <head>
    <style>
      body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 12px; }
      h1 { font-weight: bold; font-size: 14px; }
      table { border-collapse: separate; border-spacing: 0; color: #4a4a4d; font-size: 14px/1.4; }
      th { padding: 10px 15px; vertical-align: top; text-align: left; font-size: 11px; }
      td { border: 1px solid #cecfd5; text-align: left; }
      .name { width: 200px; }
      .number { width: 100px; text-align: right; }

      th[role=columnheader]:not(.no-sort) {
        cursor: pointer;
      }
      
      th[role=columnheader]:not(.no-sort):after {
        content: '';
        float: right;
        margin-top: 7px;
        border-width: 0 4px 4px;
        border-style: solid;
        border-color: #404040 transparent;
        visibility: hidden;
        opacity: 0;
        -ms-user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      
      th[aria-sort=ascending]:not(.no-sort):after {
        border-bottom: none;
        border-width: 4px 4px 0;
      }
      
      th[aria-sort]:not(.no-sort):after {
        visibility: visible;
        opacity: 0.4;
      }
      
      th[role=columnheader]:not(.no-sort):hover:after {
        visibility: visible;
        opacity: 1;
      }

    </style>
  </head>
  <body>
    <h1>Leaderboard</h1>
    <table id="table-id">
      <thead class="heading">
        <th class="name">Name&nbsp;</td>
        <th class="number">Checkins&nbsp;</td>
        <th class="number">Badges&nbsp;</td>
        <th class="number">Challenges&nbsp;</td>
      </thead>
      <% for (let i = 0; i < data.length; i++) { %>
        <tr>
          <td class="name"><%= data[i].name %></td>
          <td class="number"><%= data[i].checkins %></td>
          <td class="number"><%= data[i].badges %></td>
          <td class="number"><%= data[i].challenges %></td>
        </tr>
      <% } %>
    </table>
  </body>
  <script src="tablesort.min.js"></script>
  <script src="tablesort.number.min.js"></script>
  <script>new Tablesort(document.getElementById('table-id'));</script>
</html>`;
