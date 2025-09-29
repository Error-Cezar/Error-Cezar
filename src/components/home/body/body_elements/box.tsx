import { badges } from "../box_elements/badges"
import { links } from "../box_elements/links"
import { player } from "../box_elements/player"

export const box = () => {
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
            {badges()}
            {player()}
            {links()}
        </div>
    )
}