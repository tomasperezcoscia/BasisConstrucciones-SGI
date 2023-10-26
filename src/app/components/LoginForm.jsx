import React from 'react';
import ProfilePlaceholder from './ProfilePlaceholder';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

function LoginForm() {
  return (
    <div>
      <ProfilePlaceholder />
      <h2>Ingresa a tu cuenta de Basis Construcciones</h2>
      <InputField type="text" placeholder="Username/Email" />
      <InputField type="password" placeholder="Password" />
      <SubmitButton />
    </div>
  );
}

export default LoginForm;
