<%*
  let dateString = "week-" + tp.date.now("WW") + "-" + tp.date.now("YYYY")
  await tp.file.rename(dateString);
  tR += "---"
%>
title: <%* tR += dateString %>
date: <%* tR += dateString %>
---

<% tp.file.cursor() %>