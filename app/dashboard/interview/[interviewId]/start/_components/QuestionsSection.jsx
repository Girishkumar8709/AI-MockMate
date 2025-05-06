import { Lightbulb, Volume2 } from "lucide-react";
import { useEffect, useState } from 'react';

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {
    const [hasSpoken, setHasSpoken] = useState(false);

    // Reset the hasSpoken state when the activeQuestionIndex changes
    useEffect(() => {
        setHasSpoken(false);
    }, [activeQuestionIndex]);

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);

            // Reset hasSpoken when speech ends
            speech.onend = () => {
                setHasSpoken(false); // Allow speech again after it ends
            };

            // Speak the text and mark hasSpoken as true
            if (!hasSpoken) {
                window.speechSynthesis.speak(speech);
                setHasSpoken(true);
            }
        } else {
            alert('Sorry, Your Browser does not support text to speech');
        }
    };

    return (
        <div className="p-5 border rounded-lg my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {mockInterviewQuestions && mockInterviewQuestions.map((question, index) => (
                    <h2
                        key={index}
                        className={`p-2 bg-blue rounded-full text-xs md:text-sm text-center cursor-pointer
                        ${activeQuestionIndex === index && 'bg-black text-white'}`}
                    >
                        Question #{index + 1}
                    </h2>
                ))}
            </div>
            <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
            <Volume2
                className="cursor-pointer"
                onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
            />
            <div className="border rounded-lg p-5 bg-blue-100 mt-20">
                <h2 className="flex gap-2 items-center text-blue-800">
                    <Lightbulb />
                    <strong>NOTE:</strong>
                </h2>
                <h2 className="text-sm text-blue-600 my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    );
}

export default QuestionsSection;
