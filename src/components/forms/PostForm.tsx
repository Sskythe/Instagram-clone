import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from 'zod'
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import FileUploader from "./FileUploader"
import { PostValidation } from "@/lib/validation/Index"
import { Input } from "../ui/input"
import { Models } from "appwrite"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useCreatePost } from "@/lib/react-query/queriesAndMutattions"

type PostFormProps = {
  post?: Models.Document;
}

const  PostForm = ({ post }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const { mutateAsync: createNewPost, isPending: isLoadingCreate } =
    useCreatePost();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : ""
    },
  })

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await createNewPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: ` Please try again.`,
      });
    }
    navigate("/home");
  };




  return (
    <Form {...form}>



      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

        {/* Name Field */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">caption</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {/* Name Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" className="shad-input"{...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {/* Name Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Tags</FormLabel>
              <FormControl>
                <Input placeholder="tags" className="shad-input"{...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* User name Field */}

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className='shad-button_dark_4'>Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap">Post</Button>
        </div>
      </form>

    </Form>
  )

}

export default PostForm