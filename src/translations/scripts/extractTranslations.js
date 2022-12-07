const fs = require("fs");
const path = require("path");
const typescript = require("typescript");

const DEFAULT_NS = "shared";

// Add new namespace here - in alphabetical order
const namespaces = [
    "flycode",
    "secondcontext",
];

// Add new language here
const languages = ["en"];

module.exports = {
    options: {
        debug: false,
        attr: false,

        lngs: languages,

        ns: namespaces,

        defaultLng: "en",
        defaultNs: DEFAULT_NS,

        // Put a blank string as initial translation
        defaultValue: "",

        // Location of translation files
        resource: {
            loadPath: "src/translations/locales/{{lng}}/{{ns}}.json",
            savePath: "src/translations/locales/{{lng}}/{{ns}}.json",
            jsonIndent: 4,
        },

        sort: true,

        nsSeparator: ":",
        keySeparator: ".",
    },
    transform: function customTransform(file, enc, done) {
        const { parser } = this;
        const { base, ext } = path.parse(file.path);

        if ([".tsx", ".ts"].includes(ext) && !base.includes(".d.ts") && !base.includes(".test.tsx")) {
            const content = fs.readFileSync(file.path, enc);

            const { outputText: compiledContent } = typescript.transpileModule(content, {
                fileName: path.basename(file.path),
                compilerOptions: {
                    target: "es2018",
                    extensions: [".tsx", ".ts"],
                },
            });

            let ns;
            const match = compiledContent.match(/useTranslation\(.+\)/);

            if (match) {
                [, , ns] = match[0].split(/('|")/);
            }

            parser.parseTransFromString(compiledContent, { component: "Trans", i18nKey: "i18nKey" }, (key, options) => {
                let newKey = key;
                let thisNs = ns;

                if (new RegExp(`.+${options.nsSeparator}.+`).test(key)) {
                    [thisNs, newKey] = key.split(options.nsSeparator);
                }

                parser.set(newKey, {
                    ...options,
                    ns: thisNs || DEFAULT_NS,
                });
            });
            parser.parseFuncFromString(compiledContent, { list: ["t"] }, (key, options) => {
                let newKey = key;
                let thisNs = ns;

                if (new RegExp(`.+${options.nsSeparator}.+`).test(key)) {
                    [thisNs, newKey] = key.split(options.nsSeparator);
                }

                parser.set(newKey, {
                    ...options,
                    ns: thisNs || DEFAULT_NS,
                });
            });
        }

        done();
    },
};
