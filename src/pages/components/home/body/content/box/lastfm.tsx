export const fmtrack = () => {
    return (
            <div class="track-container align-self-center">
            <div className="content" style={{
                background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
                borderRadius: 16,
                boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                maxWidth: 420,
                minWidth: 320,
                margin: "16px auto"
            }}>
                {/* Left: Track image */}
                <img
                    id="track-image"
                    src="https://placecats.com/300/200"
                    alt="Track cover"
                    style={{ width: 48, height: 48, borderRadius: 6, marginRight: 12 }}
                />

            {/* Middle: Track and artist name */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0 // allow text to shrink
            }}>
                <span
                    id="track-name"
                    style={{
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: 18,
                        letterSpacing: 0.2,
                        marginBottom: 4,
                        textShadow: "0 1px 4px rgba(0,0,0,0.18)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        display: "block"
                    }}
                >
                    No Song Playing !
                </span>
                <span
                    id="track-artist"
                    style={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 0.1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        display: "block"
                    }}
                >
                </span>
            </div>

                            {/* Right: Now playing icon */}
            <div
                style={{
                    marginLeft: 18,
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(30,215,96,0.12)",
                    borderRadius: "50%",
                    padding: 8,
                    boxShadow: "0 2px 8px rgba(30,215,96,0.08)"
                }}
            >
                <i id="track-play" class="fa-solid fa-circle-play" style={{display: "none"}}></i>
                <i id="track-pause" class="fa-solid fa-circle-pause"></i>
            </div>
            </div>
            </div>
    )
}