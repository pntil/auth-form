import { useState } from 'react';

type UseAuthMutation = <DataType, ErrorType>() => {
  error?: ErrorType;
  isLoading: boolean;
  mutate(data: DataType): void;
};

// This is a dummy react-quiry-ish 'mutation' hook that pretends for 1.5 seconds
// to be sending the credentials data somewhere and then 'receives' an error.
export const useAuthMutation: UseAuthMutation = <DataType, ErrorType>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();

  const mutate = (data: DataType) => {
    console.info(
      `Trying my best to send ${JSON.stringify(data, null, 2)} to the server...`
    );
    setIsLoading(true);

    setTimeout(() => {
      console.info('Failed!');
      setIsLoading(false);
      setError({ message: 'Incorrect username or password' } as ErrorType);
    }, 1500);
  };

  return { error, isLoading, mutate };
};
