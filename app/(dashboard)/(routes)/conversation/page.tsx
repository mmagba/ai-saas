'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';

import Heading from '@/components/Heading';
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            prompt: ""
        },
        resolver: zodResolver(formSchema)
    });

    const isLoading = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };


    return (
        <>
            <Heading title='Conversation' desc='Our most advanced conversation model' icon={MessageSquare} iconColor='text-violet-500' bgColor='bg-violet-500/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>

                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="How do I calculate the radius of a circle?"
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />

                            <Button type='submit' disabled={isLoading} className='col-span-12 lg:col-span-2 w-full'>
                                Generate
                            </Button>

                        </form>
                    </Form>
                </div>


            </div>
        </>
    )
}

export default page