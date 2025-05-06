"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnsSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  // Append only the latest transcript, not all previous ones
  useEffect(() => {
    const lastResult = results[results.length - 1];
    if (lastResult?.transcript) {
      setUserAnswer(prevAns => prevAns + " " + lastResult.transcript);
    }
  }, [results]);

  // Reset user answer and results when a new question is selected
  useEffect(() => {
    setUserAnswer('');
    setResults([]);
  }, [activeQuestionIndex]);

  // Save the answer automatically when user finishes speaking
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = 
      "Question:" + mockInterviewQuestions[activeQuestionIndex]?.question +
      ", User Answer:" + userAnswer +
      ",Depends on question and user answer for give interview question" +
      "please give us rating for answer and feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = (result.response.text()).replace(/```json/g, "").replace(/```/g, "").trim();
    console.log(mockJsonResp);

    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    });

    if (resp) {
      toast("User Answer recorded successfully.");
      setUserAnswer('');
      setResults([]);
    }

    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-primary">
        <Image src={'/webcam.png'} width={200} height={200} alt="webcam" className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button 
        disabled={loading}
        variant="outline" 
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Start Recording'
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
