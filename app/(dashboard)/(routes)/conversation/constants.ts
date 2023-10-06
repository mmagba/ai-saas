import { object, string } from 'zod';

export const formSchema = object({
    prompt: string()
        .refine(value => value.trim().length > 0, {
            message: 'Prompt is required and cannot be empty or consist only of whitespace'
        })
});
