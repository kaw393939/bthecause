'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose, 
  SheetHeader, 
  SheetTitle, 
} from "@/components/ui/sheet";
import { MenuIcon } from 'lucide-react';
import Button from '@/components/Common/Button';

const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Insights", path: "/insights" },
    { label: "Community", path: "/community" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40",
        "bg-white/95 dark:bg-neutral-950/95",
        "backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo - Updated to use the new logo with name included */}
        <Link href="/" className="flex items-center shrink-0 mr-4">
          <div className="flex items-center justify-center h-full">
            <Image
              src="/logo.png"
              alt="Bthecause Logo"
              width={180}
              height={30}
              className="dark:hidden"
              priority
            />
            <Image
              src="/logo.png"
              alt="Bthecause Logo"
              width={180}
              height={30}
              className="hidden dark:block invert"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex sm:items-center sm:gap-2 md:gap-4 lg:gap-6 flex-grow justify-end">
           {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className={cn(
                "text-sm font-medium px-2 py-1 rounded-lg transition-colors hover:bg-primary-50 hover:text-primary dark:hover:bg-primary-900/20 dark:hover:text-primary-light",
                pathname === item.path ? 
                  "text-primary dark:text-primary-light bg-primary-50 dark:bg-primary-900/20" : 
                  "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Trigger (Hamburger Menu) */}
        <div className="sm:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-6">
              {/* Optional Sheet Header */}
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Link href="/" className="flex items-center" onClick={(e) => (e.target as HTMLElement).closest<HTMLElement>('[data-radix-sheet-close]')?.click()}>
                    <div className="flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="Bthecause Logo"
                        width={150}
                        height={25}
                        className="dark:hidden"
                        priority
                      />
                      <Image
                        src="/logo.png"
                        alt="Bthecause Logo"
                        width={150}
                        height={25}
                        className="hidden dark:block invert"
                        priority
                      />
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center py-2 px-3 text-base font-medium rounded-lg transition-colors hover:bg-primary-50 hover:text-primary dark:hover:bg-primary-900/20 dark:hover:text-primary-light",
                        pathname === item.path ? 
                          "text-primary dark:text-primary-light bg-primary-50 dark:bg-primary-900/20" : 
                          "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* CTAs and Dark Mode Switch */}
        <div className="hidden sm:flex items-center ml-4 gap-2">
          <Button variant="outline" size="sm" href="/contact" className="hidden md:inline-flex">
            Contact Us
          </Button>
          <Button variant="primary" size="sm" href="/about/learning-lab">
            The Lab
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
