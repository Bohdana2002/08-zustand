"use client";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}
interface NoteFormValues {
  title: string;
  content: string;
  tag: TagsValues;
}
type TagsValues = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteOrderSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "The title must be at least 3 characters")
    .max(50, "The title is too long")
    .required("The title is required"),
  content: Yup.string().max(500, "The content must be maximum 500 characters"),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});
const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });
  const fieldId = useId();
  const handleSubmit = (
    values: NoteFormValues,
    active: FormikHelpers<NoteFormValues>,
  ) => {
    mutate({ ...values });
    active.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteOrderSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;
