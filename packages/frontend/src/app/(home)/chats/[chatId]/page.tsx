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

  return <ChatConversation chatId={chat.id} title={chat.title} />;
}
