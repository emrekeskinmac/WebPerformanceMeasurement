export interface PostInputCollectDTO {
    t: number,
    r: number,
    e: number,
    n: number,
    d: Array<Resource>,
    y: string,
    o: number,
    l: string,
}

export interface Resource {
    t: string,
    e: string,
    c: number,
    h: number
}

export interface GetOutputCollectDTO {
    date: number,
    min: number,
    ttfb: number,
    dload: number,
    load: number,
    paint: number
}
