import styles from './Input.module.scss';
import ResetButton from '@/components/UI/ResetButton/ResetButton';
import React, {ChangeEvent} from 'react';

type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function Input({
  handleSearchChange,
  value,
  setValue,
  placeholder,
}: InputProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    handleSearchChange(event);
  }

  return (
    <label className={styles.label}>
      <input
        type='text'
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={event => {
          onChange(event);
        }}
      />
      {value.length > 0 && (
        <div onClick={() => setValue('')}>
          <ResetButton />
        </div>
      )}
    </label>
  );
}
