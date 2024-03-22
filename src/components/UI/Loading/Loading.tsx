import styles from './Loading.module.scss';
import Image from 'next/image';
export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Image
        src={'/loader.svg'}
        alt={'loader'}
        width={50}
        height={50}
        className={styles.loader}
      ></Image>
    </div>
  );
}
