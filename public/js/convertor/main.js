document.addEventListener("DOMContentLoaded", function () {
    const audiodownloadDiv = document.getElementById("audiodownload");
    const form = document.querySelector("form");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        audiodownloadDiv.innerHTML = "";

        // disable submit button
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Converting...";

        const formData = new FormData(form);

        const apiToken = formData.get("apiKey");

        try {
            const res = await fetch("/convert/upload", {
                method: "POST",
                body: formData,
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${apiToken}`
                },
            });

            // check if response is json (error) or file (success)
            const contentType = res.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                const errorResponse = await res.json();
                alert("Error: " + (errorResponse.error || "Unknown error"));
                return;
            }

            // Download the file if the response is a file
            const blob = await res.blob();
            const contentDisposition = res.headers.get("Content-Disposition");
            let filename = "converted";
            if (contentDisposition) {
                const match = RegExp(/filename="(.+)"/).exec(contentDisposition);
                if (match) filename = match[1];
            }

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.textContent = "Download Converted File";
            a.className = "btn btn-success";
            audiodownloadDiv.appendChild(a);

            // enable submit button
            submitButton.disabled = false;
            submitButton.textContent = "Convert";

            // Optionally, remoke url after some time to free up memory
            setTimeout(() => {
                URL.revokeObjectURL(url)
                if(a.parentNode) {
                    a.parentNode.removeChild(a);
                }
            }, 60000);

        } catch (err) {
            console.error(err);
            alert("Error uploading file.");
        }
    });
});