// frontend/src/components/ModelForm.jsx
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
// Importa otros componentes de PrimeReact que necesites (Calendar, Checkbox, etc.)

const ModelForm = ({
    initialData,    // Datos para popular el formulario en modo edición (ej. { nombre: 'Producto X', precio: 100 })
    onSubmitForm,   // Función callback que se ejecuta al enviar, recibe los datos del formulario
    isEditMode = false, // Booleano: true para modo edición, false para modo creación
    entityFields = [],  // Array de objetos que define los campos del formulario
    isLoading = false   // Booleano para deshabilitar el botón de submit mientras se procesa
}) => {
    const getInitialFormState = () => {
        const initialState = {};
        entityFields.forEach(field => {
            initialState[field.name] = field.defaultValue !== undefined ? field.defaultValue : '';
        });
        return initialState;
    };

    const [formData, setFormData] = useState(getInitialFormState());

    useEffect(() => {
        if (isEditMode && initialData) {
            const updatedFormData = { ...getInitialFormState() }; // Empezar con defaults
            entityFields.forEach(field => {
                if (initialData.hasOwnProperty(field.name)) {
                    updatedFormData[field.name] = initialData[field.name];
                }
            });
            setFormData(updatedFormData);
        } else if (!isEditMode) {
            setFormData(getInitialFormState()); // Resetear para modo creación
        }
    }, [initialData, isEditMode, entityFields]);

    const handleChange = (e, fieldName, fieldType) => {
        let value;
        let name;

        if (fieldType === 'number' && e.value !== undefined) { // InputNumber
            value = e.value;
            name = fieldName;
        } else if (fieldType === 'dropdown' && e.value !== undefined) { // Dropdown
             value = e.value;
             name = fieldName;
        } else if (e.target) { // Inputs estándar
            value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            name = e.target.name;
        } else { // Otros componentes de PrimeReact que pasan el valor directamente
            value = e.value;
            name = fieldName;
        }
        
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoading) { // Solo enviar si no está cargando
            onSubmitForm(formData); // Pasa los datos del formulario al componente padre
        }
    };

    const entityConfig = entityFields.length > 0 ? entityFields[0] : {};
    const formTitle = isEditMode ? `Editar ${entityConfig.entityName || 'Entidad'}` : `Crear Nueva ${entityConfig.entityName || 'Entidad'}`;
    const submitButtonLabel = isEditMode ? "Guardar Cambios" : `Crear ${entityConfig.entityName || 'Entidad'}`;

    const renderField = (field) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            className: "w-full",
            placeholder: field.placeholder || '',
        };

        let inputComponent;
        const currentValue = formData[field.name] !== undefined ? formData[field.name] : (field.defaultValue !== undefined ? field.defaultValue : '');

        switch (field.type) {
            case 'textarea':
                inputComponent = <InputTextarea {...commonProps} value={currentValue} onChange={(e) => handleChange(e, field.name, field.type)} rows={field.rows || 3} />;
                break;
            case 'number':
                inputComponent = (
                    <InputNumber
                        {...commonProps}
                        value={currentValue === '' || currentValue === null || currentValue === undefined ? null : Number(currentValue)}
                        onValueChange={(e) => handleChange(e, field.name, field.type)}
                        mode={field.mode || "decimal"}
                        minFractionDigits={field.minFractionDigits}
                        maxFractionDigits={field.maxFractionDigits}
                        useGrouping={field.useGrouping === undefined ? true : field.useGrouping }
                    />
                );
                break;
            case 'dropdown':
                 inputComponent = (
                    <Dropdown
                        {...commonProps}
                        value={currentValue}
                        options={field.options || []}
                        onChange={(e) => handleChange(e, field.name, field.type)}
                        optionLabel={field.optionLabel || "label"}
                        optionValue={field.optionValue || "value"} // Si options son objetos {label:'L', value:'V'}
                                                                  // Si options son primitivas, no necesitas optionValue
                        filter={field.filter || false} // Para habilitar filtrado en dropdowns largos
                    />
                );
                break;
            // Agrega más casos para Calendar, Checkbox, etc.
            case 'text':
            default:
                inputComponent = <InputText {...commonProps} type={field.htmlType || "text"} value={currentValue} onChange={(e) => handleChange(e, field.name, field.type)} />;
                break;
        }
        return (
            <div className="field mb-4" key={field.name}>
                <label htmlFor={field.name} className="block text-900 font-medium mb-2">{field.label}</label>
                {inputComponent}
            </div>
        );
    };

    return (
        <Card title={formTitle} className="md:w-30rem mx-auto my-4" style={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit} className="p-fluid">
                {entityFields.length > 0 ? (
                    entityFields.map(field => renderField(field))
                ) : (
                    <p>Configuración de campos no proporcionada.</p>
                )}
                <Button 
                    type="submit" 
                    label={submitButtonLabel} 
                    icon="pi pi-check" 
                    className="mt-3 w-full" 
                    loading={isLoading} // Muestra un spinner en el botón si isLoading es true
                />
            </form>
        </Card>
    );
};

export default ModelForm;