'use client';

import styles from './PromptInput.module.scss';
import { Button } from '@shared/ui';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
import { CreateMessage, CreateMessageSchema, SHARED_VALIDATION_ERRORS } from '@aichat/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useSendMessage } from '@features/chat/api';
import { Tooltip } from 'antd';
import { useStreamingMessage } from '@features/chat/model';
import { FieldTextarea } from '@shared/ui/FieldTextarea';
import { ASSETS } from '@shared/constants/assets';

type PromptInputProps = {
  chatId?: string;
};

export const PromptInput = (props: PromptInputProps) => {
  const { chatId } = props;

  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0); // Used to reset the form

  const { mutate, isPending } = useSendMessage();
  const streamingMessage = useStreamingMessage(chatId);

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

    streamingMessage.start(data.content);

    resetField('content', { defaultValue: '' });
    setKey((prev) => prev + 1); // Reset the form by changing its key

    mutate(
      {
        payload: { content: data.content, chatId },
        onEvent: streamingMessage.handleEvent,
      },
      {
        onSuccess: () => {
          void streamingMessage.finish();
        },
        onError: (error) => {
          streamingMessage.error();
          setError(error.message);
        },
      },
    );
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    event.currentTarget.form?.requestSubmit();
  };

  return (
    <form className={styles.promptInput} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldTextarea
        key={key}
        id="prompt-input"
        label="Your prompt"
        placeholder="Type your message here..."
        className={styles.field}
        aria-describedby={error ? 'prompt-input-error' : undefined}
        register={register('content')}
        onKeyDown={handleTextareaKeyDown}
      />
      <Tooltip title={tooltipTitle} placement="top" mouseEnterDelay={0.15}>
        <Button
          className={styles.button}
          type="submit"
          variant="primary"
          iconOnly
          disabled={isSubmitDisabled}
        >
          <Image src={ASSETS.ICONS.SEND} alt="Send message" width={22} height={22} />
        </Button>
      </Tooltip>
    </form>
  );
};
