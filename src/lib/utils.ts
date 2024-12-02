import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Stores transaction objectId in localStorage
 * @param objectId - The ID of the object to store
 */
export const storeObjectChanges = (objectId: string) => {
  try {
    // Get existing objectIds from localStorage
    const existingIds = localStorage.getItem("objectIds");
    let objectIds: string[] = [];

    if (existingIds) {
      objectIds = JSON.parse(existingIds);
    }

    // Add new objectId
    objectIds.push(objectId);

    // Store updated array back in localStorage
    localStorage.setItem("objectIds", JSON.stringify(objectIds));

    console.log("ObjectId stored successfully:", objectId);
  } catch (error) {
    console.error("Error storing objectId:", error);
    throw error;
  }
};

/**
 * Get all stored objectIds
 * @returns Array of stored objectIds
 */
export const getStoredObjectIds = (): string[] => {
  try {
    const existingIds = localStorage.getItem("objectIds");
    return existingIds ? JSON.parse(existingIds) : [];
  } catch (error) {
    console.error("Error retrieving objectIds:", error);
    return [];
  }
};
