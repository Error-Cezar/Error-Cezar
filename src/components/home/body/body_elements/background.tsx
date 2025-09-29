export const background = () => {
    return (
        <div>
            <div class="slider-container" style="z-index: 2">
                <input
                    type="range"
                    class="slider"
                    id="volume-slider"
                    min="0"
                    max="1"
                    value="0.5"
                    step="0.01"
                />
            </div>

            <div class="container-fluid p-0" id="canvasContainer">
                <canvas id="myCanvas"></canvas>
            </div>

            <div id="video-background">
                <video autoplay muted loop id="myVideo">
                    <source src="/backgrounds/desktop/car.mp4" type="video/mp4" />
                    Switch your browser bro how the FUCK do you not support MP4 VIDEOS
                </video>

                <div id="audio-background">
                    <div id="music-controls">
                        <input
                            type="range"
                            id="volume-slider"
                            min="0"
                            max="1"
                            value=".3"
                            step=".001"
                        />
                        <div id="progress-container">
                            <div id="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="video-overlay"></div>
        </div>
    )
}