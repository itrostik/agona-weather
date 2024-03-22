import styles from './Error.module.scss';
import Link from 'next/link';

export default function Error() {
  return (
    <div className={styles.wrapper}>
      <span>Что-то пошло не так 😞</span>
      <Link href={'/'} className={styles.button}>
        Вернуться на главную
      </Link>
    </div>
  );
}
