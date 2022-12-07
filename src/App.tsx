import React from 'react';
import './App.css';
import {Trans, useTranslation} from "react-i18next";
import "./translations/i18n";

function App() {
    const {t} = useTranslation("flycode");
    return (
        <div>
            <h1>Mention Me Flycode demo</h1>

            <h2>Types of translation:</h2>

            <h3>Inline translation:</h3>
            <p>{t("inline-translation", "This is an example of an inline translation")}</p>

            <h3>Inline translation with variable:</h3>
            <p>{t("inline-translation-with-variable", "This is an example of an inline translation with a [[{{variable}}]]", {
                variable: "variable-value"
            })}</p>

            <h3>Trans block</h3>
            <Trans t={t} i18nKey="trans-block">
                This is a trans block it spans multiple lines<br />
                And also contains some <b>HTML</b>
            </Trans>
        </div>
    );
}

export default App;
