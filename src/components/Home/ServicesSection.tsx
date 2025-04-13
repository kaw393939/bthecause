'use client';

import React from 'react';
import SectionHeading from '../Common/SectionHeading';
import Paragraph from '../Common/Paragraph';
import Button from '../Common/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData } from '@/types/service';

interface ServiceCardProps {
  title: string;
  description: string | undefined;
  imageSrc: string | undefined;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, href }) => {
  // Ensure image path has a space where needed to match actual filenames
  const fixedImageSrc = imageSrc?.includes("3_1_Intelligent_Content.png") 
    ? imageSrc.replace("3_1_Intelligent_Content.png", "3_1_Intelligent _Content.png") 
    : imageSrc;
    
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image 
          src={fixedImageSrc || '/images/services/default.png'} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description || 'Learn more about this service'}</p>
        <Link 
          href={href}
          className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  services: ServiceData[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-neutral-900" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeading className="md:text-5xl mb-4">
            Educational Renaissance Solutions
          </SectionHeading>
          <div className="max-w-3xl mx-auto">
            <Paragraph className="text-center text-lg text-neutral-700 dark:text-neutral-300">
              Moving beyond the Prussian model to a classical, human-centered education augmented by AI. Our solutions blend timeless educational ideals with cutting-edge technology.
            </Paragraph>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard 
              key={service.slug}
              title={service.title}
              description={service.excerpt}
              imageSrc={service.image}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            href="/services"
            variant="primary"
            className="font-semibold"
          >
            Explore Our Complete Solutions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
