import tranculla from "../assets/Tranculla.webp";
import Avicularia from "../assets/Avicularia avicularia.webp";
import Eublepharis from "../assets/Eublepharis macularius.webp";
import Correlophus from "../assets/Correlophus ciliatus.webp";
import Litoria from "../assets/Litoria caerulea.webp";
import Pantherophis from "../assets/Pantherophis guttatus.webp";
import Pythonregius from "../assets/Python regius.webp";
export type CategoryId = "gecko" | "spider" | "amphibian" | "snake";

export interface SpeciesData {
  id: string;
  name: string;
  scientificName: string;
  category: CategoryId;
  summary: string;
  heroImage: string;
  setupImage: string;
  feedingImage?: string;
  overview: string;
  bestSetup: string[];
  feedingBehavior: string[];
  importantConsiderations: string[];
  supplementsAndHabitat: string[];
  whenToSeekHelp: string;
}

export interface CategoryData {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export const categories: CategoryData[] = [
  {
    id: "gecko",
    name: "Gecko",
    description: "Comprehensive care guides for gecko species",
    image:
      "https://images.unsplash.com/photo-1695314922934-f12cbe7f0bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZWNrbyUyMGNsb3NldXB8ZW58MXx8fHwxNzY3MjgzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "spider",
    name: "Spider",
    description: "Professional tarantula husbandry information",
    image:
      "https://images.unsplash.com/photo-1562950282-665d5d01d064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJhbnR1bGElMjBzcGlkZXJ8ZW58MXx8fHwxNzY3MjgzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "amphibian",
    name: "Amphibian",
    description: "Evidence-based amphibian care guidelines",
    image:
      "https://images.unsplash.com/photo-1613355435165-ca7eab768ccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwZnJvZyUyMGFtcGhpYmlhbnxlbnwxfHx8fDE3NjcyODMwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "snake",
    name: "Snake",
    description: "Reliable snake keeping guidance",
    image:
      "https://images.unsplash.com/photo-1529978515127-dba8c80bbf05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBzbmFrZXxlbnwxfHx8fDE3NjcyMDg2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export const speciesData: SpeciesData[] = [
  {
    id: "leopard-gecko",
    name: "Leopard Gecko",
    scientificName: "Eublepharis macularius",
    category: "gecko",
    summary:
      "Popular terrestrial gecko with specific temperature and humidity needs",
    heroImage:
      "https://images.unsplash.com/photo-1723630717197-ba54729a41ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW9wYXJkJTIwZ2Vja28lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjcyODMwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    setupImage:
      Eublepharis,
    overview:
      "The leopard gecko is a terrestrial species native to arid regions. They require specific environmental conditions to thrive in captivity.",
    bestSetup: [
      "Ground-dwelling species: prioritize floor space and a stable heat gradient over height, with a larger low-stress enclosure for hides and enrichment.",
      "Adult baseline enclosure: about 90 x 45 x 45 cm (36 x 18 x 18 in) with a secure, escape-proof lid.",
      "Stabilize decor (especially heavy rocks) and place it on the tank floor so digging cannot shift it.",
      "Create a warm and cool side with thermostat-controlled heat sources.",
      "Warm basking surface: 34-36 C; warm hide: 32-33 C; cool end: 21-25 C.",
      "Some setups use a slightly cooler basking zone (about 28-30 C) with a cool end around 24-26 C depending on equipment and measurement method.",
      "Provide a consistent day/night cycle (about 12 hours on, 12 hours off). Low-output UVB can be beneficial when set up as a gradient.",
      "Keep ambient humidity around 30-40 percent with a humid hide at 70-80 percent inside the hide to support shedding.",
      "Use a packed, dig-friendly semi-arid substrate: 60 percent organic topsoil, 30 percent sand, 10 percent clay by volume, allowed to dry before use.",
    ],
    feedingBehavior: [
      "Primarily insect-based diet",
      "Feeding frequency varies by age and body condition; juveniles typically eat more frequently than adults",
      "Use well-fed (gut-loaded) feeder insects",
      "Offer insects at appropriate size for the gecko",
    ],
    importantConsiderations: [
      "Keep enclosure dry overall; the humid hide provides targeted moisture",
      "Wash hands after handling reptiles to maintain proper hygiene",
      "Monitor temperature gradients regularly",
    ],
    supplementsAndHabitat: [
      "Calcium and vitamin/mineral supplementation are commonly recommended for insect feeders",
      "Supplementation approach differs based on UVB usage",
      "Ensure proper substrate and hide placement",
    ],
    whenToSeekHelp:
      "Contact a qualified exotic veterinarian if you observe prolonged loss of appetite, difficulty shedding, lethargy, or any signs of illness.",
  },
  {
    id: "crested-gecko",
    name: "Crested Gecko",
    scientificName: "Correlophus ciliatus",
    category: "gecko",
    summary: "Arboreal gecko requiring humidity cycles and vertical space",
    heroImage:
      "https://images.unsplash.com/photo-1636370395847-e0781efa45e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVzdGVkJTIwZ2Vja298ZW58MXx8fHwxNzY3MjgzMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    setupImage:
      Correlophus,
    overview:
      "Crested geckos are arboreal lizards that require vertical space and carefully managed humidity levels.",
    bestSetup: [
      "Arboreal and crepuscular: use a vertical enclosure with dense climbing routes and a top-to-bottom temperature and light gradient.",
      "Minimum adult enclosure: 45 x 45 x 60 cm (18 x 18 x 24 in). Larger is better.",
      "Young geckos under 12 g often do better in a smaller grow-out enclosure until they can navigate a full adult tank.",
      "Use a secure, escape-proof lid or door with good airflow (vents plus a screen top) while still supporting humidity cycles.",
      "Build dense structure with branches, vines, cork bark, and foliage at multiple levels for climbing routes and shaded resting zones.",
      "Place a feeding ledge with cups mid-to-upper levels, and provide a water dish. Many cresties drink droplets from misted surfaces.",
      "Temperature gradient: top area 28-29 C, bottom area 21-24 C, night 18-22 C.",
      "Avoid sustained temperatures above about 29 C to prevent heat stress.",
      "Use a consistent day and night cycle. Low-level UVB can be beneficial with shaded areas available; target UVI 1.0 to 2.0 at the basking branch.",
      "Create a photogradient from light to shade; medium output 5-7 percent UVB is commonly placed at the top when used.",
      "Humidity should cycle rather than stay wet: aim for 60-80 percent, then allow it to dry to about 40-50 percent before the next misting.",
      "Many keepers add a night humidity spike (often 80-90 percent or higher for a few hours) via evening misting.",
      "Use 5-10 cm (2-4 in) of moisture-friendly substrate like coco fiber or a naturalistic mix; leaf litter is optional.",
      "A drainage layer is optional and mainly for bioactive builds; ventilation and misting cycles matter more for simple setups.",
    ],
    feedingBehavior: [
      "Omnivorous diet",
      "Many keepers use quality prepared crested gecko diet plus insects",
      "Most active around dawn/dusk; timing affects feeding behavior",
    ],
    importantConsiderations: [
      "Monitor humidity with a hygrometer",
      "Avoid keeping enclosure constantly saturated",
      "Provide adequate vertical climbing space",
    ],
    supplementsAndHabitat: [
      "If insects are offered, typical reptile feeder supplementation patterns may apply (calcium/vitamins)",
      "Supplementation strategy depends on diet completeness and UVB usage",
    ],
    whenToSeekHelp:
      "Seek professional veterinary care if you notice respiratory issues, difficulty eating, abnormal behavior, or any health concerns.",
  },
  {
    id: "curly-hair-tarantula",
    name: "Curly Hair Tarantula",
    scientificName: "Tliltocatl albopilosus",
    category: "spider",
    summary: "Terrestrial tarantula requiring proper enclosure design",
    heroImage:
      "data:image/jpeg;base64,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",
    setupImage:
      tranculla,
    overview:
      "A terrestrial tarantula species that requires careful housing to prevent injury and stress.",
    bestSetup: [
      "House tarantulas separately to avoid cannibalism",
      "Terrestrial species should not be kept in overly tall enclosures due to fall injury risk",
      "Avoid mesh tops where feet can get caught",
      "Use secure, escape-proof housing",
    ],
    feedingBehavior: [
      "Feeding frequency depends on age and size",
      "Avoid overfeeding",
      "Remove uneaten feeders after a reasonable window",
    ],
    importantConsiderations: [
      "Many tarantulas are defensive when stressed",
      "Handling should be minimized",
      "Monitor for signs of stress or health issues",
    ],
    supplementsAndHabitat: [
      "Invertebrates do not use the same calcium/UV model as reptiles",
      "Focus on correct humidity, substrate, and safe enclosure design",
    ],
    whenToSeekHelp:
      "If you observe prolonged refusal to eat, abnormal behavior, or difficulty molting, consult an exotic veterinarian experienced with invertebrates.",
  },
  {
    id: "pink-toe-tarantula",
    name: "Pink Toe Tarantula",
    scientificName: "Avicularia avicularia",
    category: "spider",
    summary: "Arboreal tarantula needing vertical space and ventilation",
    heroImage:
      "https://images.unsplash.com/photo-1606540583267-bf3e845c9056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwdG9lJTIwdGFyYW50dWxhfGVufDF8fHx8MTc2NzI4MzAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    setupImage: Avicularia,
    overview:
      "An arboreal tarantula species requiring vertical space and proper environmental management.",
    bestSetup: [
      "This arboreal species needs a tall, vertical enclosure that supports climbing and webbing near the top.",
      'A vertical enclosure around 30 x 30 x 45 cm (12 x 12 x 18 in) suits most adults; prioritize height and climbable surfaces over extra floor space.',
      "Provide strong cross-ventilation with vents on opposing sides (upper and lower if possible) plus a secure vented lid to prevent stagnant, humid air pockets.",
      "Add vertical cork bark with branches and foliage (artificial or clean, pesticide-free live plants) to create anchor points and routes for web retreats in the upper half.",
      'Use a thin substrate layer (about 2 to 5 cm / 0.5 to 2 in) mainly for cleanliness and humidity buffering; avoid water-logged substrate and keep it simple (e.g., coco fiber).',
      "Keep a shallow water dish available at all times. Use only light, occasional moisture if needed and prioritize airflow so the enclosure feels fresh, not swampy.",
      "Maintain temperatures around 21 to 26 C and avoid sustained temperatures above 28 C.",
      "Ambient room light is sufficient; UVB is not required. Avoid direct sunlight, which can overheat the enclosure quickly.",
    ],
    feedingBehavior: [
      "Arboreal species may feed higher in the enclosure",
      "Offer feeders accordingly",
    ],
    importantConsiderations: [
      "Prioritize ventilation to avoid stale, overly wet conditions",
      "Monitor humidity with appropriate tools",
      "Minimize handling stress",
    ],
    supplementsAndHabitat: [
      "Emphasis on enclosure design, humidity management, and stress reduction",
      "No supplement regime like reptiles require",
    ],
    whenToSeekHelp:
      "Contact an exotic veterinarian if you notice difficulty molting, refusal to eat for extended periods, or unusual behavior.",
  },
  {
    id: "whites-tree-frog",
    name: "White's Tree Frog",
    scientificName: "Litoria caerulea",
    category: "amphibian",
    summary: "Hardy arboreal frog with specific lighting and supplement needs",
    heroImage:
      "data:image/jpeg;base64,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",
    setupImage:
      Litoria,
    overview:
      "White's tree frogs are robust amphibians that require appropriate environmental conditions and regular veterinary monitoring.",
    bestSetup: [
      "Provide appropriate lighting cycle",
      "Maintain enclosure conditions suitable for the species",
      "Follow UV equipment replacement guidance",
      "Provide clean water and safe climbing space (arboreal setup)",
    ],
    feedingBehavior: [
      "Primarily insectivorous",
      "Offer a variety of appropriately sized invertebrate prey",
    ],
    importantConsiderations: [
      "Amphibians are sensitive to environment and handling",
      "Annual health checks are recommended by veterinary sources",
    ],
    supplementsAndHabitat: [
      "Veterinary guidance recommends regular dusting with calcium",
      "Use a combined vitamin/mineral supplement with alternating approach",
    ],
    whenToSeekHelp:
      "Amphibians can deteriorate quickly. Seek veterinary care immediately if you observe lethargy, skin abnormalities, difficulty eating, or abnormal posture. Annual wellness exams are recommended.",
  },
  
  {
    id: "corn-snake",
    name: "Corn Snake",
    scientificName: "Pantherophis guttatus",
    category: "snake",
    summary: "Hardy colubrid snake requiring temperature gradient and hides",
    heroImage:
      "https://images.unsplash.com/photo-1611245241464-97cf73d233a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwc25ha2V8ZW58MXx8fHwxNzY3MjgzMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    setupImage:
      Pantherophis,
    overview:
      "Corn snakes are popular pet snakes known for their hardiness and manageable size when provided with appropriate care.",
    bestSetup: [
      "Provide a thermal gradient along the enclosure length and adequate space",
      "Ensure the enclosure allows the snake to stretch out fully",
      "Provide hides on both warm and cool ends",
      "Add climbing opportunities as appropriate",
    ],
    feedingBehavior: [
      "Feed an appropriate schedule and size based on the snake's age and condition",
    ],
    importantConsiderations: [
      "Reptiles can carry Salmonella; handwashing after handling is important",
    ],
    supplementsAndHabitat: [
      "Avoid adding supplements unless directed by a qualified exotic vet",
      "Focus on correct husbandry: temperature gradient, hides, sanitation",
    ],
    whenToSeekHelp:
      "Consult a veterinarian if you observe prolonged refusal to feed, difficulty shedding, respiratory signs (open-mouth breathing, wheezing), or lethargy.",
  },
  {
    id: "ball-python",
    name: "Ball Python",
    scientificName: "Python regius",
    category: "snake",
    summary: "Popular python species with specific humidity and temperature needs",
    heroImage:
      "https://images.unsplash.com/photo-1651093161533-76e8cfedb83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsJTIwcHl0aG9ufGVufDF8fHx8MTc2NzI4MzAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    setupImage:
      Pythonregius,
    overview:
      "Ball pythons are a commonly kept snake species that require careful attention to environmental parameters.",
    bestSetup: [
      "Provide temperature targets and a gradient",
      "Avoid overheating",
      "Maintain appropriate humidity and monitor it",
      "Humidity supports respiratory health and shedding",
    ],
    feedingBehavior: [
      "Ball pythons can be selective eaters",
      "Husbandry (temps/humidity/stress) often matters as much as schedule",
    ],
    importantConsiderations: [
      "Stress reduction: secure hides, minimal handling during acclimation, stable environment",
    ],
    supplementsAndHabitat: [
      "Do not recommend routine supplements unless directed by a qualified exotic vet",
      "Focus on environment and appropriate diet",
    ],
    whenToSeekHelp:
      "Seek veterinary care for prolonged fasting (beyond normal variation), respiratory issues, difficulty shedding, or behavioral changes. Ball pythons can be prone to stress-related issues.",
  },
];

export function getSpeciesByCategory(categoryId: string): SpeciesData[] {
  return speciesData.filter((species) => species.category === categoryId);
}

export function getSpeciesById(speciesId: string): SpeciesData | undefined {
  return speciesData.find((species) => species.id === speciesId);
}
