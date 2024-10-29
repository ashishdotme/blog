<%*
  let title = tp.file.title
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title");
    await tp.file.rename(title.split(" ").join("-").toLowerCase());
  } 
  tR += "---"
%>
title:  <%* tR += title %>
slug: <%* tR += title.split(" ").join("-").toLowerCase() %>
date: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.file.last_modified_date("YYYY-MM-DD") %>
topic: Book
---

<% tp.file.cursor() %>