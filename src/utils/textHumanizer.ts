
// Advanced text humanization utility
export function humanizeText(text: string): string {
  if (!text.trim()) return '';

  // Split into sentences
  let sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Apply various humanization techniques
  sentences = sentences.map((sentence, index) => {
    let humanized = sentence.trim();
    
    // Add natural conversation starters
    if (index === 0) {
      humanized = addConversationStarters(humanized);
    }
    
    // Vary sentence structure
    humanized = varySentenceStructure(humanized);
    
    // Add natural connectors
    if (index > 0 && Math.random() > 0.6) {
      humanized = addNaturalConnectors(humanized);
    }
    
    // Add casual expressions
    humanized = addCasualExpressions(humanized);
    
    // Fix contractions
    humanized = addContractions(humanized);
    
    // Add natural hesitations and fillers occasionally
    if (Math.random() > 0.8) {
      humanized = addNaturalHesitations(humanized);
    }
    
    return humanized;
  });
  
  // Join sentences with varied punctuation
  let result = sentences.join('. ');
  
  // Final touches
  result = addPersonalTouch(result);
  result = improveFlow(result);
  result = fixCapitalization(result);
  
  return result + '.';
}

function addConversationStarters(sentence: string): string {
  const starters = [
    "You know what's interesting?",
    "Here's the thing -",
    "I've been thinking about this, and",
    "Let me tell you something:",
    "The way I see it,",
    "Honestly,",
    "To be frank,",
    "I have to say,",
    "Looking at this from my perspective,"
  ];
  
  if (Math.random() > 0.7) {
    const starter = starters[Math.floor(Math.random() * starters.length)];
    return `${starter} ${sentence.toLowerCase()}`;
  }
  
  return sentence;
}

function varySentenceStructure(sentence: string): string {
  // Add variety by sometimes starting with different clause structures
  const words = sentence.split(' ');
  
  if (words.length > 8 && Math.random() > 0.6) {
    // Sometimes rearrange for more natural flow
    if (sentence.includes(' because ')) {
      const parts = sentence.split(' because ');
      if (parts.length === 2) {
        return `Because ${parts[1]}, ${parts[0].toLowerCase()}`;
      }
    }
    
    if (sentence.includes(' although ')) {
      const parts = sentence.split(' although ');
      if (parts.length === 2) {
        return `Although ${parts[1]}, ${parts[0].toLowerCase()}`;
      }
    }
  }
  
  return sentence;
}

function addNaturalConnectors(sentence: string): string {
  const connectors = [
    "Also,",
    "Plus,",
    "What's more,",
    "On top of that,",
    "Additionally,",
    "Furthermore,",
    "Besides that,",
    "Another thing is",
    "Not to mention,",
    "And get this -",
    "Here's another point:"
  ];
  
  const connector = connectors[Math.floor(Math.random() * connectors.length)];
  return `${connector} ${sentence.toLowerCase()}`;
}

function addCasualExpressions(sentence: string): string {
  // Replace formal phrases with casual ones
  const replacements = [
    { formal: /in order to/g, casual: "to" },
    { formal: /due to the fact that/g, casual: "because" },
    { formal: /it is important to note that/g, casual: "worth noting that" },
    { formal: /it should be mentioned that/g, casual: "also," },
    { formal: /consequently/g, casual: "so" },
    { formal: /therefore/g, casual: "so" },
    { formal: /furthermore/g, casual: "also" },
    { formal: /nevertheless/g, casual: "still" },
    { formal: /however/g, casual: "but" },
    { formal: /in addition/g, casual: "plus" },
    { formal: /it is evident that/g, casual: "clearly" },
    { formal: /it can be observed that/g, casual: "you can see that" }
  ];
  
  let result = sentence;
  replacements.forEach(({ formal, casual }) => {
    result = result.replace(formal, casual);
  });
  
  return result;
}

function addContractions(sentence: string): string {
  const contractions = [
    { full: " do not ", contracted: " don't " },
    { full: " does not ", contracted: " doesn't " },
    { full: " did not ", contracted: " didn't " },
    { full: " will not ", contracted: " won't " },
    { full: " would not ", contracted: " wouldn't " },
    { full: " should not ", contracted: " shouldn't " },
    { full: " could not ", contracted: " couldn't " },
    { full: " cannot ", contracted: " can't " },
    { full: " is not ", contracted: " isn't " },
    { full: " are not ", contracted: " aren't " },
    { full: " was not ", contracted: " wasn't " },
    { full: " were not ", contracted: " weren't " },
    { full: " have not ", contracted: " haven't " },
    { full: " has not ", contracted: " hasn't " },
    { full: " had not ", contracted: " hadn't " },
    { full: " it is ", contracted: " it's " },
    { full: " that is ", contracted: " that's " },
    { full: " there is ", contracted: " there's " },
    { full: " you are ", contracted: " you're " },
    { full: " we are ", contracted: " we're " },
    { full: " they are ", contracted: " they're " },
    { full: " I am ", contracted: " I'm " },
    { full: " you will ", contracted: " you'll " },
    { full: " we will ", contracted: " we'll " },
    { full: " they will ", contracted: " they'll " }
  ];
  
  let result = sentence;
  contractions.forEach(({ full, contracted }) => {
    result = result.replace(new RegExp(full, 'gi'), contracted);
  });
  
  return result;
}

function addNaturalHesitations(sentence: string): string {
  const hesitations = [
    "you know,",
    "I mean,",
    "like,",
    "well,",
    "actually,",
    "basically,",
    "pretty much,",
    "kind of,",
    "sort of,",
    "more or less,"
  ];
  
  const words = sentence.split(' ');
  if (words.length > 5) {
    const insertPos = Math.floor(Math.random() * (words.length - 2)) + 1;
    const hesitation = hesitations[Math.floor(Math.random() * hesitations.length)];
    words.splice(insertPos, 0, hesitation);
    return words.join(' ');
  }
  
  return sentence;
}

function addPersonalTouch(text: string): string {
  // Add occasional personal references
  const personalPhrases = [
    "from my experience",
    "I've found that",
    "in my opinion",
    "I think",
    "I believe",
    "it seems to me",
    "I've noticed",
    "personally,"
  ];
  
  if (Math.random() > 0.7) {
    const phrase = personalPhrases[Math.floor(Math.random() * personalPhrases.length)];
    // Insert somewhere in the middle of the text
    const sentences = text.split('. ');
    if (sentences.length > 1) {
      const insertIndex = Math.floor(sentences.length / 2);
      sentences[insertIndex] = `${phrase}, ${sentences[insertIndex].toLowerCase()}`;
      return sentences.join('. ');
    }
  }
  
  return text;
}

function improveFlow(text: string): string {
  // Improve overall flow by adding transitions
  let result = text;
  
  // Fix double periods and spaces
  result = result.replace(/\.+/g, '.');
  result = result.replace(/\s+/g, ' ');
  
  // Ensure proper spacing after punctuation
  result = result.replace(/([.!?])\s*/g, '$1 ');
  
  return result.trim();
}

function fixCapitalization(text: string): string {
  // Ensure proper capitalization
  return text.replace(/(^\w|[.!?]\s*\w)/g, function(match) {
    return match.toUpperCase();
  });
}
