import React from 'react';
import './App.css';
import {useTranslation} from "react-i18next";
import "./translations/i18n";

function App2() {
    const {t} = useTranslation("secondcontext");
    return (
        <div>
            {t("inline-translation-from-second-context", "This is an example of an inline translation")}
        </div>
    );
}

export default App2;
