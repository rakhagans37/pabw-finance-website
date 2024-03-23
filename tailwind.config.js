/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primaryBg: "#F5F7FA",
                secondaryBg: "#FFFAFA",
                blue: "#1A16F3",
                title: "#343C6A",
                secondaryTitle: "#333B69",
                thirdTitle: "#718EBF",
                black: "#232323",
                minus: "#FE5C73",
                plus: "#16DBAA",
                warning: "#BF7171",
                update: "#73C7AE",
                delete: "#DE6363",
            },
            borderRadius: {
                inverse: "50% 0 0 50%",
            },
        },
        fontFamily: {
            body: ["inter"],
            lainnya: ["Roboto"],
        },
    },
    plugins: [],
};
