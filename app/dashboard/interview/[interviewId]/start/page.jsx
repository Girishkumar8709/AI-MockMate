"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useParams } from "next/navigation"; // ✅ Import useParams
import { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSection from "./_components/RecordAnsSection";

function StartInterview() {
  const params = useParams(); 
  const interviewId = params?.interviewId; 

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]); 

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.error("No interview found with ID:", interviewId);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
  <div className="pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}

        <QuestionsSection mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* videos/audio recording */}
        <RecordAnsSection
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
    </div>
    <div className="flex justify-end gap-6">
      {activeQuestionIndex>0&&
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
      {activeQuestionIndex!=mockInterviewQuestions?.length-1&&
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
      {activeQuestionIndex==mockInterviewQuestions?.length-1&&
      <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
      <Button>End Interview</Button>
      </Link>}
    </div>
     </div>
)
}

export default StartInterview;
