export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  cityId: string;
  rating: number;
  availableTimes: string[];
  image: string;
}
