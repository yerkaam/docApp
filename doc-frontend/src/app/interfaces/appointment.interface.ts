export interface PaymentInfo {
  method: string;
  account: string;
  name: string;
  comment: string;
}

export interface Appointment {
  _id: string;        // MongoDB ObjectId
  date: string;           // дата записи
  time: string;         // время в формате "HH:mm"
  userId: string;       // ID пользователя
  doctorId: string;     // ID доктора
  paymentInfo: PaymentInfo; // информация об оплате
  createdAt: string;      // дата создания записи
  __v: number;          // версия документа
}
