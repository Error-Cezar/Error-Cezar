document.addEventListener('DOMContentLoaded', () => {
    if (!GLOBAL_SETTINGS.AvatarFrame) {
        return;
    }

    const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${GLOBAL_SETTINGS.UserID}`;

    const avatarFrame = document.getElementById('avatar-frame');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);

            if (data.avatar_decoration && data.avatar_decoration.asset) {
                const asset = data.avatar_decoration.asset;
                const frameUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png`;
                avatarFrame.src = frameUrl;
                avatarFrame.style.display = 'block';
            } else {
                avatarFrame.style.display = 'none';
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});