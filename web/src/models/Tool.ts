export type Tool = {
    label: string;
    emoji: string;
    cost: number;
    size: number; // size of tool building (square)
};

export const tools: Tool[] = [
    { label: "Residential", emoji: "🏚️", cost: 100, size: 3 },
    { label: "Commercial", emoji: "🏢", cost: 100, size: 3 },
    { label: "Industrial", emoji: "🏭", cost: 100, size: 3 },
    { label: "Fire Station", emoji: "🚒", cost: 500, size: 3 },
    { label: "Police Station", emoji: "🚓", cost: 500, size: 3 },
    { label: "Inspect", emoji: "🔎", cost: 0, size: 1 },
    { label: "Wire", emoji: "🔌", cost: 5, size: 1 },
    { label: "Bulldozer", emoji: "🚜", cost: 1, size: 1 },
    { label: "Railroad", emoji: "🚂", cost: 20, size: 1 },
    { label: "Road", emoji: "🚗", cost: 10, size: 1 },
    { label: "Stadium", emoji: "🏟️", cost: 5000, size: 4 },
    { label: "Park", emoji: "🌴", cost: 10, size: 1 },
    { label: "Seaport", emoji: "🚢", cost: 3000, size: 4 },
    { label: "Coal Power", emoji: "🔋", cost: 3000, size: 4 },
    { label: "Nuclear Power", emoji: "☢️", cost: 5000, size: 4 },
    { label: "Airport", emoji: "✈️", cost: 10000, size: 6 },
    { label: "Network", emoji: "🚜", cost: 100, size: 1 },
    { label: "Water", emoji: "💧", cost: 0, size: 1 },
    { label: "Land", emoji: "⛰️", cost: 0, size: 1 },
    { label: "Forest", emoji: "🌳", cost: 0, size: 1 },
];
