// Core organization identity and settings
export interface OrganizationProfile {
    // Basic Information
    companyName: string;
    website: string;
    contactEmail: string;
    contactPhone: string;
    industry: string;
  
    // Visual Identity
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
  
    // Social Media
    socialMediaHandles: {
      twitter?: string;
      linkedin?: string;
      facebook?: string;
      instagram?: string;
    };
  
    // Brand Voice Fundamentals
    brandPersonality: string;    // e.g., "Professional yet approachable"
    coreTone: string;           // e.g., "Warm and collaborative"
    valueProposition: string;   // Core message about what makes the company unique
  }
  
  // Detailed brand guidelines and voice rules
  export interface BrandGuidelines {
    // Core Voice Characteristics
    toneGuidelines: {
      formal: string[];       // e.g., ["Use complete sentences", "Avoid contractions"]
      casual: string[];      // e.g., ["Use conversational language", "Show enthusiasm"]
      technical: string[];   // e.g., ["Be precise", "Define technical terms"]
    };
  
    // Language Usage Rules
    approvedPhrasing: {
      greetings: string[];    // e.g., ["Hi there!", "Hello!"]
      closings: string[];     // e.g., ["Best regards", "Thanks!"]
      transitions: string[];  // e.g., ["Additionally", "Moreover"]
      productReferences: string[];  // How to refer to products/services
      companyReferences: string[]; // How to refer to the company
    };
  
    prohibitedPhrasing: {
      words: string[];        // e.g., ["unfortunately", "actually", "but"]
      phrases: string[];      // e.g., ["to be honest", "as I said before"]
      contexts: {
        phrase: string;
        reason: string;
        suggestedAlternative: string;
      }[];
    };
  
    // Writing Style Guidelines
    styleRules: {
      capitalization: string[];  // e.g., ["Always capitalize product names"]
      punctuation: string[];    // e.g., ["Use oxford comma"]
      formatting: string[];     // e.g., ["Use bold for product names"]
    };
  
    // Example Usage Scenarios
    examples: {
      scenario: string;      // e.g., "Responding to a complaint"
      goodExample: string;   // Example of correct usage
      badExample: string;    // Example of what not to do
      explanation: string;   // Why the good example is better
    }[];
  
    // Industry-Specific Terminology
    industryTerms: {
      term: string;
      definition: string;
      usage: string;
      alternatives: string[];
    }[];
  }
  
  // Template for individual prompts that use the brand guidelines
  export interface PromptTemplate {
    id: number;
    title: string;
    category: string;
    description: string;
    template: string;
    
    // Variables that can be customized in this template
    variables: {
      name: string;
      description: string;
      required: boolean;
      defaultValue?: string;
      type: 'text' | 'number' | 'email' | 'select';
      options?: string[];  // For select type variables
    }[];
  
    // Usage information
    useCase: string;
    notes: string;
    examples: {
      input: Record<string, string>;  // Variable values
      output: string;                 // Generated result
    }[];
  
    // Metadata
    createdAt: Date;
    updatedAt: Date;
    version: number;
    author: string;
    
    // Template-specific overrides (if allowed)
    toneOverride?: 'formal' | 'casual' | 'technical';
    categorySpecificRules?: {
      rule: string;
      explanation: string;
    }[];
  }