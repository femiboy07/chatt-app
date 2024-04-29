/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily:{
      Poppins:['Poppins']
    },
    backgroundImage:{
      'header-image': 'url("/src/svg/jason-leung-mZNRsYE9Qi4-unsplash.jpg")',
      'intro-page':'url("/src/svg/codioful-formerly-gradienta-bKESVqfxass-unsplash.jpg")',
      'register-page':'url("/src/svg/localhost_3000_channel_ANIMEEMANGA (3).png")'
    },
    extend: {
      keyframes:{
        wiggle:{
          '0%':{
            width:'0',
            
          },
          '50%':{
           width:'150',
           
          },
          '100%':{width:'324',}
        },

        slideUp:{
          '0%':{
            bottom:'-100%',
          },
          
        
          '100%':{
            bottom:'24'
          }

        },
        loader:{
          'from': {
            opacity: 1,
            backgroundColor:'red',
            transform: 'translateY(0)',
          },
          'to' :{
            opacity: 0.1,
            backgroundColor:'rgba(108, 108, 229, 0.8)',
            transform: 'translateY(-1rem)',
          }
        }
      },
      animation:{
        wiggle:'wiggle 0.2s ease-in-out',
        slideUp:'slideUp 0.5s ease-in-out',
        loader:'loader .6s infinite alternate'
      },
      

    },
  },
  plugins: [],
}
