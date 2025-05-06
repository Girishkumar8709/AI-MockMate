"use client"

const howItWorks = [
  { step: "Sign Up", description: "Create your free Schedulrr account" },
  {
    step: "Go To Add New",
    description: "Enter your job details",
  },
  {
    step: "CLick On Start Interview",
    description: "AI will generate 10 Questions for you answer them all",
  },
  {
    step: "End Interview",
    description: "You will get the feedback at the end of your interview",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {howItWorks.map((step, index) => (
          <div key={index} className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">
                {index + 1}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
