import { Component, signal } from '@angular/core';
import { AiService } from '../../services/ai.service';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface ChatMessage {
  from: 'me' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  imports: [
    NgClass,
    FormsModule
  ],
  styleUrl: 'chat.component.css'
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  input = signal('');

  constructor(private ai: AiService) {}

  // Getter/setter для ngModel
  get inputValue() {
    return this.input();
  }
  set inputValue(val: string) {
    this.input.set(val);
  }

  sendMessage() {
    const text = this.input().trim();
    if (!text) return;

    // Добавляем сообщение пользователя
    this.messages.update(msgs => [...msgs, { from: 'me', text }]);
    this.input.set('');

    // Отправляем на backend
    this.ai.sendMessage(text).subscribe({
      next: (res) => {
        // Берем ответ AI (с проверкой)
        const replyText = res?.reply || 'Ответ от AI недоступен';
        this.messages.update(msgs => [...msgs, { from: 'ai', text: replyText }]);
      },
      error: (err) => {
        console.error('AI error:', err);
        this.messages.update(msgs => [...msgs, { from: 'ai', text: 'Ошибка AI сервера' }]);
      }
    });
  }
}
