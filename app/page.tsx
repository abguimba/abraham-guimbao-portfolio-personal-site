'use client';

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  FileText,
  MapPin,
  Check,
  Sun,
  Moon,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/abraham-guimbao',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/abguimba',
    icon: Github,
  },
  {
    name: 'Resume',
    href: 'https://rxresu.me/abrahamguimbao/abraham-guimbao',
    icon: FileText,
  },
  {
    name: 'Schedule Meeting',
    href: '/booking',
    icon: Calendar,
  },
  {
    name: 'Email',
    href: 'mailto:abrahamguimbao@proton.me',
    icon: Mail,
  },
  {
    name: 'Phone',
    href: 'tel:+33695656958',
    icon: Phone,
  },
];

const roles = [
  'Site Reliability Engineer',
  'Infrastructure Engineer',
  'Platform Engineer',
  'Back-end Engineer',
  'Network Engineer',
  'DevOps Engineer',
  'Cloud Engineer',
  'Automation Engineer',
  'AI Engineer',
];

const skills = [
  'Infrastructure',
  'Cloud',
  'Systems',
  'Back-end',
  'Automation',
  'Networking',
  'Web3/Blockchain',
  'Cybersecurity',
  'AI',
  'OSS',
  'Video Game Development',
];

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onToggle}
      className='fixed right-4 top-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-600/40 bg-card shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl dark:border-purple-400/40 sm:right-6 sm:top-6 sm:h-12 sm:w-12'
      aria-label='Toggle theme'
    >
      <div className='relative h-5 w-5 sm:h-6 sm:w-6'>
        <Sun
          className={`absolute inset-0 h-5 w-5 text-yellow-600 transition-all duration-300 sm:h-6 sm:w-6 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-purple-400 transition-all duration-300 sm:h-6 sm:w-6 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}

function MeteorRain({ isDark }: { isDark: boolean }) {
  const [meteors, setMeteors] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      duration: number;
    }>
  >([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on client side
    const checkMobile = () => window.innerWidth < 640;
    setIsMobile(checkMobile());

    // Generate meteors - reduce count on mobile for better performance
    const meteorArray = [];
    const meteorCount = checkMobile() ? 4 : 8; // Fewer meteors on mobile
    for (let i = 1; i <= meteorCount; i++) {
      meteorArray.push({
        id: i,
        left: Math.random() * 90 + 9,
        top: Math.random() * 250 + 50,
        duration: Math.random() * 8 + 4, // 4-12s
      });
    }
    setMeteors(meteorArray);

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  // Use proper highlight colors: yellow for light, purple for dark
  const meteorColor = isDark ? '#a855f7' : '#fbbf24';
  const meteorGlow = isDark ? '#a855f7' : '#fbbf24';

  return (
    <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className='absolute opacity-60 sm:opacity-80' // Reduce opacity on mobile for subtlety
          style={{
            top: `${meteor.top}px`,
            left: `${meteor.left}%`,
            width: isMobile ? '150px' : '200px', // Shorter meteors on mobile
            height: '3px',
            transform: 'rotate(-45deg)',
            backgroundImage: `linear-gradient(to right, ${meteorColor}, transparent)`,
            animation: `meteor ${meteor.duration}s linear infinite`,
            filter: `drop-shadow(0 0 ${isMobile ? '4px' : '6px'} ${meteorGlow})`, // Smaller glow on mobile
          }}
        >
          <div
            className='absolute -mt-0.5 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2'
            style={{
              background: meteorColor,
              boxShadow: `0 0 ${isMobile ? '6px 1px' : '10px 2px'} ${meteorGlow}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function SkillsList() {
  return (
    <div className='mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-4 sm:gap-3'>
      {skills.map((skill) => (
        <span
          key={skill}
          className='inline-block cursor-default whitespace-nowrap rounded-full border border-yellow-600/40 bg-yellow-600/20 px-3 py-1.5 text-sm font-medium text-yellow-800 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300 sm:px-4 sm:py-2 sm:text-base'
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function SingleRoleDisplay() {
  const currentRoleIndexRef = useRef(0);
  const [displayRoleIndex, setDisplayRoleIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const clearAllTimeouts = () => {
      timeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
      timeoutsRef.current = [];
    };

    intervalRef.current = setInterval(() => {
      // Clear any existing timeouts before creating new ones
      clearAllTimeouts();

      // Start cursor fade out (500ms before role animation)
      setCursorVisible(false);

      // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout
      const timeout1 = setTimeout(() => {
        // Start role animation
        setAnimationClass('animate-role-exit');

        // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout
        const timeout2 = setTimeout(() => {
          // Update the role index using ref to get current value
          const nextIndex = (currentRoleIndexRef.current + 1) % roles.length;
          currentRoleIndexRef.current = nextIndex;
          setDisplayRoleIndex(nextIndex);

          // Start enter animation
          setAnimationClass('animate-role-enter');

          // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout
          const timeout3 = setTimeout(() => {
            // Clear animation class more smoothly and bring cursor back
            setAnimationClass('');
            // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout
            const timeout4 = setTimeout(() => {
              setCursorVisible(true);
            }, 100);
            timeoutsRef.current.push(timeout4);
          }, 500);
          timeoutsRef.current.push(timeout3);
        }, 250);
        timeoutsRef.current.push(timeout2);
      }, 500);
      timeoutsRef.current.push(timeout1);
    }, 2500); // Faster overall cycle

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearAllTimeouts();
    };
  }, []); // Remove currentRoleIndex dependency to prevent multiple intervals

  const currentRole = roles[displayRoleIndex];
  const roleSpecialization = currentRole
    ? currentRole.split(' ').slice(0, -1).join(' ')
    : '';

  return (
    <div className='mb-6 text-lg sm:mb-8 sm:text-xl md:text-2xl lg:text-3xl'>
      <div className='text-center'>
        <div className='relative inline-flex items-center'>
          {/* Role name container - responsive width */}
          <div className='relative flex h-[1.4em] w-[10ch] items-center justify-end overflow-hidden sm:w-[12ch]'>
            <div
              className={`whitespace-nowrap font-medium text-yellow-600 dark:text-purple-400 ${animationClass}`}
            >
              {roleSpecialization}
            </div>
          </div>
          {/* Fixed "Engineer" position - completely static and separate */}
          <span className='ml-1 font-medium text-muted-foreground sm:ml-2'>
            Engineer
            <span
              className={`animate-cursor-flicker text-yellow-600 transition-opacity dark:text-purple-400 ${cursorVisible ? 'opacity-100 duration-200' : 'opacity-0 duration-1000'}`}
            >
              _&nbsp;&nbsp;&nbsp;
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.style.colorScheme = shouldBeDark
      ? 'dark'
      : 'light';
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    document.documentElement.style.colorScheme = newIsDark ? 'dark' : 'light';
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className='flex min-h-screen flex-col'
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className='flex flex-1 items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <MeteorRain isDark={isDark} />
      <main className='relative z-10 flex-1'>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        {/* Hero Section */}
        <section className='relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent dark:from-purple-500/5' />
          <div className='relative mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8'>
            <div className='fade-in text-center'>
              <div className='mb-6 sm:mb-8'>
                <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4'>
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    const isInternal = link.href.startsWith('/');

                    if (isInternal) {
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className='flex h-8 w-8 items-center justify-center rounded bg-card transition-all hover:scale-105 hover:bg-accent sm:h-10 sm:w-10'
                          title={link.name}
                        >
                          <Icon className='h-4 w-4 text-yellow-600 dark:text-purple-400 sm:h-5 sm:w-5' />
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-8 w-8 items-center justify-center rounded bg-card transition-all hover:scale-105 hover:bg-accent sm:h-10 sm:w-10'
                        title={link.name}
                      >
                        <Icon className='h-4 w-4 text-yellow-600 dark:text-purple-400 sm:h-5 sm:w-5' />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className='mb-6 flex flex-col gap-3 sm:mb-8'>
                <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-3'>
                  <div className='flex items-center gap-1.5 rounded-full border border-green-600/40 bg-green-600/20 px-2.5 py-1 text-xs font-medium text-green-600 shadow-sm dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400 sm:gap-2 sm:px-3 sm:py-1.5'>
                    <Check className='h-2.5 w-2.5 sm:h-3 sm:w-3' />
                    <span className='hidden xs:inline'>Open To Work</span>
                    <span className='xs:hidden'>Available</span>
                  </div>
                  <div className='flex items-center gap-1.5 rounded-full border border-blue-600/40 bg-blue-600/20 px-2.5 py-1 text-xs font-medium text-blue-600 shadow-sm dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 sm:gap-2 sm:px-3 sm:py-1.5'>
                    <MapPin className='h-2.5 w-2.5 sm:h-3 sm:w-3' />
                    Remote
                  </div>
                  <div className='flex items-center gap-1.5 rounded-full border border-orange-600/40 bg-orange-600/20 px-2.5 py-1 text-xs font-medium text-orange-600 shadow-sm dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400 sm:gap-2 sm:px-3 sm:py-1.5'>
                    <Briefcase className='h-2.5 w-2.5 sm:h-3 sm:w-3' />
                    <span className='hidden sm:inline'>Freelance - B2B</span>
                    <span className='sm:hidden'>B2B</span>
                  </div>
                  <div className='flex items-center gap-1.5 rounded-full border border-gray-400/50 bg-gray-200/60 px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-400/30 dark:bg-gray-200/20 dark:text-gray-300 sm:gap-2 sm:px-3 sm:py-1.5'>
                    <span>🇺🇸 🇪🇸 🇫🇷</span>
                  </div>
                </div>
              </div>

              <h1 className='mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl'>
                Abraham <span className='text-gradient'>Guimbao</span>
              </h1>

              <SingleRoleDisplay />

              <div className='mb-6 flex justify-center px-2 sm:mb-8 sm:px-0'>
                <p className='max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg'>
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    Curious
                  </span>
                  ,{' '}
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    hard-working
                  </span>
                  , and{' '}
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    proactive
                  </span>{' '}
                  individual with a diverse skill set.
                  <br className='hidden sm:block' />
                  <span className='sm:hidden'> </span>Passionate about building
                  robust{' '}
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    infrastructures
                  </span>
                  ,{' '}
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    automations
                  </span>{' '}
                  and{' '}
                  <span className='font-medium text-yellow-600 dark:text-purple-400'>
                    complex systems
                  </span>
                  .
                </p>
              </div>

              <div className='sm:mb-10'>
                <div className='text-center'>
                  <span className='text-sm font-medium'>
                    <a
                      href='https://42.fr'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-400 underline decoration-dotted underline-offset-4 transition-colors hover:text-blue-300'
                    >
                      42 Paris
                    </a>{' '}
                    Graduate
                  </span>
                </div>
              </div>

              <div className='mb-0'>
                <SkillsList />
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Made with AI Badge - Bottom of site, no divider */}
      <footer className='mt-auto bg-background py-3 sm:py-4'>
        <div className='flex justify-center px-4'>
          <div className='flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600 shadow-sm dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400 sm:px-4 sm:py-2 sm:text-sm'>
            <span>🤖</span>
            Made with AI
          </div>
        </div>
      </footer>
    </div>
  );
}
