import React from 'react';
import './App.css';
import {Trans, useTranslation} from "react-i18next";
import "./translations/i18n";
import {DEFAULT_THEME, RadioGroup} from "@mention-me/flamingo-ui";
import {ThemeProvider} from "styled-components";

import Logo from './logo.jpg'

function App() {
    const {t} = useTranslation("flycode");
    return (

        <ThemeProvider theme={DEFAULT_THEME}>
            <div style={{padding: "20px"}}>
                <img src={Logo} alt="logo" style={{maxWidth: 200}}/>
                <div>
                    <h1>Mention Me Flycode demo</h1>

                    <h2>Types of translation:</h2>

                    <h3>Inline translation:</h3>
                    <p>{t("inline-translation", "This is an example of an inline translation")}</p>

                    <h3>Inline translation with variable:</h3>
                    <p>{t("inline-translation-with-variable", "This is an example of an inline translation with a [[{{variable}}]]", {
                        variable: "VARIABLE VALUE!"
                    })}</p>

                    <h3>Trans block</h3>
                    <Trans t={t} i18nKey="trans-block">
                        This is a trans block it spans multiple lines<br/>
                        And also contains some <b>HTML</b>
                    </Trans>

                    <h1>Some flamingo UI pieces</h1>

                    <RadioGroup
                        alignment="start"
                        orientation="row"
                        state={{
                            isDisabled: false,
                            isUsingLabel: true,
                            options: [
                                {
                                    isDisabled: false,
                                    value: 'one',
                                    label: t('houses.mountain-goat', "Mountain goat")
                                },
                                {
                                    isDisabled: false,
                                    value: 'two',
                                    label: t('houses.penguin', "Penguin")
                                },
                                {
                                    isDisabled: false,
                                    value: 'three',
                                    label: t('houses.lassie', "Lassie")
                                },
                                {
                                    isDisabled: false,
                                    value: 'four',
                                    label: t('houses.flamingo', "Flamingo")
                                }
                            ]
                        }}
                        variant="default"
                    />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
