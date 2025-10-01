document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = {
            link: document.getElementById("linkInput").value,
            shorten: document.getElementById("shortenInput").value
        };

        console.log(data);
        fetch("/short/new", {
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${document.getElementById("apiKeyInput").value}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
          .then(response => {
              alert("Submitted!");
          })
          .catch(() => alert("Error submitting form."));
    });
});