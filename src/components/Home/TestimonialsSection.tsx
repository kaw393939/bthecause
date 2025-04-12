import React from 'react';
import { getAllTestimonials, TestimonialData } from '@/lib/testimonialUtils'; 
import SectionHeading from '../Common/SectionHeading';
import TestimonialCard from '../Testimonials/TestimonialCard';
import Button from '../Common/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsSectionProps {
  maxItems?: number;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ maxItems }) => {
  const allTestimonials = getAllTestimonials(); 

  const testimonialsToDisplay = maxItems 
    ? allTestimonials.slice(0, maxItems) 
    : allTestimonials;

  if (testimonialsToDisplay.length === 0) {
    return null;
  }

  return (
    <div className="py-16">
      <SectionHeading align="center" className="md:text-5xl mb-12 font-heading font-semibold text-neutral-900 dark:text-white">
        What Our Partners Say
      </SectionHeading>
      
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-neutral-800 dark:text-neutral-200 text-lg">
          Educational leaders trust our organization to guide their 
          <span className="text-primary font-medium"> educational transformation journey</span>
        </p>
      </div>

      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="mx-auto max-w-5xl"
      >
        <CarouselContent>
          {testimonialsToDisplay.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-2">
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex justify-center gap-2 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0" />
          <CarouselNext className="relative inset-0 translate-y-0" />
        </div>
      </Carousel>

      {maxItems && allTestimonials.length > maxItems && (
        <div className="mt-12 text-center">
          <Button 
            href="/testimonials" 
            variant="primary"
            size="lg"
            className="shadow-md font-medium"
          >
            View All Testimonials
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSection;
