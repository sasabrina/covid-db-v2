export interface Infected {
    id: number,
    first_name: string,
    last_name: string,
    country: string,
    live: boolean,
    age: number,
    infect_date: string,
    female: boolean,
}

export interface Country {
    id: number,
    name: string,
    infected: number,
}