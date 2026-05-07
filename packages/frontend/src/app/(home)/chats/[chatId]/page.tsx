import { getChatById } from '@entities/chat/api';
import { ChatConversation } from '@widgets/chat-window';
import { notFound } from 'next/navigation';

type ChatPageProps = {
  params: Promise<{
    chatId: string;
  }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params;

  const chat = await getChatById(chatId);

  if (!chat) {
    notFound();
  }


  //TODO: ДОБАВИТЬ ПРИ ОТПРАВКЕ СООБЩЕНИЯ НЕ СБРОС КЕША И НОВЫЙ ЗАПРОС, А АВТО ДОБАВЛЕНИЕ В КЕШ И В КОМПОНЕНТ
  return <ChatConversation chatId={chat.id} title={chat.title} />;
}
