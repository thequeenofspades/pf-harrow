export interface Card {
    id: number,
    name: string,
    lawChaosAlignment: Alignment,
    goodEvilAlignment: Alignment,
    ability: Ability,
    revealed?: boolean
}

export enum Alignment {
    Chaotic,
    Evil,
    Good,
    Lawful,
    Neutral
}

export enum Ability {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma
}

export enum MatchType {
    None,
    TrueMatch,
    PartialMatch,
    OppositeMatch
}

export function getMatchType(card: Card, position: number): MatchType {
    let lawChaosDiff: number = computeLawChaosDiff(card, position);
    let goodEvilDiff: number = computeGoodEvilDiff(card, position);
    if (lawChaosDiff == 0 && goodEvilDiff == 0) {
        return MatchType.TrueMatch;
    }
    if (lawChaosDiff == 2 && goodEvilDiff == 2) {
        return MatchType.OppositeMatch;
    }
    if (lawChaosDiff == 2 && card.goodEvilAlignment == Alignment.Neutral) {
        return MatchType.OppositeMatch;
    }
    if (goodEvilDiff == 2 && card.lawChaosAlignment == Alignment.Neutral) {
        return MatchType.OppositeMatch;
    }
    if (lawChaosDiff == 0 || goodEvilDiff == 0) {
        return MatchType.PartialMatch;
    }
    return MatchType.None;
}

export function misaligned(card: Card, position: number): boolean {
    return computeGoodEvilDiff(card, position) == 2;
}

// Returns distance to target alignment on the law/chaos axis.
function computeLawChaosDiff(card: Card, position: number): number {
    let lawChaosAlignments: Alignment[] = [Alignment.Lawful, Alignment.Neutral, Alignment.Chaotic];
    return Math.abs(position % 3 - lawChaosAlignments.indexOf(card.lawChaosAlignment));
}

// Returns distance to target alignment on the good/evil axis.
function computeGoodEvilDiff(card: Card, position: number): number {
    let goodEvilAlignments: Alignment[] = [Alignment.Good, Alignment.Neutral, Alignment.Evil];
    return Math.abs(Math.floor(position / 3) - goodEvilAlignments.indexOf(card.goodEvilAlignment));
}

export const CARDS: Card[] = [
    {
        id: 1,
        name: "The Paladin",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Strength
    },
    {
        id: 2,
        name: "The Keep",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Strength
    },
    {
        id: 3,
        name: "The Big Sky",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Strength
    },
    {
        id: 4,
        name: "The Forge",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength
    },
    {
        id: 5,
        name: "The Bear",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength
    },
    {
        id: 6,
        name: "The Uprising",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength
    },
    {
        id: 7,
        name: "The Fiend",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength
    },
    {
        id: 8,
        name: "The Beating",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength
    },
    {
        id: 9,
        name: "The Cyclone",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength
    },
    {
        id: 10,
        name: "The Dance",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity
    },
    {
        id: 11,
        name: "The Cricket",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity
    },
    {
        id: 12,
        name: "The Juggler",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity
    },
    {
        id: 13,
        name: "The Locksmith",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity
    },
    {
        id: 14,
        name: "The Peacock",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity
    },
    {
        id: 15,
        name: "The Rabbit Prince",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity
    },
    {
        id: 16,
        name: "The Avalanche",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity
    },
    {
        id: 17,
        name: "The Crows",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity
    },
    {
        id: 18,
        name: "The Demon's Lantern",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity
    },
    {
        id: 19,
        name: "The Trumpet",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution
    },
    {
        id: 20,
        name: "The Survivor",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution
    },
    {
        id: 21,
        name: "The Desert",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution
    },
    {
        id: 22,
        name: "The Brass Dwarf",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution
    },
    {
        id: 23,
        name: "The Teamster",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution
    },
    {
        id: 24,
        name: "The Mountain Man",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution
    },
    {
        id: 25,
        name: "The Tangled Briar",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution
    },
    {
        id: 26,
        name: "The Sickness",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution
    },
    {
        id: 27,
        name: "The Waxworks",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution
    },
    {
        id: 28,
        name: "The Hidden Truth",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence
    },
    {
        id: 29,
        name: "The Wanderer",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence
    },
    {
        id: 30,
        name: "The Joke",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence
    },
    {
        id: 31,
        name: "The Inquisitor",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence
    },
    {
        id: 32,
        name: "The Foreign Trader",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence
    },
    {
        id: 33,
        name: "The Vision",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence
    },
    {
        id: 34,
        name: "The Rakshasa",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence
    },
    {
        id: 35,
        name: "The Idiot",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence
    },
    {
        id: 36,
        name: "The Snakebite",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence
    },
    {
        id: 37,
        name: "The Winged Serpent",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom
    },
    {
        id: 38,
        name: "The Midwife",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom
    },
    {
        id: 39,
        name: "The Publican",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom
    },
    {
        id: 40,
        name: "The Queen Mother",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom
    },
    {
        id: 41,
        name: "The Owl",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom
    },
    {
        id: 42,
        name: "The Carnival",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom
    },
    {
        id: 43,
        name: "The Eclipse",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom
    },
    {
        id: 44,
        name: "The Mute Hag",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom
    },
    {
        id: 45,
        name: "The Lost",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom
    },
    {
        id: 46,
        name: "The Empty Throne",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma
    },
    {
        id: 47,
        name: "The Theater",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma
    },
    {
        id: 48,
        name: "The Unicorn",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma
    },
    {
        id: 49,
        name: "The Marriage",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma
    },
    {
        id: 50,
        name: "The Twin",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma
    },
    {
        id: 51,
        name: "The Courtesan",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma
    },
    {
        id: 52,
        name: "The Tyrant",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma
    },
    {
        id: 53,
        name: "The Betrayal",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma
    },
    {
        id: 54,
        name: "The Liar",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma
    },
]