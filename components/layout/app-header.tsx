'use client';

import Headroom from 'react-headroom';
import Container from '../shared/container';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import useScrollPosition from '@/hooks/scroll-position';
import MobileNav from './mobile-nav';
import ProgrammesPopover from './programmes-popover';
import { XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [open, setOpen] = useState(true);
  const isScrolled = useScrollPosition();

  const pathname = usePathname();

  const showPopover = useMemo(() => {
    if (pathname === '/') {
      if (isScrolled && open) {
        return true;
      }
      return false;
    } else {
      if (open) {
        return true;
      }
      return false;
    }
  }, [pathname, isScrolled, open]);

  if (pathname === '/') return null;

  return (
    <Headroom className='z-[99]'>
      <header className={cn('relative bg-custom-darkBlue py-4 text-white')}>
        <Container className='flex items-center justify-between gap-16'>
          <Link
            href='/'
            className='text-lg font-bold hover:text-custom-beige md:text-xl lg:text-2xl'
          >
            iQiQUE
          </Link>

          <nav className='hidden lg:block'>
            <ul className='flex items-center gap-10'>
              <li>
                <Link
                  href='/about'
                  className='font-medium hover:text-custom-beige'
                >
                  About us
                </Link>
              </li>
              <li>
                <ProgrammesPopover />
              </li>
              <li>
                <Link
                  href='/faq'
                  className='font-medium hover:text-custom-beige'
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='font-medium hover:text-custom-beige'
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>

          <div className='hidden items-center justify-end lg:flex'>
            <Button
              size='lg'
              className={cn(
                'bg-custom-beige text-custom-darkBlue hover:bg-white hover:text-custom-darkBlue hover:shadow',
              )}
              asChild
            >
              <Link href='/enroll'>Enroll Now</Link>
            </Button>
          </div>
          <MobileNav />
        </Container>
        {showPopover && (
          <section className='absolute left-0 top-full w-full bg-custom-beige text-custom-darkBlue'>
            <Container className='relative flex items-center gap-3 py-2 text-center'>
              <div className='hidden w-5 lg:block' />
              <p className='lg:flex-1'>
                All programmes are now open for registration{' '}
                <Link href='/programmes' className='underline hover:text-black'>
                  Browse Programmes
                </Link>
              </p>
              <Button
                size='icon'
                variant='ghost'
                onClick={() => setOpen(false)}
              >
                <XIcon className='h-5 w-5' />
              </Button>
            </Container>
          </section>
        )}
      </header>
    </Headroom>
  );
};
export default Header;