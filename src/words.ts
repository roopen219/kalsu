// Word lists for passphrase generation
// Curated for memorability and uniqueness

export const ADJECTIVES = [
  'able', 'absolute', 'acoustic', 'active', 'adamant', 'adorable', 'agile', 'alert', 'alive', 'amazing',
  'amber', 'ancient', 'aquatic', 'arctic', 'autumn', 'azure', 'balanced', 'beloved', 'blazing', 'blessed',
  'bold', 'bouncy', 'brave', 'breezy', 'bright', 'brilliant', 'bronze', 'calm', 'candid', 'capable',
  'charming', 'cheerful', 'classic', 'clean', 'clear', 'clever', 'coastal', 'colossal', 'colorful', 'cool',
  'copper', 'coral', 'cosmic', 'cozy', 'creative', 'crisp', 'crystal', 'curious', 'daring', 'dazzling',
  'deep', 'delicate', 'delightful', 'devoted', 'digital', 'dynamic', 'eager', 'earnest', 'eastern', 'easy',
  'electric', 'elegant', 'elite', 'emerald', 'endless', 'epic', 'eternal', 'exotic', 'expert', 'fair',
  'faithful', 'famous', 'fancy', 'fantastic', 'fearless', 'festive', 'fierce', 'fine', 'first', 'fluffy',
  'flying', 'fond', 'fortune', 'frank', 'free', 'fresh', 'friendly', 'frozen', 'full', 'funny', 'fuzzy',
  'gentle', 'genuine', 'giant', 'gifted', 'glad', 'global', 'glorious', 'glossy', 'golden', 'good',
  'gorgeous', 'graceful', 'grand', 'grateful', 'great', 'green', 'growing', 'handsome', 'handy', 'happy',
  'harmless', 'healthy', 'helpful', 'hidden', 'high', 'holy', 'honest', 'hopeful', 'humble', 'icy',
  'ideal', 'immense', 'infinite', 'inner', 'instant', 'intense', 'jade', 'jolly', 'joyful', 'keen',
  'kind', 'known', 'large', 'lasting', 'leading', 'level', 'light', 'likely', 'lively', 'living',
  'logical', 'long', 'lovely', 'loving', 'loyal', 'lucky', 'lunar', 'magic', 'magnetic', 'main',
  'major', 'mammoth', 'marine', 'massive', 'mellow', 'melodic', 'merry', 'mighty', 'mild', 'mint',
  'modern', 'modest', 'moving', 'musical', 'mutual', 'native', 'natural', 'nearby', 'neat', 'new',
  'nice', 'nimble', 'noble', 'normal', 'novel', 'obvious', 'ocean', 'olive', 'open', 'optimal',
  'orange', 'organic', 'outer', 'patient', 'peaceful', 'perfect', 'pink', 'plain', 'pleasant', 'plum',
  'polite', 'popular', 'positive', 'powerful', 'precious', 'premium', 'pretty', 'prime', 'proud', 'pure',
  'purple', 'quick', 'quiet', 'radiant', 'random', 'rapid', 'rare', 'ready', 'real', 'recent', 'red',
  'refined', 'regal', 'reliable', 'remote', 'rich', 'right', 'rising', 'robust', 'rosy', 'royal',
  'ruby', 'rustic', 'sacred', 'safe', 'sage', 'sandy', 'scenic', 'secret', 'secure', 'serene', 'sharp',
  'shiny', 'silent', 'silky', 'silver', 'simple', 'sincere', 'sleek', 'smart', 'smooth', 'snowy',
  'social', 'soft', 'solar', 'solid', 'sonic', 'special', 'speedy', 'splendid', 'spring', 'stable',
  'starry', 'steady', 'stellar', 'still', 'stormy', 'strong', 'stunning', 'sturdy', 'subtle', 'summer',
  'sunny', 'super', 'superb', 'supreme', 'sure', 'sweet', 'swift', 'tall', 'tame', 'teal', 'tender',
  'thankful', 'thick', 'tidy', 'timely', 'tiny', 'top', 'tough', 'tranquil', 'tremendous', 'tricky',
  'trim', 'tropical', 'true', 'trusted', 'ultimate', 'unique', 'united', 'universal', 'upbeat', 'upper',
  'urban', 'useful', 'valid', 'vast', 'velvet', 'vibrant', 'virtual', 'visible', 'vital', 'vivid',
  'vocal', 'warm', 'wealthy', 'weekly', 'welcome', 'western', 'white', 'whole', 'wide', 'wild',
  'willing', 'windy', 'winning', 'winter', 'wise', 'witty', 'wonderful', 'worthy', 'yellow', 'young',
  'zesty', 'zippy'
] as const

export const NOUNS = [
  'acorn', 'admiral', 'agent', 'album', 'alpha', 'amber', 'anchor', 'angel', 'apple', 'archer',
  'arctic', 'arena', 'arrow', 'atlas', 'aurora', 'autumn', 'badge', 'badger', 'baker', 'bamboo',
  'banana', 'banner', 'baron', 'basket', 'beacon', 'bear', 'beaver', 'beetle', 'bell', 'berry',
  'bird', 'bishop', 'blaze', 'bloom', 'blossom', 'boat', 'bobcat', 'bolt', 'breeze', 'bridge',
  'brook', 'buffalo', 'bunny', 'butterfly', 'cabin', 'cactus', 'camel', 'candle', 'canyon', 'captain',
  'cardinal', 'castle', 'cedar', 'cheetah', 'cherry', 'chief', 'cloud', 'clover', 'cobra', 'comet',
  'compass', 'coral', 'cosmos', 'cougar', 'crane', 'crater', 'creek', 'cricket', 'crown', 'crystal',
  'cypress', 'daisy', 'dawn', 'deer', 'delta', 'desert', 'dolphin', 'dove', 'dragon', 'dream',
  'dune', 'eagle', 'echo', 'eclipse', 'elm', 'ember', 'emerald', 'empire', 'falcon', 'fawn',
  'feather', 'fern', 'finch', 'firefly', 'fjord', 'flame', 'flash', 'flower', 'fog', 'forest',
  'fossil', 'fountain', 'fox', 'frost', 'galaxy', 'garden', 'gazelle', 'glacier', 'glade', 'globe',
  'glory', 'gopher', 'granite', 'grape', 'grove', 'gull', 'harbor', 'hare', 'harmony', 'harvest',
  'hawk', 'hazel', 'heart', 'hedge', 'heron', 'hill', 'horizon', 'horse', 'hound', 'hunter',
  'ice', 'icon', 'igloo', 'island', 'ivory', 'ivy', 'jade', 'jaguar', 'jasmine', 'jazz',
  'jewel', 'jungle', 'juniper', 'kayak', 'keeper', 'kelp', 'kernel', 'kestrel', 'kite', 'knight',
  'koala', 'lagoon', 'lake', 'lantern', 'lark', 'laser', 'laurel', 'lava', 'leaf', 'legend',
  'lemon', 'lemur', 'leopard', 'light', 'lily', 'lion', 'lotus', 'lunar', 'lynx', 'maple',
  'marble', 'marine', 'mars', 'marsh', 'meadow', 'meteor', 'mica', 'mist', 'monarch', 'moon',
  'moose', 'moss', 'mountain', 'mouse', 'nebula', 'nectar', 'nest', 'night', 'ninja', 'north',
  'nova', 'oak', 'oasis', 'ocean', 'olive', 'omega', 'onyx', 'opal', 'oracle', 'orbit',
  'orchid', 'osprey', 'otter', 'owl', 'palm', 'panda', 'panther', 'paper', 'parrot', 'path',
  'peach', 'peak', 'pearl', 'pebble', 'pelican', 'penguin', 'phoenix', 'pilot', 'pine', 'pioneer',
  'pixel', 'planet', 'plaza', 'plum', 'polar', 'pond', 'poplar', 'prairie', 'prism', 'pulse',
  'puma', 'python', 'quail', 'quartz', 'quest', 'rabbit', 'rain', 'rainbow', 'raven', 'reef',
  'ridge', 'river', 'robin', 'rocket', 'rose', 'ruby', 'safari', 'sage', 'salmon', 'sand',
  'sapphire', 'saturn', 'scout', 'seal', 'shadow', 'shark', 'shell', 'shore', 'sierra', 'silver',
  'sky', 'slate', 'snow', 'solar', 'south', 'spark', 'sparrow', 'sphere', 'spider', 'spirit',
  'spring', 'spruce', 'star', 'steam', 'stone', 'storm', 'stream', 'summit', 'sun', 'sunset',
  'surf', 'swan', 'temple', 'terra', 'thorne', 'thunder', 'tide', 'tiger', 'timber', 'torch',
  'trail', 'tree', 'tropic', 'tulip', 'turtle', 'twilight', 'ultra', 'umbrella', 'valley', 'vapor',
  'venus', 'violet', 'viper', 'vista', 'volcano', 'voyager', 'walrus', 'wave', 'whale', 'willow',
  'wind', 'winter', 'wolf', 'wonder', 'wood', 'wren', 'yankee', 'yard', 'zebra', 'zenith',
  'zephyr', 'zigzag', 'zodiac', 'zone'
] as const

/**
 * Generate a random passphrase using alternating adjectives and nouns
 */
export function generatePassphrase(wordCount: number = 4): string {
  const words: string[] = []
  for (let i = 0; i < wordCount; i++) {
    const list = (i % 2 === 0) ? ADJECTIVES : NOUNS
    const randomIndex = Math.floor(Math.random() * list.length)
    words.push(list[randomIndex])
  }
  return words.join('-')
}

