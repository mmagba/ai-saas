"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("19d5802c-c200-4a36-9fe3-2894c0a201e3");
    }, []);

    return null;
};