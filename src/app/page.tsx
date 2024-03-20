import Image from 'next/image';
import logo from '/public/logo.svg';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/'}>
        <Image
          src={logo}
          alt={'logo'}
          width={150}
          draggable={false}
          priority={true}
        />
      </Link>
    </main>
  );
}
