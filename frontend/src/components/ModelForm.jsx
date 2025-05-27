import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

export default function ModelForm({ 
    visible, 
    onHide, 
    onSubmit, 
    model = {}, 
    title = 'Formulario' 
}) {
    const [formData, setFormData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setFormData(model || {});
    }, [model]);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        if (onSubmit) {
            onSubmit(formData);
        }
        onHide(); // Cierra el modal después de guardar
    };

    const renderField = (key) => {
        if (key === 'id') return null; // No editar ID
        return (
            <div key={key} className="field mb-3">
                <label htmlFor={key} className="block mb-1 font-medium text-sm capitalize">
                    {key}
                </label>
                <InputText
                    id={key}
                    value={formData[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={classNames('w-full', { 'p-invalid': submitted && !formData[key] })}
                />
            </div>
        );
    };

    const footer = (
        <div className="flex justify-end gap-2">
            <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={onHide} />
            <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return (
        <Dialog 
            header={title} 
            visible={visible} 
            style={{ width: '30vw' }} 
            modal 
            className="p-fluid" 
            footer={footer} 
            onHide={onHide}
        >
            {Object.keys(formData).map(renderField)}
        </Dialog>
    );
}
