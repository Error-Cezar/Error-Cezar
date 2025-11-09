import { navbar } from "../../../shared/navbar";

export const body_el = () => {
    return (
        <>
        {navbar()}
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow p-4" style={{ minWidth: 340, background: "#f8f9fa", borderRadius: 16 }}>
                <h4 className="mb-4 text-center">Shorten a Link</h4>
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="linkInput">Link</label>
                        <input
                            type="url"
                            className="form-control"
                            id="linkInput"
                            placeholder="Enter link"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="shortenInput">Shorten (3-20 chars)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="shortenInput"
                            placeholder="Shorten string"
                            minLength={3}
                            maxLength={20}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="apiKeyInput">API Key</label>
                        <input
                            type="password"
                            className="form-control"
                            id="apiKeyInput"
                            placeholder="API Key"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100">
                        Shorten
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}