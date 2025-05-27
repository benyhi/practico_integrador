import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const FormularioDinamico = ({ campos = [], datosIniciales = {}, onSubmit }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const inicial = {};
        campos.forEach(campo => {
            inicial[campo.nombre] = datosIniciales[campo.nombre] || '';
        });
        setFormData(inicial);
    }, [campos, datosIniciales]);

    const handleChange = (e, nombreCampo) => {
        setFormData({ ...formData, [nombreCampo]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h3>{datosIniciales?.id ? 'Editar' : 'Crear'} Registro</h3>

            {campos.map(campo => (
                <div className="field" key={campo.nombre}>
                    <label htmlFor={campo.nombre}>{campo.label}</label>
                    <InputText
                        id={campo.nombre}
                        value={formData[campo.nombre] || ''}
                        onChange={(e) => handleChange(e, campo.nombre)}
                    />
                </div>
            ))}

            <Button label="Guardar" icon="pi pi-save" type="submit" />
        </form>
    );
};

export default FormularioDinamico;
