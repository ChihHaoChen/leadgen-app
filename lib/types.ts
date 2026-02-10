export interface Dojo {
  id: string;
  name: string;
  subdomain: string;
  address: string | null;
  phone: string | null;
  email_from: string | null;
  twilio_account_sid: string | null;
  twilio_auth_token: string | null;
  twilio_phone_number: string | null;
  created_at: Date;
}

export interface Lead {
  id: string;
  dojo_id: string;
  name: string;
  email: string;
  phone: string;
  experience_level: string;
  status: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface FormSubmission {
  subdomain: string;
  name: string;
  email: string;
  phone: string;
  experience_level: 'beginner' | 'intermediate' | 'advanced';
}
