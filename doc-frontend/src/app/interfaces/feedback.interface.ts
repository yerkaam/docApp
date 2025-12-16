export interface Feedback {
  _id: string;
  feedback: string;// MongoDB ObjectId
  userId: string;       // ID пользователя
  doctorId: string;     // ID доктора
  createdAt: string;
  rating: number;// дата создания записи
}
