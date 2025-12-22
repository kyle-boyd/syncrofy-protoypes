import { ThemeOptions } from '@mui/material/styles';

/**
 * Component default props and style overrides
 */
export const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: false,
    },
    styleOverrides: {
      root: {
        fontFamily: 'Geist, sans-serif',
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 500,
        textTransform: 'none',
        transition: 'background 0.15s, color 0.15s, border 0.15s, box-shadow 0.15s',
        fontSize: '0.9375rem',
      },
      containedPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
      containedSecondary: ({ theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }),
      containedError: ({ theme }) => ({
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.error.dark,
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        border: `1.5px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.dark,
          color: theme.palette.primary.dark,
        },
      }),
      outlinedSecondary: ({ theme }) => ({
        border: `1.5px solid var(--variant-outlinedBorder)`,
        borderColor: 'var(--variant-outlinedBorder)',
        borderImage: 'none',
        color: theme.palette.secondary.main,
        '&:hover': {
          borderColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.dark,
        },
      }),
      outlinedError: ({ theme }) => ({
        border: `1.5px solid ${theme.palette.error.main}`,
        color: theme.palette.error.main,
        '&:hover': {
          borderColor: theme.palette.error.dark,
          color: theme.palette.error.dark,
        },
      }),
      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.dark,
        },
      }),
      textSecondary: ({ theme }) => ({
        color: theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.secondary.dark,
        },
      }),
      textError: ({ theme }) => ({
        color: theme.palette.error.main,
        '&:hover': {
          color: theme.palette.error.dark,
        },
      }),
      contained: ({ theme }) => ({
        boxShadow: theme.shadows[1],
        '&:hover': {
          boxShadow: theme.shadows[1],
        },
        '&:active': {
          boxShadow: theme.shadows[1],
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.text.disabled,
          boxShadow: theme.shadows[1],
        }
      }),
      outlined: ({ theme }) => ({
        backgroundColor: 'transparent',
        borderImage: 'none',
        boxShadow: theme.shadows[1],
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          boxShadow: theme.shadows[1],
        },
        '&:active': {
          backgroundColor: theme.palette.action.selected,
          boxShadow: theme.shadows[1],
        },
        '&.Mui-disabled': {
          borderColor: theme.palette.grey[300],
          color: theme.palette.text.disabled,
          boxShadow: theme.shadows[1],
        },
      }),
      text: ({ theme }) => ({
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:active': {
          backgroundColor: theme.palette.action.selected,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        }
      }),
      sizeSmall: {
        padding: '6px 16px',
        fontSize: '0.8125rem',
      },
      sizeLarge: {
        padding: '12px 32px',
        fontSize: '1.05rem',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        backgroundColor: theme.palette.background.default,
        fontSize: '14px',
        fontFamily: 'Geist, sans-serif',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.grey[600],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '1.5px',
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.background.default,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[300],
          },
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.grey[400],
        borderWidth: '1px',
      }),
      input: ({ theme }) => ({
        padding: '10px 14px',
        fontSize: '14px',
        lineHeight: '20px',
        '&::placeholder': {
          color: theme.palette.text.disabled,
          opacity: 1,
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: '14px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: 700,
        color: theme.palette.text.primary,
        marginBottom: '4px',
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
        '&.Mui-error': {
          color: theme.palette.text.primary,
        },
      }),
      outlined: {
        transform: 'translate(0, 0) scale(1)',
        position: 'static',
        marginBottom: '4px',
      },
      shrink: {
        transform: 'translate(0, 0) scale(1)',
        position: 'static',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: '4px',
        marginLeft: 0,
        fontSize: '14px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: 400,
        lineHeight: '20px',
        '&.Mui-error': {
          color: theme.palette.error.main,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      elevation0: {
        backgroundColor: '#FFFFFF',
      },
      elevation1: {
        backgroundColor: '#FAFCFC',
      },
      elevation2: {
        backgroundColor: '#FFFFFF',
      },
      elevation3: {
        backgroundColor: '#FFFFFF',
      },
      elevation4: {
        backgroundColor: '#FFFFFF',
      },
      elevation5: {
        backgroundColor: '#FFFFFF',
      },
      elevation6: {
        backgroundColor: '#FFFFFF',
      },
      elevation7: {
        backgroundColor: '#FFFFFF',
      },
      elevation8: {
        backgroundColor: '#FFFFFF',
      },
      elevation9: {
        backgroundColor: '#FFFFFF',
      },
      elevation10: {
        backgroundColor: '#FFFFFF',
      },
      elevation11: {
        backgroundColor: '#FFFFFF',
      },
      elevation12: {
        backgroundColor: '#FFFFFF',
      },
      elevation13: {
        backgroundColor: '#FFFFFF',
      },
      elevation14: {
        backgroundColor: '#FFFFFF',
      },
      elevation15: {
        backgroundColor: '#FFFFFF',
      },
      elevation16: {
        backgroundColor: '#FFFFFF',
      },
      elevation17: {
        backgroundColor: '#FFFFFF',
      },
      elevation18: {
        backgroundColor: '#FFFFFF',
      },
      elevation19: {
        backgroundColor: '#FFFFFF',
      },
      elevation20: {
        backgroundColor: '#FFFFFF',
      },
      elevation21: {
        backgroundColor: '#FFFFFF',
      },
      elevation22: {
        backgroundColor: '#FFFFFF',
      },
      elevation23: {
        backgroundColor: '#FFFFFF',
      },
      elevation24: {
        backgroundColor: '#FFFFFF',
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        borderRadius: '100px',
        fontFamily: 'Geist, sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      // Ensure variant styles are applied with sufficient specificity
      // This ensures that variant styles override browser defaults even when component prop changes the HTML element
      h6: ({ theme }) => ({
        fontWeight: theme.typography.h6.fontWeight || 600,
        fontSize: theme.typography.h6.fontSize,
        fontFamily: theme.typography.h6.fontFamily,
        lineHeight: theme.typography.h6.lineHeight,
        letterSpacing: theme.typography.h6.letterSpacing,
      }),
      h5: ({ theme }) => ({
        fontWeight: theme.typography.h5.fontWeight,
        fontSize: theme.typography.h5.fontSize,
        fontFamily: theme.typography.h5.fontFamily,
        lineHeight: theme.typography.h5.lineHeight,
        letterSpacing: theme.typography.h5.letterSpacing,
      }),
      h4: ({ theme }) => ({
        fontWeight: theme.typography.h4.fontWeight,
        fontSize: theme.typography.h4.fontSize,
        fontFamily: theme.typography.h4.fontFamily,
        lineHeight: theme.typography.h4.lineHeight,
        letterSpacing: theme.typography.h4.letterSpacing,
      }),
      h3: ({ theme }) => ({
        fontWeight: theme.typography.h3.fontWeight,
        fontSize: theme.typography.h3.fontSize,
        fontFamily: theme.typography.h3.fontFamily,
        lineHeight: theme.typography.h3.lineHeight,
      }),
      h2: ({ theme }) => ({
        fontWeight: theme.typography.h2.fontWeight,
        fontSize: theme.typography.h2.fontSize,
        fontFamily: theme.typography.h2.fontFamily,
        lineHeight: theme.typography.h2.lineHeight,
      }),
      h1: ({ theme }) => ({
        fontWeight: theme.typography.h1.fontWeight,
        fontSize: theme.typography.h1.fontSize,
        fontFamily: theme.typography.h1.fontFamily,
        lineHeight: theme.typography.h1.lineHeight,
      }),
    },
  },
};

