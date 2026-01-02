import { ImageSource } from "../types";

/**
 * Converts an ImageSource (string URL or number from require())
 * to the format expected by expo-image's source prop
 */
export const getImageSource = (img: ImageSource | undefined | null) => {
  if (!img) return undefined;
  if (typeof img === "number") {
    return img; // Local require() returns a number
  }
  return { uri: img }; // URL string
};

/**
 * Gets the first image from an array of ImageSources
 */
export const getFirstImageSource = (
  images: ImageSource[] | undefined | null
) => {
  if (!images || images.length === 0) return undefined;
  return getImageSource(images[0]);
};
