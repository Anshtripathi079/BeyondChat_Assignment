interface Country {
  id: number;
  name: string;
  code: string;
  phone_code: string;
}

interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  password_updated: number;
  created_at: string;
  updated_at: string;
  device: string;
  browser: string;
  os: string;
  city: string;
  country: Country;
}

export interface ChatMessage {
  id: number;
  created_by: number;
  org_id: number;
  status: string;
  lead_score: number;
  created_at: string;
  updated_at: string;
  msg_count: number;
  creator: Creator;
  lastMessage?: string;
  msgDate?: string;
}

export interface ApiResponse {
  data: {
    data: ChatMessage[];
  };
}
