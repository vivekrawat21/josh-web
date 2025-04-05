/** @type {import('tailwindcss').Config} */
// import daisyui from 'daisyui'
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			  basic: {
				DEFAULT: '#E53935', // Bold Red (Text)
				hover: '#B71C1C', // Darker Red (Hover)
				bg: '#FFEBEE', // Light Red Background
			  },
			  intermediate: {
				DEFAULT: '#FB8C00', // Deep Orange (Text)
				hover: '#E65100', // Darker Orange (Hover)
				bg: '#FFF3E0', // Light Orange Background
			  },
			  advanced: {
				DEFAULT: '#1E88E5', // Deep Blue (Text)
				hover: '#0D47A1', // Darker Blue (Hover)
				bg: '#E3F2FD', // Light Blue Background
			  },
  		},
		animation:{
			"loop-scroll": "loop-scroll 10s linear infinite",
		},
		keyframes:{
			"loop-scroll": {
				from: { transform: "translateX(0)" },
				to: { transform: "translateX(-100%)" }
		}
  	}
  },
  

  
},
  plugins: [
      require("tailwindcss-animate"),
	 
],
}

