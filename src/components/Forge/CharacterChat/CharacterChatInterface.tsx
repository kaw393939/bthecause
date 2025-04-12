'use client';

import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import Image from 'next/image';
import { Search, Menu, ArrowRight } from 'lucide-react';
import Button from '@/components/Common/Button';

// Message interface
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  status?: 'sending' | 'sent' | 'failed' | 'typing';
  options?: MessageOption[];
}

// Interface for clickable message options
interface MessageOption {
  id: string;
  text: string;
  action?: string;
}

// Character data interface
export interface CharacterData {
  id: string;
  name: string;
  title?: string;
  description?: string;
  profile_picture?: string;
  shortBio?: string;
  systemPrompt?: string;
  conversationTopics?: string[];
  structured_messages?: {
    welcome?: {
      text: string;
      options: Array<{
        text: string;
        action: string;
      }>;
    };
    [key: string]: any;
  };
  background?: any;
  cognitive_profile?: any;
  emotional_profile?: any;
  social_profile?: any;
  philosophical_stance?: any;
  speech_patterns?: any;
}

// API endpoint configuration
const API_ENDPOINTS = {
  characterChat: () => '/api/characters/chat',
};

/**
 * Get character image with fallback
 * @param characterId The ID of the character to get an image for
 * @returns The URL path to the character's image
 */
function getCharacterImagePath(characterId: string): string {
  // Character images are directly in the characters directory
  return `/characters/${characterId}.png`;
}

/**
 * Handle errors when loading character images
 * Provides graceful fallback to alternative image sources
 * @param e The error event from the image
 * @param characterId The ID of the character whose image failed to load
 */
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, characterId: string) => {
  const target = e.target as HTMLImageElement;
  
  // Try alternate locations for the image
  const alternateLocations = [
    `/characters/images/${characterId}.png`,
    '/images/default-avatar.svg',
    '/characters/images/default-avatar.png'
  ];
  
  // Use the first location that hasn't been tried yet
  const currentSrc = target.src;
  const alternateIndex = alternateLocations.findIndex(loc => 
    !currentSrc.endsWith(new URL(loc, window.location.origin).pathname)
  );
  
  if (alternateIndex >= 0) {
    target.src = alternateLocations[alternateIndex];
  } else {
    // If all alternates have been tried, use a data URI for a generic avatar
    target.src = '/images/default-avatar.svg';
  }
};

interface CharacterChatInterfaceProps {
  initialCharacters: CharacterData[];
  title?: string;
  subtitle?: string;
}

/**
 * Generate a simple identicon string based on text
 * This creates a reproducible colored SVG-like pattern for a user
 * @param text The text to generate an identicon for
 * @returns An SVG with a unique pattern based on the text
 */
const generateIdenticon = (text: string): string => {
  // Create a hash from the text
  let hash = 0;
  for (let i = 0; i <text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use hash to generate a color
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 30);
  const lightness = 45 + (Math.abs(hash) % 10);
  
  // Create SVG with a unique pattern based on the hash
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="hsl(${hue}, ${saturation}%, ${lightness}%)" />
      <g fill="rgba(255, 255, 255, 0.5)">
        ${Array.from({length: 5}).map((_, i) => 
          Array.from({length: 5}).map((_, j) => {
            // Use the hash to determine if this cell should be filled
            const shouldFill = ((hash >> (i * 5 + j)) & 1) === 1;
            return shouldFill ? `<rect x="${j*8}" y="${i*8}" width="8" height="8" />` : '';
          }).join('')
        ).join('')}
      </g>
    </svg>
  `;
};

/**
 * Convert SVG string to a data URI
 * @param svg The SVG string to convert
 * @returns A data URI for the SVG
 */
const svgToDataURI = (svg: string): string => {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Helper to parse message content for options
const parseMessageForOptions = (content: string): { text: string, options: MessageOption[] } => {
  // Check if the message contains a bulleted list
  if (!content.includes('•')) {
    return { text: content, options: [] };
  }
  
  // Split by bullet points
  const parts = content.split('•');
  const mainText = parts[0].trim();
  
  // Extract options from bullet points
  const options = parts.slice(1).map((option, index) => ({
    id: `option_${Date.now()}_${index}`,
    text: option.trim(),
    action: option.trim()
  }));
  
  return { text: mainText, options };
};

// Helper to parse structured JSON if necessary
const tryParseJSON = (content: string): { text: string, options: MessageOption[] } => {
  try {
    if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
      const parsed = JSON.parse(content);
      if (parsed.text && Array.isArray(parsed.options)) {
        return {
          text: parsed.text,
          options: parsed.options.map((opt: any, i: number) => ({
            id: `option_${Date.now()}_${i}`,
            text: opt.text,
            action: opt.action || opt.text
          }))
        };
      }
    }
  } catch (e) {
    // Not valid JSON, continue with normal parsing
  }
  
  return parseMessageForOptions(content);
};

/**
 * Character Chat Interface component
 * Provides a rich interface for interacting with AI characters
 * 
 * @param initialCharacters - Array of character data to populate the interface
 * @param title - Optional title for the chat interface
 * @param subtitle - Optional subtitle for the chat interface
 */
export default function CharacterChatInterface({ 
  initialCharacters,
  title = "Character Chat",
  subtitle = "Chat with AI characters"
}: CharacterChatInterfaceProps) {
  // State
  const [characters] = useState<CharacterData[]>(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isImageLoading, setIsImageLoading] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userIdenticon, setUserIdenticon] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Message state management with useReducer
  interface MessageState {
    characterId: string | null;
    messages: Message[];
  }

  const initialMessageState: MessageState = {
    characterId: null,
    messages: []
  };

  const [messageState, dispatchMessages] = useReducer((state: MessageState, action: { 
    type: string; 
    message?: Message; 
    messages?: Message[];
    tempId?: string; 
    id?: string; 
    updates?: Partial<Message>;
    characterId?: string;
  }) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.message!]
        };
      case 'REPLACE_MESSAGE':
        return {
          ...state,
          messages: state.messages.map(message => message.id === action.tempId ? action.message! : message)
        };
      case 'UPDATE_MESSAGE':
        return {
          ...state,
          messages: state.messages.map(message => message.id === action.id ? { ...message, ...action.updates } : message)
        };
      case 'CLEAR_MESSAGES':
        return {
          ...state,
          characterId: action.characterId || null,
          messages: []
        };
      case 'SET_CHARACTER_MESSAGES':
        return {
          characterId: action.characterId!,
          messages: action.messages || []
        };
      case 'REMOVE_MESSAGE':
        return {
          ...state,
          messages: state.messages.filter(message => message.id !== action.id)
        };
      default:
        return state;
    }
  }, initialMessageState);

  // Create a session storage for conversations by character
  const [sessionConversations, setSessionConversations] = useState<Record<string, Message[]>>({});

  // Set initial character when component loads
  useEffect(() => {
    if (characters.length > 0 && !selectedCharacter) {
      setSelectedCharacter(characters[0]);
      
      // Generate a random identicon for this session
      const sessionId = `user_${Date.now()}`;
      const identiconSvg = generateIdenticon(sessionId);
      setUserIdenticon(svgToDataURI(identiconSvg));
    }
  }, [characters, selectedCharacter]);

  // Scroll to bottom of messages - only when appropriate
  useEffect(() => {
    if (messageState.messages.length > 0) {
      // Only auto-scroll if we're near the bottom already or it's a new message
      const container = messagesEndRef.current?.parentElement;
      if (container) {
        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        const lastMessage = messageState.messages[messageState.messages.length - 1];
        const isNewUserMessage = lastMessage.role === 'user' && lastMessage.status === 'sending';
        const isNewAssistantMessage = lastMessage.role === 'assistant' && !lastMessage.status;
        
        if (isNearBottom || isNewUserMessage || isNewAssistantMessage) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }
  }, [messageState.messages]);

  // Auto focus the input field when a character is selected
  useEffect(() => {
    if (selectedCharacter && !isStreaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedCharacter, isStreaming]);

  // Filter characters based on search term
  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (character.title && character.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /**
   * Handle sending a message to the selected character
   * Manages the API request, streaming response, and UI updates
   * 
   * @param e - Form submission event
   */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !selectedCharacter) return;
    
    // Cancel any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Create user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: messageText,
      role: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending'
    };
    
    // Add user message to state
    dispatchMessages({ type: 'ADD_MESSAGE', message: userMessage });
    
    // Create typing indicator
    const typingMessage: Message = {
      id: `typing_${Date.now()}`,
      content: '',
      role: 'assistant',
      timestamp: new Date().toISOString(),
      status: 'typing'
    };
    
    // Add typing indicator
    dispatchMessages({ type: 'ADD_MESSAGE', message: typingMessage });
    
    // Clear input field
    setMessageText('');
    setIsStreaming(true);
    
    // Scroll to the bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
    
    // Create abort controller
    abortControllerRef.current = new AbortController();
    
    // Extract previous messages for context (last 10 messages)
    const previousMessages = messageState.messages
      .slice(-10)
      .filter(m => m.status !== 'typing')
      .map(m => ({
        role: m.role,
        content: m.content
      }));
    
    // Make the fetch request
    fetch(API_ENDPOINTS.characterChat(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        characterId: selectedCharacter.id,
        message: messageText,
        conversationHistory: previousMessages,
        stream: true
      }),
      signal: abortControllerRef.current.signal
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Get reader from response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('ReadableStream not supported');
      
      let assistantResponse = '';
      let isFirstChunk = true;
      let assistantMessageId = '';
      
      // Function to process stream
      function readStream() {
        // Using non-null assertion since we've already checked reader exists
        reader!.read().then(({ done, value }) => {
          if (done) {
            // Stream completed
            setIsStreaming(false);
            return;
          }
          
          // Process this chunk
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            const content = line.replace(/^data: /, '').trim();
            if (!content || content === '[DONE]') continue;
            
            try {
              const data = JSON.parse(content);
              
              if (data.error) {
                // Handle error
                dispatchMessages({
                  type: 'UPDATE_MESSAGE',
                  id: typingMessage.id,
                  updates: {
                    content: `Error: ${data.error}`,
                    status: 'failed'
                  }
                });
                setIsStreaming(false);
                setErrorMessage(`Failed to get response: ${data.error}`);
                return;
              }
              
              if (data.content || data.chunk) {
                const chunkContent = data.content || data.chunk || '';
                
                if (isFirstChunk) {
                  // First chunk, create new message
                  isFirstChunk = false;
                  assistantResponse = chunkContent;
                  assistantMessageId = `assistant_${Date.now()}`;
                  
                  // Replace typing indicator with actual message
                  dispatchMessages({
                    type: 'REPLACE_MESSAGE',
                    tempId: typingMessage.id,
                    message: {
                      id: assistantMessageId,
                      content: chunkContent,
                      role: 'assistant',
                      timestamp: new Date().toISOString()
                    }
                  });
                } else {
                  // Append to existing message
                  assistantResponse += chunkContent;
                  
                  // Update message content
                  dispatchMessages({
                    type: 'UPDATE_MESSAGE',
                    id: assistantMessageId,
                    updates: {
                      content: assistantResponse
                    }
                  });
                }
              }
            } catch (e) {
              console.warn('Error parsing chunk:', e);
            }
          }
          
          // Continue reading
          readStream();
        }).catch(error => {
          if (error.name === 'AbortError') {
            console.log('Stream aborted by user');
          } else {
            console.error('Error reading stream:', error);
            
            // Update typing indicator with error
            dispatchMessages({
              type: 'UPDATE_MESSAGE',
              id: typingMessage.id,
              updates: {
                content: `Error: ${error.message || 'Failed to get response'}`,
                status: 'failed'
              }
            });
            setIsStreaming(false);
            setErrorMessage(`Failed to get response: ${error.message || 'Failed to connect to the server'}`);
          }
        });
      }
      
      // Start reading the stream
      readStream();
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Request aborted by user');
      } else {
        console.error('Fetch error:', error);
        
        // Update typing indicator with error
        dispatchMessages({
          type: 'UPDATE_MESSAGE',
          id: typingMessage.id,
          updates: {
            content: `Error: ${error.message || 'Failed to connect to the server'}`,
            status: 'failed'
          }
        });
        setIsStreaming(false);
        setErrorMessage(`Failed to get response: ${error.message || 'Failed to connect to the server'}`);
      }
    });
  };

  /**
   * Handle stopping the current response generation
   * Aborts the ongoing fetch request to stop the streaming response
   */
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  };

  /**
   * Handle selecting a conversation starter
   * Sets the message text to the selected starter and focuses the input field
   * 
   * @param starter - The conversation starter text to use
   */
  const handleConversationStarter = (starter: string) => {
    setMessageText(starter);
    // Auto-submit the message
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent;
    handleSendMessage(syntheticEvent);
  };

  /**
   * Handle selecting a character
   * Sets the selected character and clears messages
   * 
   * @param character - The character to select
   */
  const handleCharacterSelect = (character: CharacterData) => {
    // Check if we have cached messages for this character
    if (sessionConversations[character.id]?.length > 0) {
      // Restore the conversation for this character
      dispatchMessages({ 
        type: 'SET_CHARACTER_MESSAGES', 
        characterId: character.id,
        messages: sessionConversations[character.id] 
      });
    } else {
      // Start a new conversation
      setSelectedCharacter(character);
      dispatchMessages({ type: 'CLEAR_MESSAGES', characterId: character.id });
      
      // Add welcome message from character with conversation starters
      if (character.structured_messages?.welcome) {
        // Use structured welcome message if available
        const welcomeData = character.structured_messages.welcome;
        const welcomeMessage: Message = {
          id: `assistant_welcome_${Date.now()}`,
          content: JSON.stringify({
            text: welcomeData.text,
            options: welcomeData.options
          }),
          role: 'assistant',
          timestamp: new Date().toISOString(),
          options: welcomeData.options.map((opt, index) => ({
            id: `option_${Date.now()}_${index}`,
            text: opt.text,
            action: opt.action
          }))
        };
        
        dispatchMessages({ type: 'ADD_MESSAGE', message: welcomeMessage });
      } else if (character.conversationTopics && character.conversationTopics.length > 0) {
        // Fall back to legacy conversation topics if structured messages aren't available
        const welcomeText = `Hello, I'm ${character.name}${character.title ? `, ${character.title}` : ''}. What would you like to discuss today?\n\nHere are some topics we could explore:`;
        
        const topicList = character.conversationTopics.map(topic => `• ${topic}`).join('\n');
        
        const welcomeMessage: Message = {
          id: `assistant_welcome_${Date.now()}`,
          content: `${welcomeText}\n\n${topicList}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          options: character.conversationTopics.map((topic, index) => ({
            id: `option_${Date.now()}_${index}`,
            text: topic,
            action: topic
          }))
        };
        
        dispatchMessages({ type: 'ADD_MESSAGE', message: welcomeMessage });
      }
    }
    
    setSelectedCharacter(character);
    setIsMobileMenuOpen(false);
  };

  /**
   * Handle clicking a message option
   * Similar to conversation starter but initiated from inside a message
   * 
   * @param optionText - The text of the option to use
   */
  const handleMessageOption = (optionText: string) => {
    setMessageText(optionText);
    // Auto-submit the message
    const syntheticEvent = {
      preventDefault: () => {}
    } as React.FormEvent;
    handleSendMessage(syntheticEvent);
  };

  // Handle keyboard navigation for character selection
  const handleKeyNavigation = useCallback((e: React.KeyboardEvent, characterId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const character = characters.find(c => c.id === characterId);
      if (character) {
        handleCharacterSelect(character);
      }
    }
  }, [characters]);

  /**
   * Renders a message bubble for user or assistant messages
   * Includes proper styling and typing indicators
   * Enhanced to support interactive options
   * 
   * @param message - The message object to render
   * @returns JSX for the message bubble
   */
  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    
    // Handle typing indicator
    if (message.status === 'typing') {
      return (
        <div className="flex items-start mb-4" key={message.id}>
          <div className="flex-shrink-0 mr-2">
            {selectedCharacter && (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={getCharacterImagePath(selectedCharacter.id)}
                  alt={selectedCharacter.name}
                  width={32}
                  height={32}
                  className="object-cover"
                  onError={(e) => handleImageError(e, selectedCharacter.id)}
                />
              </div>
            )}
          </div>
          <div 
            className="px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 max-w-[75%]"
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary/40 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary/40 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 bg-primary/40 dark:bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
            <span className="sr-only">Character is typing...</span>
          </div>
        </div>
      );
    }

    // Parse content for potential interactive elements
    let parsedContent = { text: message.content, options: message.options || [] };
    
    // If no pre-parsed options exist, try to parse the message content
    if (!message.options || message.options.length === 0) {
      parsedContent = tryParseJSON(message.content);
    }
    
    return (
      <div 
        className={`flex items-start mb-4 ${isUser ? 'justify-end' : ''}`} 
        key={message.id}
      >
        {!isUser && (
          <div className="flex-shrink-0 mr-2">
            {selectedCharacter && (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={getCharacterImagePath(selectedCharacter.id)}
                  alt={selectedCharacter.name}
                  width={32}
                  height={32}
                  className="object-cover"
                  onError={(e) => handleImageError(e, selectedCharacter.id)}
                />
              </div>
            )}
          </div>
        )}
        
        <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div 
            className={`px-4 py-3 rounded-lg ${
              isUser 
                ? 'bg-primary text-white ml-2 shadow-sm' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-sm'
            } ${message.status === 'failed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : ''}`}
          >
            <p className="whitespace-pre-wrap">{parsedContent.text}</p>
          </div>
          
          {/* Interactive Options - Only show on assistant messages */}
          {!isUser && parsedContent.options && parsedContent.options.length > 0 && (
            <div className="mt-3 space-y-2 w-full">
              {parsedContent.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleMessageOption(option.action || option.text)}
                  className="flex items-center justify-between w-full text-left px-4 py-3 rounded-md 
                    bg-white dark:bg-gray-800 hover:bg-primary-lightest dark:hover:bg-primary-dark/10 
                    text-neutral-800 dark:text-neutral-200 transition-all duration-200 
                    border border-neutral-200 dark:border-neutral-700 
                    shadow-sm hover:shadow-md transform hover:-translate-y-px
                    font-poppins"
                >
                  <span className="font-medium mr-2">{option.text}</span>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-primary dark:text-primary-light" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              {userIdenticon ? (
                <img src={userIdenticon} alt="User" className="w-full h-full" />
              ) : (
                <svg 
                  className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Handle image loading
  const handleImageLoad = useCallback((characterId: string) => {
    setIsImageLoading(prev => ({
      ...prev,
      [characterId]: false
    }));
  }, []);

  // Set image loading state
  const setImageLoading = useCallback((characterId: string) => {
    setIsImageLoading(prev => ({
      ...prev,
      [characterId]: true
    }));
  }, []);

  // Update the session conversation cache when messages change
  useEffect(() => {
    if (selectedCharacter && messageState.messages.length > 0) {
      setSessionConversations(prev => ({
        ...prev,
        [selectedCharacter.id]: messageState.messages
      }));
    }
  }, [messageState.messages, selectedCharacter]);

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Character Selection Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
        w-full md:w-80 lg:w-96 h-full md:h-auto
        border-r border-neutral-200 dark:border-neutral-700
        bg-white dark:bg-neutral-950
        overflow-hidden flex flex-col z-20 md:z-0
        ${isMobileMenuOpen ? 'absolute inset-0' : ''}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-poppins font-semibold text-neutral-900 dark:text-white">Genesis Engine</h2>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Info/Subtitle */}
        <div className="p-4 bg-primary-lightest dark:bg-primary-dark/20 text-neutral-800 dark:text-neutral-200">
          <p className="text-sm">Transformation Catalysts</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Converse with AI characters designed to challenge conventional thinking and inspire innovation.
          </p>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Discover characters..."
              className="w-full p-2 pl-8 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent
                       text-neutral-800 dark:text-neutral-200"
              aria-label="Search characters"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary/70 w-4 h-4" />
          </div>
        </div>
        
        {/* Character list */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredCharacters.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-400 text-center py-4">No characters found</p>
          ) : (
            <div className="space-y-2">
              {filteredCharacters.map(character => (
                <div 
                  key={character.id}
                  onClick={() => handleCharacterSelect(character)}
                  onKeyDown={(e) => handleKeyNavigation(e, character.id)}
                  tabIndex={0}
                  className={`
                    flex items-center p-4 cursor-pointer transition-all duration-200
                    ${selectedCharacter?.id === character.id 
                      ? 'bg-primary-lightest dark:bg-primary-dark/20 border-l-4 border-primary dark:border-primary-light' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-transparent'}
                    ${isImageLoading[character.id] ? 'opacity-70' : 'opacity-100'}
                  `}
                  role="button"
                  aria-pressed={selectedCharacter?.id === character.id}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4 flex-shrink-0">
                    <Image
                      src={getCharacterImagePath(character.id)}
                      alt={character.name}
                      width={48}
                      height={48}
                      className="object-cover"
                      onError={(e) => handleImageError(e, character.id)}
                      onLoad={() => handleImageLoad(character.id)}
                      onLoadStart={() => setImageLoading(character.id)}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-neutral-900 dark:text-white truncate">{character.name}</h3>
                    {character.title && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{character.title}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile menu toggle */}
        {!isMobileMenuOpen && (
          <button
            className="md:hidden absolute top-4 left-4 z-10 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md 
                       text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open character selection"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* Empty state - no character selected */}
        {!selectedCharacter && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-lightest dark:bg-primary-dark/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-poppins font-semibold text-neutral-900 dark:text-white mb-2">Select a Character</h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
              Choose a character from the left to start a conversation. Each character brings unique perspectives to help inspire innovative thinking.
            </p>
          </div>
        )}
        
        {/* Conversation Area - Only show when character selected */}
        {selectedCharacter && (
          <div className="flex-1 flex flex-col h-full">
            {/* Character info header */}
            <div className="flex items-center p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-sm m-4
                           border border-neutral-200 dark:border-neutral-700">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 mr-3">
                <Image
                  src={getCharacterImagePath(selectedCharacter.id)}
                  alt={selectedCharacter.name}
                  width={40}
                  height={40}
                  className="object-cover"
                  onError={(e) => handleImageError(e, selectedCharacter.id)}
                />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-neutral-900 dark:text-white">{selectedCharacter.name}</h3>
                {selectedCharacter.title && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{selectedCharacter.title}</p>
                )}
              </div>
            </div>
            
            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 bg-neutral-50 dark:bg-neutral-900"
              ref={messagesEndRef}
              aria-live="polite"
              aria-relevant="additions"
              id="messages-container"
            >
              {messageState.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center pb-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4 ring-4 ring-primary/20">
                    <Image
                      src={getCharacterImagePath(selectedCharacter.id)}
                      alt={selectedCharacter.name}
                      fill
                      sizes="96px"
                      className="object-cover z-10"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => handleImageError(e, selectedCharacter.id)}
                      onLoad={() => handleImageLoad(selectedCharacter.id)}
                      onLoadStart={() => setImageLoading(selectedCharacter.id)}
                      priority
                    />
                    {isImageLoading[selectedCharacter.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold font-poppins text-neutral-900 dark:text-white mb-2">
                    {selectedCharacter.name}
                  </h2>
                  {selectedCharacter.title && (
                    <p className="text-base font-medium text-primary dark:text-primary-light mb-2">
                      {selectedCharacter.title}
                    </p>
                  )}
                  {selectedCharacter.shortBio && (
                    <p className="text-center text-neutral-600 dark:text-neutral-400 max-w-md mb-6 leading-relaxed">
                      {selectedCharacter.shortBio}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {messageState.messages.map(message => renderMessage(message))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {/* Message input area at bottom */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800">
              <form onSubmit={handleSendMessage} className="p-4 flex items-center">
                <div className="hidden md:flex items-center mr-4">
                  {selectedCharacter && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-2">
                      <Image
                        src={getCharacterImagePath(selectedCharacter.id)}
                        alt={selectedCharacter.name}
                        width={32}
                        height={32}
                        className="object-cover"
                        onError={(e) => handleImageError(e, selectedCharacter.id)}
                      />
                    </div>
                  )}
                </div>
                
                <input 
                  type="text"
                  ref={inputRef}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Send a message to ${selectedCharacter.name}...`}
                  disabled={isStreaming}
                  className="flex-1 p-2 px-4 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-full 
                           focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent 
                           text-neutral-800 dark:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Message input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && messageText.trim()) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                
                <button
                  type="submit"
                  disabled={!messageText.trim() || isStreaming}
                  className="ml-2 p-2 bg-primary hover:bg-primary-light disabled:bg-neutral-300 dark:disabled:bg-neutral-700 
                           text-white rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {/* Error toast message */}
      {errorMessage && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg shadow-lg p-4 flex justify-between items-center min-w-[320px] max-w-md z-50">
          <div className="flex">
            <div className="py-1">
              <svg className="w-6 h-6 mr-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1118 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-gray-900 dark:text-gray-100 font-medium">Error</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage('')}
            aria-label="Dismiss error message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
