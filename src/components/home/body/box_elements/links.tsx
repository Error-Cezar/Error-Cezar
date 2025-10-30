export const links = () => {
    return (
        <>
            <div class="links align-self-center">
                <a
                    href="https://discord.com/users/362991657236561923"
                    data-tooltip="Open Discord profile"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fab fa-discord"></i>
                </a>

                <a
                    onclick="CopyClipboard('error.802', this)"
                    data-tooltip="Copy Signal username"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-signal-messenger"></i>
                </a>

                <a
                    href="https://steamcommunity.com/profiles/76561199191273742/"
                    data-tooltip="Open Steam Profile"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-steam"></i>
                </a>

                <a
                    href="https://github.com/Error-Cezar"
                    data-tooltip="Open GitHub"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-github"></i>
                </a>

                <a
                    href="https://x.com/errorisntpublic"
                    data-tooltip="Open Twitter"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-twitter"></i>
                </a>

                <a
                    onclick="CopyClipboard('bc1q329swh9rlpnn5pw97k4crjhsm6nhjlzgl4u7hl', this)"
                    data-tooltip="Copy BTC Wallet"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-bitcoin"></i>
                </a>
            </div>

            <div class="links align-self-center" style="bottom: 40px !important;">
                <a
                    href="https://last.fm/user/ErrorCezar"
                    data-tooltip="Open LastFM"
                    target="_blank"
                    class="color-white"
                >
                    <i class="fa-brands fa-lastfm"></i>
                </a>
            </div>
        </>
    )
}