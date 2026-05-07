'use client';

import { Field } from '@shared/ui/Field';
import styles from './PromptInput.module.scss';
import { Button } from '@shared/ui';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
import { CreateMessage, CreateMessageSchema, SHARED_VALIDATION_ERRORS } from '@aichat/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useSendMessage } from '@features/chat/api';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { LINK_PATHS } from '@shared/constants/routes';

type PromptInputProps = {
  chatId?: string;
};

export const PromptInput = (props: PromptInputProps) => {
  const { chatId } = props;
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useSendMessage();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm<CreateMessage>({
    resolver: zodResolver(CreateMessageSchema),
    mode: 'all',
  });

  const content = useWatch({ control, name: 'content' }) ?? '';
  const isContentEmpty = content.trim().length === 0;
  const hasValidationError = Boolean(errors.content);
  const isSubmitDisabled = isPending || isContentEmpty || hasValidationError;
  const tooltipTitle =
    errors.content?.message ??
    (isContentEmpty ? SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY : 'Send message');

  const onSubmit = (data: { content: string }) => {
    setError(null);
    mutate(
      { content: data.content, chatId },
      {
        onSuccess: (message) => {
          resetField('content', { defaultValue: '' });

          if (!chatId) {
            router.push(LINK_PATHS.CHAT(message.chatId));
          }
        },
        onError: (error) => {
          setError(error.message);
        },
      },
    );

  };

  return (
    <form className={styles.promptInput} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        label="Your prompt"
        placeholder="Type your message here..."
        className={styles.field}
        ariaDescribedby={error ? 'prompt-input-error' : undefined}
        register={register('content')}
        type="text"
      />
      <Tooltip title={tooltipTitle} placement="top" mouseEnterDelay={0.15}>
        <Button className={styles.button} type="submit" disabled={isSubmitDisabled}>
          <Image src="/icons/send.svg" alt="Send message" width={22} height={22} />
        </Button>
      </Tooltip>
    </form>
  );
};
