export interface VideoSource {
  quality: string
  src: string
}

export interface SubtitleTrack {
  id: string
  label: string
  language: string
  src: string
}

export interface Movie {
  id: number
  title: string
  description: string
  genre: string[]
  releaseDate: string
  rating: number
  duration: string
  poster: string
  backdrop: string
  trailer: string
  videoSources?: VideoSource[]
  subtitles?: SubtitleTrack[]
  actors: { name: string; role: string; image: string }[]
  featured?: boolean
  type: "movie" | "series"
}

export interface Series {
  id: number
  title: string
  description: string
  genre: string[]
  releaseDate: string
  rating: number
  poster: string
  backdrop: string
  trailer: string
  actors: { name: string; role: string; image: string }[]
  featured?: boolean
  type: "series"
  seasons: Season[]
}

export interface Season {
  seasonNumber: number
  episodes: Episode[]
}

export interface Episode {
  episodeNumber: number
  title: string
  duration: string
  videoSources?: VideoSource[]
  subtitles?: SubtitleTrack[]
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Dark Horizon",
    description:
      "In a world where shadows hold secrets, one detective must uncover the truth before darkness consumes everything. A gripping thriller that will keep you on the edge of your seat.",
    genre: ["Action", "Thriller", "Sci-Fi"],
    releaseDate: "2025-03-15",
    rating: 8.7,
    duration: "2h 24m",
    poster: "/dark-sci-fi-movie-poster-neon.jpg",
    backdrop: "/dark-futuristic-cityscape-neon-red-cinematic.jpg",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Michael Chen", role: "Detective Ray", image: "/male-actor-headshot.jpg" },
      { name: "Sarah Williams", role: "Dr. Maya", image: "/female-actress-headshot.jpg" },
      { name: "James Rodriguez", role: "The Shadow", image: "/mysterious-male-actor.jpg" },
    ],
    featured: true,
    type: "movie",
  },
  {
    id: 2,
    title: "Echoes of Tomorrow",
    description:
      "A time-traveling romance that defies all odds. When two souls meet across centuries, they must fight against time itself to be together.",
    genre: ["Romance", "Sci-Fi", "Drama"],
    releaseDate: "2025-02-14",
    rating: 8.2,
    duration: "2h 08m",
    poster: "/romantic-sci-fi-movie-poster-time.jpg",
    backdrop: "/romantic-time-travel-scene-silhouettes.jpg",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Emma Stone", role: "Clara", image: "/young-female-actress.jpg" },
      { name: "Ryan Mitchell", role: "Thomas", image: "/handsome-male-actor.jpg" },
    ],
    type: "movie",
  },
  {
    id: 3,
    title: "Blood Red Sky",
    description:
      "Vampires on a plane. When a mother with a dark secret boards a transatlantic flight with her son, terrorists hijack the plane, awakening her inner monster.",
    genre: ["Horror", "Action", "Thriller"],
    releaseDate: "2025-01-20",
    rating: 7.9,
    duration: "2h 01m",
    poster: "/horror-vampire-movie-poster-red-sky.jpg",
    backdrop: "/dramatic-airplane-red-sky-horror.jpg",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Peri Baumeister", role: "Nadja", image: "/intense-female-actress.jpg" },
      { name: "Carl Koch", role: "Elias", image: "/young-boy-actor.jpg" },
    ],
    type: "movie",
  },
  {
    id: 4,
    title: "Neon Nights",
    description:
      "In the underground racing world of Neo-Tokyo, one driver must risk everything to save their family from a powerful crime syndicate.",
    genre: ["Action", "Crime", "Thriller"],
    releaseDate: "2025-04-01",
    rating: 8.4,
    duration: "2h 15m",
    poster: "/neon-racing-cyberpunk-movie-poster.jpg",
    backdrop: "/neon-street-racing-cyberpunk-tokyo.jpg",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Takeshi Kaneshiro", role: "Kai", image: "/asian-male-actor.jpg" },
      { name: "Ana de Armas", role: "Lucia", image: "/latina-actress.jpg" },
    ],
    type: "movie",
  },
  {
    id: 5,
    title: "The Last Kingdom",
    description:
      "An epic tale of war, honor, and betrayal in medieval England. One warrior's journey to reclaim his birthright against impossible odds.",
    genre: ["Drama", "Action", "History"],
    releaseDate: "2024-12-01",
    rating: 9.1,
    duration: "2h 45m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Alexander Dreymon", role: "Uhtred", image: "/placeholder.svg?height=200&width=200" },
      { name: "Emily Cox", role: "Brida", image: "/placeholder.svg?height=200&width=200" },
    ],
    featured: true,
    type: "movie",
  },
  {
    id: 6,
    title: "Whispers in the Dark",
    description:
      "A psychological horror that will haunt your dreams. When a family moves into their dream home, they discover nightmares are very real.",
    genre: ["Horror", "Mystery", "Thriller"],
    releaseDate: "2025-05-13",
    rating: 7.5,
    duration: "1h 52m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Florence Pugh", role: "Sarah", image: "/placeholder.svg?height=200&width=200" },
      { name: "Oscar Isaac", role: "Marcus", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 7,
    title: "Quantum Break",
    description:
      "When a time experiment goes wrong, one man gains the power to manipulate time. But with great power comes those who want to take it.",
    genre: ["Sci-Fi", "Action", "Adventure"],
    releaseDate: "2025-06-20",
    rating: 8.0,
    duration: "2h 20m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Shawn Ashmore", role: "Jack Joyce", image: "/placeholder.svg?height=200&width=200" },
      { name: "Aidan Gillen", role: "Paul Serene", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 8,
    title: "Ocean's Legacy",
    description:
      "The most ambitious heist in history. A team of legendary thieves must steal from the world's most secure underwater vault.",
    genre: ["Crime", "Action", "Comedy"],
    releaseDate: "2025-07-04",
    rating: 8.3,
    duration: "2h 10m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Idris Elba", role: "Marcus Cole", image: "/placeholder.svg?height=200&width=200" },
      { name: "Zendaya", role: "Nova", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 9,
    title: "Frozen Silence",
    description:
      "In the frozen wilderness of Alaska, a group of researchers discover something ancient and terrifying beneath the ice.",
    genre: ["Horror", "Sci-Fi", "Mystery"],
    releaseDate: "2025-01-31",
    rating: 7.8,
    duration: "1h 58m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Mary Elizabeth Winstead", role: "Dr. Kate Lloyd", image: "/placeholder.svg?height=200&width=200" },
      { name: "Joel Edgerton", role: "Sam Carter", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 10,
    title: "Rise of the Phoenix",
    description:
      "A superhero origin story like no other. When an ordinary woman gains extraordinary powers, she must choose between vengeance and justice.",
    genre: ["Action", "Sci-Fi", "Drama"],
    releaseDate: "2025-08-15",
    rating: 8.6,
    duration: "2h 30m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Brie Larson", role: "Phoenix", image: "/placeholder.svg?height=200&width=200" },
      { name: "Michael B. Jordan", role: "Dante", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 11,
    title: "The Syndicate",
    description:
      "A gripping crime drama about loyalty, power, and the price of ambition in the criminal underworld of 1970s New York.",
    genre: ["Crime", "Drama", "Thriller"],
    releaseDate: "2024-11-22",
    rating: 9.0,
    duration: "2h 50m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Adam Driver", role: "Vincent Moretti", image: "/placeholder.svg?height=200&width=200" },
      { name: "Margot Robbie", role: "Isabella", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "movie",
  },
  {
    id: 12,
    title: "Starbound",
    description:
      "An interstellar adventure to find humanity's new home. When Earth faces extinction, a crew of astronauts embarks on the journey of a lifetime.",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseDate: "2025-09-01",
    rating: 8.8,
    duration: "2h 55m",
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Matthew McConaughey", role: "Commander Cole", image: "/placeholder.svg?height=200&width=200" },
      { name: "Anne Hathaway", role: "Dr. Amelia", image: "/placeholder.svg?height=200&width=200" },
    ],
    featured: true,
    type: "movie",
  },
]

export const series: Series[] = [
  {
    id: 101,
    title: "Shadow Protocol",
    description:
      "A covert team of operatives navigate the dangerous world of international espionage. Every mission could be their last.",
    genre: ["Action", "Thriller", "Drama"],
    releaseDate: "2024-09-15",
    rating: 8.9,
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Pedro Pascal", role: "Agent Marcus Cole", image: "/placeholder.svg?height=200&width=200" },
      { name: "Gal Gadot", role: "Agent Sarah Chen", image: "/placeholder.svg?height=200&width=200" },
    ],
    featured: true,
    type: "series",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "The Beginning", duration: "52m" },
          { episodeNumber: 2, title: "Double Cross", duration: "48m" },
          { episodeNumber: 3, title: "Ghost Protocol", duration: "55m" },
          { episodeNumber: 4, title: "The Mole", duration: "51m" },
          { episodeNumber: 5, title: "Extraction", duration: "58m" },
          { episodeNumber: 6, title: "End Game", duration: "62m" },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          { episodeNumber: 1, title: "New Threat", duration: "54m" },
          { episodeNumber: 2, title: "Deep Cover", duration: "49m" },
          { episodeNumber: 3, title: "Betrayal", duration: "52m" },
          { episodeNumber: 4, title: "The Truth", duration: "56m" },
        ],
      },
    ],
  },
  {
    id: 102,
    title: "Dynasty of Dragons",
    description:
      "In a realm of fire and blood, noble houses battle for supremacy. Dragons rule the skies, and only the strongest will survive.",
    genre: ["Fantasy", "Drama", "Action"],
    releaseDate: "2024-06-01",
    rating: 9.2,
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Henry Cavill", role: "King Aldric", image: "/placeholder.svg?height=200&width=200" },
      { name: "Anya Taylor-Joy", role: "Princess Vera", image: "/placeholder.svg?height=200&width=200" },
    ],
    featured: true,
    type: "series",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "The Iron Throne", duration: "65m" },
          { episodeNumber: 2, title: "Blood of Dragons", duration: "58m" },
          { episodeNumber: 3, title: "The Alliance", duration: "62m" },
          { episodeNumber: 4, title: "War Council", duration: "55m" },
          { episodeNumber: 5, title: "Fire and Ice", duration: "68m" },
          { episodeNumber: 6, title: "The Battle", duration: "72m" },
          { episodeNumber: 7, title: "Aftermath", duration: "60m" },
          { episodeNumber: 8, title: "New Dawn", duration: "75m" },
        ],
      },
    ],
  },
  {
    id: 103,
    title: "Code Black",
    description:
      "Inside the most chaotic emergency room in America, doctors and nurses fight to save lives against impossible odds.",
    genre: ["Drama", "Medical", "Thriller"],
    releaseDate: "2024-03-10",
    rating: 8.5,
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Sandra Oh", role: "Dr. Elena Park", image: "/placeholder.svg?height=200&width=200" },
      { name: "Mahershala Ali", role: "Dr. James Wilson", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "series",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "Pilot", duration: "45m" },
          { episodeNumber: 2, title: "Under Pressure", duration: "42m" },
          { episodeNumber: 3, title: "Critical Mass", duration: "44m" },
          { episodeNumber: 4, title: "Life Support", duration: "43m" },
          { episodeNumber: 5, title: "Flatline", duration: "46m" },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          { episodeNumber: 1, title: "New Blood", duration: "44m" },
          { episodeNumber: 2, title: "Breaking Point", duration: "42m" },
          { episodeNumber: 3, title: "Second Chances", duration: "45m" },
        ],
      },
      {
        seasonNumber: 3,
        episodes: [
          { episodeNumber: 1, title: "Resurrection", duration: "48m" },
          { episodeNumber: 2, title: "The Reckoning", duration: "46m" },
        ],
      },
    ],
  },
  {
    id: 104,
    title: "Midnight Detective",
    description:
      "A brilliant but troubled detective solves impossible cases in the neon-lit streets of a futuristic metropolis.",
    genre: ["Crime", "Sci-Fi", "Mystery"],
    releaseDate: "2024-11-01",
    rating: 8.7,
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Keanu Reeves", role: "Detective John Wick", image: "/placeholder.svg?height=200&width=200" },
      { name: "Lupita Nyongo", role: "AI Partner Luna", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "series",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "The Case Begins", duration: "50m" },
          { episodeNumber: 2, title: "Digital Ghost", duration: "48m" },
          { episodeNumber: 3, title: "Neon Dreams", duration: "52m" },
          { episodeNumber: 4, title: "The Syndicate", duration: "49m" },
          { episodeNumber: 5, title: "Memory Lane", duration: "54m" },
          { episodeNumber: 6, title: "Final Code", duration: "58m" },
        ],
      },
    ],
  },
  {
    id: 105,
    title: "The Haunting",
    description:
      "A family moves into a historic mansion, only to discover they are not alone. Some secrets refuse to stay buried.",
    genre: ["Horror", "Mystery", "Drama"],
    releaseDate: "2024-10-13",
    rating: 8.8,
    poster: "/placeholder.svg?height=450&width=300",
    backdrop: "/placeholder.svg?height=800&width=1400",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actors: [
      { name: "Victoria Pedretti", role: "Eleanor", image: "/placeholder.svg?height=200&width=200" },
      { name: "Oliver Jackson-Cohen", role: "Luke", image: "/placeholder.svg?height=200&width=200" },
    ],
    type: "series",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "Welcome Home", duration: "58m" },
          { episodeNumber: 2, title: "The Basement", duration: "52m" },
          { episodeNumber: 3, title: "Whispers", duration: "55m" },
          { episodeNumber: 4, title: "The Red Room", duration: "60m" },
          { episodeNumber: 5, title: "Revelations", duration: "62m" },
        ],
      },
    ],
  },
]

export const genres = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Horror",
  "Medical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
]

// Combined content for carousels
export const allContent = [...movies, ...series]
