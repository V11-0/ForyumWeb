export enum ResultType {
    User,
    Community
}

export default interface SearchCompletion {
    id: number;
    name: string;
    type: ResultType
}
