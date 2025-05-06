
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TestimonialsCarousel from "@/components/ui/testimonials";
import { ArrowRight, ClipboardPenLine, MonitorStop, NotepadText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: MonitorStop,
    title: "Realistic Mock Interviews",
    description: "Simulate technical and behavioral interviews tailored to your role and experience level. ",
  },
  {
    icon: NotepadText,
    title: "Custom Interview Generatioon",
    description: "Create personalized mock interviews based on your job role, experience level, and selected topics.",
  },
  {
    icon: ClipboardPenLine,
    title: "AI-Powered Feedback",
    description: "Receive instant, personalized feedback on your answers to improve clarity, confidence, and communication.",
  },
];



const Home = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold gradient-title pb-6">
            AI-Mock-Mate
          </h1>
          <p className="text-xl text-gray-600 mb-10">
          AI-MockMate is an AI-powered platform that simulates real interview scenarios to help you practice and improve your skills. Get personalized feedback and track your progress to ace your next interview with confidence.
          </p>
          <Link href={"/dashboard"}>
            <Button size="lg" className="text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="Scheduling illustration"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                <CardTitle className="text-center text-blue-600">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What Our Users Say
        </h2>
        <TestimonialsCarousel />
      </div>



      {/* CTA Section */}
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Your Interview?
        </h2>
        <p className="text-xl mb-6">
        Join thousands of professionals who trust AI-MockMate to simulate real interview scenarios.
        </p>
        <Link href={"/dashboard"}>
          <Button size="lg" variant="secondary" className="text-blue-600">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
