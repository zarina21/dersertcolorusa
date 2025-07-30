"use client";
import React, { useState } from "react";
import InputComponent from "../../components/input/inputComponent";
import AuthClass from "../../firebase/authClass";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Iconos para los botones

export default function Log() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const onChangeForm = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
        setErrors({
            ...errors,
            [key]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!form.name) {
            newErrors.name = 'El nombre es obligatorio';
            valid = false;
        }
        if (!form.email) {
            newErrors.email = 'El email es obligatorio';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Formato de email inválido';
            valid = false;
        }
        if (!form.password) {
            newErrors.password = 'La contraseña es obligatoria';
            valid = false;
        } else if (form.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
            valid = false;
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
            valid = false;
        }
        if (!acceptedTerms) {
            newErrors.acceptedTerms = 'Debe aceptar los términos y condiciones';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const onSendForm = async () => {
        if (!validateForm()) return;

        try {
            const result = await AuthClass.register(form);
            if (result.success) {
                setShowSuccess(true);
                router.push('/');
            }
        } catch (e) {
            if (e.message === 'El correo electrónico ya está en uso') {
                setErrors(prevErrors => ({ ...prevErrors, email: 'El correo electrónico ya está en uso' }));
            } else if (e.message === 'El nombre de usuario ya está en uso') {
                setErrors(prevErrors => ({ ...prevErrors, name: 'El nombre de usuario ya está en uso' }));
            } else {
                console.log(e);
            }
        }
    };

    const loginWithGoogle = async () => {
        try {
            await AuthClass.LoginWithGoogle();
        } catch (e) {
            console.log(e);
        }
    };

    const closeSuccessMessage = () => {
        setShowSuccess(false);
        setForm({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setAcceptedTerms(false);
    };

    return (
        <div className="columns is-centered my-6">
            <div className="column is-4">
                <h1 className="title is-1 my-4">Sign Up</h1>

                {showSuccess && (
                    <div className="notification is-success">
                        <button className="delete" onClick={closeSuccessMessage}></button>
                        Su cuenta ha sido creada exitosamente.
                    </div>
                )}

                <InputComponent
                    placeholder="Name"
                    value={form.name}
                    label="Name:"
                    onChange={(v) => onChangeForm('name', v)}
                />
                {errors.name && <p className="help is-danger">{errors.name}</p>}

                <InputComponent
                    type="email"
                    placeholder="Email@example.com"
                    value={form.email}
                    label="Email:"
                    onChange={(v) => onChangeForm('email', v)}
                />
                {errors.email && <p className="help is-danger">{errors.email}</p>}

                <InputComponent
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    label="Password:"
                    onChange={(v) => onChangeForm('password', v)}
                />
                {errors.password && <p className="help is-danger">{errors.password}</p>}

                <InputComponent
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    label="Confirm password:"
                    onChange={(v) => onChangeForm('confirmPassword', v)}
                />
                {errors.confirmPassword && <p className="help is-danger">{errors.confirmPassword}</p>}

                <div className="field py-5">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={() => setAcceptedTerms(!acceptedTerms)}
                            />
                            I agree to the <a href="#">terms and conditions</a>
                        </label>
                    </div>
                    {errors.acceptedTerms && <p className="help is-danger">{errors.acceptedTerms}</p>}
                </div>

                <div className="field is-grouped">
                    <button onClick={onSendForm} className="button is-primary is-fullwidth">
                        Submit
                    </button>
                </div>

                {/* Botones de inicio de sesión con Google y Github */}
                <div className="field mt-4">
                    <button onClick={loginWithGoogle} className="button is-danger is-fullwidth mb-2">
                        <span className="icon">
                            <FaGoogle />
                        </span>
                        <span>Continuar con Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
