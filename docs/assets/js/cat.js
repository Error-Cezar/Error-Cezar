document.addEventListener("AppReady", function () {
    const mainNeko = new Neko({ 
    nekoName: "main-neko", 
    nekoImageUrl: "./assets/cat/neko.png",
    initialPosX: window.innerWidth / 2,
    initialPosY: window.innerHeight / 2
    });

    mainNeko.init();
    mainNeko.isFollowing = true;
});