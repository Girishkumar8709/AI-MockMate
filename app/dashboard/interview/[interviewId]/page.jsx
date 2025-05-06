"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview() {
  const params = useParams();
  const pathname = usePathname(); 

  console.log("Pathname:", pathname);  
  console.log("Params object:", params); // ✅ Debug params

  const interviewId = params?.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) {
      console.error("Interview ID is undefined!");
      return;
    }

    console.log("Fetching details for interview ID:", interviewId);
    GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      console.log("Fetching details for Interview ID:", interviewId);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
  
      console.log("Query Result:", result);
  
      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.error("No data found for Interview ID:", interviewId);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {loading ? (
              <h2 className="text-lg text-gray-500">Loading interview details...</h2>
            ) : interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Year of Experience:</strong> {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <h2 className="text-lg text-red-500">No interview data found!</h2>
            )}
          </div>

          <div className="p-5 border rounded-lg border-yellow-400 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebCamEnabled(true)}>Enable Web Cam with Microphone</Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        {interviewId ? (
          <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button>Start</Button>
          </Link>
        ) : (
          <p className="text-red-500">Error: No interview ID found!</p>
        )}
      </div>
    </div>
  );
}

export default Interview;

