"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Feedback() {
  const params = useParams();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    // Calculate average rating
    const ratings = result.map((item) => parseFloat(item.rating));
    const avg =
      ratings.length > 0
        ? ratings.reduce((acc, val) => acc + val, 0) / ratings.length
        : 0;

    setAverageRating(avg.toFixed(1)); // Limit to 1 decimal place
  };

  return (
    <div className="p-10 space-y-4">
      {feedbackList?.length === 0 ? (
        <h2>No Interview Feedback Found, Start The Interview For Feedback.</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview result</h2>

          <h2 className="text-primary text-lg my-3">
            Your overall interview rating:{" "}
            <strong>{averageRating}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer, and feedback for improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                {item.question}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer:</strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                    <strong>Feedback:</strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default Feedback;
