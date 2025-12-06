export const background = () => {
    return (
        <>
            <div class="slider-container" style="z-index: 3">
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

            <div class="container-fluid p-0" id="canvasContainer" style="z-index: 2">
                <canvas id="myCanvas"></canvas>
            </div>

            <div id="tsparticles" style="z-index: 1"> </div>

            <div id="audio-background">
                <div id="music-controls">
                    <input
                        type="range"
                        id="volume-slider"
                        min="0"
                        max="1"
                        step=".001"
                    />
                    <div id="progress-container">
                        <div id="progress-bar"></div>
                    </div>
                </div>
            </div>

            <div id="video-overlay"></div>
        </>
    )
}
