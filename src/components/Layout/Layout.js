import React from 'react';
import Header from "./../../containers/Header/Header";

export const layout = (props) => {
    return (
        <>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
    );
};