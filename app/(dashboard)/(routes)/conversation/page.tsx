'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
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
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { useProModal } from '@/hooks/use-pro-modal';


const Page = () => {
    const router = useRouter();
    const proModal = useProModal();

    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            prompt: ""
        },
        resolver: zodResolver(formSchema)
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessage = {
                content: values.prompt,
                role: 'user'
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            })

            setMessages((current) => ([...current, userMessage, response.data]));
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something wen wrong");
            }
        } finally {
            router.refresh();
        }
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
                                            placeholder={messages.length === 0 ? "How do I calculate the radius of a circle?" : ""}
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
                    {messages.length === 0 && !isLoading && <Empty label='No conversation started' />}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'p-8 w-full flex items-start gap-x-8 rounded-lg',
                                    message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                                )}
                            >
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                <div className='text-sm'>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page