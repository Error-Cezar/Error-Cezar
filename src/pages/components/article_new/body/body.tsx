
import { navbar } from "../../../shared/navbar";

export const body_el = () => {
  return (<>
    {navbar()}

        <div class="container mt-5">
        <h1>Create Article</h1>
        <form>
            <div class="form-group">
                <label for="articleName">Article Name</label>
                <input type="text" class="form-control" id="articleName" placeholder="Enter article name" required />
            </div>

            <div class="form-group">
                <label for="articleDescription">Article Description</label>
                <textarea class="form-control" id="articleDescription" rows={3} placeholder="Enter a brief description" required></textarea>
            </div>

            <div>
                <button type="button" class="btn btn-primary" id="writeButton">Write</button>
                <button type="button" class="btn btn-secondary" id="previewButton">Preview</button>
            </div>

            <div class="form-group collapse show" id="writeContent">
                <label for="articleContent">Article Content (Markdown)</label>
                <textarea class="form-control" id="articleContent" rows={10} placeholder="Write your article content here..." required></textarea>
            </div>

            <div class="form-group collapse" id="previewContent">
                <label>Article Preview</label>
                <div class="border p-3" id="previewText">
                    This is the article preview.
                </div>
            </div>

            <div class="form-group">
                <label for="articleAuthor">Article Author</label>
                <input type="text" class="form-control" id="articleAuthor" placeholder="Enter author's name" required />
            </div>

            <div class="form-group">
                <label for="apiKey">API Key</label>
                <input type="text" class="form-control" id="apiKey" placeholder="Enter your API key" required />
            </div>

            <button type="button" id="upload" class="btn btn-success">Submit Article</button>
        </form>
    </div>
  </>);
};
