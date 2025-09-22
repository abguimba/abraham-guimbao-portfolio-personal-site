'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

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

export default function BookingPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
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

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Header */}
      <header className='border-b border-border'>
        <div className='mx-auto max-w-4xl px-4 py-3 sm:px-6 sm:py-4'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <Link
              href='/'
              className='flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:gap-2 sm:text-base'
            >
              <ArrowLeft className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
              Back
            </Link>
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <Calendar className='h-4 w-4 text-yellow-600 dark:text-purple-400 sm:h-5 sm:w-5' />
              <h1 className='text-lg font-semibold sm:text-xl'>
                Book a Meeting
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8'>
        <div className='mb-6 text-center sm:mb-8'>
          <h2 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl'>
            Schedule a Meeting
          </h2>
          <p className='mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
            Let's discuss your project, opportunities, or any questions you
            might have. Select a convenient time slot below.
          </p>
        </div>

        {/* Calendar Embed Container */}
        <div className='calendar-container mb-6 rounded-lg border border-border bg-white p-1 shadow-sm sm:mb-8'>
          <iframe
            src='https://calendar.google.com/calendar/appointments/schedules/AcZssZ14mGOqXTtYVDzQ6r4tco-wtsowz-4rPJMTnFneYtdHjXoRmQhGRo0XJjInnFjGRi8VFOAhJxjO?gv=true'
            style={{
              border: 0,
              colorScheme: 'light',
              overflow: 'hidden',
            }}
            width='100%'
            height='500'
            className='rounded-md bg-white sm:h-[600px]'
            sandbox='allow-scripts allow-forms'
            title='Schedule a meeting with Abraham Guimbao'
          />
        </div>

        {/* Additional Info */}
        <div className='grid gap-4 sm:gap-6 md:grid-cols-2'>
          <div className='rounded-lg border border-border bg-card p-4 sm:p-6'>
            <h3 className='mb-2 font-semibold text-yellow-600 dark:text-purple-400 sm:mb-3'>
              What to expect
            </h3>
            <ul className='space-y-1.5 text-sm text-muted-foreground sm:space-y-2'>
              <li>• 30-minute conversation</li>
              <li>• Discussion about your project or opportunity</li>
              <li>• Technical questions and solutions</li>
              <li>• Next steps planning</li>
            </ul>
          </div>

          <div className='rounded-lg border border-border bg-card p-4 sm:p-6'>
            <h3 className='mb-2 font-semibold text-yellow-600 dark:text-purple-400 sm:mb-3'>
              Need something else?
            </h3>
            <p className='mb-2 text-sm text-muted-foreground sm:mb-3'>
              If none of the available times work for you, feel free to reach
              out directly.
            </p>
            <a
              href='mailto:abrahamguimbao@proton.me'
              className='break-all text-sm text-blue-600 hover:underline dark:text-blue-400'
            >
              abrahamguimbao@proton.me
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
