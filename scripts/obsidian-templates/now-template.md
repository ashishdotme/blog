<%*
  let dateString = tp.date.now("YYYY-MM-DD")
  await tp.file.rename(dateString);
  tR += "---"
%>
title: <%* tR += dateString %>
date: <% tp.date.now("YYYY-MM-DD") %>
---

<% tp.file.cursor() %>