'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Music } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { useProModal } from '@/hooks/use-pro-modal';


const page = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            prompt: ""
        },
        resolver: zodResolver(formSchema)
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);


            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong");
            }

        } finally {
            router.refresh();
        }
    };


    return (
        <>
            <Heading title='Music Generation' desc='Turn your prompt into music' icon={Music} iconColor='text-emerald-500' bgColor='bg-emerald-500/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>

                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Piano solo"
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

                <div className='space-y-4 mt-4'>
                    {isLoading && <Loader />}
                    {!music && !isLoading && <Empty label='No music generated' />}
                    {music && (
                        <audio controls className='w-full mt-8'>
                            <source src={music} />
                        </audio>
                    )}

                </div>
            </div>
        </>
    )
}

export default page