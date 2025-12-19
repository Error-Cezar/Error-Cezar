document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const APIKey = document.getElementById("apiKeyInput").value
        const data = {
            link: document.getElementById("linkInput").value,
            shorten: document.getElementById("shortenInput").value
        };

        fetch("", {
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${APIKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
          .then(_ => {
              alert(`Created at /${data.shorten}`);
          })
          .catch(() => alert("Couldn't create shortened link."));
    });
});
