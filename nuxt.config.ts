// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title: "Test Sui",
    },
  },
  modules: ["@unocss/nuxt"],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    rules: [
      [/^m-(\d+)$/, ([, d]: any) => ({ margin: `${d / 4}rem` })],
      [/^p-(\d+)$/, (match: any) => ({ padding: `${match[1] / 4}rem` })],
    ],
    shortcuts: {
      // shortcuts to multiple utilities
      btn: "py-2 px-4 font-semibold rounded-lg shadow-md",
      "btn-green": "text-white bg-green-500 hover:bg-green-700",
      // single utility alias
      red: "text-red-100",
    },

    theme: {
      colors: {
        tall: "#f00",
      },
    },
  },
});
