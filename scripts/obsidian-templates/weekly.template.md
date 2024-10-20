<%*
  let dateString = "week-" + tp.date.now("WW") + "-" + tp.date.now("YYYY")
  await tp.file.rename(dateString);
  tR += "---"
%>
title: <%* tR += dateString %>
date: <% tp.date.now("YYYY-MM-DD") %>
---

# Reflections

<% tp.file.cursor() %>



# Links
