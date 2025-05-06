"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      GetInterviewList();
    }
  }, [isLoaded, user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    console.log("Interview List:", result);
    setInterviewList(result);
  };

  const handleDelete = (mockId) => {
    setInterviewList((prevInterviewList) =>
      prevInterviewList.filter((interview) => interview.mockId !== mockId)
    );
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      {interviewList.length === 0 ? (
        <p className="text-gray-500  mt-4">No interview is created. Please create an interview.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {interviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              key={index}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
