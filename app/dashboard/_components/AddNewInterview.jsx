"use client"; 
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db"; // Database Import
import { chatSession } from "@/utils/GeminiAiModel";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (jsonResponse.length > 0) {
      console.log("Updated JSON Response:", jsonResponse);
    }
  }, [jsonResponse]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Input Values:", { jobPosition, jobDesc, jobExperience });

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 
    Provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. 
    Ensure the response includes only a valid JSON array with objects having "question" and "answer" fields.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = await result.response.text();

      // Clean AI response
      MockJsonResp = MockJsonResp.replace(/```json/g, "").replace(/```/g, "").trim();

      let parsedJson;
      try {
        parsedJson = JSON.parse(MockJsonResp);

        // Validate JSON Structure
        if (!Array.isArray(parsedJson) || !parsedJson.every(q => q.question && q.answer)) {
          throw new Error("Invalid JSON format");
        }

        console.log("Final Parsed JSON before setting state:", parsedJson);
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        alert("Error: Invalid JSON format from AI response.");
        setLoading(false);
        return;
      }

      setJsonResponse(parsedJson);

      // ✅ Generate unique ID for interview
      const mockId = uuidv4();
      console.log("Generated UUID:", mockId);

      if (parsedJson.length > 0) {
        const resp = await db.insert(MockInterview)
          .values({
            mockId: mockId,
            jsonMockResp: JSON.stringify(parsedJson), 
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
            createdAt: new Date(),
          })
          .execute();

        console.log("Database Insert Response:", resp);

        // ✅ Fix: Ensure valid `mockId`
        if (resp?.length > 0 && resp[0]?.mockId) {
          console.log("Navigating to:", `/dashboard/interview/${resp[0].mockId}`);
          router.push(`/dashboard/interview/${resp[0].mockId}`);
        } else {
          console.warn("Warning: No mockId returned from database. Using fallback.");
          router.push(`/dashboard/interview/${mockId}`);
        }

        setOpenDailog(false);
      } else {
        console.log("Error: No valid JSON response received.");
      }
    } catch (error) {
      console.error("Error in AI Response:", error);
      alert("Error occurred while fetching AI response.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg">+ Add New</h2>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create a New Interview</DialogTitle>
            {/* Replace DialogDescription with a custom div */}
            <div className="text-sm text-muted-foreground">
              <h2>Enter job details for the interview</h2>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Job Role/Job Position</h2>
                  <Input 
                    value={jobPosition} 
                    onChange={(e) => setJobPosition(e.target.value)} 
                    placeholder="Ex. Full Stack Developer, Java Developer" 
                    required 
                  />
                </div>
                <div className="mt-7 my-3">
                  <h2>Job Description/Tech Stack (In Short)</h2>
                  <Textarea 
                    value={jobDesc} 
                    onChange={(e) => setJobDesc(e.target.value)} 
                    placeholder="Ex. React, Angular, Node.js, etc." 
                    required 
                  />
                </div>
                <div className="my-3">
                  <h2>Years of Experience</h2>
                  <Input 
                    value={jobExperience} 
                    onChange={(e) => setJobExperience(e.target.value)} 
                    placeholder="Ex. 5" 
                    max="50" 
                    type="number" 
                    required 
                  />
                </div>

                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating Interview..." : "Start Interview"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
