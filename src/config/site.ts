/**
 * Site configuration for Bthecause
 * Contains default metadata, URLs, and other site-wide settings
 */
export const siteConfig = {
  name: "Bthecause",
  description: "Bthecause champions the Educational Renaissance - moving beyond the Prussian model to create cognitive resilience through classical education enhanced by AI.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://bthecause.com",
  ogImage: "/logo.png",
  author: "Keith Williams and Michael B. Minor",
  twitterHandle: "@bthecause",
  keywords: [
    "Educational Renaissance", 
    "Cognitive Resilience", 
    "AI in Education", 
    "Classical Education", 
    "Prussian Model",
    "Genesis Engine",
    "Socratic Dialogue",
    "Personalized Learning"
  ],
  links: {
    twitter: "https://twitter.com/bthecause",
    github: "https://github.com/bthecause",
    linkedin: "https://www.linkedin.com/in/keithwilliams5/",
    youtube: "https://www.youtube.com/@Firehose360",
    discord: "https://discord.gg/fp4NrUjCa5"
  },
};
