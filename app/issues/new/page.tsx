"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Callout, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";


type Issue = {
  title: string,
  description: string,
}

export default function NewIssuePage() {
  const { register, formState: { errors }, handleSubmit, watch, control } = useForm<Issue>();
  const router = useRouter();
  const [isSubmitting, setSubmit] = useState(false);

  const onSubmit: SubmitHandler<Issue> = async (data) =>  {
    console.log(data);
    setSubmit(true);
    try {
      await fetch("/api/issues", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("Catch: " + error);
    }
    setSubmit(false);
    router.push("/issues");
  }

  return (
    <form className="max-w-[800px] space-y-4" onSubmit={handleSubmit(onSubmit)} >
      <TextField.Root >
        <TextField.Input placeholder="Issue title..." {...register("title", { required: true, minLength: 1, maxLength: 255})} />
      </TextField.Root>
      {errors.title &&
        <Callout.Root color="red">
          <Callout.Text>title required</Callout.Text>
        </Callout.Root>
      }
      <Controller
        name="description"
        control={control}
        render={({ field } ) => (
          <SimpleMDE placeholder="Issue description..." {...field} />
        )}
        rules={{required: true}}
      />
      {errors.description &&
        <Callout.Root color="red">
          <Callout.Text>description required</Callout.Text>
        </Callout.Root>
      }
      <Button type="submit" disabled={isSubmitting}>
        Submit Issue
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  )
}