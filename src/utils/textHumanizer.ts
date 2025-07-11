// Ultra-advanced text humanization utility for maximum AI detection bypass

interface HumanizationResult {
  humanizedText: string;
  replacements: Array<{ original: string; humanized: string; position: number }>;
}

export function humanizeText(text: string, mode: string = 'standard'): HumanizationResult {
  if (!text.trim()) return { humanizedText: '', replacements: [] };

  let result = text;
  const replacements: Array<{ original: string; humanized: string; position: number }> = [];
  
  // Multi-layer humanization process
  result = applyHumanWritingQuirks(result, replacements);
  result = addPersonalVoicePatterns(result, replacements);
  result = insertNaturalInconsistencies(result, replacements);
  result = applyContextualHumanization(result, replacements);
  result = addSubtleImperfections(result, replacements);
  result = finalAntiAIPass(result, replacements);
  
  return {
    humanizedText: result.trim(),
    replacements
  };
}

function applyHumanWritingQuirks(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Human tendency to start sentences with personal thoughts
  const humanStarters = [
    "Look,", "Listen,", "Honestly,", "Real talk,", "You know what?", 
    "Here's the thing:", "I'll tell you what:", "Between you and me,",
    "Not gonna lie,", "To be fair,", "If I'm being real here,",
    "Straight up,", "Let me level with you:", "Here's my take:"
  ];
  
  const sentences = result.split(/[.!?]+/).filter(s => s.trim());
  
  // Randomly add human starters (30% chance)
  if (sentences.length > 0 && Math.random() > 0.7) {
    const starter = humanStarters[Math.floor(Math.random() * humanStarters.length)];
    const original = sentences[0].trim();
    const humanized = `${starter} ${original.toLowerCase()}`;
    replacements.push({ original, humanized, position: 0 });
    sentences[0] = humanized;
  }
  
  // Add mid-conversation clarifications
  const clarifiers = [
    "if that makes sense", "you get what I mean?", "does that sound right?",
    "at least in my head it does", "or something like that", "I think",
    "from what I can tell", "as far as I know", "could be wrong though"
  ];
  
  sentences.forEach((sentence, index) => {
    if (Math.random() > 0.8 && sentence.split(' ').length > 8) {
      const clarifier = clarifiers[Math.floor(Math.random() * clarifiers.length)];
      const original = sentence.trim();
      const humanized = `${original} - ${clarifier}`;
      replacements.push({ original, humanized, position: result.indexOf(original) });
      sentences[index] = humanized;
    }
  });
  
  return sentences.join('. ') + '.';
}

function addPersonalVoicePatterns(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Replace formal phrases with personal expressions
  const personalReplacements = [
    { formal: /it is important to note/gi, personal: "worth mentioning" },
    { formal: /according to research/gi, personal: "from what I've read" },
    { formal: /studies indicate/gi, personal: "I've seen studies that suggest" },
    { formal: /in conclusion/gi, personal: "so yeah, basically" },
    { formal: /furthermore/gi, personal: "oh, and another thing" },
    { formal: /however/gi, personal: "but here's the thing" },
    { formal: /therefore/gi, personal: "so naturally" },
    { formal: /consequently/gi, personal: "which means" },
    { formal: /subsequently/gi, personal: "and then" },
    { formal: /ultimately/gi, personal: "at the end of the day" },
    { formal: /essentially/gi, personal: "basically" },
    { formal: /significantly/gi, personal: "big time" },
    { formal: /numerous/gi, personal: "tons of" },
    { formal: /substantial/gi, personal: "pretty massive" },
    { formal: /demonstrate/gi, personal: "show" },
    { formal: /facilitate/gi, personal: "help out with" },
    { formal: /utilize/gi, personal: "use" },
    { formal: /implement/gi, personal: "put into action" },
    { formal: /establish/gi, personal: "set up" },
    { formal: /endeavor/gi, personal: "try" }
  ];
  
  personalReplacements.forEach(({ formal, personal }) => {
    if (Math.random() > 0.3) {
      const matches = result.match(formal);
      if (matches) {
        matches.forEach(match => {
          const position = result.indexOf(match);
          replacements.push({ original: match, humanized: personal, position });
        });
      }
      result = result.replace(formal, personal);
    }
  });
  
  return result;
}

function insertNaturalInconsistencies(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Add human speech patterns and hesitations
  const hesitations = [
    "um,", "uh,", "well,", "so,", "like,", "you know,", 
    "I mean,", "actually,", "basically,", "literally,"
  ];
  
  const sentences = result.split('. ');
  sentences.forEach((sentence, index) => {
    const words = sentence.split(' ');
    
    // Insert hesitations randomly (20% chance)
    if (Math.random() > 0.8 && words.length > 6) {
      const hesitation = hesitations[Math.floor(Math.random() * hesitations.length)];
      const insertPos = Math.floor(Math.random() * (words.length - 2)) + 1;
      words.splice(insertPos, 0, hesitation);
      sentences[index] = words.join(' ');
    }
    
    // Add self-corrections (15% chance)
    if (Math.random() > 0.85 && words.length > 10) {
      const corrections = [
        "well, actually", "or rather", "I mean", "let me rephrase",
        "actually, scratch that", "wait, no", "hold up"
      ];
      const correction = corrections[Math.floor(Math.random() * corrections.length)];
      const splitPoint = Math.floor(words.length * 0.6);
      const firstPart = words.slice(0, splitPoint).join(' ');
      const secondPart = words.slice(splitPoint).join(' ');
      sentences[index] = `${firstPart} - ${correction} - ${secondPart}`;
    }
  });
  
  return sentences.join('. ');
}

function applyContextualHumanization(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Add emotional reactions and personal observations
  const emotionalMarkers = [
    "which is pretty cool", "that's wild", "kinda crazy when you think about it",
    "honestly surprised me", "didn't see that coming", "makes total sense",
    "blew my mind", "had me thinking", "got me wondering", "really hit home"
  ];
  
  const sentences = result.split('. ');
  sentences.forEach((sentence, index) => {
    if (Math.random() > 0.75 && sentence.split(' ').length > 8) {
      const emotion = emotionalMarkers[Math.floor(Math.random() * emotionalMarkers.length)];
      sentences[index] = `${sentence.trim()}, ${emotion}`;
    }
  });
  
  // Add conversational bridges
  const bridges = [
    "Speaking of which,", "That reminds me,", "Funny thing is,", 
    "What's interesting is", "Here's what's crazy:", "Plot twist:",
    "But get this:", "The weird part?", "Here's where it gets good:"
  ];
  
  if (sentences.length > 2 && Math.random() > 0.6) {
    const bridgeIndex = Math.floor(sentences.length / 2);
    const bridge = bridges[Math.floor(Math.random() * bridges.length)];
    sentences[bridgeIndex] = `${bridge} ${sentences[bridgeIndex].toLowerCase()}`;
  }
  
  return sentences.join('. ');
}

function addSubtleImperfections(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Vary sentence structures randomly
  const sentences = result.split('. ');
  
  sentences.forEach((sentence, index) => {
    const words = sentence.trim().split(' ');
    
    // Sometimes start with conjunctions (human habit)
    if (index > 0 && Math.random() > 0.7) {
      const conjunctions = ["And", "But", "So", "Plus", "Also"];
      const conjunction = conjunctions[Math.floor(Math.random() * conjunctions.length)];
      sentences[index] = `${conjunction} ${sentence.toLowerCase()}`;
    }
    
    // Add redundant phrases (humans often repeat ideas)
    if (Math.random() > 0.8 && words.length > 6) {
      const redundants = [
        "like I said", "as I mentioned", "going back to what I said",
        "to circle back", "like I was saying", "to reiterate"
      ];
      const redundant = redundants[Math.floor(Math.random() * redundants.length)];
      sentences[index] = `${sentence.trim()} - ${redundant}`;
    }
  });
  
  // Replace some periods with more casual punctuation
  result = sentences.join('. ').replace(/\. /g, (match) => {
    const alternatives = ['. ', '... ', ' - '];
    return Math.random() > 0.85 ? alternatives[Math.floor(Math.random() * alternatives.length)] : match;
  });
  
  return result;
}

function finalAntiAIPass(text: string, replacements: Array<{ original: string; humanized: string; position: number }>): string {
  let result = text;
  
  // Apply contractions more aggressively
  const contractions = [
    { full: /cannot/gi, short: "can't" },
    { full: /will not/gi, short: "won't" },
    { full: /would not/gi, short: "wouldn't" },
    { full: /should not/gi, short: "shouldn't" },
    { full: /could not/gi, short: "couldn't" },
    { full: /do not/gi, short: "don't" },
    { full: /does not/gi, short: "doesn't" },
    { full: /did not/gi, short: "didn't" },
    { full: /is not/gi, short: "isn't" },
    { full: /are not/gi, short: "aren't" },
    { full: /was not/gi, short: "wasn't" },
    { full: /were not/gi, short: "weren't" },
    { full: /have not/gi, short: "haven't" },
    { full: /has not/gi, short: "hasn't" },
    { full: /had not/gi, short: "hadn't" },
    { full: /you are/gi, short: "you're" },
    { full: /we are/gi, short: "we're" },
    { full: /they are/gi, short: "they're" },
    { full: /it is/gi, short: "it's" },
    { full: /that is/gi, short: "that's" },
    { full: /there is/gi, short: "there's" },
    { full: /I am/gi, short: "I'm" },
    { full: /you will/gi, short: "you'll" },
    { full: /we will/gi, short: "we'll" },
    { full: /they will/gi, short: "they'll" },
    { full: /I will/gi, short: "I'll" },
    { full: /you would/gi, short: "you'd" },
    { full: /I would/gi, short: "I'd" },
    { full: /we would/gi, short: "we'd" }
  ];
  
  contractions.forEach(({ full, short }) => {
    if (Math.random() > 0.2) { // 80% chance to apply contraction
      result = result.replace(full, short);
    }
  });
  
  // Replace formal vocabulary with casual alternatives
  const casualReplacements = [
    { formal: /obtain/gi, casual: "get" },
    { formal: /purchase/gi, casual: "buy" },
    { formal: /assist/gi, casual: "help" },
    { formal: /commence/gi, casual: "start" },
    { formal: /conclude/gi, casual: "wrap up" },
    { formal: /inquire/gi, casual: "ask" },
    { formal: /respond/gi, casual: "answer" },
    { formal: /observe/gi, casual: "see" },
    { formal: /extremely/gi, casual: "super" },
    { formal: /very much/gi, casual: "a lot" },
    { formal: /quite/gi, casual: "pretty" },
    { formal: /rather/gi, casual: "kinda" },
    { formal: /somewhat/gi, casual: "sort of" },
    { formal: /approximately/gi, casual: "around" },
    { formal: /concerning/gi, casual: "about" },
    { formal: /regarding/gi, casual: "about" },
    { formal: /nevertheless/gi, casual: "still" },
    { formal: /nonetheless/gi, casual: "anyway" }
  ];
  
  casualReplacements.forEach(({ formal, casual }) => {
    if (Math.random() > 0.4) {
      result = result.replace(formal, casual);
    }
  });
  
  // Add occasional typos and then "corrections" (very human)
  if (Math.random() > 0.7) {
    const typoCorrections = [
      "*meant to say", "*I mean", "*whoops, I meant", "*correction:"
    ];
    const sentences = result.split('. ');
    if (sentences.length > 1) {
      const targetIndex = Math.floor(Math.random() * sentences.length);
      const correction = typoCorrections[Math.floor(Math.random() * typoCorrections.length)];
      sentences[targetIndex] = `${sentences[targetIndex].trim()} ${correction} ${sentences[targetIndex].split(' ').slice(-2).join(' ')}`;
    }
    result = sentences.join('. ');
  }
  
  // Final cleanup and formatting
  result = result.replace(/\s+/g, ' '); // Remove extra spaces
  result = result.replace(/([.!?])\s*([.!?])/g, '$1 '); // Fix duplicate punctuation
  result = result.replace(/\s*,\s*/g, ', '); // Fix comma spacing
  
  // Ensure proper capitalization
  result = result.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
  
  return result.trim();
}
