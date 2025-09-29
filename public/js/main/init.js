function preventImgDrag(e) {
    e.preventDefault();
}
document.addEventListener("dragstart", preventImgDrag, true);
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function CopyClipboard(str, el) {
    navigator.clipboard.writeText(str);
    if (
    el &&
    el.hasAttribute("data-tooltip") &&
    !el.hasAttribute("data-og")
    ) {
    el.setAttribute("data-og", el.getAttribute("data-tooltip"));
    el.setAttribute("data-tooltip", "Copied !");
    await wait(500);
    el.setAttribute("data-tooltip", el.getAttribute("data-og"));
    el.removeAttribute("data-og");
    }
}

dayjs.extend(window.dayjs_plugin_duration);