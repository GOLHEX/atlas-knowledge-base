import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Атлас — личная база инструментов', description: 'Навыки, приложения и сервисы. Находи нужное, сохраняй опыт, дополняй коллекцию.' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="ru"><body>{children}</body></html>; }
