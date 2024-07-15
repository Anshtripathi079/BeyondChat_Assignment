interface Country {
  id: number;
  name: string;
  code: string;
  phone_code: string;
}

interface Sender {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  email_verified_at: string | null;
  password_updated: number;
  created_at: string | null;
  updated_at: string;
  device: string | null;
  browser: string | null;
  os: string | null;
  city: string | null;
  country: Country | null;
}

export interface ChatMessages {
  id: number;
  sender_id: number;
  role_id: number;
  message: string;
  unanswered: number;
  vote: number | null;
  chat_id: number;
  action_id: number | null;
  is_corrected: number;
  created_at: string;
  updated_at: string;
  sender: Sender;
}
