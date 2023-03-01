import React from "react";
import LoadingButton from "../../components/loading-button";
import { getErrorMessage } from "../../utils/get-error-message";
import constactFieldsData from "./constants/contact-fields";
import ContactFields from "./components/contact-fields";
import Alert from "../../components/alert";
import useContactForm from "./hooks/use-contact-form";

const Contact = () => {
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    handleSubmit,
    errors,
    register,
  } = useContactForm();

  return (
    <form
      className="relative flex max-w-[500px] flex-col space-y-[25px]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl">Contact</h1>
      <ContactFields
        fields={constactFieldsData}
        errors={errors}
        register={register}
      />

      <LoadingButton
        isLoading={isLoading}
        className="btn-3d ml-auto py-2 text-sm"
      >
        Submit
      </LoadingButton>

      {isError ? (
        <Alert variant="error" className="absolute bottom-0 left-0">
          {getErrorMessage(error)}
        </Alert>
      ) : null}
      {isSuccess ? (
        <Alert className="absolute bottom-0 left-0">
          Message has been sent.
        </Alert>
      ) : null}
    </form>
  );
};

export default Contact;
