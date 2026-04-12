'use client';

import { observer } from 'mobx-react';
import styles from './ChatWindow.module.scss';
import { Logo } from '@shared/ui';
import { chatWindowStore } from '../model';
import Image from 'next/image';
import { PromptInput } from '@features/chat';

export const ChatWindow = observer(() => {
  const { infoBlocks } = chatWindowStore;

  return (
    <div className={styles.window}>
      <section className={styles.info} aria-label="AI capabilities">
        <Logo width={60} height={68} />
        <ul className={styles.gridBlocks}>
          {infoBlocks.map((block) => (
            <li key={block.title} className={styles.infoBlock}>
              <div className={styles.header}>
                <Image
                  src={`/icons/info-blocks/${block.image}`}
                  alt={`${block.title} icon`}
                  width={40}
                  height={40}
                />
                <p className={styles.blockTitle}>{block.title}</p>
              </div>

              <ul className={styles.featuresList}>
                {block.features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <PromptInput />
    </div>
  );
});
