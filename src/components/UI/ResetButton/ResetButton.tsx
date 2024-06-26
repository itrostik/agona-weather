import styles from './ResetButton.module.scss';

export default function ResetButton() {
  return <div className={styles.wrapper}>
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" id="close">
      <path
        fill={'#ffffff'}
        d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
      className={styles.path}></path>
    </svg>
  </div>;
}