'use client';
import React from 'react';
import Link from 'next/link';
import SocialIcons from '../Common/SocialIcons';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-12 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 font-sans">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between gap-y-10 gap-x-8 md:gap-x-16">

          <div className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5">
            <h3 className="font-heading font-semibold text-xl mb-3 text-gray-900 dark:text-white flex items-center"> 
              <div className="mr-2">
                <Image
                  className="dark:invert"
                  src="/logo.png"
                  alt="Bthecause Logo"
                  width={180}
                  height={30}
                  priority
                />
              </div>
            </h3>
            <p className="text-sm mb-6 leading-relaxed">
              Empowering young people with the tools, resources, and support to create the greatest chance for success in education, employment, and life.
            </p>
            
            <div className="mt-6">
              <h4 className="font-heading font-semibold text-base mb-3 text-gray-900 dark:text-white">Connect With Us</h4>
              <div className="flex space-x-3"> 
                <SocialIcons />
              </div>
            </div>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="font-heading font-semibold text-base mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"> 
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              {[ 
                { href: '/#about', label: 'About Us' },
                { href: '/#services', label: 'Services' },
                { href: '/about/learning-lab', label: 'Learning Lab' },
                { href: '/insights', label: 'Insights' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`text-sm hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-150 flex items-center`}
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-75"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="w-1/2 sm:w-auto md:w-auto lg:w-auto">
            <h3 className="font-heading font-semibold text-base mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"> 
              Resources
            </h3>
            <nav className="flex flex-col space-y-3">
              {[ 
                { href: '/about/learning-lab', label: 'Learning Lab' },
                { href: '/research', label: 'Research' },
                { href: '/insights/tag/education', label: 'Education' },
                { href: '/insights/tag/innovation', label: 'Innovation' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`text-sm hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-150 flex items-center`}
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-75"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs">
            &copy; {currentYear} 
            <span className="inline-flex items-center mx-1">
              <Image 
                src="/logo.png" 
                alt="Bthecause Logo" 
                width={70} 
                height={12} 
                className="inline-block dark:invert" 
              />
            </span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
