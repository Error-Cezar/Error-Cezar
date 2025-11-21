$(document).ready(function () {
  $("#writeButton").on("click", function () {
    $("#previewText").html("");

    $("#writeContent").collapse("show");
    $("#previewContent").collapse("hide");
  });

  $("#previewButton").on("click", function () {
    let articleContent = $("#articleContent").val();

    $("#previewText").html(`
            <md-block>
            ${articleContent}
            </md-block>
        `);

    $("#previewContent").collapse("show");
    $("#writeContent").collapse("hide");
  });

  $("#upload").on("click", function (e) {
    let articleName = $("#articleName").val();
    let articleDes = $("#articleDescription").val();
    let articleContent = $("#articleContent").val();
    let Author = $("#articleAuthor").val();

    let APIKey = $("apiKey").val();

    let CompressedContent = LZString.compress(articleContent);

    const data = {
      Title: articleName,
      Description: articleDes,
      Content: CompressedContent,
      Author: Author,
    };

    fetch("/blog/new", {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${APIKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        alert("Submitted!");
      })
      .catch(() => alert("Error submitting form."));
  });
});
