// This service would normally fetch data from a backend that processes the CDP documentation
// For this demo, we'll simulate responses based on keywords in the question

interface CDPInfo {
  name: string;
  docs: string;
  features: Record<string, string>;
  advancedFeatures: Record<string, string>;
}

const cdpData: Record<string, CDPInfo> = {
  segment: {
    name: 'Segment',
    docs: 'https://segment.com/docs/?ref=nav',
    features: {
      source: 'To set up a new source in Segment:\n1. Navigate to the Segment dashboard\n2. Click on "Add Source" in the Sources section\n3. Select the type of source you want to add\n4. Follow the configuration steps for your specific source type\n5. Save your configuration and verify the connection',
      destination: 'To add a destination in Segment:\n1. Go to your Segment workspace\n2. Select the source you want to connect to a destination\n3. Click on "Add Destination"\n4. Search for and select your desired destination\n5. Configure the destination settings\n6. Enable the destination when ready',
      tracking: 'To implement tracking in Segment:\n1. Install the Segment SDK for your platform\n2. Initialize the SDK with your write key\n3. Use track(), identify(), and page() methods to send data\n4. Verify events in the Segment debugger',
      profile: 'Segment uses Personas for user profiles. To set up:\n1. Enable Personas in your workspace\n2. Define identity resolution settings\n3. Create computed traits as needed\n4. View unified user profiles in the Personas section'
    },
    advancedFeatures: {
      protocols: 'To set up Segment Protocols for data governance:\n1. Navigate to Protocols in your Segment workspace\n2. Define tracking plans to standardize event schemas\n3. Create validation rules for data quality\n4. Set up alerts for schema violations\n5. Monitor data quality in the Protocols dashboard',
      transformations: 'To create transformations in Segment:\n1. Go to the Transformations section in your workspace\n2. Click "New Transformation"\n3. Write JavaScript code to modify your event data\n4. Test your transformation with sample events\n5. Apply the transformation to specific sources\n6. Monitor transformation performance',
      privacy: 'To implement privacy controls in Segment:\n1. Configure data retention settings in your workspace\n2. Set up user deletion workflows\n3. Implement consent management using Segment\'s Consent API\n4. Configure suppression lists for opt-outs\n5. Use Privacy Portal to manage user data requests',
      functions: 'To use Segment Functions for custom processing:\n1. Navigate to Functions in your workspace\n2. Create a new function with Node.js code\n3. Define input sources and output destinations\n4. Test your function with sample events\n5. Deploy and monitor your function'
    }
  },
  mparticle: {
    name: 'mParticle',
    docs: 'https://docs.mparticle.com/',
    features: {
      profile: 'To create a user profile in mParticle:\n1. Implement the mParticle SDK in your application\n2. Use the identify() method with a unique user ID\n3. Add user attributes using the setUserAttribute() method\n4. User profiles will be automatically created and updated based on events and attributes',
      audience: 'To create an audience in mParticle:\n1. Navigate to the Audience Builder in your dashboard\n2. Click "Create Audience"\n3. Define audience criteria using attributes and behaviors\n4. Save and activate your audience\n5. Connect to downstream destinations as needed',
      integration: 'To set up an integration in mParticle:\n1. Go to the Setup > Outputs section\n2. Select the integration you want to configure\n3. Follow the specific configuration steps for that integration\n4. Map your events and attributes\n5. Activate the integration',
      data: 'To import data into mParticle:\n1. Use the Events API for server-side data\n2. Implement SDKs for client-side data collection\n3. Use S3 imports for batch data\n4. Configure data transformations as needed'
    },
    advancedFeatures: {
      dataplan: 'To implement Data Plans in mParticle:\n1. Navigate to the Data Plans section in your dashboard\n2. Create a new Data Plan version\n3. Define your event and user attribute schemas\n4. Set validation rules and enforcement levels\n5. Apply the Data Plan to your input data sources\n6. Monitor validation results in the dashboard',
      identityresolution: 'To configure advanced identity resolution in mParticle:\n1. Go to Setup > Spaces > Identity\n2. Configure your identity strategy and priority\n3. Set up custom identity rules if needed\n4. Define identity matching criteria\n5. Configure cross-device identity resolution\n6. Monitor identity metrics in the dashboard',
      calculatedattributes: 'To create calculated attributes in mParticle:\n1. Navigate to Calculated Attributes in your dashboard\n2. Click "Add Calculated Attribute"\n3. Define the calculation formula using the attribute builder\n4. Set the calculation window and update frequency\n5. Activate the calculated attribute\n6. Use in audiences and forwarding rules',
      livesync: 'To implement mParticle Live Sync:\n1. Navigate to the Live Sync section\n2. Configure real-time data synchronization between platforms\n3. Set up event forwarding rules\n4. Define transformation logic if needed\n5. Monitor sync performance in the dashboard'
    }
  },
  lytics: {
    name: 'Lytics',
    docs: 'https://docs.lytics.com/',
    features: {
      segment: 'To build an audience segment in Lytics:\n1. Navigate to the Segments section in your Lytics account\n2. Click "Create New Segment"\n3. Use the segment builder to define your audience criteria\n4. Add filters based on user behaviors, attributes, or scores\n5. Save and publish your segment\n6. Monitor segment membership in the dashboard',
      collection: 'To set up data collection in Lytics:\n1. Choose your collection method (JavaScript tag, mobile SDK, API, etc.)\n2. Configure the data source in your Lytics account\n3. Map fields to user profiles\n4. Set up identity resolution\n5. Verify data is flowing correctly',
      campaign: 'To create a campaign in Lytics:\n1. Go to the Campaigns section\n2. Click "Create Campaign"\n3. Select your campaign type (web, email, etc.)\n4. Choose your target segment\n5. Configure campaign content and settings\n6. Activate and monitor your campaign',
      personalization: 'To implement personalization with Lytics:\n1. Create content recommendations\n2. Use the Lytics JavaScript tag on your website\n3. Implement content zones where personalization should appear\n4. Configure personalization rules\n5. Test and optimize your personalized experiences'
    },
    advancedFeatures: {
      machinelearning: 'To leverage Lytics machine learning capabilities:\n1. Navigate to the ML Models section in your Lytics account\n2. Select from pre-built models or create custom models\n3. Configure model parameters and training data\n4. Deploy the model to your production environment\n5. Use model outputs in segments and campaigns\n6. Monitor model performance and retrain as needed',
      pathfinder: 'To use Lytics PathFinder for journey analysis:\n1. Go to the PathFinder section in your Lytics account\n2. Define start and end events for the journey you want to analyze\n3. Configure path visualization settings\n4. Analyze common paths and conversion points\n5. Create segments based on path insights\n6. Apply findings to optimize customer journeys',
      orchestration: 'To set up cross-channel orchestration in Lytics:\n1. Navigate to the Orchestration section\n2. Create a new orchestration workflow\n3. Define trigger events and conditions\n4. Configure channel-specific actions and content\n5. Set up decision points and branching logic\n6. Activate and monitor your orchestration workflow',
      datascience: 'To use Lytics Data Science tools:\n1. Access the Data Science Workbench\n2. Connect to your Lytics data lake\n3. Use SQL, Python, or R for custom analysis\n4. Create and save custom models and queries\n5. Schedule automated analyses\n6. Export insights to other systems'
    }
  },
  zeotap: {
    name: 'Zeotap',
    docs: 'https://docs.zeotap.com/home/en-us/',
    features: {
      integration: 'To integrate your data with Zeotap:\n1. Log in to your Zeotap CDP account\n2. Navigate to the Connections section\n3. Select "Add New Connection"\n4. Choose your data source type\n5. Configure the connection settings\n6. Map data fields to Zeotap\'s schema\n7. Activate the connection and verify data flow',
      identity: 'To set up identity resolution in Zeotap:\n1. Go to the Identity section in your Zeotap account\n2. Configure your identity graph settings\n3. Define primary identifiers\n4. Set up identity matching rules\n5. Monitor identity resolution metrics',
      audience: 'To create an audience in Zeotap:\n1. Navigate to the Audience Builder\n2. Click "Create New Audience"\n3. Define your audience criteria using attributes and behaviors\n4. Preview your audience size and composition\n5. Save and activate your audience\n6. Connect to activation channels as needed',
      consent: 'To manage consent in Zeotap:\n1. Configure consent settings in your account\n2. Implement consent collection on your digital properties\n3. Use Zeotap\'s consent management tools\n4. Apply consent rules to data processing\n5. Monitor consent metrics and compliance'
    },
    advancedFeatures: {
      unifiedprofiles: 'To work with Unified Customer Profiles in Zeotap:\n1. Navigate to the Profiles section in your Zeotap account\n2. Configure profile merging rules and priorities\n3. Set up cross-device and cross-channel identity linking\n4. Define profile enrichment sources\n5. Configure profile update frequency\n6. Use unified profiles in audience targeting and analytics',
      predictiveanalytics: 'To implement predictive analytics with Zeotap:\n1. Go to the Analytics section in your Zeotap account\n2. Select from pre-built predictive models or create custom ones\n3. Configure model parameters and training data\n4. Deploy models to your production environment\n5. Use predictive scores in audience segmentation\n6. Monitor and optimize model performance',
      realtime: 'To set up real-time data processing in Zeotap:\n1. Navigate to the Real-time section\n2. Configure real-time data sources and endpoints\n3. Set up event triggers and actions\n4. Define real-time audience qualification rules\n5. Connect to real-time activation channels\n6. Monitor real-time performance metrics',
      datagovernance: 'To implement data governance in Zeotap:\n1. Access the Governance section in your Zeotap account\n2. Configure data classification and sensitivity levels\n3. Set up access controls and permissions\n4. Define data retention and purging policies\n5. Implement audit logging and compliance reporting\n6. Monitor governance metrics and compliance status'
    }
  }
};

// Function to find the most relevant CDP and feature based on the question
function findRelevantInfo(question: string): { cdp: string, feature: string, isAdvanced: boolean } | null {
  const normalizedQuestion = question.toLowerCase();
  
  // Determine which CDP the question is about
  let targetCdp = '';
  for (const cdp of Object.keys(cdpData)) {
    if (normalizedQuestion.includes(cdp)) {
      targetCdp = cdp;
      break;
    }
  }
  
  // If no specific CDP mentioned, try to determine from context
  if (!targetCdp) {
    // Default logic to guess the CDP based on keywords
    if (normalizedQuestion.includes('source') || normalizedQuestion.includes('destination')) {
      targetCdp = 'segment';
    } else if (normalizedQuestion.includes('profile') || normalizedQuestion.includes('user attribute')) {
      targetCdp = 'mparticle';
    } else if (normalizedQuestion.includes('audience segment') || normalizedQuestion.includes('personalization')) {
      targetCdp = 'lytics';
    } else if (normalizedQuestion.includes('identity') || normalizedQuestion.includes('consent')) {
      targetCdp = 'zeotap';
    }
  }
  
  if (!targetCdp) return null;
  
  // Find the most relevant feature
  const cdpInfo = cdpData[targetCdp];
  let relevantFeature = '';
  let isAdvanced = false;
  let highestScore = 0;
  
  // Check advanced features first (they take priority if matched)
  for (const feature of Object.keys(cdpInfo.advancedFeatures)) {
    let score = 0;
    if (normalizedQuestion.includes(feature)) score += 15; // Higher score for advanced features
    
    // Additional keyword matching for advanced features
    const advancedKeywords: Record<string, string[]> = {
      protocols: ['tracking plan', 'data governance', 'schema', 'validation', 'data quality'],
      transformations: ['transform', 'modify data', 'clean data', 'data processing'],
      privacy: ['gdpr', 'ccpa', 'data deletion', 'consent management', 'privacy'],
      functions: ['custom function', 'serverless', 'custom processing', 'code'],
      dataplan: ['data plan', 'schema', 'validation', 'data structure'],
      identityresolution: ['identity resolution', 'id resolution', 'cross-device', 'user matching'],
      calculatedattributes: ['calculated', 'derived', 'computed', 'attribute calculation'],
      livesync: ['live sync', 'real-time sync', 'synchronization'],
      machinelearning: ['ml', 'machine learning', 'ai', 'prediction', 'model'],
      pathfinder: ['path', 'journey', 'customer path', 'conversion path'],
      orchestration: ['orchestration', 'workflow', 'journey', 'multi-channel'],
      datascience: ['data science', 'analysis', 'custom query', 'sql', 'python', 'r'],
      unifiedprofiles: ['unified profile', '360 profile', 'customer 360', 'single view'],
      predictiveanalytics: ['predict', 'predictive', 'forecasting', 'propensity'],
      realtime: ['real-time', 'realtime', 'streaming', 'instant'],
      datagovernance: ['governance', 'compliance', 'data management', 'policy']
    };
    
    const featureKeywords = advancedKeywords[feature] || [];
    for (const keyword of featureKeywords) {
      if (normalizedQuestion.includes(keyword)) score += 8;
    }
    
    if (score > highestScore) {
      highestScore = score;
      relevantFeature = feature;
      isAdvanced = true;
    }
  }
  
  // If no advanced feature matched well, check basic features
  if (highestScore < 10) {
    for (const feature of Object.keys(cdpInfo.features)) {
      let score = 0;
      if (normalizedQuestion.includes(feature)) score += 10;
      
      // Additional keyword matching for basic features
      const basicKeywords: Record<string, string[]> = {
        source: ['source', 'connect', 'input', 'collect', 'data source'],
        destination: ['destination', 'send to', 'output', 'export', 'integration'],
        tracking: ['track', 'event', 'analytics', 'monitor', 'data collection'],
        profile: ['profile', 'user', 'customer', 'identity', 'user data'],
        audience: ['audience', 'segment', 'group', 'target', 'cohort'],
        integration: ['integrate', 'connect', 'setup', 'link', 'connection'],
        data: ['data', 'import', 'collect', 'store', 'ingest'],
        segment: ['segment', 'audience', 'group', 'cohort', 'user group'],
        collection: ['collect', 'gather', 'track', 'record', 'capture'],
        campaign: ['campaign', 'marketing', 'outreach', 'message', 'communication'],
        personalization: ['personalize', 'customize', 'tailor', 'recommend', 'individual'],
        identity: ['identity', 'id', 'recognition', 'match', 'identify'],
        consent: ['consent', 'permission', 'gdpr', 'privacy', 'opt-in']
      };
      
      const featureKeywords = basicKeywords[feature] || [];
      for (const keyword of featureKeywords) {
        if (normalizedQuestion.includes(keyword)) score += 5;
      }
      
      if (score > highestScore) {
        highestScore = score;
        relevantFeature = feature;
        isAdvanced = false;
      }
    }
  }
  
  return relevantFeature ? { cdp: targetCdp, feature: relevantFeature, isAdvanced } : null;
}

// Function to handle cross-CDP comparisons
function handleComparison(question: string): string | null {
  const normalizedQuestion = question.toLowerCase();
  
  // Check if this is a comparison question
  if (normalizedQuestion.includes('compare') || 
      normalizedQuestion.includes('difference') || 
      normalizedQuestion.includes('versus') || 
      normalizedQuestion.includes('vs') ||
      normalizedQuestion.includes('better') ||
      (normalizedQuestion.includes('how') && normalizedQuestion.includes('different'))) {
    
    // Identify which CDPs are being compared
    const cdps: string[] = [];
    for (const cdp of Object.keys(cdpData)) {
      if (normalizedQuestion.includes(cdp)) {
        cdps.push(cdp);
      }
    }
    
    if (cdps.length >= 2) {
      // Identify what feature is being compared
      const featureKeywords = [
        { key: 'audience', terms: ['audience', 'segment', 'targeting', 'segmentation'] },
        { key: 'profile', terms: ['profile', 'user', 'customer data', 'identity'] },
        { key: 'integration', terms: ['integration', 'connect', 'setup', 'destination'] },
        { key: 'data', terms: ['data collection', 'tracking', 'events', 'sources'] },
        { key: 'personalization', terms: ['personalization', 'customize', 'tailor', 'recommend'] },
        { key: 'consent', terms: ['consent', 'privacy', 'gdpr', 'ccpa', 'compliance'] },
        { key: 'identity', terms: ['identity resolution', 'id matching', 'cross-device'] }
      ];
      
      let feature = '';
      for (const fk of featureKeywords) {
        for (const term of fk.terms) {
          if (normalizedQuestion.includes(term)) {
            feature = fk.key;
            break;
          }
        }
        if (feature) break;
      }
      
      // Check for advanced feature comparisons
      const advancedFeatureKeywords = [
        { key: 'machinelearning', terms: ['machine learning', 'ml', 'ai', 'predictive', 'models'] },
        { key: 'realtime', terms: ['real-time', 'realtime', 'streaming', 'live'] },
        { key: 'datagovernance', terms: ['governance', 'compliance', 'data management'] }
      ];
      
      let advancedFeature = '';
      for (const afk of advancedFeatureKeywords) {
        for (const term of afk.terms) {
          if (normalizedQuestion.includes(term)) {
            advancedFeature = afk.key;
            break;
          }
        }
        if (advancedFeature) break;
      }
      
      if (feature || advancedFeature) {
        const featureToUse = advancedFeature || feature;
        const isAdvanced = !!advancedFeature;
        
        let comparisonText = `When comparing ${cdps.map(c => cdpData[c].name).join(' and ')} for ${featureToUse.replace(/([A-Z])/g, ' $1').toLowerCase()} functionality:\n\n`;
        
        for (const cdp of cdps) {
          const featureContent = isAdvanced 
            ? cdpData[cdp].advancedFeatures[featureToUse] 
            : cdpData[cdp].features[featureToUse];
            
          if (featureContent) {
            comparisonText += `${cdpData[cdp].name}:\n${featureContent}\n\n`;
          } else {
            comparisonText += `${cdpData[cdp].name}: No specific information available for this feature.\n\n`;
          }
        }
        
        comparisonText += `For more detailed comparison, please check the documentation for each platform:\n${cdps.map(cdp => `- ${cdpData[cdp].name}: ${cdpData[cdp].docs}`).join('\n')}`;
        
        return comparisonText;
      } else {
        return `I can compare ${cdps.map(c => cdpData[c].name).join(' and ')}, but I need to know which specific feature you're interested in comparing. You could ask about audience creation, data collection, user profiles, integrations, personalization, or advanced features like machine learning and real-time capabilities.`;
      }
    } else if (cdps.length === 1) {
      return `I can provide comparisons between different CDPs. To compare ${cdpData[cdps[0]].name} with another platform, please specify which other CDP you'd like to compare it with (Segment, mParticle, Lytics, or Zeotap).`;
    } else {
      return `I can compare different Customer Data Platforms (CDPs). Please specify which platforms you'd like to compare (Segment, mParticle, Lytics, or Zeotap) and what aspect you're interested in (e.g., audience creation, data collection, etc.).`;
    }
  }
  
  return null;
}

// Function to extract documentation sections
function extractDocumentationSection(question: string, cdp: string, feature: string, isAdvanced: boolean): string {
  const cdpInfo = cdpData[cdp];
  const featureInfo = isAdvanced ? cdpInfo.advancedFeatures[feature] : cdpInfo.features[feature];
  
  if (!featureInfo) {
    return `I couldn't find specific information about ${feature} in the ${cdpInfo.name} documentation. Please check their official documentation for more details: ${cdpInfo.docs}`;
  }
  
  // For a real implementation, this would parse and extract relevant sections from actual documentation
  // Here we're just returning our simulated documentation
  return `${featureInfo}\n\nFor more detailed information, please refer to the ${cdpInfo.name} documentation: ${cdpInfo.docs}`;
}

// Function to check if the question is irrelevant to CDPs
function isIrrelevantQuestion(question: string): boolean {
  const normalizedQuestion = question.toLowerCase();
  
  // Check if the question contains any CDP-related terms
  const cdpTerms = [
    'cdp', 'customer data', 'segment', 'mparticle', 'lytics', 'zeotap', 
    'audience', 'profile', 'integration', 'data', 'tracking', 'analytics',
    'source', 'destination', 'identity', 'consent', 'personalization',
    'campaign', 'collection', 'user', 'customer'
  ];
  
  const containsCdpTerm = cdpTerms.some(term => normalizedQuestion.includes(term));
  
  // Check if it's a how-to question or related to functionality
  const isRelevantQuestion = normalizedQuestion.includes('how to') || 
                  normalizedQuestion.includes('how do i') || 
                  normalizedQuestion.includes('how can i') ||
                  normalizedQuestion.includes('steps to') ||
                  normalizedQuestion.includes('guide for') ||
                  normalizedQuestion.includes('compare') ||
                  normalizedQuestion.includes('difference') ||
                  normalizedQuestion.includes('versus') ||
                  normalizedQuestion.includes('vs') ||
                  normalizedQuestion.includes('setup') ||
                  normalizedQuestion.includes('configure') ||
                  normalizedQuestion.includes('implement');
  
  return !containsCdpTerm || !isRelevantQuestion;
}

// Function to handle extremely long questions
function handleLongQuestion(question: string): string | null {
  // If question is extremely long (over 300 characters), we'll try to extract the core question
  if (question.length > 300) {
    // Look for question patterns in the text
    const questionPatterns = [
      /how (?:do|can|to) .+?\?/i,
      /what (?:is|are) the steps to .+?\?/i,
      /guide (?:for|to) .+?\?/i,
      /compare .+? and .+?\?/i,
      /difference between .+? and .+?\?/i
    ];
    
    for (const pattern of questionPatterns) {
      const match = question.match(pattern);
      if (match && match[0]) {
        // We found a core question, but we'll still process the full text
        // Just noting that we recognized it's a long question
        return null; // Process normally, don't return special handling
      }
    }
    
    // If we couldn't extract a clear question pattern, we'll still try to process it
    return null; // Process normally
  }
  
  return null; // Not a long question, process normally
}

// Function to handle advanced how-to questions
function handleAdvancedQuestion(question: string): string | null {
  const normalizedQuestion = question.toLowerCase();
  
  // Check for advanced integration patterns
  if (normalizedQuestion.includes('integrate') && 
      (normalizedQuestion.includes('api') || 
       normalizedQuestion.includes('webhook') || 
       normalizedQuestion.includes('custom') || 
       normalizedQuestion.includes('third-party') || 
       normalizedQuestion.includes('3rd party'))) {
    
    // Determine which CDP
    let cdp = '';
    for (const c of Object.keys(cdpData)) {
      if (normalizedQuestion.includes(c)) {
        cdp = c;
        break;
      }
    }
    
    if (!cdp) {
      return null; // Can't determine CDP, process normally
    }
    
    return `For advanced integration with ${cdpData[cdp].name} using APIs or webhooks:

1. Review the ${cdpData[cdp].name} API documentation at ${cdpData[cdp].docs}
2. Generate API credentials in your ${cdpData[cdp].name} account settings
3. Use the REST API endpoints to:
   - Send data to ${cdpData[cdp].name}
   - Retrieve data from ${cdpData[cdp].name}
   - Manage configurations programmatically
4. For webhooks:
   - Configure webhook endpoints in your application
   - Register these endpoints in your ${cdpData[cdp].name} account
   - Set up event triggers that will send data to your webhooks
5. Test your integration thoroughly in a development environment
6. Monitor API usage and webhook deliveries

For detailed API specifications and examples, refer to the ${cdpData[cdp].name} developer documentation at ${cdpData[cdp].docs}`;
  }
  
  // Check for complex implementation scenarios
  if ((normalizedQuestion.includes('complex') || 
       normalizedQuestion.includes('advanced') || 
       normalizedQuestion.includes('enterprise')) && 
      (normalizedQuestion.includes('implementation') || 
       normalizedQuestion.includes('setup') || 
       normalizedQuestion.includes('architecture'))) {
    
    // Determine which CDP
    let cdp = '';
    for (const c of Object.keys(cdpData)) {
      if (normalizedQuestion.includes(c)) {
        cdp = c;
        break;
      }
    }
    
    if (!cdp) {
      return null; // Can't determine CDP, process normally
    }
    
    return `For advanced enterprise implementation of ${cdpData[cdp].name}:

1. Architecture Planning:
   - Define your data strategy and requirements
   - Map out all data sources and destinations
   - Plan identity resolution strategy
   - Define governance and compliance requirements

2. Technical Implementation:
   - Set up server-side and client-side tracking
   - Implement custom data transformations
   - Configure advanced identity resolution
   - Set up real-time data processing pipelines

3. Data Governance:
   - Implement data validation and quality controls
   - Set up privacy controls and consent management
   - Configure data retention policies
   - Establish monitoring and alerting

4. Advanced Use Cases:
   - Implement machine learning models
   - Set up cross-channel orchestration
   - Configure real-time personalization
   - Establish advanced analytics workflows

For enterprise implementation support, consider contacting ${cdpData[cdp].name}'s professional services team through their website.`;
  }
  
  return null; // Not an advanced question, process normally
}

export async function fetchCDPAnswer(question: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Handle extremely long questions
  const longQuestionResponse = handleLongQuestion(question);
  if (longQuestionResponse) {
    return longQuestionResponse;
  }
  
  // Check if the question is irrelevant to CDPs
  if (isIrrelevantQuestion(question)) {
    return "I'm specifically designed to answer how-to questions about Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. Could you please ask me something related to these platforms? For example, you could ask 'How do I set up a new source in Segment?' or 'How can I create an audience in mParticle?'";
  }
  
  // Check for advanced how-to questions
  const advancedResponse = handleAdvancedQuestion(question);
  if (advancedResponse) {
    return advancedResponse;
  }
  
  // Check if this is a comparison question
  const comparisonAnswer = handleComparison(question);
  if (comparisonAnswer) {
    return comparisonAnswer;
  }
  
  // Find the most relevant information
  const relevantInfo = findRelevantInfo(question);
  
  if (relevantInfo) {
    const { cdp, feature, isAdvanced } = relevantInfo;
    
    // Extract relevant documentation section
    return extractDocumentationSection(question, cdp, feature, isAdvanced);
  }
  
  // Fallback response if we couldn't find specific information
  return "I couldn't find specific information about that in the CDP documentation. Could you rephrase your question or specify which CDP (Segment, mParticle, Lytics, or Zeotap) you're asking about?";
}