'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Download, ImageIcon } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Heading from '@/components/heading';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { Card, CardFooter } from '@/components/ui/card';
import { useProModal } from '@/hooks/use-pro-modal';

const Page = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256"
        },
        resolver: zodResolver(formSchema)
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const response = await axios.post("/api/image", values)

            const urls = response.data.map((image: { url: string }) => image.url);

            setImages(urls);

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
            <Heading title='Image Generation' desc='Turn your prompt into an image' icon={ImageIcon} iconColor='text-pink-700' bgColor='bg-pink-700/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>

                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-6'>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="A horse in a forest"
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )} />


                            <FormField name='amount' render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="this is a placeholder" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem value={option.value} key={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />


                            <FormField name='resolution' render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="this is a placeholder" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem value={option.value} key={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                    {images.length === 0 && !isLoading && <Empty label='No images generated' />}

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-4 mt-8'>
                        {images.map((url) => (
                            <Card key={url} className='rounded-lg overflow-hidden'>
                                <div className='relative aspect-square'>
                                    <Image src={url} fill alt='Image' />
                                </div>
                                <CardFooter className='p-2'>
                                    <Button variant='secondary' className='w-full' onClick={() => { window.open(url) }}>
                                        <Download className='h-4 w-4 mr-2' />
                                        Download
                                    </Button>
                                </CardFooter>

                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page