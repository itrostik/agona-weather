import styles from './MiniLoading.module.scss';
import Image from 'next/image';

export default function MiniLoading() {
  return (
    <div className={styles.wrapper}>
      <Image
        src={'/loader.svg'}
        alt={'loader'}
        width={30}
        height={30}
        className={styles.loader}
      ></Image>
    </div>
  );
}
