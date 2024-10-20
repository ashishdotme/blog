<%*
  let dateString = "week-" + tp.date.now("WW") + "-" + tp.date.now("YYYY")
  let titleString = "Week " + tp.date.now("WW") + " " + tp.date.now("YYYY")
  await tp.file.rename(dateString);
  tR += "---"
%>
title: <%* tR += titleString %>
date: <% tp.date.now("YYYY-MM-DD") %>
topic: Weeknotes
---

# Reflections

<% tp.file.cursor() %>



# Links
