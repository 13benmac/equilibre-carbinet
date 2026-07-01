export type PatientStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
export type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'CANCELED';
export type AppointmentType = 'INDIVIDUAL' | 'COUPLE' | 'CHILD' | 'PROFESSIONAL';
export type UserRole = 'ADMIN' | 'PSYCHOLOGIST' | 'SECRETARY';

export interface Psychologist {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  appointments: Array<{ id: string }>;
}

export interface Appointment {
  id: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  psychologist: {
    id: string;
    name: string | null;
  };
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  type: AppointmentType;
  notes: string | null;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string | null;
  birthDate?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
  status: PatientStatus;
  psychologist?: {
    id: string;
    name: string | null;
  } | null;
  appointments: Appointment[];
  notes: Array<{ id: string }>;
  createdAt: string;
  updatedAt: string;
}
