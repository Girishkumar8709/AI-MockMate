"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Anjali Mehta",
    role: "Software Engineer Aspirant",
    content:
      "AI-MockMate helped me gain confidence by simulating real technical interviews. It felt just like the real thing!",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Rahul Verma",
    role: "Final-Year BTech Student",
    content:
      "With AI-MockMate, I was able to prepare for multiple roles quickly. It gave me tailored interview questions based on my goals.",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Nihal Kapoor",
    role: "Frontend Developer",
    content:
      "The mock interviews and feedback helped me crack my first job at a tech startup. AI-MockMate is a must-have!",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Vikram Singh",
    role: "Job Seeker",
    content:
      "AI-MockMate made it easy to practice behavioral and technical interviews on my schedule. Loved the realistic experience!",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const TestimonialsCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="flex flex-col justify-between h-full p-6">
                <p className="text-gray-600 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TestimonialsCarousel;
