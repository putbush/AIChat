import { Field } from '@shared/ui/Field';
import styles from './PromptInput.module.scss';
import { Button } from '@shared/ui';

export const PromptInput = () => {
  return (
    <form className={styles.promptInput}>
      <Field
        label="Your prompt"
        placeholder="Type your message here..."
        className={styles.field}
        error={undefined}
        register={{
          onChange: async () => Promise.resolve(),
          onBlur: async () => Promise.resolve(),
          ref: () => null,
          name: 'prompt',
        }}
        type="text"
      />
      {/* <Button></Button> */}
    </form>
  );
};
