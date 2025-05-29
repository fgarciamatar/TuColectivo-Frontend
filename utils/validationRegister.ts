import * as Yup from 'yup';


 export const validationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El nombre solo debe contener letras y espacios')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es obligatorio'),
});

