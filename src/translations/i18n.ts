import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next)
    .use(Backend)
    .init({
        fallbackLng: "en",
        fallbackNS: "shared",
        ns: [],

        backend: {
            allowMultiLoading: false,
            loadPath: "{{lng}}/{{ns}}.json",

            request: async (options, pathname, payload, callback) => {
                try {
                    // We should revisit webpackMode if our translation files grow to big
                    const promise = await import(
                        /* webpackMode: "lazy-once" */
                        /* webpackChunkName: "translations" */
                        /* webpackInclude: /[a-z]{2}\/[a-zA-Z0-9\-]+\.json$/ */
                        `./locales/${pathname}`
                    );

                    callback(null, {
                        status: 200,
                        data: promise.default,
                    });
                } catch (error) {
                    callback(error, {
                        status: 404,
                        data: "",
                    });
                }
            },
        },

        interpolation: {
            formatSeparator: ",",
            format: (value, format) => (format === "uppercase" ? value.toUpperCase() : value),
            escapeValue: false, // not needed for react as it escapes by default
        },

        keySeparator: ".",

        react: {
            useSuspense: false,
        },
    });

export default i18n;
