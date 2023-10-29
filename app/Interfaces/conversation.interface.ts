export interface IMessage {
    sender: string,
    receiver: string,
    text: string,
    createdAt: Date,
}

export interface ISocketMessage {
    sender: string,
    receiver: string,
    message: string,
    createdAt: Date,
}