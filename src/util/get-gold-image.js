import gold_image_gray from "../assets/gold_image_gray.png";
import gold_image from "../assets/gold_image.png"


export function getGoldImage(goldId) {
    switch (goldId) {
        case "y": return gold_image;
        case "n": return gold_image_gray;
        default: return null;
    }
}