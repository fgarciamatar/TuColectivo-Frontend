import * as Yup from 'yup';


 export const validationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El nombre solo debe contener letras y espacios')
    .required('El nombre es obligatorio'),
  apellido: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El nombre solo debe contener letras y espacios')
    .required('El apellido es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  dni: Yup.string()
    .matches(/^\d{7}$/, 'El DNI debe tener exactamente 7 dígitos numéricos')
    .required('El DNI es obligatorio'),
  celular: Yup.string()
    .matches(/^549\d{10}$/, 'Número inválido. Debe comenzar con 549 seguido de 10 dígitos')
    .required('El número de celular es obligatorio'),
  contraseña: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmarContraseña: Yup.string()
    .oneOf([Yup.ref('contraseña'), ''], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es obligatorio'),
});

