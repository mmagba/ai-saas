'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VideoIcon } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '../../../../components/heading';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { useProModal } from '@/hooks/use-pro-modal';


const Page = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            prompt: ""
        },
        resolver: zodResolver(formSchema)
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);


            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);
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
            <Heading title='Video Generation' desc='Turn your prompt into Video' icon={VideoIcon} iconColor='text-orange-700' bgColor='bg-orange-700/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>

                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Clown fish swimming around a coral reef"
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
                    {!video && !isLoading && <Empty label='No video generated' />}
                    {video && (

                        <video controls className='w-full aspect-video mt-8 rounded-lg border bg-black'>
                            <source src={video} />
                        </video>
                    )}

                </div>
            </div>
        </>
    )
}

export default Page