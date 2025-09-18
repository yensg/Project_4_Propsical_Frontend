import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "../../hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  name: z.string().min(1, {
    message: "name is required.",
  }),
  phone: z.string().min(8, {
    message: "Phone number is required.",
  }),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  const clickedSubmit = async (data) => {
    await fetchData(
      "/auth/register",
      "POST",
      {
        username: data.username,
        password: data.password,
        name: data.name,
        phone: data.phone,
        role: "registered",
        subscription_plan: "basic",
      },
      undefined
    );
    return true;
  };
  const mutate = useMutation({
    mutationFn: (data) => {
      clickedSubmit(data);
      navigate("/login");
    },
  });

  // how this ...form, ...field works? what this actually contains
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          mutate.mutate(data); // pass the form values to your mutation
        })}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
