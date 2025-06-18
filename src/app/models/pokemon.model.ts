

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url?: string;
    id: number;
    image: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    abilities: {
        ability: { name: string; };
    }[];
    types: {
        type: { name: string; };
    }[];
    stats: {
        base_stat: number;
        stat: { name: string; };
    }[];
}