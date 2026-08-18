// import type { Appearance } from '@clerk/types';

export const clerkTheme = {
  variables: {
    colorPrimary: 'var(--primary)',
    colorBackground: 'var(--card)',
    colorInput: 'var(--input)',
    colorText: 'var(--foreground)',
    colorTextSecondary: 'var(--muted-foreground)',
    colorDanger: 'var(--destructive)',
    colorNeutral: 'var(--foreground)',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font)',
  },

  elements: {
    rootBox: {
      direction: 'ltr',
    },
    card: {
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      boxShadow: 'none',
    },

    headerTitle: {
      color: 'var(--foreground)',
      fontFamily: 'var(--font)',
    },

    headerSubtitle: {
      color: 'var(--muted-foreground)',
      fontFamily: 'var(--font)',
    },

    formFieldLabel: {
      color: 'var(--foreground)',
      fontFamily: 'var(--font)',
    },

    formFieldInput: {
      backgroundColor: 'var(--input)',
      border: '1px solid var(--border)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font)',
      '::placeholder': {
        color: 'var(--muted-foreground)',
        opacity: '1',
      },
    },

    formFieldInputShowPasswordButton: {
      color: 'var(--muted-foreground)',
    },

    formButtonPrimary: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font)',
    },

    footerActionLink: {
      color: 'var(--primary)',
      fontFamily: 'var(--font)',
    },

    footerActionText: {
      color: 'var(--muted-foreground)',
      fontFamily: 'var(--font)',
    },

    dividerLine: {
      backgroundColor: 'var(--border)',
    },

    dividerText: {
      color: 'var(--muted-foreground)',
    },

    socialButtonsBlockButton: {
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font)',
    },

    socialButtonsBlockButtonText: {
      color: 'var(--foreground)',
      fontFamily: 'var(--font)',
    },
  },
};
