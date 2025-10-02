export const body_conv = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{ minWidth: 340, background: "#f8f9fa", borderRadius: 16 }}>
                <h4 className="mb-4 text-center">Audio File Converter</h4>
                <form encType="multipart/form-data">
                    <div className="form-group mb-3">
                        <label htmlFor="fileInput">Audio File</label>
                        <input
                            type="file"
                            className="form-control"
                            id="fileInput"
                            name="file"
                            accept="audio/*"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="outputSelect">Convert to</label>
                        <select className="form-control" id="outputSelect" name="output" required>
                            <option value="mp3">MP3</option>
                            <option value="wav">WAV</option>
                            <option value="ogg">OGG</option>
                        </select>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="apiKeyInput">API Key</label>
                        <input
                            type="password"
                            className="form-control"
                            id="apiKeyInput"
                            name="apiKey"
                            placeholder="API Key"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                        Convert
                    </button>
                </form>
                <div id="audiodownload" className="mt-4 text-center">
                </div>
            </div>
        </div>
    );
}