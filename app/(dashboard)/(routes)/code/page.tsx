'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Code } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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

const page = () => {
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
            const response = await axios.post("/api/code", {
                messages: newMessages,
            })

            setMessages((current) => ([...current, userMessage, response.data]));
            form.reset();

        } catch (error: any) {
            //need to pay
            console.log(error);
        } finally {
            console.log('router refresh');
        }
    };


    return (
        <>
            <Heading title='Code Generation' desc='Generate code using descriptive text ' icon={Code} iconColor='text-green-700' bgColor='bg-green-700/10' />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='border rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>

                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder={messages.length === 0 ? "Simple toggle using react hooks?" : ""}
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
                    {messages.length === 0 && !isLoading && <Empty label='No code generated' />}
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
                                <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ node, ...props }) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                }} className="text-sm overflow-hidden leading-7">
                                    {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page