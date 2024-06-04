export interface PokemonList {
  count: number;
  previous?: string;
  next?: string;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: { [cryName: string]: string };
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: PastType[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: PokemonType[];
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Form {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: GameIndexVersion;
}

export interface GameIndexVersion {
  name: string;
  url: string;
}

export interface HeldItem {
  item: {
    name: string;
    url: string;
  };
  version_details: HeldItemVersionDetail[];
}

export interface HeldItemVersionDetail {
  rarity: number;
  version: HeldItemVersion;
}

export interface HeldItemVersion {
  name: string;
  url: string;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: MoveVersionGroupDetail[];
}

export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: MoveVersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface MoveVersionGroup {
  name: string;
  url: string;
}

export interface PastAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PastType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  [spriteName: string]:
    | null
    | string
    | Sprites
    | { [spriteName: string]: Sprites }
    | { [generationName: string]: { [versionName: string]: Sprites } };
  front_default: string;
  back_default: string;
  other: { [otherName: string]: Sprites };
  versions: { [generationName: string]: { [versionName: string]: Sprites } };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
