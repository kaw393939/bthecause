const { fontFamily } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}', 
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: { 
        xs: ['0.75rem', '1.5'],    // 12px / 18px
        sm: ['0.875rem', '1.6'],   // 14px / 22px
        base: ['1rem', '1.7'],     // 16px / 27px - Crucial: 1.7 line-height for educational content
        lg: ['1.125rem', '1.5'],   // 18px / 27px
        xl: ['1.25rem', '1.4'],    // 20px / 28px
        '2xl': ['1.5rem', '1.3'],  // 24px / 31px
        '3xl': ['2rem', '1.25'],   // 32px / 40px
        '4xl': ['2.5rem', '1.2'],  // 40px / 48px
        '5xl': ['3rem', '1.2'],    // 48px / 58px
        '6xl': ['3.75rem', '1.1'], // 60px / 66px
      },
      spacing: {
        // Keep default spacing scale, rely on consistent application
      },
      colors: {
        // Custom colors defined in Bthecause color guide
        // Primary: Rich Purple/Indigo - Transformation, vision, possibility
        purple: {
          50: '#EDE9FA',  // Primary Lightest
          100: '#DCD4F5',
          200: '#BAA9EB',
          300: '#977FE1',
          400: '#7857E5',  // Primary Light
          500: '#5D3FD3',  // Primary Default
          600: '#4A32A8',  // Primary Dark
          700: '#3B289F',
          800: '#2C1E77',
          900: '#1D144F',
        },
        // Secondary: Vibrant Teal/Turquoise - Innovation, creation, building
        turquoise: {
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#2BC4DB',  // Secondary Light
          500: '#0CB4CE',  // Secondary Default
          600: '#0A98AE',  // Secondary Dark
          700: '#00838F',
          800: '#006064',
          900: '#004D40',
        },
        // Accent: Warm Amber - Human element, attention direction, warmth
        amber: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FBBF24',  // Accent Light
          500: '#F59E0B',  // Accent Default
          600: '#D97706',  // Accent Dark
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Use CSS variables defined in globals.css for theme colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-dark))', 
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          dark: 'hsl(var(--secondary-dark))', 
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))', 
        },
        success: {
          DEFAULT: 'hsl(var(--success))', 
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))', 
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          dark: 'hsl(var(--accent-dark))', 
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Updated font families based on typography guide v2.0
        heading: ['Montserrat', 'var(--font-montserrat)', ...fontFamily.sans],
        sans: ['Open Sans', 'var(--font-open-sans)', ...fontFamily.sans],
        mono: ['Fira Code', 'var(--font-mono)', ...fontFamily.mono],
      },
      keyframes: { 
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "typing": {
          "0%": { transform: "translateY(0px)", opacity: "0.4" },
          "50%": { transform: "translateY(-5px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0.4" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in-out forwards",
        "typing": "typing 1.2s infinite ease-in-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 
}
