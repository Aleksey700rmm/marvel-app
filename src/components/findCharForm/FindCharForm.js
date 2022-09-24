import "./findCharForm.scss";
import "../../style/button.scss";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const FindCharForm = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacterByName, clearError, process, setProcess } = useMarvelService();

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const errorMessage =
        process === error ? (
            <div className="char__search-critical-error">
                <ErrorMessage />
            </div>
        ) : null;
    const results = !char ? null : char.length > 0 ? (
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    ) : (
        <div className="char__search-error">The character was not found. Check the name and try again</div>
    );

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: "",
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().min(2, "Минимум 2 символа!").required("Обязательное поле"),
                })}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">
                        Or find a character by name:
                    </label>
                    <div className="char__search-wrapper">
                        <Field id="charName" name="charName" type="text" placeholder="Enter name" />
                        <button className="button button__main" type="submit" disabled={process === "loading"}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage className="char__search-error" name="charName" component="div" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
};

export default FindCharForm;
