
export enum MessageRoleEnum {
  System = 'system',
  User = 'user',
  Assistant = 'assistant'
}

export interface MessageInterface {
  role: MessageRoleEnum,
  content: string
}
