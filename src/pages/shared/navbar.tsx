export const navbar = () => {
  return (
    <nav
      class="navbar glass-navbar navbar-dark bg-dark fixed-bottom border-top small-navbar"
      style="height:48px; font-size:14px;"
    >
      <div
        class="container-fluid navbar-content"
        style="display: flex; justify-content: center; align-items: center;"
      >
        <div style="display: flex; gap: 50px;">
          <button
            class="btn btn-sm"
            type="button"
            style="background-color: purple; border-color: purple; color: white;"
            onclick="window.location.href='/'"
          >
            Home
          </button>

          <button
            class="btn btn-sm"
            type="button"
            style="background-color: purple; border-color: purple; color: white;"
            onclick="window.location.href='/about'"
          >
            About
          </button>

          <button
            class="btn btn-sm"
            type="button"
            style="background-color: purple; border-color: purple; color: white;"
            onclick="window.location.href='/projects'"
          >
            Projects
          </button>
          <button
            class="btn btn-sm"
            type="button"
            style="background-color: purple; border-color: purple; color: white;"
            onclick="window.location.href='/blog/list'"
          >
            Blog
          </button>
        </div>
      </div>
    </nav>
  );
};
