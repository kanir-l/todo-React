export class TodoModel {
    constructor(
        public id: number,
        public title: string,
        public created: Date,
        public isDone: false
    ) {}
}