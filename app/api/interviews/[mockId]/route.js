import { db } from "@/utils/db"; // make sure this points to your Drizzle DB
import { MockInterview } from "@/utils/schema"; // your interviews table schema
import { eq } from "drizzle-orm";

export async function DELETE(req, { params }) {
  try {
    const { mockId } = params;

    // Log the mockId to ensure it’s coming through
    console.log("Deleting interview with mockId:", mockId);

    // Deleting the interview from the database
    const result = await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));

    // Check if no records were deleted
    if (result.count === 0) {
      return new Response(
        JSON.stringify({ error: "No interview found with that mockId" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete interview" }),
      { status: 500 }
    );
  }
}
