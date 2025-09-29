import { background } from "./body_elements/background";
import { box } from "./body_elements/box";
import { terminal } from "./body_elements/terminal";

export const body_el = () => {
    return (
        <>
            {terminal()}
            {background()}
            {box()}
        </>
    )
}