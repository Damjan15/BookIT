"use server";

import { revalidatePath } from "next/cache";

import { ID } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";

async function createRoom(previousState, formData) {
  // Get databases instances
  const { databases } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged in to create a room",
      };
    }

    // Create a room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
      }
    );

    // Revalidate path
    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error.response.message || "An unexpected error has occured";

    return {
      error: errorMessage,
    };
  }
}

export default createRoom;
