import { links } from "../box_elements/links"
import { player } from "../box_elements/player"
import { fmtrack } from "../box_elements/lastfm"

export const box = (visitCount: number) => {
    return (
        <div id="blurred-box" class="tilt-element d-flex align-items-start flex-column floating">
            <div class="align-self-center">
                <img
                    id="profile-picture"
                    class="mx-auto d-block border border-white"
                    src="images/pfp.webp"
                    alt="Icon"
                />
                <p
                    id="username-container"
                    style="color: white; font-weight: bold; font-size: 32px"
                ></p>
            </div>
            
            {fmtrack()}
            {player()}
            {links()}

            <div
                style={{
                    position: "absolute",
                    right: 16,
                    bottom: 16,
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 18,
                    background: "rgba(0,0,0,0.35)",
                    borderRadius: 20,
                    padding: "4px 12px"
                }}
            >
                <i class="fa fa-eye" style="marginRight: 8"></i>
                <span>{visitCount}</span>
            </div>
        </div>
    )
}