module.exports = {
    theme: {
      extend: {
        animation: {
          borderMove: "borderAnim 2s linear infinite",
        },
        keyframes: {
          borderAnim: {
            "0%": { boxShadow: "inset 2px 0px 0px #f43f5e" },
            "25%": { boxShadow: "inset 0px 2px 0px #f43f5e" },
            "50%": { boxShadow: "inset -2px 0px 0px #f43f5e" },
            "75%": { boxShadow: "inset 0px -2px 0px #f43f5e" },
            "100%": { boxShadow: "inset 2px 0px 0px #f43f5e" },
          },
        },
      },
    },
  };
  