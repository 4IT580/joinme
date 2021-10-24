module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.jsx'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        pink: {
          'primary': '#F472B6',
          'primary-focus': '#EC4899',
          'primary-content': '#ffffff',
          'secondary': '#5283DD',
          'secondary-focus': '#0084C6',
          'secondary-content': '#ffffff',
          'accent': '#00B8A6',
          'accent-focus': '#008272',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
        },
      },
    ],
  },
}
