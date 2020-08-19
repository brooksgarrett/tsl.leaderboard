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
    <h1>Class Summary - Number Of Cards Passing</h1>
    <table id="class-table-id">
      <thead class="heading">
        <th class="name">Fully Passing&nbsp;</td>
        <th class="name">Badges&nbsp;</td>
        <th class="name">Agons&nbsp;</td>
        <th class="name">Good Deeds&nbsp;</td>
        <th class="number">Fitness&nbsp;</td>
      </thead>
        <tr>
          <td class="name"><%= data.class.passing %></td>
          <td class="name"><%= data.class.badgesCount %></td>
          <td class="name"><%= data.class.agonsCount %></td>
          <td class="number"><%= data.class.deedsCount %></td>
          <td class="number"><%= data.class.fitnessCount%></td>
        </tr>
    </table>
    <h1>Leaderboard</h1>
    <table id="table-id">
      <thead class="heading">
        <th class="name">Last Name&nbsp;</td>
        <th class="name">First Name&nbsp;</td>
        <th class="name">Username&nbsp;</td>
        <th class="number">Days Enrolled&nbsp;</td>
        <th class="number">Badges&nbsp;</td>
        <th class="number">Agons&nbsp;</td>
        <th class="number">Deed Chk-ins&nbsp;</td>
        <th class="number">Deed %&nbsp;</td>
        <th class="number">Fitness Chk-ins&nbsp;</td>
        <th class="number">Fitness %&nbsp;</td>
      </thead>
      <% for (let i = 0; i < data.leaderboard.length; i++) { %>
        <tr>
          <td class="name"><%= data.leaderboard[i].lastName %></td>
          <td class="name"><%= data.leaderboard[i].firstName %></td>
          <td class="name"><a href="<%= data.leaderboard[i].memberProfileUrl %>">@<%= data.leaderboard[i].username %></a></td>
          <td class="number"><%= data.leaderboard[i].daysEnrolled %></td>
          <td class="number"><%= data.leaderboard[i].badges %></td>
          <td class="number"><%= data.leaderboard[i].agons%></td>
          <td class="number"><%= data.leaderboard[i].goodDeedCheckins %></td>
          <td class="number"><%= data.leaderboard[i].goodDeedPercentage %></td>
          <td class="number"><%= data.leaderboard[i].fitnessCheckins %></td>
          <td class="number"><%= data.leaderboard[i].fitnessPercentage %></td>
        </tr>
      <% } %>
    </table>
  </body>
  <script src="tablesort.min.js"></script>
  <script src="tablesort.number.min.js"></script>
  <script>new Tablesort(document.getElementById('table-id'));</script>
</html>`;
