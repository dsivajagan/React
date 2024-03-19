import React, { useState, useEffect, ReactNode } from 'react';

interface ValidationMessagesProps {
  control: HTMLInputElement | null;
  messages: string[];
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({ control, messages }) => {
  const [touched, setTouched] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);

  useEffect(() => {
    const handleTouched = () => setTouched(true);
    const handleInvalid = () => setInvalid(control !== null && control.validity.valid);

    control?.addEventListener('blur', handleTouched);
    control?.addEventListener('invalid', handleInvalid);

    return () => {
      control?.removeEventListener('blur', handleTouched);
      control?.removeEventListener('invalid', handleInvalid);
    };
  }, [control]);

  if (!touched || !invalid) {
    return null;
  }

  return (
    <div className="help-block input-error-msg">
      {messages.map((message: string, index: number) => (
        <div key={index} className="error-message">{message}</div>
      ))}
    </div>
  );
};

export default ValidationMessages;
