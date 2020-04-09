export interface Card {
    id: number,
    name: string,
    lawChaosAlignment: Alignment,
    goodEvilAlignment: Alignment,
    ability: Ability,
    description: string,
    misalignedDescription?: string,
    showDescription?: boolean
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
    if (lawChaosDiff == 2 && goodEvilDiff == 0 && card.goodEvilAlignment == Alignment.Neutral) {
        return MatchType.OppositeMatch;
    }
    if (goodEvilDiff == 2 && lawChaosDiff == 0 && card.lawChaosAlignment == Alignment.Neutral) {
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
        ability: Ability.Strength,
        description: `Symbolizes standing strong
        in the face of adversity. The Paladin does not back down under
        any circumstances. This card usually indicates the need to stay the
        course or do what one knows is right, even if it takes a heavy toll.`,
        misalignedDescription: `Such a course might be foolhardy.`
    },
    {
        id: 2,
        name: "The Keep",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Strength,
        description: `A symbol of quiet strength,
        one that can move when necessary, yet stand firm through the
        greatest hardship. Those represented by The Keep are not shaken
        by any force.`,
        misalignedDescription: `Giving
        way to temptation or falling in the face of greater strength.`
    },
    {
        id: 3,
        name: "The Big Sky",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Strength,
        description: `Shows an epic moment
        as the slaves of a nation are freed. The slaves’ freedom specifies
        momentous and powerful change, as old shackles are cast off in
        the light of day.`,
        misalignedDescription: `Those castoff shackles might be
        replaced with worse ones.`
    },
    {
        id: 4,
        name: "The Forge",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength,
        description: `Evokes strength through
        great diversity. The blacksmith represents those who can survive
        the mephits’ trial by fire, but The Forge’s fire is so strong it burns
        many to cinders instead. This card often represents a dangerous
        event that needs many sources of strength to overcome.`
    },
    {
        id: 5,
        name: "The Bear",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength,
        description: `Pure strength. People often
        make the mistake of thinking The Bear can be tamed or trained.
        When someone believes he has The Bear under control, that
        person eventually learns the error of his ways. Brute force might be
        required here, but the consequences of its use might be severe.`
    },
    {
        id: 6,
        name: "The Uprising",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Strength,
        description: `Represents being
        caught in the clutches of something much more powerful than
        you. It is an overwhelming strength that often crushes what comes
        in contact with it. The crown held high signifies an overthrowing
        of a leader of some sort. In the spread, it indicates a force much
        stronger than the person receiving the reading.`
    },
    {
        id: 7,
        name: "The Fiend",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength,
        description: `Depicts a devil swallowing
        innocents. It can indicate the deaths of many in a great calamity. The Fiend
        can also indicate that some sort of dark and intelligent creature is
        in the area, endangering the populace.`,
        misalignedDescription: `Salvation from the same calamity.`
    },
    {
        id: 8,
        name: "The Beating",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength,
        description: `Signifies coming under
        attack from all sides, but it can also indicate the dissolution of the
        self—mentally. Whether the strength is of the flesh or the mind,
        it dissolves under the relentless attack.`,
        misalignedDescription: `During the assault, undiscovered strength is found.`
    },
    {
        id: 9,
        name: "The Cyclone",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Strength,
        description: `A force that tears through
        whatever it meets. This disaster does not come in the course of
        natural order but is one that comes from the plots of intelligent
        beings. The Cyclone signifies war, arson, or other plans that
        destroy everything they touch.`,
        misalignedDescription: `Renewal after a blustery trial.`
    },
    {
        id: 10,
        name: "The Dance",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity,
        description: `A rich and delicate
        framework that, like the universe itself, requires everyone within
        it to abide by its rules, lest the entire construct collapse. It advises
        staying in perfect step, knowing your place in the greater good.
        Those who step out of the pattern do so at their peril.`,
        misalignedDescription: `That pattern might be hypnotic, but not to the good of all.`
    },
    {
        id: 11,
        name: "The Cricket",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity,
        description: `A grig, a creature whose
        mind is as quick as its body. It represents speed and quick passage.
        Although The Cricket is commonly associated with travel, the
        peach it sits by represents treasure at the end.`,
        misalignedDescription: `The
        journey will go poorly, and the treasure will be one that is lost
        rather than found.`
    },
    {
        id: 12,
        name: "The Juggler",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Dexterity,
        description: `Represents fate, the gods,
        or those who play with the lives and destinies of others. If this
        titanic Juggler can keep up his rhythm, he will achieve his goals.`,
        misalignedDescription: `He falters, and tragedy and failure
        are assured for those whose lives he meddled in.`
    },
    {
        id: 13,
        name: "The Locksmith",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity,
        description: `Presents the subject
        with the keys she needs to unlock her destiny. He grants the
        tools to access a new location, clue, or treasure. He does not grant
        insight into how or where to use the tools granted. This card often
        represents a strange, ancient, or magical object.`
    },
    {
        id: 14,
        name: "The Peacock",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity,
        description: `A creature of astonishing
        beauty, but it is a beauty that can only be retained if frozen like a 
        cockatrice’s statues. Smarter people accept the passage of time and
dance out of The Peacock’s way. Its appearance always signifies a
sudden personal shift in attitude or societal change.`
    },
    {
        id: 15,
        name: "The Rabbit Prince",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Dexterity,
        description: `A quirky fellow
        who represents the vagaries of hand-to-hand combat. The Prince
        is battle personified and nothing if not capricious. As his broken
        sword symbolizes, any combatant can fall in battle, no matter how
        brave or skilled. This card sometimes stands for younger members
        of royalty or other powerful households.`
    },
    {
        id: 16,
        name: "The Avalanche",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity,
        description: `Disaster. It is an
        unthinking, unreasoning thing that overruns all who get in its
        way. It can represent physical disaster or the disaster that comes
        from a panicked crowd or other unthinking group or entity.`,
        misalignedDescription: `If misaligned, the calamity is likely to be averted, though not
        without consequence.`
    },
    {
        id: 17,
        name: "The Crows",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity,
        description: `A dangerous bunch who
        indicate violent taking of that which is loved. When The Crows
        appear, murder, theft, or other shocking loss occurs.`,
        misalignedDescription: `Such acts can be averted or the thievery is a just one.`
    },
    {
        id: 18,
        name: "The Demon's Lantern",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Dexterity,
        description: `The card of
        traps and tricks, sleight of hand and sleight of mind. These will-o’-
        wisps and the man who sought their light represent an impossible
        or intractable situation.`,
        misalignedDescription: `An opportunity
        or a guide arriving at a perfect moment to show the way.`
    },
    {
        id: 19,
        name: "The Trumpet",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution,
        description: `A declaration of
        power. This archon is an aggressive force who wades into the direst
        situations without hesitation in the cause of right. It is a card that 
        grants all or nothing at all`,
        misalignedDescription: `Suggests the motives aren’t noble, bringing injury and crumbling
        strength.`
    },
    {
        id: 20,
        name: "The Survivor",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution,
        description: `Represents a person
        who has been through an ordeal of some kind. Surrounded by
        his fallen comrades, the man represents someone or something
        thought lost forever, but found once more. It can also represent
        rebirth.`,
        misalignedDescription: `Can evoke terrible news or a
        profound loss.`
    },
    {
        id: 21,
        name: "The Desert",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Constitution,
        description: `an environment
        so bleak that none can survive it without aid. For those who find
        that aid, the journey across the wastes can lead to great things. 
        The sphinx on this card can refer to a
        mystic or doctor bringing salvation in times of plague or illness.`,
        misalignedDescription: `The subject cannot rely on the help of others
        and will assuredly be lost.`
    },
    {
        id: 22,
        name: "The Brass Dwarf",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution,
        description: `Shows an azer
        who represents invulnerability to a current danger. Although
        others might fall, he remains hale and strong. The Brass Dwarf
        can also mean a failure or dark fate for one, which in turn might
        save all others around him from a greater danger.`
    },
    {
        id: 23,
        name: "The Teamster",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution,
        description: `A driving external force
        that keeps the subject going, no matter what. This force can be
        physical or mental, as a person who exhorts others to continue 
        on when they have no more strength to give. The force can be for
        good or ill but cannot be ignored. The half-orc depicted is leading
        a life of constant toil, but for his own betterment.`
    },
    {
        id: 24,
        name: "The Mountain Man",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Constitution,
        description: `Signifies
        an encounter with a physical power outside of one’s control. The
        giant could personify an authority, an army, an earthquake, or
        even a desperately needed rainstorm in a parched land. Acceding
        to the force might be wise, but surviving it is paramount.`
    },
    {
        id: 25,
        name: "The Tangled Briar",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution,
        description: `A card of
        ancient deeds. It indicates an object or person from long ago
        that will somehow have great influence on the situation. The
        object or person in question is one lost or murdered in some
        foul way.`,
        misalignedDescription: `The thorny past brings not just pain, but
        hope for the future.`
    },
    {
        id: 26,
        name: "The Sickness",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution,
        description: `Represents plague,
        pestilence, famine, and disease. It can also indicate corruption of
        the soul or of a multitude of souls.`,
        misalignedDescription: `Represents either great health or a chance to stop such a disaster.`
    },
    {
        id: 27,
        name: "The Waxworks",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Constitution,
        description: `A place of
        helplessness and physical entropy. The mind might be willing,
        but the flesh is frozen in this place of horror. It is also the card of
        torture and imprisonment, signifying literal inability to move or
        a paralysis of a more prosaic kind.`,
        misalignedDescription: `Indicates
        an abundance of energy at a crucial moment that changes all.`
    },
    {
        id: 28,
        name: "The Hidden Truth",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence,
        description: `Symbolizes the
        ability to see past the obvious and the banal to a greater truth
        within. Sometimes this discovery is an esoteric one, sometimes it
        is a literal find, such as an item revealed within a room. Regardless,
        it is a card with the power to reveal secrets.`,
        misalignedDescription: `A secret being revealed to the subject’s detriment.`
    },
    {
        id: 29,
        name: "The Wanderer",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence,
        description: `A collector. This
        centaur appreciates that which others regard as junk or trash. The
        Wanderer appears to those clever enough to find the true worth
        in something others ignore or treat as worthless.`,
        misalignedDescription: `Signifies a loss of values, or the inability to see what is
        truly valuable in a person or situation.`
    },
    {
        id: 30,
        name: "The Joke",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Intelligence,
        description: `Shows a terror that must
        be overcome—but not by physical means. This monster can only
        be defeated by trickery or artifice. This card can represent the
        value of humor in finding the way past a difficult person or task.`,
        misalignedDescription: `The joke will be on you.`
    },
    {
        id: 31,
        name: "The Inquisitor",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence,
        description: `Accepts nothing
        save the truth. He represents immutable reality, that which cannot
        be fooled or swayed in any way. To attempt to go against this
        unchangeable object, person, or idea is to court disaster.`
    },
    {
        id: 32,
        name: "The Foreign Trader",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence,
        description: `The card of spies
        and peddlers alike. Any who trade in information are subject to
        this card’s influence. A bargain made under this card’s auspice
        always concludes true, but the ramifications of the pact might be
        shocking for those who do not understand its implications.`
    },
    {
        id: 33,
        name: "The Vision",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Intelligence,
        description: `Represents arcane
        knowledge. Such knowledge can take the form of madness or
        cryptic words. This card often means an encounter with a crazy
        person, but it can also signify a brush with genius.`
    },
    {
        id: 34,
        name: "The Rakshasa",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence,
        description: `The card of dominance
        and mind control. The creature sitting serenely upon the back of
        the slave indicates an exterior force imposing itself upon another
        being’s mind. On occasion, the slavery is literal, but more often
        it is mental enslavement to a force or idea.`,
        misalignedDescription: `Enslavement can be cast off in the face of new information.`
    },
    {
        id: 35,
        name: "The Idiot",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence,
        description: `A card of grave
        foolishness and greed. It can mean bribery, blackmail, or naivety
        so grand it can see no evil. The goblins have captured a foolhardy
        man, representing the knowledge that loss of dignity can precede
        loss of life.`,
        misalignedDescription: `Feigning of idiocy
        to disguise one’s gifts.`
    },
    {
        id: 36,
        name: "The Snakebite",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Intelligence,
        description: `A vile, poisoned
        weapon. Poison takes many forms—not all of them physical. The
        poison on the assassin’s blade represents the death of ideas and
        freedom, as well as the ability to turn friends against each other or
        poison the minds of the virtuous.`,
        misalignedDescription: `A mental leap, a new friendship, or a discovery.`
    },
    {
        id: 37,
        name: "The Winged Serpent",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom,
        description: `A powerful
        being. Knowledge and prudence are separate keeps bridged
        by understanding. The couatl represents this bridge, knowing
        whether now is the time to strike.`,
        misalignedDescription: `Either not seizing a moment or doing so ill-advisedly.`
    },
    {
        id: 38,
        name: "The Midwife",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom,
        description: `A conduit to creation,
        although she does not create on her own. This halfling is a key that
        lets new life or information into the world. Her heart can see the
        good in even the worst situation. She can see the import of any
        new arrival.`,
        misalignedDescription: `The new arrival will likely
        not inspire much joy.`
    },
    {
        id: 39,
        name: "The Publican",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Wisdom,
        description: `Fellowship and
        camaraderie, and a place of refuge for those in need. Most would
        find the cyclops inconsequential, but he has insights relevant to
        the reading or a quest.`,
        misalignedDescription: `Refuge
        unfound or false information given at a crucial moment.`
    },
    {
        id: 40,
        name: "The Queen Mother",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom,
        description: `Knowledge
        personified. The formian knows all but does not reveal anything
        to anyone who does not show her proper worship. She is fond of
        the powerless and the underclasses, for they serve her when the
        more powerful refuse. She represents the need to become part of
        a society, or to bow before those who know more than you.`
    },
    {
        id: 41,
        name: "The Owl",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom,
        description: `The eternal wisdom of the
        natural order. It is the harsh realism that causes a pack of wolves to 
        cull the weak in the herd. It is tragic for the culled deer, but through
        such actions the herd grows stronger. The needle The Owl holds
        binds life together, but just as easily can pick that life apart.`
    },
    {
        id: 42,
        name: "The Carnival",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Wisdom,
        description: `Illusions
        and false dreams. This card can heighten the power of the arcane,
        but depending on such whimsical forces can be risky. For others,
        this card depicts imprudent plans or unrealistic ambitions.`
    },
    {
        id: 43,
        name: "The Eclipse",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom,
        description: `Self-doubt and
        loss of purpose. This card afflicts those with faith in the divine,
        as their talents can wane under this stress. It can also indicate a
        loss of way along a path.`,
        misalignedDescription: `An unheralded
        ability coming to the fore or a concealed location revealed.`
    },
    {
        id: 44,
        name: "The Mute Hag",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom,
        description: `Might be silent, but the
        eye she holds lets her see into the hearts of men. This hag invokes
        blood pacts and poisonous secrets, the kind that turn brother
        against brother and son against father. It is a card that performers
        loathe, as it leaves them stumbling over their words and songs.`,
        misalignedDescription: `Unshakable loyalty and lucidity of speech.`
    },
    {
        id: 45,
        name: "The Lost",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Wisdom,
        description: `Emptiness and
        loss of identity. The bodak shown is forever mad, lost in a world
        of lunatics, insane asylums, and mass killers. For those under its
        influence, the world makes no sense. It evokes times where all is
        babble, as when meeting someone who speaks only in another
        tongue.`,
        misalignedDescription: `Clarity of mind under duress.`
    },
    {
        id: 46,
        name: "The Empty Throne",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma,
        description: `A sense of loss
        that is palpable. The ghost signifies that those who are gone will
        always be with us. They taught us important lessons, if only we
        choose to listen. This card can bring information from a far-off or
        ancient source.`,
        misalignedDescription: `The ghosts of the past are restless,
        and might require effort to set at peace.`
    },
    {
        id: 47,
        name: "The Theater",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma,
        description: `True
        prophecy. The puppets act out a scene, just as the prophet acts
        out a scene in which she has no part. The prophet is the audience
        and the prophecy is the show. She has no influence on what she
        sees, and its importance is often not recognized until too late.`,
        misalignedDescription: `The prophecy is just for show.`
    },
    {
        id: 48,
        name: "The Unicorn",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Good,
        ability: Ability.Charisma,
        description: `A card that generously
        offers that which the subject seeks, just as the charger in the
        picture offers up its fruit.`,
        misalignedDescription: `Betrayal, poisoning, or a false friend.`
    },
    {
        id: 49,
        name: "The Marriage",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma,
        description: `A union of
        people, ideas, kingdoms, or other distinct things. The progeny of
        the salamander and water weird shows that a union might bring
        forth new power from both parties, or it might be a ruinous joining
        of that which should never have been united. Once wedded, the
        two cannot be parted. This is the card of permanent change.`
    },
    {
        id: 50,
        name: "The Twin",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma,
        description: `Duality of purpose or
        identity. This doppelganger can also mean indecision, as a person
        or group wavers between very different options. It can also mean
        divided loyalties abound. The card makes a harrower wary, as it can
        also mean the entire spread has a hidden or reversed meaning.`
    },
    {
        id: 51,
        name: "The Courtesan",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Neutral,
        ability: Ability.Charisma,
        description: `Political intrigue. Her mask embodies the social niceties that
        must be followed. If it slips, negotiations can take an unexpected
        turn. The card can also indicate a woman of power who shapes
        events. How she is treated decides the outcome of the situation.`
    },
    {
        id: 52,
        name: "The Tyrant",
        lawChaosAlignment: Alignment.Lawful,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma,
        description: `A ruler who is a
        blight upon those ruled. The dragon might indicate a monarch,
        overseer, or head of a household. Whoever this person is, he does
        harm to those over whom he holds sway, whether he realizes it or
        not.`,
        misalignedDescription: `A tyrant revealed or dethroned.`
    },
    {
        id: 53,
        name: "The Betrayal",
        lawChaosAlignment: Alignment.Neutral,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma,
        description: `Selfishness incarnate.
        Envy twists the spirit and leads ultimately to devastation. It
        can also indicate a person whose loveliness hides an evil heart.`,
        misalignedDescription: `Self-sacrifice or turning away from the
        material world and its temptations.`
    },
    {
        id: 54,
        name: "The Liar",
        lawChaosAlignment: Alignment.Chaotic,
        goodEvilAlignment: Alignment.Evil,
        ability: Ability.Charisma,
        description: `Love at its most treacherous.
        This is not the love that moves mountains, this is the love that
        rips the heart in two and causes lovers to leap to their deaths. This
        lamia can mean obsession, unrequited passion, or doomed love.`,
        misalignedDescription: `A new relationship beginning,
        although disguised as something much less beautiful.`
    },
]