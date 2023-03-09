import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { newsletter as Schema } from "schemas";
import { newsletterSubscribe } from "../services/newsletter";

const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<unknown>("");
  const {
    mutateAsync,
    isLoading,
    error: mutationError,
    isError,
    isSuccess,
  } = useMutation(newsletterSubscribe);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoading) return;
      setError(null);
      await Schema.subscribeNewsletter.parseAsync({ email });
      await mutateAsync({ email });
      setEmail("");
    } catch (error) {
      setError(error);
    }
  };

  return {
    error: mutationError || error,
    isError: isError || error,
    isSuccess,
    isLoading,
    handleSubmit,
    email,
    setEmail,
  };
};

export default useNewsletter;
