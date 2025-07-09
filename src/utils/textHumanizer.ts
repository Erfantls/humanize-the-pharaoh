
// Advanced text humanization utility with sophisticated AI detection bypass
export function humanizeText(text: string): string {
  if (!text.trim()) return '';

  // Multi-pass humanization process
  let result = text;
  
  // Pass 1: Break down and reconstruct sentence patterns
  result = reconstructSentencePatterns(result);
  
  // Pass 2: Add human cognitive patterns
  result = addCognitivePatterns(result);
  
  // Pass 3: Insert natural imperfections
  result = addHumanImperfections(result);
  
  // Pass 4: Apply contextual variations
  result = applyContextualVariations(result);
  
  // Pass 5: Final humanization touches
  result = finalHumanizationPass(result);
  
  return result.trim();
}

function reconstructSentencePatterns(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  return sentences.map((sentence, index) => {
    let processed = sentence.trim();
    
    // Vary sentence openers based on context
    if (index === 0) {
      processed = addDynamicOpeners(processed);
    } else if (Math.random() > 0.4) {
      processed = addTransitionWords(processed);
    }
    
    // Restructure overly formal patterns
    processed = breakFormalPatterns(processed);
    
    // Add mid-sentence elaborations
    if (processed.split(' ').length > 12 && Math.random() > 0.6) {
      processed = addMidSentenceElaborations(processed);
    }
    
    return processed;
  }).join('. ') + '.';
}

function addDynamicOpeners(sentence: string): string {
  const dynamicOpeners = [
    "Here's what I think:",
    "From where I stand,",
    "The way I see it,",
    "Let me put it this way -",
    "I've been thinking about this, and",
    "You know what's interesting?",
    "Here's the deal:",
    "To be honest,",
    "From my perspective,",
    "I have to say,",
    "Looking at this situation,",
    "In my experience,",
    "What strikes me is that",
    "I can't help but think",
    "It seems to me that"
  ];
  
  if (Math.random() > 0.5) {
    const opener = dynamicOpeners[Math.floor(Math.random() * dynamicOpeners.length)];
    return `${opener} ${sentence.toLowerCase()}`;
  }
  
  return sentence;
}

function addTransitionWords(sentence: string): string {
  const transitions = [
    "Besides that,", "What's more,", "On top of that,", "Plus,", "Also,",
    "Additionally,", "Furthermore,", "Another thing is,", "Not to mention,",
    "And here's another point:", "Beyond that,", "More importantly,",
    "That said,", "Having said that,", "With that in mind,", "Along those lines,",
    "Similarly,", "In the same vein,", "Following that logic,", "Building on that,"
  ];
  
  if (Math.random() > 0.3) {
    const transition = transitions[Math.floor(Math.random() * transitions.length)];
    return `${transition} ${sentence.toLowerCase()}`;
  }
  
  return sentence;
}

function breakFormalPatterns(sentence: string): string {
  // Replace overly formal constructions with casual alternatives
  const formalToCasual = [
    { formal: /it is important to note that/gi, casual: "worth mentioning that" },
    { formal: /it should be emphasized that/gi, casual: "the key thing is that" },
    { formal: /it is evident that/gi, casual: "you can clearly see that" },
    { formal: /it can be observed that/gi, casual: "what we notice is that" },
    { formal: /it is worth noting that/gi, casual: "interesting to note that" },
    { formal: /furthermore/gi, casual: "plus" },
    { formal: /moreover/gi, casual: "what's more" },
    { formal: /consequently/gi, casual: "so" },
    { formal: /therefore/gi, casual: "that's why" },
    { formal: /in conclusion/gi, casual: "to wrap this up" },
    { formal: /to summarize/gi, casual: "bottom line is" },
    { formal: /due to the fact that/gi, casual: "because" },
    { formal: /in order to/gi, casual: "to" },
    { formal: /with regard to/gi, casual: "about" },
    { formal: /concerning/gi, casual: "about" },
    { formal: /pertaining to/gi, casual: "relating to" },
    { formal: /nevertheless/gi, casual: "still" },
    { formal: /nonetheless/gi, casual: "even so" },
    { formal: /subsequently/gi, casual: "then" },
    { formal: /ultimately/gi, casual: "in the end" }
  ];
  
  let result = sentence;
  formalToCasual.forEach(({ formal, casual }) => {
    result = result.replace(formal, casual);
  });
  
  return result;
}

function addMidSentenceElaborations(sentence: string): string {
  const elaborations = [
    "if you ask me", "in my opinion", "from what I can tell", "as far as I can see",
    "from my experience", "the way I understand it", "at least that's how I see it",
    "or so it seems to me", "from where I'm sitting", "based on what I know"
  ];
  
  const words = sentence.split(' ');
  if (words.length > 8) {
    const insertPos = Math.floor(words.length * 0.6);
    const elaboration = elaborations[Math.floor(Math.random() * elaborations.length)];
    words.splice(insertPos, 0, `- ${elaboration} -`);
    return words.join(' ');
  }
  
  return sentence;
}

function addCognitivePatterns(text: string): string {
  let result = text;
  
  // Add thinking patterns
  result = addThinkingPatterns(result);
  
  // Add uncertainty markers
  result = addUncertaintyMarkers(result);
  
  // Add personal references
  result = addPersonalReferences(result);
  
  return result;
}

function addThinkingPatterns(text: string): string {
  const thinkingMarkers = [
    "Let me think about this...", "Hmm, interesting point.", "That makes me wonder...",
    "Come to think of it,", "Now that I think about it,", "This reminds me of...",
    "I just realized that", "Wait, actually", "Hold on though", "But then again"
  ];
  
  const sentences = text.split('. ');
  if (sentences.length > 2 && Math.random() > 0.6) {
    const insertPos = Math.floor(sentences.length / 2);
    const marker = thinkingMarkers[Math.floor(Math.random() * thinkingMarkers.length)];
    sentences.splice(insertPos, 0, marker);
    return sentences.join('. ');
  }
  
  return text;
}

function addUncertaintyMarkers(text: string): string {
  const uncertaintyPhrases = [
    "I think", "I believe", "It seems like", "Appears to be", "Might be",
    "Could be", "Probably", "Likely", "Possibly", "Perhaps", "Maybe",
    "I'd say", "My guess is", "From what I can tell", "Seems to me"
  ];
  
  // Randomly insert uncertainty markers
  let result = text;
  const sentences = result.split('. ');
  
  sentences.forEach((sentence, index) => {
    if (Math.random() > 0.7 && !sentence.includes('I ') && sentence.split(' ').length > 6) {
      const uncertainty = uncertaintyPhrases[Math.floor(Math.random() * uncertaintyPhrases.length)];
      sentences[index] = `${uncertainty}, ${sentence.toLowerCase()}`;
    }
  });
  
  return sentences.join('. ');
}

function addPersonalReferences(text: string): string {
  const personalPhrases = [
    "in my experience", "from what I've seen", "I've noticed that",
    "personally speaking", "if I'm being honest", "from my perspective",
    "the way I look at it", "in my view", "as I see it", "to my mind"
  ];
  
  const sentences = text.split('. ');
  if (sentences.length > 1 && Math.random() > 0.5) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const phrase = personalPhrases[Math.floor(Math.random() * personalPhrases.length)];
    sentences[randomIndex] = `${phrase}, ${sentences[randomIndex].toLowerCase()}`;
  }
  
  return sentences.join('. ');
}

function addHumanImperfections(text: string): string {
  let result = text;
  
  // Add natural hesitations and fillers
  result = addFillers(result);
  
  // Add self-corrections
  result = addSelfCorrections(result);
  
  // Add colloquialisms
  result = addColloquialisms(result);
  
  return result;
}

function addFillers(text: string): string {
  const fillers = [
    "you know", "I mean", "like", "well", "actually", "basically",
    "pretty much", "kind of", "sort of", "more or less", "you see",
    "as you know", "obviously", "clearly", "of course"
  ];
  
  const sentences = text.split('. ');
  sentences.forEach((sentence, index) => {
    if (Math.random() > 0.8 && sentence.split(' ').length > 8) {
      const filler = fillers[Math.floor(Math.random() * fillers.length)];
      const words = sentence.split(' ');
      const insertPos = Math.floor(Math.random() * (words.length - 2)) + 1;
      words.splice(insertPos, 0, `${filler},`);
      sentences[index] = words.join(' ');
    }
  });
  
  return sentences.join('. ');
}

function addSelfCorrections(text: string): string {
  const corrections = [
    "well, actually", "or rather", "I should say", "to be more precise",
    "let me rephrase that", "what I mean is", "in other words",
    "or better yet", "actually, no", "wait, let me correct that"
  ];
  
  const sentences = text.split('. ');
  if (sentences.length > 2 && Math.random() > 0.7) {
    const targetIndex = Math.floor(Math.random() * sentences.length);
    const correction = corrections[Math.floor(Math.random() * corrections.length)];
    const words = sentences[targetIndex].split(' ');
    
    if (words.length > 6) {
      const splitPoint = Math.floor(words.length / 2);
      const firstPart = words.slice(0, splitPoint).join(' ');
      const secondPart = words.slice(splitPoint).join(' ');
      sentences[targetIndex] = `${firstPart} - ${correction}, ${secondPart}`;
    }
  }
  
  return sentences.join('. ');
}

function addColloquialisms(text: string): string {
  const colloquialReplacements = [
    { formal: /very good/gi, casual: "pretty solid" },
    { formal: /very bad/gi, casual: "pretty terrible" },
    { formal: /very important/gi, casual: "super important" },
    { formal: /very interesting/gi, casual: "really fascinating" },
    { formal: /very difficult/gi, casual: "pretty tough" },
    { formal: /very easy/gi, casual: "pretty straightforward" },
    { formal: /extremely/gi, casual: "crazy" },
    { formal: /significantly/gi, casual: "way more" },
    { formal: /substantially/gi, casual: "a lot more" },
    { formal: /approximately/gi, casual: "roughly" },
    { formal: /approximately/gi, casual: "around" },
    { formal: /demonstrate/gi, casual: "show" },
    { formal: /utilize/gi, casual: "use" },
    { formal: /commence/gi, casual: "start" },
    { formal: /terminate/gi, casual: "end" },
    { formal: /facilitate/gi, casual: "help" }
  ];
  
  let result = text;
  colloquialReplacements.forEach(({ formal, casual }) => {
    if (Math.random() > 0.4) {
      result = result.replace(formal, casual);
    }
  });
  
  return result;
}

function applyContextualVariations(text: string): string {
  let result = text;
  
  // Apply contractions more naturally
  result = applySmartContractions(result);
  
  // Vary sentence lengths
  result = varySentenceLengths(result);
  
  // Add rhetorical questions
  result = addRhetoricalQuestions(result);
  
  return result;
}

function applySmartContractions(text: string): string {
  const contractions = [
    { full: /do not/gi, contracted: "don't" },
    { full: /does not/gi, contracted: "doesn't" },
    { full: /did not/gi, contracted: "didn't" },
    { full: /will not/gi, contracted: "won't" },
    { full: /would not/gi, contracted: "wouldn't" },
    { full: /should not/gi, contracted: "shouldn't" },
    { full: /could not/gi, contracted: "couldn't" },
    { full: /cannot/gi, contracted: "can't" },
    { full: /is not/gi, contracted: "isn't" },
    { full: /are not/gi, contracted: "aren't" },
    { full: /was not/gi, contracted: "wasn't" },
    { full: /were not/gi, contracted: "weren't" },
    { full: /have not/gi, contracted: "haven't" },
    { full: /has not/gi, contracted: "hasn't" },
    { full: /had not/gi, contracted: "hadn't" },
    { full: /it is/gi, contracted: "it's" },
    { full: /that is/gi, contracted: "that's" },
    { full: /there is/gi, contracted: "there's" },
    { full: /you are/gi, contracted: "you're" },
    { full: /we are/gi, contracted: "we're" },
    { full: /they are/gi, contracted: "they're" },
    { full: /I am/gi, contracted: "I'm" },
    { full: /you will/gi, contracted: "you'll" },
    { full: /we will/gi, contracted: "we'll" },
    { full: /they will/gi, contracted: "they'll" },
    { full: /I will/gi, contracted: "I'll" }
  ];
  
  let result = text;
  contractions.forEach(({ full, contracted }) => {
    // Apply contractions with some randomness to seem more natural
    if (Math.random() > 0.3) {
      result = result.replace(full, contracted);
    }
  });
  
  return result;
}

function varySentenceLengths(text: string): string {
  const sentences = text.split('. ');
  
  return sentences.map(sentence => {
    const words = sentence.trim().split(' ');
    
    // Sometimes combine short sentences
    if (words.length < 6 && Math.random() > 0.6) {
      return sentence + ', which is quite important';
    }
    
    // Sometimes break long sentences
    if (words.length > 20 && Math.random() > 0.5) {
      const midPoint = Math.floor(words.length / 2);
      const firstHalf = words.slice(0, midPoint).join(' ');
      const secondHalf = words.slice(midPoint).join(' ');
      return `${firstHalf}. Actually, ${secondHalf.toLowerCase()}`;
    }
    
    return sentence;
  }).join('. ');
}

function addRhetoricalQuestions(text: string): string {
  const questions = [
    "Why does this matter?", "What does this mean?", "How so?",
    "But why?", "What's the point?", "Does this make sense?",
    "You might be wondering why.", "Sound familiar?", "Ring any bells?",
    "Make sense?", "See what I mean?", "Get the picture?"
  ];
  
  const sentences = text.split('. ');
  if (sentences.length > 3 && Math.random() > 0.6) {
    const insertPos = Math.floor(Math.random() * sentences.length);
    const question = questions[Math.floor(Math.random() * questions.length)];
    sentences.splice(insertPos, 0, question);
  }
  
  return sentences.join('. ');
}

function finalHumanizationPass(text: string): string {
  let result = text;
  
  // Fix capitalization and punctuation
  result = fixCapitalization(result);
  
  // Clean up formatting
  result = cleanUpFormatting(result);
  
  // Add final natural touches
  result = addFinalTouches(result);
  
  return result;
}

function fixCapitalization(text: string): string {
  // Ensure proper capitalization after periods
  return text.replace(/(^\w|[.!?]\s+\w)/g, function(match) {
    return match.toUpperCase();
  });
}

function cleanUpFormatting(text: string): string {
  let result = text;
  
  // Fix multiple spaces
  result = result.replace(/\s+/g, ' ');
  
  // Fix punctuation spacing
  result = result.replace(/\s*([.!?])\s*/g, '$1 ');
  
  // Fix comma spacing
  result = result.replace(/\s*,\s*/g, ', ');
  
  // Remove extra periods
  result = result.replace(/\.+/g, '.');
  
  return result.trim();
}

function addFinalTouches(text: string): string {
  // Add some variety in endings
  const endings = [
    "That's the gist of it.", "Hope that makes sense.", "That's my take on it.",
    "At least, that's how I see it.", "Make sense?", "That's the bottom line.",
    "Pretty much sums it up.", "That's the deal.", "There you have it."
  ];
  
  if (Math.random() > 0.7) {
    const ending = endings[Math.floor(Math.random() * endings.length)];
    return text + ' ' + ending;
  }
  
  return text;
}
