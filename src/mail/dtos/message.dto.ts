export class MessageDto {
  email!: string;
  attachments!: {
    filename: string;
    content: any;
  }[];
}
