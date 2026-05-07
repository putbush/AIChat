import { MessageSender } from '@aichat/shared';
import styles from './Message.module.scss';
import classNames from 'classnames';

type MessageProps = {
  sender: MessageSender;
  children: React.ReactNode;
};

export const Message = (props: MessageProps) => {
  const { sender, children } = props;

  const senderClass = sender === 'user' ? styles.user : styles.ai;

  return (
    <>
      <div className={classNames(styles.message, senderClass)}>{children}</div>
      <div className={classNames(styles.message, styles.ai)}>
        Привет! Откликаюсь на позицию практиканта во фронтенд-разработке. Учусь на техническом
        направлении и хочу поработать над реальным продуктом. Отвечаю на вопросы из описания
        вакансии. Готовность к работе: рассматриваю частичную занятость, чтобы совмещать с учебой. К
        очному формату готов. Опыт React и TypeScript: начинал с Python с телеграм-ботов на
        фрилансе, но дальше хотел развиваться в вебе. Первый опыт начался с бэкенда, потом решил,
        что fullstack поможет мне развиться больше. Сейчас активно использую React, Next.js и
        TypeScript в своих пет-проектах. Недавно выиграл отбор на стипендию Астра с проектом
        интеллектуального ассистента как раз на этом стеке. Работа с REST API: отлично понимаю
        принципы взаимодействия. Писал бэкенд для сервиса сокращения ссылок на NestJS со своей базой
        на PostgreSQL и кэшированием в Redis. В текущем проекте фулстек AI-чата тоже много работаю с
        API и синхронизацией данных. Опыт с Figma: умею работать с готовыми макетами, собирать по
        ним адаптивную верстку и забирать нужные элементы.
      </div>
    </>
  );
};
