import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  date = signal<string | null>(null);
  status = signal<string | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDateTime();
  }

  fetchDateTime(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ date: string; status: string }>('https://express-f90g.onrender.com/').subscribe({
      next: (res) => {
        this.date.set(res.date);
        this.status.set(res.status);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível conectar à API.');
        this.loading.set(false);
      }
    });
  }
}
