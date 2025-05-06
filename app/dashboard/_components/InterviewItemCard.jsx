"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this interview?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/interviews/${interview.mockId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Interview deleted!");

      // Notify parent to update the UI (remove the interview from state)
      if (onDelete) onDelete(interview.mockId);  // This line will trigger UI update in the parent
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-blue-700">{interview?.jobPosition}</h2>
          <h2 className="text-sm text-gray-600">{interview?.jobExperience} Year of Experience</h2>
          <h2 className="text-xs text-gray-400">
            Created At:{" "}
            {interview?.createdAt
              ? new Date(interview.createdAt.toString()).toLocaleString()
              : "N/A"}
          </h2>
        </div>
        <Trash
          onClick={handleDelete}
          className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
        />
      </div>

      <div className="flex justify-between mt-3 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
