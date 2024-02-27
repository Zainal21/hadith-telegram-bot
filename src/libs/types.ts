export interface UserData {
  from?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  data?: string;
  text?: string;
}

export interface HadithBook {
  name: string;
  id: string;
  available: number;
}

export interface HadithBookResponse {
  code: number;
  message: string;
  data: HadithBook[];
  error: boolean;
}

export interface HadithContent {
  number: number;
  arab: string;
  id: string;
}

export interface HadithBaseContent {
  name: string;
  id: string;
  available: number;
  contents: HadithContent;
}

export interface HadithBaseContentResponse {
  code: number;
  message: string;
  data: HadithBaseContent;
  error: boolean;
}

export interface ReplyWithButton {
  text: string;
  callback_data: string;
}
